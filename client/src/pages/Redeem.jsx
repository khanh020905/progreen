import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Ticket, Package, UserCheck, CheckCircle, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

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

  // Step 1: Validate Voucher
  const handleValidateVoucher = async (e) => {
    e.preventDefault();
    if (!voucherCode) return;
    
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_URL}/vouchers/validate`, { code: voucherCode });
      setVoucherData(response.data.voucher);
      toast.success('Voucher validated successfully!');
      
      // If only one reward, select it automatically
      if (response.data.voucher.rewards.length === 1) {
        setSelectedReward(response.data.voucher.rewards[0]);
      }
      
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid voucher code. Please try again.');
      toast.error(err.response?.data?.message || 'Invalid voucher code.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Select Reward
  const handleSelectReward = (reward) => {
    setSelectedReward(reward);
  };

  const proceedToClaim = () => {
    if (!selectedReward) {
      toast.error('Please select a reward to continue.');
      return;
    }
    setStep(3);
  };

  // Step 3: Submit Claim
  const handleInputChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
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
      toast.success('Reward claimed successfully!');
      navigate('/success', { state: { reference: response.data.claimReference } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit claim.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, label: 'Validate', icon: Ticket },
    { id: 2, label: 'Reward', icon: Package },
    { id: 3, label: 'Details', icon: UserCheck },
  ];

  return (
    <div className="min-height-screen py-12 bg-slate-50">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-12 max-w-xl mx-auto">
          {steps.map((s, idx) => (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  step >= s.id ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-400'
                }`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <span className={`mt-2 text-sm font-medium ${
                  step >= s.id ? 'text-brand-700' : 'text-slate-400'
                }`}>{s.label}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-4 rounded ${
                  step > s.id ? 'bg-brand-600' : 'bg-slate-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step 1: Voucher Entry */}
        {step === 1 && (
          <div className="card max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-center mb-6">Enter Voucher Code</h2>
            <p className="text-slate-500 text-center mb-8">Please enter the unique code found on your Pro Green Life physical ticket.</p>
            
            <form onSubmit={handleValidateVoucher} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Voucher Code</label>
                <input
                  type="text"
                  placeholder="e.g. WELCOME2026"
                  className={`input-field text-center text-xl font-bold tracking-widest uppercase ${error ? 'border-red-500' : ''}`}
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                  disabled={loading}
                />
                {error && (
                  <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}
              </div>
              <button 
                type="submit" 
                className="btn-primary w-full flex items-center justify-center gap-2"
                disabled={loading || !voucherCode}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Validate Code'}
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Reward Selection */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl font-bold text-center mb-4">Choose Your Reward</h2>
            <p className="text-slate-500 text-center mb-12">Select the gift you would like to receive. Your voucher allows one selection.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {voucherData?.rewards.map((reward) => (
                <div 
                  key={reward._id}
                  onClick={() => handleSelectReward(reward)}
                  className={`card cursor-pointer transition-all duration-300 relative border-2 ${
                    selectedReward?._id === reward._id ? 'border-brand-500 bg-brand-50 shadow-md' : 'border-transparent hover:border-brand-200'
                  }`}
                >
                  {selectedReward?._id === reward._id && (
                    <div className="absolute top-4 right-4 bg-brand-500 text-white rounded-full p-1">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  )}
                  <img src={reward.image} alt={reward.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                  <h3 className="font-bold text-lg mb-2">{reward.name}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{reward.description}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center max-w-2xl mx-auto">
              <button onClick={() => setStep(1)} className="btn-secondary">Back</button>
              <button 
                onClick={proceedToClaim} 
                className="btn-primary flex items-center gap-2"
                disabled={!selectedReward}
              >
                Next: Delivery Details <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Claim Form */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="card">
                  <h2 className="text-2xl font-bold mb-6">Delivery Information</h2>
                  <form onSubmit={handleSubmitClaim} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                        <input name="customerName" required className="input-field" onChange={handleInputChange} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
                        <input name="phone" required className="input-field" onChange={handleInputChange} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                      <input name="email" type="email" className="input-field" onChange={handleInputChange} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Detailed Address *</label>
                      <input name="address" required className="input-field" placeholder="House number, street name..." onChange={handleInputChange} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Province / City *</label>
                      <input name="provinceCity" required className="input-field" onChange={handleInputChange} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Notes (Optional)</label>
                      <textarea name="notes" rows="3" className="input-field" onChange={handleInputChange}></textarea>
                    </div>
                    
                    <div className="pt-4 flex justify-between gap-4">
                      <button type="button" onClick={() => setStep(2)} className="btn-secondary">Back</button>
                      <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2" disabled={loading}>
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Redemption'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="card sticky top-24 bg-brand-900 text-white border-none">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Package className="w-5 h-5 text-brand-400" /> Redemption Summary
                  </h3>
                  <div className="space-y-6">
                    <div className="pb-6 border-b border-white/10">
                      <p className="text-brand-300 text-xs font-bold uppercase tracking-wider mb-2">Selected Reward</p>
                      <p className="font-bold text-lg">{selectedReward?.name}</p>
                    </div>
                    <div className="pb-6 border-b border-white/10">
                      <p className="text-brand-300 text-xs font-bold uppercase tracking-wider mb-2">Voucher Code</p>
                      <p className="font-mono text-xl">{voucherData?.code}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm italic">
                        By confirming, you agree to our terms of service regarding gift delivery.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Redeem;
