import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Loader2, AlertCircle, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import LeafIcon from '../components/LeafIcon';
import bottleImg from '../assets/rewards/bottle.png';
import socksImg from '../assets/rewards/socks.png';
import toothpasteImg from '../assets/rewards/toothpaste.png';
import cableImg from '../assets/rewards/cable.png';
import tshirtImg from '../assets/rewards/tshirt.png';
import capImg from '../assets/rewards/cap.png';

const API_URL = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api');

const Redeem = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherData, setVoucherData] = useState(null);
  const [selectedReward, setSelectedReward] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    customerName: '',
    phone: '',
    address: ''
  });

  const handleValidateVoucher = async (e) => {
    e.preventDefault();
    if (!voucherCode) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_URL}/vouchers/validate`, { code: voucherCode });
      setVoucherData(response.data.voucher);
      if (response.data.voucher.rewards.length === 1) setSelectedReward(response.data.voucher.rewards[0]);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Mã số thẻ không hợp lệ');
      toast.error('Xác thực thất bại!');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitClaim = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...customerInfo, voucherCode: voucherData.code, rewardId: selectedReward._id };
      const response = await axios.post(`${API_URL}/claims`, payload);
      navigate('/success', { state: { reference: response.data.claimReference } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Đã có lỗi xảy ra.');
    } finally {
      setLoading(false);
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-12 mb-16 relative">
      {[1, 2, 3].map((s) => (
        <div key={s} className="relative flex flex-col items-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-sm z-10 transition-all duration-500 ${
            step === s ? 'bg-brand-500 text-white shadow-xl shadow-brand-500/30' : step > s ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-300'
          }`}>
            {s}
          </div>
          <span className={`absolute -bottom-8 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-colors duration-500 ${
            step >= s ? 'text-brand-800' : 'text-slate-300'
          }`}>
            {s === 1 ? 'Nhập mã' : s === 2 ? 'Chọn quà' : 'Nhận quà'}
          </span>
          {s < 3 && (
            <div className={`absolute left-12 top-6 w-24 h-[1px] ${step > s ? 'bg-brand-500' : 'bg-slate-100'}`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen py-24 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4"><LeafIcon className="text-brand-500 w-8 h-8" /></div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase leading-tight">
            HOÀN THÀNH 3 BƯỚC ĐƠN GIẢN ĐỂ NHẬN QUÀ
          </h2>
        </div>

        <StepIndicator />

        <div className="bg-white border border-slate-50 rounded-[3rem] p-12 md:p-20 shadow-2xl shadow-slate-100/50 mt-10">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-center max-w-md mx-auto space-y-12">
                <div className="flex justify-center">
                  <div className="w-24 h-24 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600">
                    <Package className="w-12 h-12" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900">Nhập mã giảm giá của bạn</h3>
                  <p className="text-slate-400 font-bold text-sm leading-relaxed px-10">
                    Vui lòng nhập mã số trên thẻ quét mã QR để được nhận quà.
                  </p>
                </div>
                <form onSubmit={handleValidateVoucher} className="space-y-8">
                  <input 
                    className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-2xl text-center text-2xl font-black tracking-[0.2em] uppercase outline-none focus:bg-white focus:border-brand-500 transition-all shadow-inner" 
                    placeholder="PGL-XXXX-XXXX"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                  />
                  {error && <p className="text-xs text-red-500 font-black uppercase tracking-widest">{error}</p>}
                  <button type="submit" className="w-full py-5 bg-brand-800 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-brand-950 transition-all shadow-xl shadow-brand-900/10">
                    {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 'Xác thực mã số thẻ'}
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-16">
                <div className="text-center space-y-4">
                  <h3 className="text-3xl font-black text-slate-900">Chọn phần quà của bạn</h3>
                  <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Chọn món quà bạn yêu thích nhất</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl mx-auto">
                  {voucherData?.rewards.map((reward) => {
                    let displayImage = reward.image;
                    const name = reward.name.toLowerCase();
                    if (name.includes('tất')) displayImage = socksImg;
                    else if (name.includes('bình')) displayImage = bottleImg;
                    else if (name.includes('kem')) displayImage = toothpasteImg;
                    else if (name.includes('sạc')) displayImage = cableImg;
                    else if (name.includes('áo')) displayImage = tshirtImg;
                    else if (name.includes('mũ')) displayImage = capImg;
                    return (
                      <div 
                        key={reward._id} 
                        className={`group p-4 bg-white rounded-[2.5rem] border-2 transition-all duration-500 cursor-pointer flex flex-col ${
                          selectedReward?._id === reward._id ? 'border-brand-500 shadow-2xl shadow-brand-900/10' : 'border-slate-50 hover:border-brand-200'
                        }`} 
                        onClick={() => setSelectedReward(reward)}
                      >
                        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-8">
                          <img src={displayImage} alt={reward.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          {selectedReward?._id === reward._id && (
                            <div className="absolute inset-0 bg-brand-500/10 backdrop-blur-[2px] flex items-center justify-center">
                              <div className="bg-white text-brand-600 rounded-full p-3 shadow-xl"><CheckCircle className="w-8 h-8" /></div>
                            </div>
                          )}
                        </div>
                        <div className="px-4 flex-1 text-center space-y-2 mb-10">
                          <h4 className="font-black text-slate-900 text-lg leading-tight">{reward.name}</h4>
                          <p className="text-[11px] text-slate-400 font-bold leading-relaxed">{reward.description}</p>
                        </div>
                        <button className={`w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          selectedReward?._id === reward._id ? 'bg-brand-800 text-white shadow-lg' : 'bg-slate-50 text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-700'
                        }`}>
                          {selectedReward?._id === reward._id ? 'Đã chọn' : 'Chọn'}
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-col items-center gap-10 pt-10 border-t border-slate-50">
                   <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-2">
                     <CheckCircle className="w-3 h-3 text-brand-500" /> Bạn chỉ có thể chọn một phần quà.
                   </p>
                  <div className="flex justify-between w-full">
                    <button onClick={() => setStep(1)} className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-brand-600 transition-colors">Quay lại</button>
                    <button onClick={() => setStep(3)} disabled={!selectedReward} className="px-12 py-4 bg-brand-800 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-brand-900/10 disabled:opacity-50">Tiếp theo</button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-16">
                <div className="text-center space-y-4">
                  <h3 className="text-3xl font-black text-slate-900">Thông tin nhận quà</h3>
                  <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Vui lòng điền thông tin để chúng tôi gửi quà đến bạn.</p>
                </div>
                <form onSubmit={handleSubmitClaim} className="space-y-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Họ và tên *</label>
                    <input 
                      className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-2xl font-bold outline-none focus:bg-white focus:border-brand-500 transition-all shadow-inner" 
                      placeholder="Nguyễn Văn A" 
                      required 
                      value={customerInfo.customerName}
                      onChange={(e) => setCustomerInfo({...customerInfo, customerName: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Số điện thoại *</label>
                    <input 
                      className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-2xl font-bold outline-none focus:bg-white focus:border-brand-500 transition-all shadow-inner" 
                      placeholder="0901 234 567" 
                      required 
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Địa chỉ nhận quà *</label>
                    <textarea 
                      className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-2xl font-bold outline-none focus:bg-white focus:border-brand-500 transition-all shadow-inner min-h-[120px]" 
                      placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố" 
                      required 
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})} 
                    />
                  </div>
                  <div className="flex justify-between items-center pt-12 border-t border-slate-50">
                    <button type="button" onClick={() => setStep(2)} className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-brand-600 transition-colors flex items-center gap-2">Quay lại</button>
                    <button type="submit" className="px-16 py-5 bg-brand-800 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-brand-900/20 hover:bg-brand-950 transition-all">
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
};

export default Redeem;
