import React, { useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Ticket, 
  Gift, 
  LogOut, 
  ChevronRight,
  User,
  Users,
  FileText,
  Settings
} from 'lucide-react';
import Logo from './Logo';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Claims', icon: ClipboardList, path: '/admin/claims' },
    { name: 'Vouchers', icon: Ticket, path: '/admin/vouchers' },
    { name: 'Rewards', icon: Gift, path: '/admin/rewards' },
    { name: 'Users', icon: Users, path: '/admin/users' },
    { name: 'Reports', icon: FileText, path: '/admin/reports' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  if (!token) return null;

  return (
    <div className="flex min-h-screen bg-[#f8faf9]">
      {/* Sidebar - matches reference: dark green, leaf icon + "Pro Green Life" */}
      <aside className="w-64 bg-[#0e2114] text-white flex flex-col fixed h-full z-30">
        <div className="px-6 pt-8 pb-10 flex items-center gap-3 border-b border-white/5 mb-4">
          <Logo inverted={true} className="scale-110 origin-left" />
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold ${
                location.pathname === item.path 
                  ? 'bg-brand-600 text-white' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="px-4 pb-6">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all text-sm font-semibold"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64">
        <header className="h-20 bg-white border-b border-slate-100 sticky top-0 z-20 px-10 flex items-center justify-between">
          <h2 className="font-bold text-2xl text-slate-900">
            {menuItems.find(m => m.path === location.pathname)?.name || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                <User className="w-5 h-5 text-slate-500" />
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">Admin</p>
                <p className="text-[10px] text-slate-400">Administrator</p>
              </div>
            </div>
          </div>
        </header>
        <div className="p-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
