import React, { useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Ticket, 
  Gift, 
  LogOut, 
  Leaf,
  ChevronRight
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
    { name: 'Claims', icon: ClipboardList, path: '/admin/claims' },
    { name: 'Vouchers', icon: Ticket, path: '/admin/vouchers' },
    { name: 'Rewards', icon: Gift, path: '/admin/rewards' },
  ];

  if (!token) return null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed h-full z-30">
        <div className="p-6 flex items-center gap-2 mb-8">
          <Leaf className="text-brand-500 w-8 h-8" />
          <span className="text-xl font-bold text-white tracking-tight">PGL Admin</span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                location.pathname === item.path 
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/50' 
                  : 'hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </div>
              {location.pathname === item.path && <ChevronRight className="w-4 h-4" />}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
