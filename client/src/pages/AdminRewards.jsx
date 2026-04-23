import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { Plus, Gift, Edit2, Trash2, Check, X, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminRewards = () => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingReward, setEditingReward] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    isActive: true
  });

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      const response = await axios.get(`${API_URL}/rewards`);
      setRewards(response.data);
    } catch (err) {
      toast.error('Failed to fetch rewards');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      if (editingReward) {
        await axios.patch(`${API_URL}/rewards/${editingReward._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Reward updated');
      } else {
        await axios.post(`${API_URL}/rewards`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Reward created');
      }
      setShowModal(false);
      setEditingReward(null);
      setFormData({ name: '', description: '', image: '', isActive: true });
      fetchRewards();
    } catch (err) {
      toast.error('Failed to save reward');
    }
  };

  const handleEdit = (reward) => {
    setEditingReward(reward);
    setFormData({
      name: reward.name,
      description: reward.description,
      image: reward.image,
      isActive: reward.isActive
    });
    setShowModal(true);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Reward Management</h1>
          <p className="text-slate-500 mt-1">Manage the catalog of available rewards.</p>
        </div>
        <button 
          onClick={() => {
            setEditingReward(null);
            setFormData({ name: '', description: '', image: '', isActive: true });
            setShowModal(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Reward
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-slate-400">Loading rewards...</div>
        ) : rewards.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-400">No rewards found.</div>
        ) : rewards.map((reward) => (
          <div key={reward._id} className="card group hover:shadow-lg transition-all duration-300">
            <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-xl">
              {reward.image ? (
                <img src={reward.image} alt={reward.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                  <ImageIcon className="w-12 h-12" />
                </div>
              )}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  reward.isActive ? 'bg-green-500 text-white' : 'bg-slate-500 text-white'
                }`}>
                  {reward.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-900">{reward.name}</h3>
            <p className="text-sm text-slate-500 mb-6 line-clamp-2">{reward.description}</p>
            
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <button onClick={() => handleEdit(reward)} className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-brand-600 transition-colors">
                <Edit2 className="w-4 h-4" /> Edit
              </button>
              <span className="text-[10px] text-slate-400 font-medium">ID: {reward._id.substring(0, 8)}...</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">{editingReward ? 'Edit Reward' : 'Add New Reward'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Reward Name</label>
                <input 
                  type="text" 
                  className="input-field"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                <textarea 
                  className="input-field"
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Image URL</label>
                <input 
                  type="url" 
                  className="input-field"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                />
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="rewardIsActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                />
                <label htmlFor="rewardIsActive" className="text-sm font-medium text-slate-700">Available for selection</label>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" className="btn-primary flex-1">Save Reward</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminRewards;
