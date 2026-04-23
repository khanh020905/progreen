import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white sticky top-0 z-50 h-[72px] flex items-center border-b border-slate-100">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-brand-600 p-1.5 rounded-lg">
            <Leaf className="text-white w-5 h-5" />
          </div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">Pro Green Life</span>
        </Link>

        {/* Center Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className="text-slate-600 hover:text-brand-600 font-semibold text-sm transition-colors">Home</Link>
          <a href="#how-it-works" className="text-slate-600 hover:text-brand-600 font-semibold text-sm transition-colors">How it works</a>
          <Link to="/redeem" className="text-slate-600 hover:text-brand-600 font-semibold text-sm transition-colors">Rewards</Link>
          <a href="#faq" className="text-slate-600 hover:text-brand-600 font-semibold text-sm transition-colors">FAQ</a>
          <a href="#contact" className="text-slate-600 hover:text-brand-600 font-semibold text-sm transition-colors">Contact</a>
        </div>

        {/* CTA Button */}
        <Link to="/redeem" className="px-5 py-2.5 bg-[#0e2114] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors">
          Redeem Voucher
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
