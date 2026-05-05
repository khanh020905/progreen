'use client';

import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { CheckCircle, Loader2, Package, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { formatVoucherCode, getRewardImages, isShirtReward } from '@/utils/voucher';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import LeafIcon from '@/components/LeafIcon';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchableSelect from '@/components/SearchableSelect';
import { getProvinces, getDistricts, getWards } from '@/utils/location';

function RedeemContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherData, setVoucherData] = useState<any>(null);
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [carouselIndexes, setCarouselIndexes] = useState<{[key: string]: number}>({});
  const [genderSelections, setGenderSelections] = useState<{[key: string]: 'nam' | 'nu'}>({});
  const [customerInfo, setCustomerInfo] = useState({
    customerName: '',
    phone: '',
    address: '',
    provinceCity: '',
    district: '',
    ward: '',
    streetAddress: '',
    notes: ''
  });

  const [locationData, setLocationData] = useState({
    provinces: [],
    districts: [],
    wards: []
  });

  const [codes, setCodes] = useState({
    province: 0,
    district: 0
  });

  const validatePhone = (phone: string) => {
    return /^0\d{9}$/.test(phone);
  };

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      setVoucherCode(code.toUpperCase());
    }
  }, [searchParams]);

  useEffect(() => {
    if (step === 3) {
      getProvinces().then(data => setLocationData(prev => ({ ...prev, provinces: data })));
    }
  }, [step]);

  const handleProvinceChange = async (name: string, code: number) => {
    setCustomerInfo(prev => ({ ...prev, provinceCity: name, district: '', ward: '' }));
    setCodes(prev => ({ ...prev, province: code }));
    try {
      const districts = await getDistricts(code);
      setLocationData(prev => ({ ...prev, districts, wards: [] }));
    } catch (err) {
      toast.error('Lỗi khi tải danh sách quận huyện');
    }
  };

  const handleDistrictChange = async (name: string, code: number) => {
    setCustomerInfo(prev => ({ ...prev, district: name, ward: '' }));
    setCodes(prev => ({ ...prev, district: code }));
    try {
      const wards = await getWards(code);
      setLocationData(prev => ({ ...prev, wards }));
    } catch (err) {
      toast.error('Lỗi khi tải danh sách phường xã');
    }
  };

  const handleValidateVoucher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherCode) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/vouchers/validate', { code: voucherCode });
      setVoucherData(response.data.voucher);
      if (response.data.voucher.rewards.length === 1) {
        setSelectedReward(response.data.voucher.rewards[0]);
      }
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Mã số thẻ không hợp lệ');
      toast.error('Xác thực thất bại!');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhone(customerInfo.phone)) {
      toast.error('Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0');
      return;
    }

    if (!customerInfo.provinceCity || !customerInfo.district || !customerInfo.ward || !customerInfo.streetAddress) {
      toast.error('Vui lòng điền đầy đủ địa chỉ nhận quà');
      return;
    }

    setLoading(true);
    try {
      const payload = { 
        ...customerInfo, 
        voucherCode: voucherData.code, 
        rewardId: selectedReward._id,
        rewardName: selectedReward.name
      };
      const response = await axios.post('/api/claims', payload);
      router.push(`/success?ref=${response.data.claimReference}`);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Đã có lỗi xảy ra.');
    } finally {
      setLoading(false);
    }
  };

  const handleNextImage = (e: React.MouseEvent, id: string, images: string[]) => {
    e.stopPropagation();
    setCarouselIndexes(prev => ({
      ...prev,
      [id]: (prev[id] === undefined ? 0 : prev[id] + 1) % images.length
    }));
  };

  const handlePrevImage = (e: React.MouseEvent, id: string, images: string[]) => {
    e.stopPropagation();
    setCarouselIndexes(prev => ({
      ...prev,
      [id]: (prev[id] === undefined ? 0 : prev[id] - 1 + images.length) % images.length
    }));
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-12 mb-10 relative">
      {[1, 2, 3].map((s) => (
        <div key={s} className="relative flex flex-col items-center">
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black text-xs md:text-sm z-10 transition-all duration-500 ${
            step === s ? 'bg-green-500 text-white shadow-xl shadow-green-500/30' : step > s ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-300'
          }`}>
            {s}
          </div>
          <span className={`absolute -bottom-8 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-colors duration-500 ${
            step >= s ? 'text-green-800' : 'text-slate-300'
          }`}>
            {s === 1 ? 'Nhập mã' : s === 2 ? 'Chọn quà' : 'Nhận quà'}
          </span>
          {s < 3 && (
            <div className={`absolute left-10 md:left-12 top-5 md:top-6 w-16 md:w-24 h-[1px] ${step > s ? 'bg-green-500' : 'bg-slate-100'}`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen py-10 md:py-16 bg-white">
      <div className="container mx-auto px-2 md:px-4 max-w-5xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4"><LeafIcon className="text-green-500 w-8 h-8" /></div>
          <h2 className="text-lg md:text-2xl font-black text-slate-900 tracking-tight uppercase leading-tight">
            HOÀN THÀNH 3 BƯỚC ĐƠN GIẢN <br /> ĐỂ NHẬN QUÀ
          </h2>
        </div>

        <StepIndicator />

        <div className="bg-white border border-slate-50 rounded-[2rem] md:rounded-[3rem] p-2 md:p-12 shadow-2xl shadow-slate-100/50 mt-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-center max-w-md mx-auto space-y-12">

                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl font-black text-slate-900">Nhập mã số thẻ của bạn</h3>
                  <p className="text-slate-400 font-bold text-sm leading-relaxed px-10">
                    Vui lòng nhập mã số trên thẻ quét mã QR để được nhận quà.
                  </p>
                </div>
                <form onSubmit={handleValidateVoucher} className="space-y-8">
                  <input 
                    className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-2xl text-center text-2xl font-black tracking-[0.2em] uppercase outline-none focus:bg-white focus:border-green-500 transition-all shadow-inner" 
                    placeholder="PGL-XXXX-XXXX"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(formatVoucherCode(e.target.value))}
                  />
                  {error && <p className="text-xs text-red-500 font-black uppercase tracking-widest">{error}</p>}
                  <button type="submit" className="w-full py-5 bg-green-800 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-green-950 transition-all shadow-xl shadow-green-900/10">
                    {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 'Xác thực mã số thẻ'}
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5 md:space-y-10">
                <div className="text-center space-y-2">
                  <h3 className="text-xl md:text-2xl font-black text-slate-900">Chọn phần quà của bạn</h3>
                  <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Chọn món quà bạn yêu thích nhất</p>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-6 max-w-3xl mx-auto">
                  {voucherData?.rewards.map((reward: any) => {
                    const isShirt = isShirtReward(reward.name);
                    const gender = genderSelections[reward._id] || 'nu';
                    const images = getRewardImages(reward.name, isShirt ? gender : undefined);
                    const currentIndex = carouselIndexes[reward._id] || 0;
                    const displayImage = images[currentIndex % images.length];
                    const isOutOfStock = reward.stock !== undefined && reward.stock <= 0;
                    
                    return (
                      <div 
                        key={reward._id} 
                        className={`group p-2 md:p-4 bg-white rounded-2xl md:rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col relative ${
                          isOutOfStock ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                        } ${
                          selectedReward?._id === reward._id ? 'border-green-500 shadow-2xl shadow-green-900/10' : 'border-slate-50 hover:border-green-200'
                        }`} 
                        onClick={() => !isOutOfStock && setSelectedReward(reward)}
                      >
                        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
                          {isOutOfStock ? (
                            <div className="bg-red-600 text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                              Hết hàng
                            </div>
                          ) : (
                            <div className="bg-white/90 backdrop-blur-md text-[#2d5a27] px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100 shadow-sm">
                              Còn lại: {reward.stock ?? 0}
                            </div>
                          )}
                        </div>

                        {isShirt && (
                          <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20">
                            <div className="flex bg-white/90 backdrop-blur-md rounded-full p-0.5 border border-green-100 shadow-sm">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setGenderSelections(prev => ({ ...prev, [reward._id]: 'nu' }));
                                  setCarouselIndexes(prev => ({ ...prev, [reward._id]: 0 }));
                                }}
                                className={`px-2 py-1 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                                  gender === 'nu'
                                    ? 'bg-green-600 text-white shadow-md'
                                    : 'text-slate-400 hover:text-slate-600'
                                }`}
                              >
                                Nữ
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setGenderSelections(prev => ({ ...prev, [reward._id]: 'nam' }));
                                  setCarouselIndexes(prev => ({ ...prev, [reward._id]: 0 }));
                                }}
                                className={`px-2 py-1 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                                  gender === 'nam'
                                    ? 'bg-green-600 text-white shadow-md'
                                    : 'text-slate-400 hover:text-slate-600'
                                }`}
                              >
                                Nam
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="relative aspect-square md:aspect-[3/4] rounded-[1rem] md:rounded-[2rem] overflow-hidden mb-2 md:mb-4 bg-slate-50/50">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={displayImage}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.3 }}
                              className="absolute inset-0"
                            >
                              <Image 
                                src={displayImage} 
                                alt={reward.name} 
                                fill
                                className={`object-contain md:object-cover p-2 md:p-0 transition-all duration-700 ${isOutOfStock ? 'grayscale' : 'group-hover:scale-110'}`} 
                              />
                            </motion.div>
                          </AnimatePresence>

                          {images.length > 1 && (
                            <>
                              <button 
                                onClick={(e) => handlePrevImage(e, reward._id, images)}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all z-10"
                              >
                                <ChevronLeft className="w-5 h-5" />
                              </button>
                              <button 
                                onClick={(e) => handleNextImage(e, reward._id, images)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all z-10"
                              >
                                <ChevronRight className="w-5 h-5" />
                              </button>
                              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                {images.map((_, i) => (
                                  <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? 'bg-white w-4' : 'bg-white/40'}`} />
                                ))}
                              </div>
                            </>
                          )}

                          {selectedReward?._id === reward._id && (
                            <div className="absolute inset-0 bg-green-500/10 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
                              <div className="bg-white text-green-600 rounded-full p-3 shadow-xl"><CheckCircle className="w-8 h-8" /></div>
                            </div>
                          )}
                        </div>
                        <div className="px-1 md:px-4 flex-1 text-center space-y-1 mb-3 md:mb-6">
                          <h4 className="font-black text-slate-900 text-[10px] md:text-lg leading-tight tracking-tighter">
                            {reward.name === "Kem đánh răng Close up 100gr" ? (
                              <>Kem đánh răng <br /> Close up 100gr</>
                            ) : reward.name}
                          </h4>
                          <p className="text-[8px] md:text-[11px] text-slate-400 font-bold leading-relaxed">{reward.description}</p>
                        </div>
                        <button className={`w-full py-2.5 md:py-4 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${
                          isOutOfStock 
                            ? 'bg-slate-100 text-slate-300' 
                            : selectedReward?._id === reward._id 
                              ? 'bg-green-800 text-white shadow-lg' 
                              : 'bg-slate-50 text-slate-400 group-hover:bg-green-50 group-hover:text-green-700'
                        }`}>
                          {isOutOfStock ? 'Tạm hết hàng' : selectedReward?._id === reward._id ? 'Đã chọn' : 'Chọn'}
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-col items-center gap-6 md:gap-10 pt-6 md:pt-10 border-t border-slate-50">
                   <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-2">
                     <CheckCircle className="w-3 h-3 text-green-500" /> Bạn chỉ có thể chọn một phần quà.
                   </p>
                  <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 md:gap-6">
                    <button onClick={() => setStep(1)} className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-green-600 transition-colors order-2 md:order-1">Quay lại</button>
                    <button onClick={() => setStep(3)} disabled={!selectedReward} className="w-full md:w-auto px-12 py-3.5 md:py-4 bg-green-800 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-green-900/10 disabled:opacity-50 order-1 md:order-2">Tiếp theo</button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 md:space-y-16">
                <div className="text-center space-y-4">
                  <h3 className="text-xl md:text-2xl font-black text-slate-900">Thông tin nhận quà</h3>
                  <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Vui lòng điền thông tin để chúng tôi gửi quà đến bạn.</p>
                </div>
                <form onSubmit={handleSubmitClaim} className="space-y-5 md:space-y-10">
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Họ và tên *</label>
                    <input 
                      className="w-full px-5 md:px-8 py-3.5 md:py-5 bg-slate-50 border-2 border-transparent rounded-xl md:rounded-2xl font-bold outline-none focus:bg-white focus:border-green-500 transition-all shadow-inner" 
                      placeholder="Nguyễn Văn A" 
                      required 
                      value={customerInfo.customerName}
                      onChange={(e) => setCustomerInfo({...customerInfo, customerName: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Số điện thoại *</label>
                    <input 
                      className={`w-full px-5 md:px-8 py-3.5 md:py-5 bg-slate-50 border-2 rounded-xl md:rounded-2xl font-bold outline-none focus:bg-white transition-all shadow-inner ${
                        customerInfo.phone && !validatePhone(customerInfo.phone) ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-green-500'
                      }`} 
                      placeholder="0901 234 567" 
                      required 
                      value={customerInfo.phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setCustomerInfo({...customerInfo, phone: val});
                      }} 
                    />
                    {customerInfo.phone && !validatePhone(customerInfo.phone) && (
                      <p className="text-[9px] text-red-500 font-black uppercase tracking-widest ml-1 animate-pulse">
                        Số điện thoại không hợp lệ (Phải có 10 số và bắt đầu bằng 0)
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <SearchableSelect 
                      label="Tỉnh / Thành phố" 
                      options={locationData.provinces} 
                      value={customerInfo.provinceCity} 
                      onChange={handleProvinceChange}
                      placeholder="Chọn Tỉnh / Thành phố"
                      required
                    />
                    <SearchableSelect 
                      label="Quận / Huyện" 
                      options={locationData.districts} 
                      value={customerInfo.district} 
                      onChange={handleDistrictChange}
                      disabled={!customerInfo.provinceCity}
                      placeholder={customerInfo.provinceCity ? "Chọn Quận / Huyện" : "Vui lòng chọn Tỉnh trước"}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <SearchableSelect 
                      label="Phường / Xã" 
                      options={locationData.wards} 
                      value={customerInfo.ward} 
                      onChange={(name) => setCustomerInfo({...customerInfo, ward: name})}
                      disabled={!customerInfo.district}
                      placeholder={customerInfo.district ? "Chọn Phường / Xã" : "Vui lòng chọn Quận trước"}
                      required
                    />
                    <div className="space-y-2 md:space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Số nhà, tên đường *</label>
                      <input 
                        className="w-full px-5 md:px-8 py-3.5 md:py-5 bg-slate-50 border-2 border-transparent rounded-xl md:rounded-2xl font-bold outline-none focus:bg-white focus:border-green-500 transition-all shadow-inner" 
                        placeholder="Ví dụ: 123 Đường ABC" 
                        required 
                        value={customerInfo.streetAddress}
                        onChange={(e) => setCustomerInfo({...customerInfo, streetAddress: e.target.value})} 
                      />
                    </div>
                  </div>
                  <div className="flex flex-col-reverse md:flex-row justify-between items-center pt-6 md:pt-12 border-t border-slate-50 gap-4 md:gap-6">
                    <button type="button" onClick={() => setStep(2)} className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-green-600 transition-colors flex items-center gap-2">Quay lại</button>
                    <button type="submit" className="w-full md:w-auto px-10 md:px-16 py-3.5 md:py-5 bg-green-800 text-white rounded-xl md:rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest shadow-2xl shadow-green-900/20 hover:bg-green-950 transition-all">
                      {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 'Xác nhận & Hoàn thành'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function RedeemPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      <Navbar />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>}>
        <RedeemContent />
      </Suspense>
    </div>
  );
}
