import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Ticket, Package, UserCheck, CheckCircle, ArrowRight, Loader2, AlertCircle, MapPin, Phone, Mail, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Redeem = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form States
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherData, setVoucherData] = useState(null);
  const [selectedReward, setSelectedReward] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    provinceCity: '',
    notes: ''
  });

  const handleValidateVoucher = async (e) => {
    e.preventDefault();
    if (!voucherCode) return;
    
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_URL}/vouchers/validate`, { code: voucherCode });
      setVoucherData(response.data.voucher);
      toast.success('Xác thực mã voucher thành công!');
      if (response.data.voucher.rewards.length === 1) {
        setSelectedReward(response.data.voucher.rewards[0]);
      }
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Mã voucher không hợp lệ. Vui lòng kiểm tra lại.');
      toast.error('Xác thực thất bại!');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitClaim = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...customerInfo,
        voucherCode: voucherData.code,
        rewardId: selectedReward._id
      };
      const response = await axios.post(`${API_URL}/claims`, payload);
      toast.success('Gửi yêu cầu thành công!');
      navigate('/success', { state: { reference: response.data.claimReference } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Đã có lỗi xảy ra.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, label: 'Xác thực', icon: Ticket },
    { id: 2, label: 'Chọn quà', icon: Package },
    { id: 3, label: 'Thông tin', icon: UserCheck },
  ];

  return (
    <div className="min-h-screen py-20 bg-[#f8fafc]">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Modern Stepper */}
        <div className="flex items-center justify-center mb-20 gap-4">
          {steps.map((s, idx) => (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center gap-3">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg ${
                  step >= s.id ? 'bg-brand-600 text-white shadow-brand-600/30' : 'bg-white text-slate-300 border border-slate-100'
                }`}>
                  <s.icon className="w-7 h-7" />
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest ${
                  step >= s.id ? 'text-brand-700' : 'text-slate-400'
                }`}>{s.label}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`w-20 md:w-32 h-1 rounded-full ${
                  step > s.id ? 'bg-brand-600' : 'bg-slate-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Voucher Entry */}
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-xl mx-auto"
            >
              <div className="glass-card p-12 text-center">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Nhập Mã Voucher</h2>
                <p className="text-slate-500 font-medium mb-10">Vui lòng nhập mã code được in trên thẻ quà tặng của bạn.</p>
                
                <form onSubmit={handleValidateVoucher} className="space-y-8 text-left">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="VD: WELCOME2026"
                      className={`input-field text-center text-3xl font-bold tracking-[0.3em] uppercase h-24 ${error ? 'ring-2 ring-red-500/20 bg-red-50/50' : ''}`}
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                      disabled={loading}
                    />
                    {error && (
                      <div className="flex items-center justify-center gap-2 mt-4 text-red-500 text-sm font-bold animate-pulse">
                        <AlertCircle className="w-4 h-4" />
                        <span>{error}</span>
                      </div>
                    )}
                  </div>
                  <button 
                    type="submit" 
                    className="btn-primary w-full h-16 text-lg"
                    disabled={loading || !voucherCode}
                  >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Tiếp Tục Xác Thực'}
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* Step 2: Reward Selection */}
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-12"
            >
              <div className="text-center">
                <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Chọn Quà Tặng Của Bạn</h2>
                <p className="text-slate-500 font-medium">Bạn có thể chọn 01 phần quà yêu thích dưới đây.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {voucherData?.rewards.map((reward) => (
                  <div 
                    key={reward._id}
                    onClick={() => setSelectedReward(reward)}
                    className={`group premium-card !p-0 cursor-pointer overflow-hidden border-4 transition-all duration-500 ${
                      selectedReward?._id === reward._id ? 'border-brand-500 bg-brand-50/30' : 'border-transparent hover:border-brand-200'
                    }`}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img src={reward.image} alt={reward.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      {selectedReward?._id === reward._id && (
                        <div className="absolute inset-0 bg-brand-600/20 backdrop-blur-[2px] flex items-center justify-center">
                          <div className="bg-white text-brand-600 rounded-full p-4 shadow-xl">
                            <CheckCircle className="w-8 h-8" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-8">
                      <h3 className="font-extrabold text-xl mb-3 text-slate-900">{reward.name}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">{reward.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center max-w-2xl mx-auto pt-8">
                <button onClick={() => setStep(1)} className="btn-secondary">Quay Lại</button>
                <button 
                  onClick={() => setStep(3)} 
                  className="btn-primary group"
                  disabled={!selectedReward}
                >
                  Thông Tin Giao Hàng <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Claim Form */}
          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-12"
            >
              <div className="lg:col-span-2">
                <div className="glass-card p-12">
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-10">Địa Chỉ Nhận Quà</h2>
                  <form onSubmit={handleSubmitClaim} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-2">
                          <User className="w-4 h-4 text-brand-500" /> Họ Tên *
                        </label>
                        <input name="customerName" required className="input-field" onChange={(e) => setCustomerInfo({...customerInfo, customerName: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-2">
                          <Phone className="w-4 h-4 text-brand-500" /> Số Điện Thoại *
                        </label>
                        <input name="phone" required className="input-field" onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-2">
                        <Mail className="w-4 h-4 text-brand-500" /> Email (Không bắt buộc)
                      </label>
                      <input name="email" type="email" className="input-field" onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-2">
                        <MapPin className="w-4 h-4 text-brand-500" /> Địa Chỉ Chi Tiết *
                      </label>
                      <input name="address" required className="input-field" placeholder="Số nhà, tên đường, phường/xã..." onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-2">
                        <MapPin className="w-4 h-4 text-brand-500" /> Tỉnh / Thành Phố *
                      </label>
                      <input name="provinceCity" required className="input-field" onChange={(e) => setCustomerInfo({...customerInfo, provinceCity: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-2">Ghi Chú</label>
                      <textarea name="notes" rows="4" className="input-field" onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}></textarea>
                    </div>
                    
                    <div className="pt-8 flex justify-between gap-6">
                      <button type="button" onClick={() => setStep(2)} className="btn-secondary flex-1">Quay Lại</button>
                      <button type="submit" className="btn-primary flex-[2] h-16 text-lg" disabled={loading}>
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Xác Nhận Nhận Quà'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-600/20 blur-3xl -mr-10 -mt-10" />
                    <h3 className="text-xl font-extrabold mb-10 flex items-center gap-3">
                      <Package className="w-6 h-6 text-brand-400" /> Tóm Tắt Đơn Quà
                    </h3>
                    <div className="space-y-8">
                      <div>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3">Phần Quà Đã Chọn</p>
                        <div className="flex items-center gap-4">
                          <img src={selectedReward?.image} className="w-16 h-16 rounded-2xl object-cover border border-white/10" alt="" />
                          <p className="font-extrabold text-lg leading-tight">{selectedReward?.name}</p>
                        </div>
                      </div>
                      <div className="pt-8 border-t border-white/10">
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">Mã Voucher</p>
                        <p className="font-mono text-2xl font-bold text-brand-400 tracking-wider">{voucherData?.code}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="premium-card bg-brand-50/50 border-brand-100 p-8">
                    <p className="text-xs text-brand-700 font-bold leading-relaxed">
                      * Bằng việc nhấn xác nhận, bạn đồng ý với các điều khoản giao nhận quà tặng của Pro Green Life. Quà sẽ được gửi đến trong vòng 5-7 ngày làm việc.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Redeem;
