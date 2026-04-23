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
      <section id="how-it-works" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 space-y-3">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">How It Works</h2>
            <p className="text-slate-400 font-medium text-sm">Redeem your voucher in 3 simple steps</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="flex-1 text-center space-y-6 max-w-xs">
              <div className="relative inline-block">
                <div className="w-16 h-16 bg-[#e9f5ed] rounded-2xl flex items-center justify-center text-brand-700 mx-auto">
                  <Ticket className="w-8 h-8" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#166534] text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">
                  1
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-slate-900">Enter Voucher Code</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Enter the code from your voucher card.</p>
              </div>
            </div>

            <div className="hidden md:block w-20 border-t-2 border-dashed border-slate-100 mb-20" />

            {/* Step 2 */}
            <div className="flex-1 text-center space-y-6 max-w-xs">
              <div className="relative inline-block">
                <div className="w-16 h-16 bg-[#e9f5ed] rounded-2xl flex items-center justify-center text-brand-700 mx-auto">
                  <Gift className="w-8 h-8" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#166534] text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">
                  2
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-slate-900">Choose Your Reward</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Select the reward you like from the available options.</p>
              </div>
            </div>

            <div className="hidden md:block w-20 border-t-2 border-dashed border-slate-100 mb-20" />

            {/* Step 3 */}
            <div className="flex-1 text-center space-y-6 max-w-xs">
              <div className="relative inline-block">
                <div className="w-16 h-16 bg-[#e9f5ed] rounded-2xl flex items-center justify-center text-brand-700 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#166534] text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">
                  3
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-slate-900">Fill Information</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Provide your details and confirm to receive your reward.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-[#1a3821] rounded-[2.5rem] overflow-hidden flex flex-col md:row items-center">
            <div className="flex-1 p-12 lg:p-20 space-y-8">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Together, Let's Build <br /> a Greener Future
              </h2>
              <p className="text-emerald-100/70 max-w-md font-medium text-lg leading-relaxed">
                At Pro Green Life, we believe in giving back to our community and creating a sustainable world.
              </p>
              <button className="px-10 py-3.5 border border-white/30 text-white rounded-xl text-sm font-bold hover:bg-white/10 transition-all">
                Learn More About Us
              </button>
            </div>
            <div className="flex-1 h-full flex justify-end items-end pr-0 pb-0">
              <img src={plantBanner} alt="Sustainable Future" className="max-w-md w-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-left mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="flex-1 space-y-4 w-full">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden bg-white">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left group"
                  >
                    <span className="font-bold text-slate-800 text-base">{faq.q}</span>
                    <Plus className={`w-5 h-5 text-slate-400 transition-transform ${activeFaq === i ? 'rotate-45' : ''}`} />
                  </button>
                  {activeFaq === i && (
                    <div className="px-6 pb-6 text-slate-500 font-medium text-sm">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex-1 w-full flex justify-center">
              <div className="bg-[#f8fcf9] p-8 rounded-[3rem] shadow-inner w-full max-w-md">
                <img src={faqGift} alt="FAQ Reward" className="w-full h-auto drop-shadow-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

