import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-brand-600 p-2 rounded-lg">
            <Leaf className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold text-slate-800 tracking-tight leading-none">Pro Green Life</span>
            <span className="text-[10px] font-script text-brand-600 font-bold">Nâng niu sức khỏe Việt</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Home</Link>
          <Link to="/redeem" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Redeem Voucher</Link>
          <a href="#faq" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">FAQ</a>
          <Link to="/redeem" className="btn-primary py-2 px-5 text-sm">
            Get Rewards
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
