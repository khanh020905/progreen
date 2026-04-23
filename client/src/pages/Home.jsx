import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Gift, 
  ArrowRight, 
  Star, 
  Heart, 
  Leaf, 
  Ticket, 
  ShieldCheck, 
  RotateCcw, 
  Globe,
  ChevronDown,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import heroGift from '../assets/hero-gift.png';
import plantBanner from '../assets/plant-banner.png';
import faqGift from '../assets/faq-gift.png';

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { q: "What is a Pro Green Life voucher?", a: "A Pro Green Life voucher is a special reward code that allows you to claim eco-friendly gifts from our curated collection." },
    { q: "Where can I find the voucher code?", a: "The 12-character voucher code is printed on the physical card or sent to your registered email address." },
    { q: "Can I use the voucher more than once?", a: "No, each voucher code is unique and can only be redeemed once." },
    { q: "When will I receive my reward?", a: "Rewards are typically processed and shipped within 5-7 business days after your claim is confirmed." }
  ];

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-[#f9fbf9]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-brand-100 text-[10px] font-bold uppercase tracking-wider text-brand-600">
                <Leaf className="w-3 h-3" />
                <span>Special Rewards for you</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1]">
                Redeem Your Voucher <br />
                Get <span className="text-brand-600">Amazing Rewards</span>
              </h1>
              
              <p className="text-lg text-slate-500 max-w-xl font-medium">
                Thank you for being a part of Pro Green Life. <br />
                Enter your voucher code and choose your favorite reward.
              </p>
              
              <div className="flex w-full max-w-md bg-white p-2 rounded-2xl shadow-xl shadow-brand-900/5 border border-slate-100">
                <input 
                  type="text" 
                  placeholder="Enter your voucher code" 
                  className="flex-1 px-6 outline-none text-slate-700 font-bold placeholder:text-slate-300 placeholder:font-medium"
                />
                <Link to="/redeem" className="btn-primary !rounded-xl !py-3 !px-6 text-sm whitespace-nowrap">
                  Redeem Now <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 relative"
            >
              <div className="relative z-10 p-2 bg-white rounded-[2rem] shadow-2xl">
                <img 
                  src={heroGift} 
                  alt="Hero Gift" 
                  className="rounded-[1.8rem] w-full"
                />
              </div>
              {/* Decorative elements matching image style */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-100/50 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-12 border-b border-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">100% Genuine</p>
                <p className="text-xs text-slate-400">Authentic rewards</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Easy to Redeem</p>
                <p className="text-xs text-slate-400">Simple 3-step process</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Secure & Safe</p>
                <p className="text-xs text-slate-400">Your information is protected</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Eco-Friendly</p>
                <p className="text-xs text-slate-400">For a greener tomorrow</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-extrabold text-slate-900">How It Works</h2>
            <p className="text-slate-500 font-medium">Redeem your voucher in 3 simple steps</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-5xl mx-auto">
            <div className="flex-1 text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-white shadow-lg flex items-center justify-center text-brand-600 relative border border-slate-50">
                <Ticket className="w-10 h-10" />
                <span className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand-600 text-white rounded-lg flex items-center justify-center text-xs font-bold">1</span>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900">Enter Voucher Code</h4>
                <p className="text-sm text-slate-400 leading-relaxed">Enter the code from your voucher card.</p>
              </div>
            </div>

            <div className="hidden md:block w-24 border-t-2 border-dashed border-slate-200" />

            <div className="flex-1 text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-white shadow-lg flex items-center justify-center text-brand-600 relative border border-slate-50">
                <Gift className="w-10 h-10" />
                <span className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand-600 text-white rounded-lg flex items-center justify-center text-xs font-bold">2</span>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900">Choose Your Reward</h4>
                <p className="text-sm text-slate-400 leading-relaxed">Select the reward you like from the available options.</p>
              </div>
            </div>

            <div className="hidden md:block w-24 border-t-2 border-dashed border-slate-200" />

            <div className="flex-1 text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-white shadow-lg flex items-center justify-center text-brand-600 relative border border-slate-50">
                <CheckCircle2 className="w-10 h-10" />
                <span className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand-600 text-white rounded-lg flex items-center justify-center text-xs font-bold">3</span>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900">Fill Information</h4>
                <p className="text-sm text-slate-400 leading-relaxed">Provide your details and confirm to receive your reward.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-20 bg-brand-950 relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6 z-10">
            <h2 className="text-4xl font-extrabold text-white leading-tight">
              Together, Let's Build <br /> a Greener Future
            </h2>
            <p className="text-slate-400 max-w-md font-medium">
              At Pro Green Life, we believe in giving back to our community and creating a sustainable world.
            </p>
            <button className="px-6 py-2.5 border border-white/20 text-white rounded-lg text-sm font-bold hover:bg-white/10 transition-colors">
              Learn More About Us
            </button>
          </div>
          <div className="flex-1 z-10">
            <img src={plantBanner} alt="Plant" className="rounded-3xl shadow-2xl max-w-md ml-auto" />
          </div>
          {/* Decorative blur */}
          <div className="absolute top-0 right-0 w-[60%] h-full bg-brand-600/10 blur-[100px]" />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-extrabold text-slate-900 mb-16">Frequently Asked Questions</h2>
          <div className="flex flex-col lg:flex-row gap-20 items-start">
            <div className="flex-1 space-y-4 w-full">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden bg-white">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-bold text-slate-800">{faq.q}</span>
                    {activeFaq === i ? <ChevronDown className="w-5 h-5 text-brand-600 rotate-180" /> : <Plus className="w-5 h-5 text-slate-400" />}
                  </button>
                  {activeFaq === i && (
                    <div className="px-6 pb-6 text-sm text-slate-500 font-medium leading-relaxed animate-in fade-in slide-in-from-top-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex-1">
              <div className="p-4 bg-slate-50 rounded-[2.5rem]">
                <img src={faqGift} alt="FAQ Gift" className="rounded-[2rem] w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0e2114] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Leaf className="text-brand-400 w-6 h-6" />
                <span className="text-xl font-bold tracking-tight">Pro Green Life</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Creating value for you and <br /> a better tomorrow.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-slate-200">Company</h5>
              <ul className="space-y-4 text-slate-400 text-sm font-medium">
                <li><a href="#" className="hover:text-brand-400">About Us</a></li>
                <li><a href="#" className="hover:text-brand-400">Careers</a></li>
                <li><a href="#" className="hover:text-brand-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-slate-200">Support</h5>
              <ul className="space-y-4 text-slate-400 text-sm font-medium">
                <li><a href="#" className="hover:text-brand-400">Help Center</a></li>
                <li><a href="#" className="hover:text-brand-400">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-brand-400">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-slate-200">Follow Us</h5>
              <div className="flex gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-600 transition-colors cursor-pointer">
                    <Globe className="w-4 h-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 text-center text-slate-500 text-xs font-medium">
            © 2026 Pro Green Life. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
