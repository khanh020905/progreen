import React from 'react';
import { Globe } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-[#052c16] text-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-6">
            <Logo inverted={true} className="scale-110 origin-left" />
            <p className="text-slate-400 font-bold leading-relaxed text-sm">
              Creating value for you and <br /> a better tomorrow.
            </p>
          </div>
          <div>
            <h5 className="font-black mb-8 text-white uppercase tracking-widest text-xs">Company</h5>
            <ul className="space-y-4 text-slate-400 text-sm font-bold">
              <li><a href="#" className="hover:text-brand-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-black mb-8 text-white uppercase tracking-widest text-xs">Support</h5>
            <ul className="space-y-4 text-slate-400 text-sm font-bold">
              <li><a href="#" className="hover:text-brand-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-black mb-8 text-white uppercase tracking-widest text-xs">Follow Us</h5>
            <div className="flex gap-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-500 hover:border-brand-500 transition-all cursor-pointer group">
                  <Globe className="w-4 h-4 text-slate-500 group-hover:text-white" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 text-center text-slate-600 text-xs font-bold">
          © 2026 Pro Green Life. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
