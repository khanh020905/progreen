import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  return (
    <nav className="bg-white sticky top-0 z-50 h-[80px] flex items-center border-b border-slate-100 backdrop-blur-md bg-white/90">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Official Logo */}
        <Link to="/">
          <Logo className="scale-90 origin-left" />
        </Link>

        {/* Center Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className="text-slate-600 hover:text-brand-600 font-semibold text-sm transition-colors">Trang chủ</Link>
          <a href="#how-it-works" className="text-slate-600 hover:text-brand-600 font-semibold text-sm transition-colors">Cách thức hoạt động</a>
          <Link to="/redeem" className="text-slate-600 hover:text-brand-600 font-semibold text-sm transition-colors">Phần thưởng</Link>
          <a href="#faq" className="text-slate-600 hover:text-brand-600 font-semibold text-sm transition-colors">Hỏi đáp</a>
          <a href="#contact" className="text-slate-600 hover:text-brand-600 font-semibold text-sm transition-colors">Liên hệ</a>
        </div>

        {/* CTA Button */}
        <Link to="/redeem" className="px-5 py-2.5 bg-[#0e2114] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors whitespace-nowrap">
          Đổi phiếu giảm giá
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
