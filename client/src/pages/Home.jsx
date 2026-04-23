import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Gift, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative bg-white pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-50 rounded-l-[100px] -z-10 hidden lg:block" />
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Sustainability Campaign 2026</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1]">
              Redeem Your <span className="text-brand-600">Rewards</span> for a Greener Life
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
              Thank you for choosing Pro Green Life. Enter your unique voucher code below to claim your exclusive eco-friendly gifts and join our mission for a sustainable future.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/redeem" className="btn-primary text-lg px-8">
                Redeem Your Voucher
              </Link>
              <a href="#how-it-works" className="btn-secondary text-lg px-8">
                How it Works
              </a>
            </div>
            <div className="flex items-center gap-8 pt-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-brand-600 w-5 h-5" />
                <span className="text-slate-700 font-medium">100% Genuine</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-brand-600 w-5 h-5" />
                <span className="text-slate-700 font-medium">Secure Process</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200" 
              alt="Eco Friendly Rewards" 
              className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
            />
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-xs hidden sm:block">
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-brand-100 p-2 rounded-lg">
                  <Gift className="text-brand-600 w-6 h-6" />
                </div>
                <span className="font-bold text-slate-800">New Reward Added!</span>
              </div>
              <p className="text-sm text-slate-500">The Solar Charger kit is now available for premium vouchers.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Three Simple Steps</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Getting your rewards is easier than ever. Follow our streamlined process to claim your eco-friendly gift today.</p>
        </div>
        
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card text-center hover:translate-y-[-8px] transition-all duration-300">
            <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold">1</div>
            <h3 className="text-xl font-bold mb-4">Enter Code</h3>
            <p className="text-slate-500">Input the unique voucher code from your physical gift card into our system.</p>
          </div>
          
          <div className="card text-center hover:translate-y-[-8px] transition-all duration-300">
            <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold">2</div>
            <h3 className="text-xl font-bold mb-4">Choose Reward</h3>
            <p className="text-slate-500">Select your preferred gift from our curated collection of sustainable products.</p>
          </div>
          
          <div className="card text-center hover:translate-y-[-8px] transition-all duration-300">
            <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold">3</div>
            <h3 className="text-xl font-bold mb-4">Claim & Receive</h3>
            <p className="text-slate-500">Fill in your delivery details and we'll ship your eco-friendly reward right to your door.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="p-6 border border-slate-100 rounded-xl hover:border-brand-200 transition-colors">
              <h4 className="text-lg font-bold mb-2">How long does shipping take?</h4>
              <p className="text-slate-600">Rewards are typically processed within 2-3 business days and delivered within 5-7 business days depending on your location.</p>
            </div>
            <div className="p-6 border border-slate-100 rounded-xl hover:border-brand-200 transition-colors">
              <h4 className="text-lg font-bold mb-2">Can I redeem multiple vouchers?</h4>
              <p className="text-slate-600">Yes! If you have multiple physical vouchers, you can redeem each one individually for a reward.</p>
            </div>
            <div className="p-6 border border-slate-100 rounded-xl hover:border-brand-200 transition-colors">
              <h4 className="text-lg font-bold mb-2">What if my code doesn't work?</h4>
              <p className="text-slate-600">Please double-check the characters (some letters and numbers look similar). If it still fails, contact our support team with a photo of your voucher.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
