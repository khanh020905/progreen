import React from 'react';
import AdminLayout from '../components/AdminLayout';
import { Settings, Shield, Bell, Globe, Save } from 'lucide-react';

const AdminSettings = () => {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">System Settings</h1>
          <p className="text-slate-400 font-bold mt-2 text-sm uppercase tracking-widest">Configure platform behavior and security</p>
        </div>

        <div className="bg-white rounded-[3rem] border border-slate-50 shadow-2xl shadow-slate-100/50 overflow-hidden max-w-4xl">
          <div className="p-12 space-y-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">General Settings</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Platform Name</label>
                  <input type="text" className="input-field" defaultValue="Pro Green Life" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Email</label>
                  <input type="email" className="input-field" defaultValue="admin@progreenlife.com" />
                </div>
              </div>
            </div>

            <div className="space-y-8 pt-12 border-t border-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Security</h3>
              </div>
              <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl">
                <div>
                  <p className="font-black text-slate-900 text-sm">Two-Factor Authentication</p>
                  <p className="text-xs text-slate-400 font-bold">Add an extra layer of security to your account</p>
                </div>
                <div className="w-12 h-6 bg-brand-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button className="btn-primary !w-full !bg-brand-950 !rounded-2xl flex items-center justify-center gap-3">
                <Save className="w-5 h-5" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
