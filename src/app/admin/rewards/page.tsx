'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '@/components/layout/AdminLayout';
import Image from 'next/image';
import { 
  Gift, 
  Edit2, 
  Image as ImageIcon, 
  ArrowUpRight,
  Package,
  Star,
  PlusCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminRewardsPage() {
  const [rewards, setRewards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingReward, setEditingReward] = useState<any>(null);
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
      const response = await axios.get('/api/rewards');
      setRewards(response.data);
    } catch (err) {
      toast.error('Failed to fetch rewards');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const headers = { Authorization: `Bearer ${token}` };
      
      if (editingReward) {
        await axios.put(`/api/rewards/${editingReward._id}`, formData, { headers });
        toast.success('Reward updated');
      } else {
        await axios.post('/api/rewards', formData, { headers });
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

  const handleEdit = (reward: any) => {
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
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Reward Catalog</h1>
            <p className="text-slate-400 font-bold mt-2 text-sm uppercase tracking-widest">Manage available gifts and stock items</p>
          </div>
          <button 
            onClick={() => {
              setEditingReward(null);
              setFormData({ name: '', description: '', image: '', isActive: true });
              setShowModal(true);
            }}
            className="px-6 py-3 bg-[#0e2114] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" /> Add Reward
          </button>
        </div>

        {/* Catalog Header Card */}
        <div className="bg-[#0e2114] rounded-[3rem] p-12 text-white relative overflow-hidden">
           <div className="relative z-10 space-y-6 max-w-xl">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-green-400 text-[10px] font-black uppercase tracking-widest">
               <Star className="w-3 h-3 fill-current" /> Premium Items Only
             </div>
             <h2 className="text-3xl font-black tracking-tight">Eco-Friendly Gifts <br /> Hand-picked for Quality</h2>
             <p className="text-slate-400 font-bold text-sm leading-relaxed">
               Each reward in your catalog is verified for sustainability and customer satisfaction. High-quality imagery increases conversion rates by 40%.
             </p>
           </div>
           <div className="absolute top-1/2 right-20 -translate-y-1/2 opacity-20 scale-150">
             <Gift className="w-64 h-64 text-green-500" />
           </div>
           <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-600/10 blur-[100px]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
            <div className="col-span-full py-20 text-center text-slate-400 font-bold">Loading catalog...</div>
          ) : rewards.length === 0 ? (
            <div className="col-span-full py-20 text-center text-slate-400 font-bold">No rewards found. Start adding some!</div>
          ) : rewards.map((reward) => (
            <div 
              key={reward._id} 
              className="bg-white rounded-[2.5rem] border border-slate-50 shadow-xl shadow-slate-100/40 overflow-hidden group hover:-translate-y-2 transition-all duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {reward.image ? (
                  <div className="w-full h-full relative">
                    <Image 
                      src={reward.image} 
                      alt={reward.name} 
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-200">
                    <ImageIcon className="w-16 h-16" />
                  </div>
                )}
                <div className="absolute top-6 right-6">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    reward.isActive ? 'bg-green-500 text-white border-green-400' : 'bg-slate-900 text-white border-slate-700'
                  }`}>
                    {reward.isActive ? 'Active' : 'Draft'}
                  </span>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-black text-xl text-slate-900 tracking-tight">{reward.name}</h3>
                  <div className="bg-slate-50 p-2 rounded-xl text-slate-400 group-hover:text-green-600 transition-colors cursor-pointer" onClick={() => handleEdit(reward)}>
                    <Edit2 className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-sm text-slate-400 font-bold leading-relaxed line-clamp-2">{reward.description}</p>
                
                <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                      <Package className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock ID: {reward._id.substring(reward._id.length - 6)}</span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-200 group-hover:text-green-500 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Reward Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] shadow-2xl max-w-lg w-full p-12 relative animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-8">{editingReward ? 'Edit Item' : 'New Reward'}</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Reward Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-medium text-slate-900" 
                  placeholder="E.g. Eco Friendly Bottle"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                <textarea 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-medium text-slate-900 min-h-[100px]" 
                  placeholder="Details about this reward..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Image URL</label>
                <input 
                  type="url" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-medium text-slate-900" 
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                />
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl">
                <input 
                  type="checkbox" 
                  id="rewardIsActive"
                  className="w-5 h-5 rounded-lg border-slate-200 text-green-600 focus:ring-green-500"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                />
                <label htmlFor="rewardIsActive" className="text-xs font-black text-slate-700 uppercase tracking-widest">Available for selection</label>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-4 bg-[#0e2114] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all">Save Item</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
