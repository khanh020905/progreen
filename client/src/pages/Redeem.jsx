import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Leaf, CheckCircle, ArrowRight, Loader2, AlertCircle, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import bottleImg from '../assets/rewards/bottle.png';
import toteImg from '../assets/rewards/tote.png';
import plantImg from '../assets/rewards/plant.png';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
      if (response.data.voucher.rewards.length === 1) setSelectedReward(response.data.voucher.rewards[0]);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid voucher code.');
      toast.error('Validation failed!');
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
      toast.error(err.response?.data?.message || 'An error occurred.');
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
            {s === 1 ? 'Enter Code' : s === 2 ? 'Choose Reward' : 'Your Information'}
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
          <div className="flex justify-center mb-4"><Leaf className="text-brand-500 w-8 h-8" /></div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Redeem Voucher</h2>
        </div>

        <StepIndicator />

        <div className="bg-white border border-slate-50 rounded-[3rem] p-12 md:p-20 shadow-2xl shadow-slate-100/50 mt-10">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-center max-w-md mx-auto space-y-12">
                <div className="flex justify-center">
                  <div className="w-24 h-24 bg-brand-50 rounded-[2rem] flex items-center justify-center text-brand-600">
                    <Package className="w-12 h-12" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900">Enter Your Voucher Code</h3>
                  <p className="text-slate-400 font-bold text-sm leading-relaxed px-10">
                    Please enter the 12-character code from your voucher.
                  </p>
                </div>
                <form onSubmit={handleValidateVoucher} className="space-y-8">
                  <input 
                    className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-2xl text-center text-2xl font-black tracking-[0.2em] uppercase outline-none focus:bg-white focus:border-brand-500 transition-all shadow-inner" 
                    placeholder="PGL-AB12-CD34-EF56"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                  />
                  {error && <p className="text-xs text-red-500 font-black uppercase tracking-widest">{error}</p>}
                  <button type="submit" className="w-full py-5 bg-brand-800 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-brand-950 transition-all shadow-xl shadow-brand-900/10">
                    {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 'Validate Code'}
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-16">
                <div className="text-center space-y-4">
                  <h3 className="text-3xl font-black text-slate-900">Choose Your Reward</h3>
                  <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Select your favorite reward</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {voucherData?.rewards.map((reward) => {
                    const displayImage = reward.name.toLowerCase().includes('bottle') ? bottleImg : 
                                       reward.name.toLowerCase().includes('tote') ? toteImg : 
                                       reward.name.toLowerCase().includes('plant') ? plantImg : reward.image;
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
                          {selectedReward?._id === reward._id ? 'Selected' : 'Select'}
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-col items-center gap-10 pt-10 border-t border-slate-50">
                   <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-2">
                     <CheckCircle className="w-3 h-3 text-brand-500" /> You can only choose one reward.
                   </p>
                  <div className="flex justify-between w-full">
                    <button onClick={() => setStep(1)} className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-brand-600 transition-colors">Back</button>
                    <button onClick={() => setStep(3)} disabled={!selectedReward} className="px-12 py-4 bg-brand-800 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-brand-900/10 disabled:opacity-50">Next Step</button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-16">
                <div className="text-center space-y-4">
                  <h3 className="text-3xl font-black text-slate-900">Your Information</h3>
                  <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Please fill in your information to receive your reward.</p>
                </div>
                <form onSubmit={handleSubmitClaim} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name *</label>
                      <input className="input-field !py-5" placeholder="Nguyen Van A" required onChange={(e) => setCustomerInfo({...customerInfo, customerName: e.target.value})} />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number *</label>
                      <input className="input-field !py-5" placeholder="0901 234 567" required onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                    <input className="input-field !py-5" placeholder="nguyenvana@gmail.com" type="email" onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Address *</label>
                    <input className="input-field !py-5" placeholder="123 Green Street, District 1" required onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Province / City *</label>
                      <select className="input-field !py-5 appearance-none cursor-pointer" required onChange={(e) => setCustomerInfo({...customerInfo, provinceCity: e.target.value})}>
                        <option value="">Select City</option>
                        <option value="Ho Chi Minh City">Ho Chi Minh City</option>
                        <option value="Ha Noi">Ha Noi</option>
                        <option value="Da Nang">Da Nang</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Notes (optional)</label>
                      <input className="input-field !py-5" placeholder="Leave a note for delivery (optional)" onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})} />
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-12 border-t border-slate-50">
                    <button type="button" onClick={() => setStep(2)} className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-brand-600 transition-colors flex items-center gap-2">Back</button>
                    <button type="submit" className="px-16 py-5 bg-brand-800 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-brand-900/20 hover:bg-brand-950 transition-all">
                      Confirm & Submit
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
