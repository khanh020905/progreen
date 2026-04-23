import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Gift, Sparkles, ShieldCheck, ArrowRight, Star, Heart, Leaf, Ticket } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="flex flex-col w-full bg-[#fcfdfc]">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[80%] bg-brand-50/50 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-[5%] left-[-5%] w-[30%] h-[40%] bg-emerald-50/40 blur-[100px] rounded-full -z-10" />
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-[1.2] text-center lg:text-left space-y-10"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white shadow-sm border border-slate-100 text-brand-700 text-xs font-bold uppercase tracking-[0.2em]">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Chiến dịch quà tặng 2026</span>
              </div>
              
              <h1 className="text-6xl lg:text-[5.5rem] font-extrabold text-slate-900 leading-[1.05] tracking-tight">
                Trao Quà Xanh <br />
                <span className="text-brand-600 italic font-script lowercase">Sống an lành</span>
              </h1>
              
              <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                Cảm ơn bạn đã đồng hành cùng Pro Green Life. Nhập mã voucher để nhận những phần quà xanh tinh tế và cùng chúng tôi kiến tạo tương lai bền vững.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
                <Link to="/redeem" className="btn-primary px-10 py-5 text-base group">
                  Đổi Quà Ngay 
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="#how-it-works" className="btn-secondary px-10 py-5 text-base">
                  Tìm Hiểu Thêm
                </a>
              </div>
              
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-10 pt-12 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center">
                    <CheckCircle2 className="text-brand-600 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">100% Chính hãng</p>
                    <p className="text-xs text-slate-400">Sản phẩm chất lượng cao</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
                    <ShieldCheck className="text-amber-600 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Bảo mật tuyệt đối</p>
                    <p className="text-xs text-slate-400">Thông tin khách hàng an toàn</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex-1 relative"
            >
              <div className="relative z-10 p-4 bg-white rounded-[3rem] shadow-2xl shadow-brand-900/10 rotate-2">
                <img 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200" 
                  alt="Eco Friendly Rewards" 
                  className="rounded-[2.5rem] w-full object-cover aspect-[4/5]"
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-xl border border-slate-50 animate-float z-20">
                <div className="flex items-center gap-4">
                  <div className="bg-brand-600 p-3 rounded-2xl">
                    <Gift className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Quà Mới!</p>
                    <p className="text-xs text-slate-400">Bộ năng lượng mặt trời</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-12 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white animate-float [animation-delay:2s] z-20">
                <div className="flex items-center gap-2 mb-2">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-xs font-bold text-slate-800 italic">"Giao quà rất nhanh và đóng gói chuyên nghiệp!"</p>
                <p className="text-[10px] text-slate-400 mt-2">— Chị Lan, Hà Nội</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-y border-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <p className="text-4xl font-extrabold text-brand-600 mb-2">10k+</p>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Khách hàng</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-brand-600 mb-2">25k</p>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Quà tặng đã trao</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-brand-600 mb-2">63</p>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Tỉnh thành</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-brand-600 mb-2">99%</p>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Hài lòng</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-32 bg-[#f8fafc]">
        <div className="container mx-auto px-4 mb-20 text-center">
          <h2 className="section-title mb-6">Quy Trình Nhận Quà <br /><span className="text-brand-600 underline decoration-brand-200 decoration-8 underline-offset-8">Chỉ 3 Bước</span></h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">Chúng tôi tối giản mọi thao tác để bạn có trải nghiệm nhận quà tuyệt vời nhất.</p>
        </div>
        
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="premium-card">
            <div className="w-20 h-20 bg-brand-50 text-brand-600 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-500">
              <Ticket className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900">1. Nhập Mã Voucher</h3>
            <p className="text-slate-500 leading-relaxed font-medium">Nhập mã code duy nhất được in trên thẻ quà tặng vật lý mà bạn nhận được từ Pro Green Life.</p>
          </div>
          
          <div className="premium-card [animation-delay:0.2s]">
            <div className="w-20 h-20 bg-emerald-50 text-brand-600 rounded-3xl flex items-center justify-center mb-10">
              <Gift className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900">2. Chọn Phần Quà</h3>
            <p className="text-slate-500 leading-relaxed font-medium">Khám phá bộ sưu tập quà tặng xanh tinh tế và chọn món quà phù hợp nhất với sở thích của bạn.</p>
          </div>
          
          <div className="premium-card [animation-delay:0.4s]">
            <div className="w-20 h-20 bg-brand-50 text-brand-600 rounded-3xl flex items-center justify-center mb-10">
              <Leaf className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900">3. Nhận Quà Tại Nhà</h3>
            <p className="text-slate-500 leading-relaxed font-medium">Cung cấp thông tin giao hàng chính xác, chúng tôi sẽ đóng gói cẩn thận và gửi quà đến tận tay bạn.</p>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 space-y-8">
            <h2 className="section-title">Vì Một Việt Nam <br /><span className="text-brand-600">Xanh & Bền Vững</span></h2>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
              Pro Green Life không chỉ trao tặng những món quà, chúng tôi trao gửi niềm tin về một lối sống văn minh, thân thiện với môi trường. Mỗi món quà bạn chọn là một lời cam kết cùng chúng tôi bảo vệ thiên nhiên.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-brand-50 rounded-full text-brand-600"><Heart className="w-5 h-5 fill-brand-600" /></div>
                <span className="font-bold text-slate-700">Lan tỏa yêu thương và lối sống xanh</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-brand-50 rounded-full text-brand-600"><Star className="w-5 h-5 fill-brand-600" /></div>
                <span className="font-bold text-slate-700">Hơn 100,000 người đã tham gia cùng chúng tôi</span>
              </div>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-6">
            <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400" className="rounded-[2rem] h-64 w-full object-cover shadow-lg" alt="Eco 1" />
            <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=400" className="rounded-[2rem] h-64 w-full object-cover shadow-lg mt-12" alt="Eco 2" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
