'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
      isScrolled 
        ? 'h-[80px] bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-[0_8px_32px_rgba(45,90,39,0.05)]' 
        : 'h-[100px] bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-[1440px] mx-auto px-6 xl:px-10 h-full flex items-center">
        {/* Left: Official Logo */}
        <div className="flex-1 flex justify-start">
          <Link href="/">
            <Logo className={`transition-transform duration-500 ${isScrolled ? 'scale-90' : 'scale-100'} origin-left`} />
          </Link>
        </div>

        {/* Middle: Center Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <Link href="/" className="text-[#0e2114] hover:text-[#3a6934] font-bold text-base transition-colors whitespace-nowrap">
            Trang chủ
          </Link>
          <a href="#how-it-works" className="text-[#0e2114] hover:text-[#3a6934] font-bold text-base transition-colors whitespace-nowrap">
            Cách thức hoạt động
          </a>
          <Link href="/redeem" className="text-[#0e2114] hover:text-[#3a6934] font-bold text-base transition-colors whitespace-nowrap">
            Phần thưởng
          </Link>
          <a href="#faq" className="text-[#0e2114] hover:text-[#3a6934] font-bold text-base transition-colors whitespace-nowrap">
            Hỏi đáp
          </a>
          <a href="#contact" className="text-[#0e2114] hover:text-[#3a6934] font-bold text-base transition-colors whitespace-nowrap">
            Liên hệ
          </a>
        </div>

        {/* Right: CTA Button */}
        <div className="flex-1 flex justify-end">
          <Link href="/redeem" className={`px-6 py-2.5 bg-[#3a6934] text-white rounded-xl text-sm font-bold hover:bg-[#2d5a27] transition-all shadow-lg shadow-green-900/10 hover:shadow-green-900/20 active:scale-95 whitespace-nowrap ${
            isScrolled ? 'scale-95' : 'scale-100'
          }`}>
            Đổi phiếu giảm giá
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
