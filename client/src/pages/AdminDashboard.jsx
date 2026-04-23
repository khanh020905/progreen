import React from 'react';
import AdminLayout from '../components/AdminLayout';
import { 
  FileText, 
  ArrowDownCircle, 
  Clock, 
  CheckCircle2, 
  Download,
  Eye
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Vouchers', value: '1,250', trend: '+12% this month', icon: FileText, color: 'bg-brand-50 text-brand-600' },
    { label: 'Redeemed', value: '860', trend: '+8% this month', icon: ArrowDownCircle, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Pending Claims', value: '126', trend: '+5% this month', icon: Clock, color: 'bg-amber-50 text-amber-500' },
    { label: 'Completed', value: '734', trend: '+15% this month', icon: CheckCircle2, color: 'bg-brand-50 text-brand-600' },
  ];

  const recentClaims = [
    { id: 1, ref: 'PGL-2024-000123', code: 'PGL-AB12-CD34-EF56', customer: 'Nguyen Van A', reward: 'Eco Bottle', status: 'Pending', date: '20/05/2024 10:30' },
    { id: 2, ref: 'PGL-2024-000122', code: 'PGL-ZX99-YU78-TR51', customer: 'Tran Thi B', reward: 'Green Tote Bag', status: 'Shipping', date: '20/05/2024 09:15' },
    { id: 3, ref: 'PGL-2024-000121', code: 'PGL-QW12-AS34-ZX56', customer: 'Le Van C', reward: 'Plant Gift Set', status: 'Completed', date: '19/05/2024 16:45' },
    { id: 4, ref: 'PGL-2024-000120', code: 'PGL-MN78-SV60-PL12', customer: 'Pham Thi D', reward: 'Eco Bottle', status: 'Pending', date: '18/05/2024 14:20' },
    { id: 5, ref: 'PGL-2024-000119', code: 'PGL-HJ34-KL56-ZX78', customer: 'Hoang Van E', reward: 'Green Tote Bag', status: 'Pending', date: '18/05/2024 11:05' },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-50 text-emerald-600';
      case 'Shipping': return 'bg-blue-50 text-blue-600';
      case 'Pending': return 'bg-amber-50 text-amber-600';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Stats Cards - 4 in a row like reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-slate-400 font-semibold mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-brand-600 font-semibold">{stat.trend}</p>
            </div>
          ))}
        </div>

        {/* Recent Claims Table */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">Recent Claims</h3>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2 border border-slate-200">
                <Download className="w-3.5 h-3.5" /> Export CSV
              </button>
              <button className="px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors flex items-center gap-2">
                View All
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500">#</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500">Reference</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500">Voucher Code</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500">Reward</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentClaims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-400">{claim.id}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-700">{claim.ref}</td>
                    <td className="px-6 py-4 text-sm font-mono text-slate-500">{claim.code}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">{claim.customer}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{claim.reward}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(claim.status)}`}>
                        {claim.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">{claim.date}</td>
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
