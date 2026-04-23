import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { 
  Users, 
  Ticket, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  ArrowUpRight,
  Activity,
  Zap
} from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalVouchers: 0,
    redeemedVouchers: 0,
    pendingClaims: 0,
    completedClaims: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get(`${API_URL}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(response.data);
      } catch (err) {
        toast.error('Không thể tải dữ liệu thống kê');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Tổng Voucher', value: stats.totalVouchers, icon: Ticket, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    { label: 'Đã Đổi Quà', value: stats.redeemedVouchers, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { label: 'Yêu Cầu Chờ', value: stats.pendingClaims, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
    { label: 'Hoàn Thành', value: stats.completedClaims, icon: Zap, color: 'text-brand-600', bg: 'bg-brand-50', border: 'border-brand-100' },
  ];

  return (
    <AdminLayout>
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Tổng Quan Hệ Thống</h1>
          <p className="text-slate-400 font-medium mt-2">Theo dõi hiệu suất chiến dịch và tiến độ giao quà.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-sm border border-slate-100 text-xs font-bold text-slate-500">
          <Activity className="w-4 h-4 text-brand-500" />
          Dữ liệu thời gian thực
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {statCards.map((stat) => (
          <div key={stat.label} className={`p-8 rounded-[2.5rem] bg-white border ${stat.border} shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 group`}>
            <div className="flex items-start justify-between mb-6">
              <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-emerald-500 text-xs font-black">
                <ArrowUpRight className="w-4 h-4" />
                +12%
              </div>
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{stat.label}</p>
            <h3 className="text-4xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-10">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-slate-900">Hoạt động mới nhất</h3>
            <button className="text-brand-600 text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform">
              Xem tất cả <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-6 p-4 hover:bg-slate-50 rounded-[1.5rem] transition-all duration-300 border border-transparent hover:border-slate-100 group">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-slate-50 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-slate-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">Khách hàng vừa đổi quà thành công</p>
                  <p className="text-xs text-slate-400 mt-1">ID giao dịch: #PGL-923{i} • Bộ quà tặng Xanh</p>
                </div>
                <span className="text-xs font-bold text-slate-300">2 phút trước</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <div className="glass-card p-10 bg-slate-900 text-white border-none shadow-brand-900/20">
            <h3 className="text-lg font-black mb-8 flex items-center gap-3">
              <Activity className="w-5 h-5 text-brand-400" /> Sức khỏe chiến dịch
            </h3>
            <div className="space-y-10">
              <div>
                <div className="flex justify-between mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                  <span>Tỉ lệ đổi Voucher</span>
                  <span className="text-white">
                    {stats.totalVouchers > 0 ? Math.round((stats.redeemedVouchers / stats.totalVouchers) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-500 shadow-[0_0_20px_rgba(40,112,40,0.5)] transition-all duration-1000" 
                    style={{ width: `${stats.totalVouchers > 0 ? (stats.redeemedVouchers / stats.totalVouchers) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                  <span>Tỉ lệ hoàn tất giao quà</span>
                  <span className="text-white">
                    {stats.redeemedVouchers > 0 ? Math.round((stats.completedClaims / stats.redeemedVouchers) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.5)] transition-all duration-1000" 
                    style={{ width: `${stats.redeemedVouchers > 0 ? (stats.completedClaims / stats.redeemedVouchers) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-[10px] text-slate-500 font-bold leading-relaxed">
                * Tỉ lệ dựa trên dữ liệu thực tế được cập nhật vào lúc {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
          
          <div className="premium-card !bg-brand-600 text-white border-none shadow-lg shadow-brand-600/30">
            <h4 className="font-black mb-2 text-lg">Mẹo hệ thống</h4>
            <p className="text-xs text-brand-100 leading-relaxed font-medium">
              Bạn có thể xuất file CSV để quản lý đơn hàng nhanh hơn trong tab "Danh sách Claim".
            </p>
          </div>
        </div>
      </div>
    </AdminDashboard>
  );
};

export default AdminDashboard;
