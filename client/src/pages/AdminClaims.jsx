import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { 
  Search, 
  Download, 
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Calendar,
  User,
  Filter
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
    const matchesSearch = c.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         c.voucherCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Shipping': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Confirmed': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'Rejected': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Danh sách Claim</h1>
          <p className="text-slate-400 font-medium mt-2">Quản lý và cập nhật trạng thái giao nhận quà tặng.</p>
        </div>
        <button onClick={exportToCSV} className="btn-primary !rounded-2xl shadow-xl shadow-brand-600/20">
          <Download className="w-5 h-5" /> Xuất file CSV
        </button>
      </div>

      <div className="glass-card p-8 mb-10">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Tìm kiếm theo tên, voucher hoặc số điện thoại..." 
              className="input-field pl-14"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64 relative">
            <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <select 
              className="input-field pl-14 appearance-none cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">Tất cả trạng thái</option>
              <option value="Pending">Chờ xử lý</option>
              <option value="Confirmed">Đã xác nhận</option>
              <option value="Shipping">Đang giao</option>
              <option value="Completed">Hoàn thành</option>
              <option value="Rejected">Đã từ chối</option>
            </select>
          </div>
        </div>
      </div>

      <div className="glass-card overflow-hidden !p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Mã Reference</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Khách hàng</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Mã Voucher</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Phần quà</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Trạng thái</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Ngày tạo</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan="7" className="px-8 py-20 text-center text-slate-400 font-bold">Đang tải dữ liệu...</td></tr>
              ) : filteredClaims.length === 0 ? (
                <tr><td colSpan="7" className="px-8 py-20 text-center text-slate-400 font-bold">Không tìm thấy yêu cầu nào.</td></tr>
              ) : filteredClaims.map((claim) => (
                <tr key={claim._id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-8 py-6">
                    <span className="font-mono text-xs font-black text-brand-600 bg-brand-50 px-3 py-1 rounded-lg border border-brand-100">
                      {claim.claimReference}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{claim.customerName}</p>
                        <p className="text-xs text-slate-400">{claim.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-xs font-mono font-bold text-slate-500">{claim.voucherCode}</td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-700">{claim.rewardName}</td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(claim.status)}`}>
                      {claim.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(claim.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="relative inline-block">
                      <select 
                        className="text-xs font-bold bg-white border border-slate-200 rounded-xl p-2.5 pr-8 outline-none focus:ring-2 focus:ring-brand-500/20 appearance-none cursor-pointer hover:border-brand-500 transition-colors"
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
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 rotate-90" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminClaims;
