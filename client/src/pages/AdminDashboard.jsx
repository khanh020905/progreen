import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { 
  Users, 
  Ticket, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  ArrowUpRight
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
        toast.error('Failed to fetch dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Vouchers', value: stats.totalVouchers, icon: Ticket, color: 'bg-blue-500', trend: '+12%' },
    { label: 'Redeemed', value: stats.redeemedVouchers, icon: CheckCircle2, color: 'bg-green-500', trend: '+5%' },
    { label: 'Pending Claims', value: stats.pendingClaims, icon: Clock, color: 'bg-amber-500', trend: '-2%' },
    { label: 'Completed', value: stats.completedClaims, icon: TrendingUp, color: 'bg-brand-600', trend: '+8%' },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Monitor your campaign performance and claim statuses.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((stat) => (
          <div key={stat.label} className="card relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-5 -mr-8 -mt-8 rounded-full transition-transform group-hover:scale-110`} />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
              </div>
              <div className={`${stat.color} text-white p-3 rounded-xl`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                stat.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {stat.trend}
              </span>
              <span className="text-xs text-slate-400">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Recent Campaign Activity</h3>
            <button className="text-brand-600 text-sm font-bold flex items-center gap-1">
              View All <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-slate-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">New claim submitted</p>
                  <p className="text-xs text-slate-500">Customer #82{i} claimed Organic Garden Bundle</p>
                </div>
                <span className="text-xs text-slate-400">2h ago</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold mb-6">Campaign Health</h3>
          <div className="space-y-6 pt-2">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">Voucher Redemption Rate</span>
                <span className="text-sm font-bold text-slate-900">
                  {stats.totalVouchers > 0 ? Math.round((stats.redeemedVouchers / stats.totalVouchers) * 100) : 0}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-500" 
                  style={{ width: `${stats.totalVouchers > 0 ? (stats.redeemedVouchers / stats.totalVouchers) * 100 : 0}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">Claim Completion Rate</span>
                <span className="text-sm font-bold text-slate-900">
                  {stats.redeemedVouchers > 0 ? Math.round((stats.completedClaims / stats.redeemedVouchers) * 100) : 0}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500" 
                  style={{ width: `${stats.redeemedVouchers > 0 ? (stats.completedClaims / stats.redeemedVouchers) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
