import React from 'react';
import AdminLayout from '../components/AdminLayout';
import { FileText, Download, BarChart3, TrendingUp, Calendar } from 'lucide-react';

const AdminReports = () => {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Analytics & Reports</h1>
          <p className="text-slate-400 font-bold mt-2 text-sm uppercase tracking-widest">Track campaign performance and metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-xl shadow-slate-100/50 space-y-6">
            <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center">
              <BarChart3 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Monthly Redemption Report</h3>
            <p className="text-slate-400 font-bold text-sm leading-relaxed">Detailed breakdown of all vouchers redeemed, reward popularity, and geographic distribution for the current month.</p>
            <button className="btn-primary !w-full !bg-brand-950 !rounded-2xl">
              <Download className="w-4 h-4" /> Download Report
            </button>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-xl shadow-slate-100/50 space-y-6">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Campaign Performance</h3>
            <p className="text-slate-400 font-bold text-sm leading-relaxed">Analyze conversion rates, response times, and total engagement across all active voucher campaigns.</p>
            <button className="btn-secondary !w-full !rounded-2xl">
              <FileText className="w-4 h-4" /> View Online Dashboard
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReports;
