'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const navLinks = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Cách thức hoạt động', href: '#how-it-works' },
    { name: 'Phần thưởng', href: '/redeem' },
    { name: 'Hỏi đáp', href: '#faq' },
    { name: 'Liên hệ', href: '#contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'h-[70px] lg:h-[80px] bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-[0_8px_32px_rgba(45,90,39,0.05)]' 
          : 'h-[80px] lg:h-[100px] bg-transparent border-b border-transparent'
      }`}>
        <div className="max-w-[1440px] mx-auto px-5 lg:px-10 h-full flex items-center justify-between gap-4">
          {/* Left: Official Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Logo className={`transition-all duration-500 ${isScrolled ? 'h-11 lg:h-10' : 'h-14 lg:h-12'} origin-left`} />
            </Link>
          </div>

          {/* Middle: Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className="text-[#0e2114] hover:text-[#3a6934] font-bold text-[15px] transition-colors whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right: CTA & Mobile Toggle */}
          <div className="flex items-center gap-3 lg:gap-0">
            <Link 
              href="/redeem" 
              className={`hidden sm:flex px-5 lg:px-6 py-2.5 bg-[#3a6934] text-white rounded-xl text-xs lg:text-sm font-bold hover:bg-[#2d5a27] transition-all shadow-lg shadow-green-900/10 hover:shadow-green-900/20 active:scale-95 whitespace-nowrap ${
                isScrolled ? 'scale-95' : 'scale-100'
              }`}
            >
              Đổi phiếu giảm giá
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-[#0e2114] hover:bg-black/5 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${
        isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-white/60 backdrop-blur-md"
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className={`absolute top-0 right-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-500 ease-out border-l border-slate-100 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col p-8 pt-24 gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-bold text-[#0e2114] hover:text-[#3a6934] transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 pt-8 border-t border-slate-100">
              <Link 
                href="/redeem"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center w-full py-4 bg-[#3a6934] text-white rounded-2xl font-bold text-sm shadow-xl shadow-green-900/10"
              >
                Đổi phiếu giảm giá
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
