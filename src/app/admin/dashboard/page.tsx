'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '@/components/layout/AdminLayout';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  Gift, 
  TrendingUp, 
  ArrowUpRight
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalVouchers: 0,
    redeemedVouchers: 0,
    pendingClaims: 0,
    completedClaims: 0
  });
  const [recentClaims, setRecentClaims] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClaim, setSelectedClaim] = useState<any>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const headers = { Authorization: `Bearer ${token}` };
      
      const [statsRes, claimsRes] = await Promise.all([
        axios.get('/api/admin/stats', { headers }),
        axios.get('/api/claims', { headers })
      ]);
      
      setStats(statsRes.data);
      setRecentClaims(claimsRes.data.slice(0, 5));
    } catch (err) {
      console.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Vouchers', value: stats.totalVouchers, icon: FileText, color: 'bg-green-50 text-green-600', trend: '+12%', bg: 'bg-green-50/50' },
    { label: 'Redeemed', value: stats.redeemedVouchers, icon: Gift, color: 'bg-emerald-50 text-emerald-600', trend: '+8%', bg: 'bg-emerald-50/50' },
    { label: 'Pending Claims', value: stats.pendingClaims, icon: Clock, color: 'bg-amber-50 text-amber-500', trend: '-3%', bg: 'bg-amber-50/50' },
    { label: 'Success Ships', value: stats.completedClaims, icon: CheckCircle2, color: 'bg-blue-50 text-blue-600', trend: '+15%', bg: 'bg-blue-50/50' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Executive Overview</h1>
          <p className="text-slate-400 font-bold mt-2 text-sm uppercase tracking-widest">Real-time performance metrics</p>
        </div>

        {/* Premium Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statCards.map((stat) => (
            <div key={stat.label} className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-xl shadow-slate-100/50 relative overflow-hidden group">
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500 ${stat.color}`}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <div className="flex items-end gap-3">
                  <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
                  <span className={`text-xs font-bold mb-1 flex items-center ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {stat.trend} <TrendingUp className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </div>
              <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bg} blur-3xl -z-0 translate-x-10 -translate-y-10`} />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Table Area */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-50 shadow-2xl shadow-slate-100/50 overflow-hidden">
            <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Recent Activity</h3>
              <button className="text-xs font-black text-green-600 uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                View Reports <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Reward</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <tr><td colSpan={4} className="px-10 py-20 text-center text-slate-400 font-bold">Loading activity...</td></tr>
                  ) : recentClaims.length === 0 ? (
                    <tr><td colSpan={4} className="px-10 py-20 text-center text-slate-400 font-bold">No recent claims.</td></tr>
                  ) : recentClaims.map((claim) => (
                    <tr key={claim._id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-10 py-6">
                        <p className="font-black text-slate-900 text-sm">{claim.customerName}</p>
                        <p className="text-[10px] text-slate-400 font-bold">{claim.phone}</p>
                      </td>
                      <td className="px-10 py-6 text-sm text-slate-500 font-bold">{claim.rewardName || 'N/A'}</td>
                      <td className="px-10 py-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          claim.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 
                          claim.status === 'Shipping' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {claim.status}
                        </span>
                      </td>
                      <td className="px-10 py-6">
                        <button 
                          onClick={() => setSelectedClaim(claim)}
                          className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions / Summary */}
          <div className="space-y-8">
            <div className="bg-[#0e2114] rounded-[2.5rem] p-10 text-white relative overflow-hidden">
               <h3 className="text-xl font-black mb-2 relative z-10">Campaign Pulse</h3>
               <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-8 relative z-10">Voucher Engagement</p>
               <div className="space-y-6 relative z-10">
                 <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Redemption Rate</span>
                    <span className="text-xl font-black">{(stats.redeemedVouchers / (stats.totalVouchers || 1) * 100).toFixed(1)}%</span>
                 </div>
                 <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: `${(stats.redeemedVouchers / (stats.totalVouchers || 1) * 100)}%` }}></div>
                 </div>
               </div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-3xl" />
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-xl p-10 space-y-6">
               <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">System Status</h4>
               <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-2xl">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">All services operational</span>
               </div>
            </div>
          </div>
        </div>

        {/* Details Modal */}
        {selectedClaim && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[3rem] w-full max-w-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                <h3 className="text-xl font-black text-slate-900">Claim Details</h3>
                <button onClick={() => setSelectedClaim(null)} className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">×</button>
              </div>
              <div className="p-10 space-y-8 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Customer Name</p>
                    <p className="font-bold text-slate-900">{selectedClaim.customerName}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Phone Number</p>
                    <p className="font-bold text-slate-900">{selectedClaim.phone}</p>
                  </div>
                </div>

                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Voucher Code</p>
                    <p className="font-bold text-green-600">{selectedClaim.voucherCode}</p>
                  </div>
                
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Selected Reward</p>
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <p className="font-black text-emerald-900">{selectedClaim.rewardName}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Shipping Address</p>
                  <p className="font-bold text-slate-900 leading-relaxed bg-slate-50 p-6 rounded-2xl">{selectedClaim.address}, {selectedClaim.provinceCity}</p>
                </div>

                {selectedClaim.notes && (
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Order Notes</p>
                    <p className="text-sm text-slate-500 font-bold italic">"{selectedClaim.notes}"</p>
                  </div>
                )}
                
                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Status</span>
                  </div>
                  <span className="font-black text-slate-900 uppercase text-[10px] tracking-widest">{selectedClaim.status}</span>
                </div>
              </div>
              <div className="p-10 bg-slate-50/50 flex justify-end">
                <button 
                  onClick={() => setSelectedClaim(null)}
                  className="px-8 py-4 bg-[#0e2114] text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all shadow-xl shadow-green-900/20"
                >
                  Close View
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
