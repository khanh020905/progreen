import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 h-24 flex items-center">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="bg-brand-600 p-2.5 rounded-2xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-brand-600/20">
            <Leaf className="text-white w-7 h-7" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-900 tracking-tighter leading-none">Pro Green Life</span>
            <span className="text-[11px] font-script text-brand-600 font-bold tracking-wide mt-1">Nâng niu sức khỏe Việt</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <Link to="/" className="text-slate-500 hover:text-brand-600 font-bold text-sm transition-all">Trang Chủ</Link>
          <Link to="/redeem" className="text-slate-500 hover:text-brand-600 font-bold text-sm transition-all">Đổi Voucher</Link>
          <a href="#how-it-works" className="text-slate-500 hover:text-brand-600 font-bold text-sm transition-all">Hướng Dẫn</a>
          <Link to="/redeem" className="btn-primary !px-6 !py-2.5 !text-xs">
            Nhận Quà Ngay
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
