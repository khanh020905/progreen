import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Gift, 
  ArrowRight, 
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
      <section className="relative pt-8 pb-0 lg:pt-12 overflow-hidden" style={{background: 'linear-gradient(135deg, #f0fdf4 0%, #f9fefb 40%, #ffffff 100%)'}}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 space-y-7 text-center lg:text-left lg:pr-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 shadow-sm border border-brand-100 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-700">
                <span className="w-5 h-5 bg-brand-100 rounded-full flex items-center justify-center">
                  <Leaf className="w-3 h-3 text-brand-600" />
                </span>
                <span>Special Rewards for you</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 leading-[1.15] tracking-tight">
                Redeem Your Voucher <br />
                Get <span className="text-brand-600">Amazing Rewards</span>
              </h1>
              
              <p className="text-base text-slate-500 max-w-md font-medium mx-auto lg:mx-0 leading-relaxed">
                Thank you for being a part of Pro Green Life. <br />
                Enter your voucher code and choose your favorite reward.
              </p>
              
              <div className="flex w-full max-w-md mx-auto lg:mx-0 bg-white p-1.5 rounded-xl shadow-xl shadow-slate-900/5 border border-slate-100">
                <input 
                  type="text" 
                  placeholder="Enter your voucher code" 
                  className="flex-1 px-5 outline-none text-sm text-slate-700 font-medium placeholder:text-slate-300"
                />
                <Link to="/redeem" className="px-6 py-3 bg-[#1a5c2e] text-white rounded-lg text-sm font-bold hover:bg-[#0e3d1c] transition-colors whitespace-nowrap flex items-center gap-2">
                  Redeem Now <span className="text-base">🎁</span>
                </Link>
              </div>
            </motion.div>
            
            {/* Right Image - no frame, blends into background */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="flex-1 relative"
            >
              <div className="relative z-10">
                <img 
                  src={heroGift} 
                  alt="Pro Green Life Gift" 
                  className="w-full max-w-lg mx-auto object-contain"
                />
                {/* Pro Green Life label overlay */}
                <div className="absolute bottom-12 right-12 bg-white/60 backdrop-blur-md px-4 py-2 rounded-lg shadow-sm border border-white/80">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-brand-600" />
                    <span className="text-sm font-bold text-slate-800 italic">Pro Green Life</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-16 bg-white border-b border-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 shadow-sm">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 uppercase tracking-tight">100% Genuine</p>
                <p className="text-xs text-slate-400 font-medium">Authentic rewards</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 shadow-sm">
                <RotateCcw className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Easy to Redeem</p>
                <p className="text-xs text-slate-400 font-medium">Simple 3-step process</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Secure & Safe</p>
                <p className="text-xs text-slate-400 font-medium">Your information is protected</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 shadow-sm">
                <Globe className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Eco-Friendly</p>
                <p className="text-xs text-slate-400 font-medium">For a greener tomorrow</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">How It Works</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Redeem your voucher in 3 simple steps</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-16 max-w-6xl mx-auto px-10">
            <div className="flex-1 text-center group">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-white shadow-2xl flex items-center justify-center text-brand-600 relative border border-slate-50 transition-transform group-hover:-translate-y-2">
                <Ticket className="w-12 h-12" />
                <span className="absolute -top-3 -right-3 w-10 h-10 bg-brand-800 text-white rounded-xl flex items-center justify-center text-xs font-black shadow-lg">1</span>
              </div>
              <div className="mt-10 space-y-3">
                <h4 className="text-xl font-black text-slate-900">Enter Voucher Code</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">Enter the code from your voucher card.</p>
              </div>
            </div>

            <div className="hidden md:block w-32 border-t-2 border-dashed border-slate-200" />

            <div className="flex-1 text-center group">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-white shadow-2xl flex items-center justify-center text-brand-600 relative border border-slate-50 transition-transform group-hover:-translate-y-2">
                <Gift className="w-12 h-12" />
                <span className="absolute -top-3 -right-3 w-10 h-10 bg-brand-800 text-white rounded-xl flex items-center justify-center text-xs font-black shadow-lg">2</span>
              </div>
              <div className="mt-10 space-y-3">
                <h4 className="text-xl font-black text-slate-900">Choose Your Reward</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">Select the reward you like from the available options.</p>
              </div>
            </div>

            <div className="hidden md:block w-32 border-t-2 border-dashed border-slate-200" />

            <div className="flex-1 text-center group">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-white shadow-2xl flex items-center justify-center text-brand-600 relative border border-slate-50 transition-transform group-hover:-translate-y-2">
                <CheckCircle2 className="w-12 h-12" />
                <span className="absolute -top-3 -right-3 w-10 h-10 bg-brand-800 text-white rounded-xl flex items-center justify-center text-xs font-black shadow-lg">3</span>
              </div>
              <div className="mt-10 space-y-3">
                <h4 className="text-xl font-black text-slate-900">Fill Information</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">Provide your details and confirm to receive your reward.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-24 bg-brand-950 relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-20">
          <div className="flex-1 space-y-8 z-10 text-center md:text-left">
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-[1.2] tracking-tight">
              Together, Let's Build <br /> a Greener Future
            </h2>
            <p className="text-slate-400 max-w-md font-medium text-lg leading-relaxed mx-auto md:mx-0">
              At Pro Green Life, we believe in giving back to our community and creating a sustainable world.
            </p>
            <button className="px-10 py-4 border-2 border-white/10 text-white rounded-2xl text-sm font-black hover:bg-white/5 transition-all">
              Learn More About Us
            </button>
          </div>
          <div className="flex-1 z-10 flex justify-center md:justify-end">
            <img src={plantBanner} alt="Plant" className="rounded-[2.5rem] shadow-[0_0_80px_rgba(34,197,94,0.15)] max-w-lg w-full" />
          </div>
          {/* Decorative blur */}
          <div className="absolute top-0 right-0 w-[60%] h-full bg-brand-500/10 blur-[120px]" />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-20 items-start max-w-6xl mx-auto">
            <div className="flex-[1.2] space-y-5 w-full">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-slate-50 rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-8 text-left group"
                  >
                    <span className="font-black text-slate-900 text-lg group-hover:text-brand-700 transition-colors">{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${activeFaq === i ? 'bg-brand-800 text-white rotate-180' : 'bg-slate-50 text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600'}`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>
                  {activeFaq === i && (
                    <div className="px-8 pb-8 text-slate-500 font-bold leading-relaxed text-sm animate-in fade-in slide-in-from-top-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex-1 w-full">
              <div className="p-4 bg-slate-50 rounded-[3.5rem] shadow-inner">
                <img src={faqGift} alt="FAQ Gift" className="rounded-[3rem] w-full shadow-2xl shadow-brand-900/5" />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

