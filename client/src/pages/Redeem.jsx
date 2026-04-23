import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Leaf, CheckCircle, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

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
      setError(err.response?.data?.message || 'Invalid code.');
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
    <div className="flex items-center justify-center gap-12 mb-16">
      {[1, 2, 3].map((s) => (
        <div key={s} className="relative flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 ${
            step === s ? 'bg-brand-600 text-white shadow-lg' : step > s ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-400'
          }`}>
            {s}
          </div>
          <span className={`absolute -bottom-7 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap ${
            step >= s ? 'text-brand-700' : 'text-slate-300'
          }`}>
            {s === 1 ? 'Enter Code' : s === 2 ? 'Choose Reward' : 'Your Information'}
          </span>
          {s < 3 && (
            <div className={`absolute left-10 top-5 w-24 h-[2px] ${step > s ? 'bg-brand-600' : 'bg-slate-100'}`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4"><Leaf className="text-brand-600 w-8 h-8" /></div>
          <h2 className="text-3xl font-extrabold text-slate-900">Redeem Voucher</h2>
        </div>

        <StepIndicator />

        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 md:p-16 shadow-2xl shadow-slate-200/40">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center max-w-md mx-auto space-y-10">
                <div className="flex justify-center"><div className="w-20 h-20 bg-brand-50 rounded-3xl flex items-center justify-center"><Leaf className="text-brand-600 w-10 h-10" /></div></div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Enter Your Voucher Code</h3>
                  <p className="text-sm text-slate-400">Please enter the 12-character code from your voucher.</p>
                </div>
                <form onSubmit={handleValidateVoucher} className="space-y-6">
                  <input 
                    className="w-full px-6 py-4 bg-slate-50 rounded-xl text-center text-xl font-bold tracking-widest uppercase outline-none focus:ring-2 focus:ring-brand-500/20" 
                    placeholder="PGL-AB12-CD34-EF56"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                  />
                  {error && <p className="text-xs text-red-500 font-bold">{error}</p>}
                  <button type="submit" className="w-full py-4 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/20">
                    {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 'Validate Code'}
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Select your favorite reward</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {voucherData?.rewards.map((reward) => (
                    <div key={reward._id} className={`p-6 rounded-[2rem] border-2 transition-all cursor-pointer ${selectedReward?._id === reward._id ? 'border-brand-600 bg-brand-50/50' : 'border-slate-50 hover:border-brand-200'}`} onClick={() => setSelectedReward(reward)}>
                      <img src={reward.image} alt={reward.name} className="w-full h-40 object-cover rounded-2xl mb-6" />
                      <h4 className="font-bold text-center mb-1">{reward.name}</h4>
                      <p className="text-[10px] text-center text-slate-400 mb-6">{reward.description}</p>
                      <button className={`w-full py-2.5 rounded-lg text-xs font-bold transition-colors ${selectedReward?._id === reward._id ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        {selectedReward?._id === reward._id ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between pt-6 border-t border-slate-50">
                  <button onClick={() => setStep(1)} className="text-sm font-bold text-slate-400 hover:text-brand-600">Back</button>
                  <button onClick={() => setStep(3)} disabled={!selectedReward} className="px-10 py-3 bg-brand-600 text-white rounded-xl font-bold disabled:opacity-50">Next Step</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                <div className="text-center"><h3 className="text-xl font-bold">Please fill in your information to receive your reward.</h3></div>
                <form onSubmit={handleSubmitClaim} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name *</label>
                      <input className="w-full px-5 py-3.5 bg-slate-50 rounded-xl outline-none focus:ring-1 focus:ring-brand-500" required onChange={(e) => setCustomerInfo({...customerInfo, customerName: e.target.value})} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number *</label>
                      <input className="w-full px-5 py-3.5 bg-slate-50 rounded-xl outline-none focus:ring-1 focus:ring-brand-500" required onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                    <input className="w-full px-5 py-3.5 bg-slate-50 rounded-xl outline-none focus:ring-1 focus:ring-brand-500" type="email" onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Address *</label>
                    <input className="w-full px-5 py-3.5 bg-slate-50 rounded-xl outline-none focus:ring-1 focus:ring-brand-500" required onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Province / City *</label>
                      <input className="w-full px-5 py-3.5 bg-slate-50 rounded-xl outline-none focus:ring-1 focus:ring-brand-500" required onChange={(e) => setCustomerInfo({...customerInfo, provinceCity: e.target.value})} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Notes (optional)</label>
                      <input className="w-full px-5 py-3.5 bg-slate-50 rounded-xl outline-none focus:ring-1 focus:ring-brand-500" onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})} />
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-8">
                    <button type="button" onClick={() => setStep(2)} className="text-sm font-bold text-slate-400 hover:text-brand-600">Back</button>
                    <button type="submit" className="px-12 py-4 bg-brand-600 text-white rounded-xl font-bold shadow-lg shadow-brand-600/20">Confirm & Submit</button>
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
