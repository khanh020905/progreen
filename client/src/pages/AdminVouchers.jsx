import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { Plus, Ticket, Search, Check, X, Loader2, Download } from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Voucher Management</h1>
          <p className="text-slate-500 mt-1">Create and manage unique reward codes.</p>
        </div>
        <div className="flex gap-2">
          <button 
            className="btn-secondary flex items-center gap-2"
            onClick={() => toast.success('CSV Import template: code, rewardId, isActive')}
          >
            <Download className="w-4 h-4" /> Import CSV
          </button>
          <button 
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create Voucher
          </button>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Voucher Code</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Rewards</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Redeemed</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400">Loading vouchers...</td>
                </tr>
              ) : vouchers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400">No vouchers created yet.</td>
                </tr>
              ) : vouchers.map((v) => (
                <tr key={v._id}>
                  <td className="px-6 py-4 font-mono font-bold text-slate-900">{v.code}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {v.rewards.map(r => (
                        <span key={r._id} className="text-[10px] bg-brand-50 text-brand-700 px-2 py-0.5 rounded border border-brand-100">
                          {r.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {v.isActive ? (
                      <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-400 text-sm font-medium">
                        <X className="w-3 h-3" /> Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {v.isRedeemed ? (
                      <div className="text-xs text-slate-500">
                        <div className="font-bold text-amber-600">Yes</div>
                        <div>{new Date(v.redeemedAt).toLocaleDateString()}</div>
                      </div>
                    ) : (
                      <span className="text-xs text-green-600 font-bold uppercase tracking-wider">Available</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(v.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold mb-6">Create New Voucher</h2>
            <form onSubmit={handleCreateVoucher} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Voucher Code</label>
                <input 
                  type="text" 
                  className="input-field uppercase font-mono tracking-widest"
                  placeholder="E.G. SUMMER2026"
                  value={newVoucher.code}
                  onChange={(e) => setNewVoucher({...newVoucher, code: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Assign Rewards</label>
                <div className="max-h-48 overflow-y-auto border border-slate-100 rounded-lg p-2 space-y-2">
                  {rewards.map(r => (
                    <div 
                      key={r._id} 
                      onClick={() => toggleReward(r._id)}
                      className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                        newVoucher.rewards.includes(r._id) ? 'bg-brand-50 border-brand-200 border' : 'hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      <span className="text-sm">{r.name}</span>
                      {newVoucher.rewards.includes(r._id) && <Check className="w-4 h-4 text-brand-600" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="isActive"
                  checked={newVoucher.isActive}
                  onChange={(e) => setNewVoucher({...newVoucher, isActive: e.target.checked})}
                />
                <label htmlFor="isActive" className="text-sm font-medium text-slate-700">Mark as active immediately</label>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" className="btn-primary flex-1">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminVouchers;
