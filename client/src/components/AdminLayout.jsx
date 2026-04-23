import React, { useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Ticket, 
  Gift, 
  LogOut, 
  Leaf,
  ChevronRight,
  User
} from 'lucide-react';

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
    { name: 'Danh sách Claim', icon: ClipboardList, path: '/admin/claims' },
    { name: 'Quản lý Voucher', icon: Ticket, path: '/admin/vouchers' },
    { name: 'Quản lý Quà tặng', icon: Gift, path: '/admin/rewards' },
  ];

  if (!token) return null;

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Modern Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col fixed h-full z-30 shadow-sm">
        <div className="p-8 flex items-center gap-3 mb-6">
          <div className="bg-brand-600 p-2 rounded-xl shadow-lg shadow-brand-600/20">
            <Leaf className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tight">PGL Portal</span>
        </div>

        <nav className="flex-1 px-6 space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 ml-2">Menu chính</p>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${
                location.pathname === item.path 
                  ? 'bg-brand-600 text-white shadow-xl shadow-brand-600/20' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-brand-600'
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon className={`w-5 h-5 ${location.pathname === item.path ? 'text-white' : 'text-slate-400 group-hover:text-brand-600'}`} />
                <span className="font-bold text-sm">{item.name}</span>
              </div>
              {location.pathname === item.path && <ChevronRight className="w-4 h-4" />}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-50">
          <div className="bg-slate-50 rounded-2xl p-4 mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100">
              <User className="w-5 h-5 text-slate-400" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-900 truncate">Quản trị viên</p>
              <p className="text-[10px] text-slate-400 truncate">admin@progreenlife.com</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-4 rounded-2xl text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all duration-300 font-bold text-sm"
          >
            <LogOut className="w-5 h-5" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72">
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-50 sticky top-0 z-20 px-10 flex items-center justify-between">
          <h2 className="font-extrabold text-slate-400 text-sm uppercase tracking-widest">
            Hệ thống quản lý / <span className="text-slate-900">{menuItems.find(m => m.path === location.pathname)?.name || 'Trang chủ'}</span>
          </h2>
          <div className="flex items-center gap-4">
            <div className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
              Hệ thống ổn định
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
