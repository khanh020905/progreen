import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white sticky top-0 z-50 h-20 flex items-center border-b border-slate-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Leaf className="text-brand-600 w-6 h-6" />
          <span className="text-xl font-extrabold text-slate-900 tracking-tight">Pro Green Life</span>
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          <Link to="/" className="text-slate-600 hover:text-brand-600 font-bold text-xs uppercase tracking-widest">Home</Link>
          <a href="#how-it-works" className="text-slate-600 hover:text-brand-600 font-bold text-xs uppercase tracking-widest">How it works</a>
          <Link to="/redeem" className="text-slate-600 hover:text-brand-600 font-bold text-xs uppercase tracking-widest">Rewards</Link>
          <a href="#faq" className="text-slate-600 hover:text-brand-600 font-bold text-xs uppercase tracking-widest">FAQ</a>
          <a href="#contact" className="text-slate-600 hover:text-brand-600 font-bold text-xs uppercase tracking-widest">Contact</a>
        </div>

        <Link to="/redeem" className="btn-primary !px-6 !py-2.5 !text-xs !bg-[#0e2114] !rounded-lg">
          Redeem Voucher
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
