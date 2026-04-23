import React from 'react';
import { Leaf, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="text-brand-500 w-8 h-8" />
              <span className="text-2xl font-bold text-white tracking-tight">Pro Green Life</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Empowering individuals and companies to embrace sustainable living through eco-friendly rewards and innovative solutions.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="/" className="hover:text-brand-400 transition-colors">Home</a></li>
              <li><a href="/redeem" className="hover:text-brand-400 transition-colors">Redeem Voucher</a></li>
              <li><a href="/admin/login" className="hover:text-brand-400 transition-colors">Admin Login</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Campaign Info</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-brand-400 transition-colors">How it works</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Reward list</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-500" />
                <span>+1 (800) GREEN-LIFE</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-500" />
                <span>support@progreenlife.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-brand-500" />
                <span>123 Eco Way, Sustainability Park</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © 2026 Pro Green Life. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
