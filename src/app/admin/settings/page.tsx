'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Save, 
  History, 
  Package, 
  TrendingDown, 
  TrendingUp, 
  Clock, 
  X,
  RefreshCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { getRewardImage } from '@/utils/voucher';
import AdminLayout from '@/components/layout/AdminLayout';

interface StockHistory {
  date: string;
  change: number;
  reason: string;
  type: 'manual' | 'automatic';
}

interface Reward {
  _id: string;
  name: string;
  description: string;
  image: string;
  stock: number;
  stockHistory: StockHistory[];
}

export default function ProductSettingsPage() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [stockInputs, setStockInputs] = useState<{[key: string]: number}>({});

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      // Add timestamp to bypass cache
      const response = await axios.get(`/api/rewards?t=${Date.now()}`);
      setRewards(response.data);
      const initialInputs: {[key: string]: number} = {};
      response.data.forEach((r: Reward) => {
        initialInputs[r._id] = r.stock || 0;
      });
      setStockInputs(initialInputs);
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStock = async (id: string) => {
    const quantity = stockInputs[id];
    setUpdatingId(id);
    try {
      await axios.post(`/api/rewards/${id}/stock`, { 
        quantity,
        reason: 'Manual adjustment from Setting Product'
      });
      toast.success('Inventory updated successfully');
      fetchRewards();
    } catch (error) {
      toast.error('Failed to update inventory');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8 pb-20">
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Quản lý kho hàng</h3>
                <p className="text-sm text-slate-400 font-medium">Cập nhật số lượng sản phẩm và theo dõi lịch sử xuất nhập kho.</p>
              </div>
            </div>
            <button 
              onClick={fetchRewards}
              className="p-3 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all"
            >
              <RefreshCcw className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="pb-5 font-bold text-xs uppercase tracking-widest text-slate-400 pl-4">Sản phẩm</th>
                  <th className="pb-5 font-bold text-xs uppercase tracking-widest text-slate-400">Tồn kho hiện tại</th>
                  <th className="pb-5 font-bold text-xs uppercase tracking-widest text-slate-400 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {rewards.map((reward) => (
                  <tr key={reward._id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-6 pl-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                          <img 
                            src={getRewardImage(reward.name, reward.image)} 
                            alt={reward.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{reward.name}</p>
                          <p className="text-xs text-slate-400 truncate max-w-[200px]">{reward.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6">
                      <div className="flex items-center gap-3">
                        <input 
                          type="number"
                          min="0"
                          value={stockInputs[reward._id]}
                          onChange={(e) => setStockInputs({...stockInputs, [reward._id]: parseInt(e.target.value) || 0})}
                          className="w-24 px-4 py-2 bg-slate-50 border-2 border-transparent rounded-xl font-bold text-slate-900 focus:bg-white focus:border-green-500 outline-none transition-all"
                        />
                        {reward.stock <= 5 && (
                          <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter">
                            <AlertCircle className="w-3 h-3" /> Sắp hết
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleUpdateStock(reward._id)}
                          disabled={updatingId === reward._id || stockInputs[reward._id] === reward.stock}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-xs font-bold hover:bg-green-700 disabled:opacity-30 disabled:bg-slate-200 disabled:text-slate-400 transition-all shadow-lg shadow-green-900/10"
                        >
                          {updatingId === reward._id ? (
                            <RefreshCcw className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              Lưu
                            </>
                          )}
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedReward(reward);
                            setShowHistory(true);
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all"
                        >
                          <History className="w-4 h-4" />
                          Lịch sử
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* History Drawer Overlay */}
        <AnimatePresence>
          {showHistory && selectedReward && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowHistory(false)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[110] shadow-2xl overflow-hidden flex flex-col"
              >
                <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-900 border border-slate-100">
                      <History className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Lịch sử nhập kho</h4>
                      <p className="text-xs text-slate-400 font-medium">{selectedReward.name}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowHistory(false)}
                    className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-slate-900"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                  {selectedReward.stockHistory && selectedReward.stockHistory.length > 0 ? (
                    <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                      {[...selectedReward.stockHistory].reverse().map((log, index) => (
                        <div key={index} className="relative pl-10">
                          <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center z-10 shadow-sm ${
                            log.change > 0 ? 'bg-green-500' : 'bg-red-500'
                          }`}>
                            {log.change > 0 ? (
                              <TrendingUp className="w-3 h-3 text-white" />
                            ) : (
                              <TrendingDown className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className={`text-xs font-black uppercase tracking-widest ${
                                log.change > 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {log.change > 0 ? `+${log.change}` : log.change} đơn vị
                              </span>
                              <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(log.date).toLocaleString('vi-VN')}
                              </span>
                            </div>
                            <p className="text-sm font-bold text-slate-700">{log.reason}</p>
                            <div className="flex items-center gap-2">
                              <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                                log.type === 'manual' ? 'bg-slate-100 text-slate-500' : 'bg-green-50 text-green-600'
                              }`}>
                                {log.type === 'manual' ? 'Thủ công' : 'Tự động'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-300 gap-4">
                      <History className="w-16 h-16 opacity-20" />
                      <p className="font-bold text-sm">Chưa có lịch sử thay đổi</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
}
