import React from 'react';
import AdminLayout from '../components/AdminLayout';
import { Users, UserPlus, Search, Filter, MoreVertical } from 'lucide-react';

const AdminUsers = () => {
  const users = [
    { id: 1, name: 'Admin User', email: 'admin@progreenlife.com', role: 'Administrator', status: 'Active' },
    { id: 2, name: 'Support Team', email: 'support@progreenlife.com', role: 'Moderator', status: 'Active' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">System Users</h1>
            <p className="text-slate-400 font-bold mt-2 text-sm uppercase tracking-widest">Manage administrative access</p>
          </div>
          <button className="btn-primary !py-3 !px-6 !text-xs !rounded-xl !bg-brand-950">
            <UserPlus className="w-4 h-4" /> Add User
          </button>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-2xl shadow-slate-100/50 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
              <input type="text" placeholder="Search users..." className="w-full pl-14 pr-6 py-4 bg-slate-50 rounded-2xl outline-none font-bold text-sm" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 font-black text-xs uppercase">{user.name.charAt(0)}</div>
                        <span className="text-sm font-black text-slate-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-sm text-slate-500 font-bold">{user.email}</td>
                    <td className="px-10 py-6">
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-3 py-1 rounded-lg font-black uppercase tracking-widest">{user.role}</span>
                    </td>
                    <td className="px-10 py-6">
                      <span className="flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> {user.status}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <button className="text-slate-300 hover:text-slate-600 transition-colors"><MoreVertical className="w-5 h-5" /></button>
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

export default AdminUsers;
