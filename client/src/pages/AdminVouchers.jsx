import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { 
  Plus, 
  Ticket, 
  Search, 
  Check, 
  X, 
  Loader2, 
  Download, 
  Eye, 
  FilePlus,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api');

const AdminVouchers = () => {
  const [vouchers, setVouchers] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newVoucher, setNewVoucher] = useState({
    code: '',
    rewards: [],
    isActive: true
  });

  useEffect(() => {
    fetchVouchers();
    fetchRewards();
  }, []);

  const fetchVouchers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/vouchers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVouchers(response.data);
    } catch (err) {
      toast.error('Failed to fetch vouchers');
    } finally {
      setLoading(false);
    }
  };

  const fetchRewards = async () => {
    try {
      const response = await axios.get(`${API_URL}/rewards`);
      setRewards(response.data);
    } catch (err) {
      console.error('Failed to fetch rewards');
    }
  };

  const handleCreateVoucher = async (e) => {
    e.preventDefault();
    if (newVoucher.rewards.length === 0) {
      toast.error('Please select at least one reward');
      return;
    }
    
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(`${API_URL}/vouchers`, newVoucher, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Voucher created successfully');
      setShowModal(false);
      setNewVoucher({ code: '', rewards: [], isActive: true });
      fetchVouchers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create voucher');
    }
  };

  const toggleReward = (rewardId) => {
    const current = [...newVoucher.rewards];
    const index = current.indexOf(rewardId);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(rewardId);
    }
    setNewVoucher({ ...newVoucher, rewards: current });
  };

  return (
    <AdminLayout>
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Voucher Codes</h1>
            <p className="text-slate-400 font-bold mt-2 text-sm uppercase tracking-widest">Generate and manage unique campaign codes</p>
          </div>
          <div className="flex gap-4">
            <button className="btn-secondary !py-3 !px-6 !text-xs !rounded-xl">
              <Download className="w-4 h-4" /> Import CSV
            </button>
            <button 
              onClick={() => setShowModal(true)}
              className="btn-primary !py-3 !px-6 !text-xs !rounded-xl !bg-brand-950"
            >
              <FilePlus className="w-4 h-4" /> Create Voucher
            </button>
          </div>
        </div>

        {/* Voucher Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-50 shadow-xl shadow-slate-100/50 flex items-center justify-between overflow-hidden relative group">
            <div className="space-y-4 relative z-10">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Vouchers</p>
              <h3 className="text-3xl font-black text-slate-900">{vouchers.filter(v => v.isActive && !v.isRedeemed).length}</h3>
              <p className="text-xs text-brand-600 font-bold flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> Ready for redemption
              </p>
            </div>
            <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-[1.5rem] flex items-center justify-center relative z-10">
              <Ticket className="w-8 h-8" />
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50/50 blur-3xl -z-0" />
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-50 shadow-xl shadow-slate-100/50 flex items-center justify-between overflow-hidden relative group">
            <div className="space-y-4 relative z-10">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Redeemed Today</p>
              <h3 className="text-3xl font-black text-slate-900">{vouchers.filter(v => v.isRedeemed).length}</h3>
              <p className="text-xs text-slate-400 font-bold flex items-center gap-1">
                 Total success claims
              </p>
            </div>
            <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-[1.5rem] flex items-center justify-center relative z-10">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100/50 blur-3xl -z-0" />
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-2xl shadow-slate-100/50 overflow-hidden">
          <div className="p-8 md:p-10 flex flex-col md:flex-row gap-6 border-b border-slate-50 bg-slate-50/30">
            <div className="flex-1 relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search vouchers by code..." 
                className="w-full pl-14 pr-6 py-4 bg-white rounded-2xl outline-none focus:ring-1 focus:ring-brand-500 transition-all font-bold text-sm shadow-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Voucher Code</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Rewards</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Redeemed</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr><td colSpan="5" className="px-10 py-20 text-center text-slate-400 font-bold">Loading...</td></tr>
                ) : vouchers.length === 0 ? (
                  <tr><td colSpan="5" className="px-10 py-20 text-center text-slate-400 font-bold">No vouchers yet.</td></tr>
                ) : vouchers.map((v) => (
                  <tr key={v._id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-10 py-6">
                      <span className="text-xs font-black text-slate-900 bg-white border border-slate-100 px-3 py-1.5 rounded-lg font-mono tracking-widest shadow-sm">
                        {v.code}
                      </span>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex flex-wrap gap-1">
                        {v.rewards.map(r => (
                          <span key={r._id} className="text-[10px] bg-brand-50 text-brand-700 px-2.5 py-1 rounded-md font-bold border border-brand-100">
                            {r.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      {v.isActive ? (
                        <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-black uppercase tracking-widest">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-slate-300 text-xs font-black uppercase tracking-widest">
                          <XCircle className="w-3.5 h-3.5" /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-10 py-6">
                      {v.isRedeemed ? (
                        <div className="space-y-1">
                          <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Redeemed</p>
                          <p className="text-[10px] text-slate-400 font-bold">{new Date(v.redeemedAt).toLocaleDateString()}</p>
                        </div>
                      ) : (
                        <span className="text-[10px] text-brand-600 font-black uppercase tracking-widest bg-brand-50 px-2 py-0.5 rounded">Available</span>
                      )}
                    </td>
                    <td className="px-10 py-6 text-xs font-bold text-slate-400">
                      {new Date(v.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modern Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-brand-950/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] shadow-2xl max-w-lg w-full p-12 relative overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Create Vouchers</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-10">New campaign reward code</p>
              
              <form onSubmit={handleCreateVoucher} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Voucher Code</label>
                  <input 
                    type="text" 
                    className="input-field uppercase font-mono tracking-widest"
                    placeholder="PGL-XXXX-XXXX"
                    value={newVoucher.code}
                    onChange={(e) => setNewVoucher({...newVoucher, code: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Assign Rewards</label>
                  <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {rewards.map(r => (
                      <div 
                        key={r._id} 
                        onClick={() => toggleReward(r._id)}
                        className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all ${
                          newVoucher.rewards.includes(r._id) ? 'bg-brand-50 border-brand-200 border-2' : 'bg-slate-50 border-2 border-transparent hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-sm font-bold text-slate-700">{r.name}</span>
                        {newVoucher.rewards.includes(r._id) && <Check className="w-4 h-4 text-brand-600" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl">
                  <input 
                    type="checkbox" 
                    id="isActive"
                    className="w-5 h-5 rounded-lg border-slate-200 text-brand-600 focus:ring-brand-500"
                    checked={newVoucher.isActive}
                    onChange={(e) => setNewVoucher({...newVoucher, isActive: e.target.checked})}
                  />
                  <label htmlFor="isActive" className="text-xs font-black text-slate-700 uppercase tracking-widest">Active immediately</label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowModal(false)} className="btn-secondary !flex-1">Cancel</button>
                  <button type="submit" className="btn-primary !flex-1 !bg-brand-950">Generate</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminVouchers;
