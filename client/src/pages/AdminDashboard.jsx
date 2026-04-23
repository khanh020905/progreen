import React from 'react';
import AdminLayout from '../components/AdminLayout';
import { 
  FileText, 
  ArrowDownCircle, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  Download,
  Eye
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const stats = [
    { 
      label: 'Total Vouchers', 
      value: '1,250', 
      trend: '+12%', 
      icon: FileText, 
      color: 'text-brand-600 bg-brand-50',
      trendColor: 'text-brand-600'
    },
    { 
      label: 'Redeemed', 
      value: '860', 
      trend: '+8%', 
      icon: ArrowDownCircle, 
      color: 'text-emerald-600 bg-emerald-50',
      trendColor: 'text-emerald-600'
    },
    { 
      label: 'Pending Claims', 
      value: '126', 
      trend: '+5%', 
      icon: Clock, 
      color: 'text-amber-500 bg-amber-50',
      trendColor: 'text-amber-500'
    },
    { 
      label: 'Completed', 
      value: '734', 
      trend: '+15%', 
      icon: CheckCircle2, 
      color: 'text-brand-600 bg-brand-50',
      trendColor: 'text-brand-600'
    }
  ];

  const recentClaims = [
    { id: 1, ref: 'PGL-2026-000123', code: 'PGL-AB12-CD34-EF56', customer: 'Nguyen Van A', reward: 'Eco Bottle', status: 'Pending', date: '20/05/2026 10:30' },
    { id: 2, ref: 'PGL-2026-000122', code: 'PGL-ZX99-YU78-TR51', customer: 'Tran Thi B', reward: 'Green Tote Bag', status: 'Shipping', date: '20/05/2026 09:15' },
    { id: 3, ref: 'PGL-2026-000121', code: 'PGL-QW12-AS34-ZX56', customer: 'Le Van C', reward: 'Plant Gift Set', status: 'Completed', date: '19/05/2026 16:45' },
    { id: 4, ref: 'PGL-2026-000120', code: 'PGL-MN78-SV60-PL12', customer: 'Pham Thi D', reward: 'Eco Bottle', status: 'Pending', date: '18/05/2026 14:20' },
    { id: 5, ref: 'PGL-2026-000119', code: 'PGL-HJ34-KL56-ZX78', customer: 'Hoang Van E', reward: 'Green Tote Bag', status: 'Pending', date: '18/05/2026 11:05' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-12">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-slate-400 font-bold mt-2 text-sm uppercase tracking-widest">Campaign Overview & Real-time Stats</p>
          </div>
          <div className="flex gap-4">
            <button className="btn-secondary !py-2.5 !px-5 !text-xs !rounded-xl">
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button className="btn-primary !py-2.5 !px-5 !text-xs !rounded-xl !bg-brand-950">
              View All
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-xl shadow-slate-100/40 relative overflow-hidden group"
            >
              <div className="flex justify-between items-start relative z-10">
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black ${stat.trendColor} bg-white px-2 py-0.5 rounded-lg border border-slate-50 shadow-sm`}>
                      {stat.trend}
                    </span>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">this month</span>
                  </div>
                </div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ${stat.color}`}>
                  <stat.icon className="w-7 h-7" />
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-slate-50/50 rounded-full blur-3xl" />
            </motion.div>
          ))}
        </div>

        {/* Recent Activity Table */}
        <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-2xl shadow-slate-100/50 overflow-hidden">
          <div className="p-10 flex justify-between items-center border-b border-slate-50">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Recent Claims</h3>
            <button className="text-xs font-black text-brand-600 uppercase tracking-widest hover:text-brand-800 transition-colors">View All Activities</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">#</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Reference</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Voucher Code</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Reward</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentClaims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-10 py-6 text-xs font-bold text-slate-400">{claim.id}</td>
                    <td className="px-10 py-6">
                      <span className="text-xs font-black text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        {claim.ref}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-xs font-mono font-bold text-slate-500">{claim.code}</td>
                    <td className="px-10 py-6 text-sm font-black text-slate-900">{claim.customer}</td>
                    <td className="px-10 py-6 text-sm font-bold text-slate-600">{claim.reward}</td>
                    <td className="px-10 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        claim.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        claim.status === 'Shipping' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {claim.status}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-xs font-bold text-slate-400">{claim.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
