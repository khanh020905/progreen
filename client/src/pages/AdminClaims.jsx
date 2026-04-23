import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { 
  Search, 
  Download, 
  ChevronRight,
  Calendar,
  User,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  FileText
} from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminClaims = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/claims`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClaims(response.data);
    } catch (err) {
      toast.error('Lỗi khi tải danh sách');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.patch(`${API_URL}/claims/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Đã cập nhật trạng thái');
      fetchClaims();
    } catch (err) {
      toast.error('Cập nhật thất bại');
    }
  };

  const exportToCSV = () => {
    if (claims.length === 0) return;
    const headers = ['Reference', 'Voucher', 'Customer', 'Phone', 'Reward', 'Status', 'Date'];
    const rows = claims.map(c => [c.claimReference, c.voucherCode, c.customerName, c.phone, c.rewardName, c.status, new Date(c.createdAt).toLocaleDateString()]);
    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `pgl-claims-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const filteredClaims = claims.filter(c => {
    const matchesSearch = (c.customerName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
                         (c.voucherCode?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (c.phone || '').includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Shipping': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Confirmed': return 'bg-brand-50 text-brand-600 border-brand-100';
      case 'Rejected': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Claim Management</h1>
            <p className="text-slate-400 font-bold mt-2 text-sm uppercase tracking-widest">Process and track reward redemptions</p>
          </div>
          <button onClick={exportToCSV} className="btn-primary !rounded-xl !py-3 !px-6 !text-xs !bg-brand-950">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* Stats Summary for Claims */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-50 shadow-xl shadow-slate-100/50 flex items-center gap-6">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending Approval</p>
              <p className="text-2xl font-black text-slate-900">{claims.filter(c => c.status === 'Pending').length}</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-50 shadow-xl shadow-slate-100/50 flex items-center gap-6">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <Truck className="w-7 h-7" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">In Transit</p>
              <p className="text-2xl font-black text-slate-900">{claims.filter(c => c.status === 'Shipping').length}</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-50 shadow-xl shadow-slate-100/50 flex items-center gap-6">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Completed</p>
              <p className="text-2xl font-black text-slate-900">{claims.filter(c => c.status === 'Completed').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-2xl shadow-slate-100/50 overflow-hidden">
          <div className="p-8 md:p-10 flex flex-col md:flex-row gap-6 border-b border-slate-50">
            <div className="flex-1 relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by customer name, voucher code or phone..." 
                className="w-full pl-14 pr-6 py-4 bg-slate-50 rounded-2xl outline-none focus:bg-white focus:ring-1 focus:ring-brand-500 transition-all font-bold text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64 relative">
              <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
              <select 
                className="w-full pl-14 pr-6 py-4 bg-slate-50 rounded-2xl outline-none appearance-none cursor-pointer font-bold text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Shipping">Shipping</option>
                <option value="Completed">Completed</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Reference</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Voucher</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Reward</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr><td colSpan="7" className="px-10 py-20 text-center text-slate-400 font-bold">Loading records...</td></tr>
                ) : filteredClaims.length === 0 ? (
                  <tr><td colSpan="7" className="px-10 py-20 text-center text-slate-400 font-bold">No claims found.</td></tr>
                ) : filteredClaims.map((claim) => (
                  <tr key={claim._id} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-10 py-6">
                      <span className="text-[11px] font-black text-brand-700 bg-brand-50 px-3 py-1.5 rounded-lg border border-brand-100">
                        {claim.claimReference}
                      </span>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">{claim.customerName}</p>
                          <p className="text-[10px] font-bold text-slate-400">{claim.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-xs font-mono font-bold text-slate-500">{claim.voucherCode}</td>
                    <td className="px-10 py-6 text-sm font-bold text-slate-700">{claim.rewardName}</td>
                    <td className="px-10 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(claim.status)}`}>
                        {claim.status}
                      </span>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(claim.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <div className="relative inline-block">
                        <select 
                          className="text-xs font-black bg-white border border-slate-100 rounded-xl p-2.5 pr-8 outline-none hover:border-brand-500 transition-colors appearance-none cursor-pointer shadow-sm"
                          value={claim.status}
                          onChange={(e) => handleUpdateStatus(claim._id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Shipping">Shipping</option>
                          <option value="Completed">Completed</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <ChevronRight className="w-3.5 h-3.5 text-slate-300 rotate-90" />
                        </div>
                      </div>
                    </td>
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

export default AdminClaims;
