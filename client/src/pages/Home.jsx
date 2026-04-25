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
import heroImg from '../assets/hero.jpg';
import plantBanner from '../assets/plant-banner.png';
import faqGift from '../assets/faq-gift.png';
import LeafIcon from '../components/LeafIcon';

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [code, setCode] = useState('');

  const faqs = [
    { q: "Phiếu giảm giá Pro Green Life là gì?", a: "Phiếu giảm giá Pro Green Life là một mã phần thưởng đặc biệt cho phép bạn nhận các món quà thân thiện với môi trường từ bộ sưu tập của chúng tôi." },
    { q: "Tôi có thể tìm mã số ở đâu?", a: "Mã số 12 ký tự được in trên thẻ vật lý hoặc được gửi đến email đăng ký của bạn." },
    { q: "Tôi có thể sử dụng mã nhiều lần không?", a: "Không, mỗi mã số là duy nhất và chỉ có thể được sử dụng một lần." },
    { q: "Khi nào tôi sẽ nhận được quà?", a: "Quà thường được xử lý và vận chuyển trong vòng 5-7 ngày làm việc sau khi yêu cầu của bạn được xác nhận." }
  ];

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Section - Elite SaaS Landing Design (Refined Blending & Responsive) */}
      <section className="relative min-h-[700px] lg:min-h-[850px] flex items-center bg-[#fdfefd] overflow-hidden">
        
        {/* Dynamic Background Elements for Depth */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -right-[5%] w-[60%] h-[70%] bg-brand-50/40 rounded-full blur-[120px]" />
          <div className="absolute top-[20%] -left-[10%] w-[40%] h-[50%] bg-[#ecf5ef]/60 rounded-full blur-[100px]" />
          
          {/* High-End Product Visual - Integrated with Smooth Blending */}
          <motion.div 
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-0 right-0 w-full lg:w-[60%] h-full z-0"
          >
            <div className="relative w-full h-full">
              <img 
                src="/clean_hero_bg_1777104812389.png" 
                alt="" 
                className="w-full h-full object-cover object-right"
                style={{ 
                  maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,1) 50%)',
                  WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,1) 50%)'
                }}
              />
              {/* Overlay for mobile readability */}
              <div className="absolute inset-0 bg-white/20 lg:hidden backdrop-blur-[2px]" />
            </div>
          </motion.div>
        </div>

        <div className="container mx-auto px-6 lg:px-24 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            
            {/* Left Content Area: Refined Typography & Elite Layout */}
            <div className="w-full lg:w-[60%] space-y-10 lg:space-y-12 text-center lg:text-left">
              
              <div className="space-y-6 lg:space-y-8">
                {/* Premium Badge */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-[0_4px_20px_rgba(14,33,20,0.04)] border border-slate-50"
                >
                  <div className="w-5 h-5 bg-[#346141] rounded-full flex items-center justify-center shadow-lg shadow-brand-900/20">
                    <LeafIcon className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] text-[#0e2114]/80">Premium Reward Experience</span>
                </motion.div>

                {/* Refined Heading - Responsive Scaling */}
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl lg:text-[4.2rem] font-black text-[#0e2114] leading-[1.1] tracking-[-0.03em]"
                >
                  Vui lòng nhập mã số <br className="hidden sm:block" /> trên thẻ quét <span className="text-brand-600 underline decoration-brand-100 underline-offset-4">mã QR</span> <br className="hidden sm:block" /> để được nhận quà
                </motion.h1>

                {/* Subtext */}
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-base md:text-xl text-slate-500 font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed"
                >
                  Cảm ơn bạn đã là một phần của <span className="text-[#0e2114] font-bold">Pro Green Life</span>. <br className="hidden md:block" />
                  Nhập mã số thẻ của bạn để chọn những phần thưởng thiên nhiên đặc biệt nhất.
                </motion.p>
              </div>

              {/* Redesigned Input + CTA (Responsive Unified Capsule) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative w-full max-w-xl mx-auto lg:mx-0"
              >
                <div className="flex flex-col sm:flex-row items-center bg-white p-2 rounded-3xl sm:rounded-[2rem] shadow-[0_20px_60px_rgba(14,33,20,0.08)] border border-slate-100 group transition-all duration-500 focus-within:shadow-[0_25px_80px_rgba(14,33,20,0.12)] focus-within:border-brand-100">
                  <div className="hidden sm:flex pl-6 text-slate-300 group-focus-within:text-brand-600 transition-colors">
                    <Ticket className="w-6 h-6" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Nhập mã số thẻ quà tặng" 
                    className="w-full sm:flex-1 h-14 sm:h-16 px-6 sm:px-5 outline-none text-lg sm:text-xl font-black text-[#0e2114] uppercase tracking-[0.15em] placeholder:text-slate-200 placeholder:normal-case placeholder:tracking-normal placeholder:font-bold text-center sm:text-left"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                  />
                  <Link 
                    to={code ? `/redeem?code=${code}` : '/redeem'} 
                    className="w-full sm:w-auto h-14 sm:h-16 px-10 bg-gradient-to-r from-[#346141] to-[#2a5d38] text-white rounded-2xl sm:rounded-[1.5rem] text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg hover:shadow-brand-900/20 active:scale-95 group/btn mt-2 sm:mt-0"
                  >
                    Xác thực <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>

              {/* Elite Features Trust Bar - Responsive Grid */}
              <div className="grid grid-cols-2 gap-6 sm:flex sm:gap-12 pt-8">
                {[
                  { icon: ShieldCheck, label: "100% Chính hãng", sub: "Đảm bảo" },
                  { icon: RotateCcw, label: "Dễ dàng nhận", sub: "3 bước" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + i*0.1 }}
                    className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 text-center sm:text-left"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#ecf5ef] flex items-center justify-center text-[#346141] shadow-sm"><item.icon className="w-6 h-6" /></div>
                    <div className="space-y-0.5">
                      <p className="text-[11px] font-black text-[#0e2114] uppercase tracking-tight">{item.label}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>

            {/* Empty space for Large screens, background image fills this */}
            <div className="hidden lg:block lg:w-[40%]" />

          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 space-y-3">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Cách thức hoạt động</h2>
            <p className="text-slate-400 font-medium text-sm">Nhận phần thưởng của bạn chỉ trong 3 bước đơn giản</p>
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
                <h4 className="text-lg font-bold text-slate-900">Nhập mã số thẻ</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Điền mã số 12 ký tự từ thẻ của bạn.</p>
              </div>
            </div>

            <div className="hidden md:block w-20 border-t-2 border-dashed border-slate-100 mb-20" />

            {/* Step 2 */}
            <div className="flex-1 text-center space-y-6 max-w-xs">
              <div className="relative inline-block">
                <div className="w-16 h-16 bg-[#e9f5ed] rounded-2xl flex items-center justify-center text-brand-700 mx-auto">
                  <motion.div animate={{ rotate: [0, -10, 10, -10, 10, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}>
                    <Gift className="w-8 h-8" />
                  </motion.div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#166534] text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">
                  2
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-slate-900">Chọn phần thưởng</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Chọn món quà bạn yêu thích từ danh sách.</p>
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
                <h4 className="text-lg font-bold text-slate-900">Điền thông tin</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Cung cấp địa chỉ nhận quà và xác nhận yêu cầu.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discovery Section - Brand Trust & Products */}
      <section id="discovery" className="py-24 bg-[#f8faf9] overflow-hidden">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="text-center mb-20 space-y-4">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-xs font-black uppercase tracking-[0.4em] text-brand-600"
            >
              KHÁM PHÁ
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black text-[#0e2114]"
            >
              Thương hiệu <span className="text-brand-600 underline decoration-brand-200 underline-offset-8">Pro Green Life</span>
            </motion.h2>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left Features */}
            <div className="w-full lg:w-1/3 space-y-16">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex flex-row-reverse lg:flex-row items-start gap-6 text-right group"
              >
                <div className="flex-1 space-y-2">
                  <h4 className="text-lg font-black text-[#0e2114] uppercase tracking-tight group-hover:text-brand-600 transition-colors">Thương hiệu uy tín</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    Giải thưởng chất lượng vàng vì sức khỏe cộng đồng 2020, 2021, 2022 do Hiệp hội thực phẩm chức năng Việt Nam trao tặng.
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-brand-600 border border-brand-100 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-8 h-8" />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-row-reverse lg:flex-row items-start gap-6 text-right group"
              >
                <div className="flex-1 space-y-2">
                  <h4 className="text-lg font-black text-[#0e2114] uppercase tracking-tight group-hover:text-brand-600 transition-colors">Chuỗi phân phối</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    Nhãn hiệu PGL được phân phối chính thức tại chuỗi các nhà thuốc Pharmacity và FPT Long Châu.
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-brand-600 border border-brand-100 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8" />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-row-reverse lg:flex-row items-start gap-6 text-right group"
              >
                <div className="flex-1 space-y-2">
                  <h4 className="text-lg font-black text-[#0e2114] uppercase tracking-tight group-hover:text-brand-600 transition-colors">Tôn trọng khách hàng</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    Bồi hoàn 100% đơn hàng nếu lỗi do nhà sản xuất hoặc giao hàng trễ hẹn.
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-brand-600 border border-brand-100 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
              </motion.div>
            </div>

            {/* Central Product Group Visual - Hyper Realistic Version */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="w-full lg:w-1/3 flex justify-center py-10 order-first lg:order-none"
            >
              <div className="relative">
                <div className="w-full max-w-[550px] relative z-10">
                  <img 
                    src="/premium_product_cluster_realistic.png" 
                    alt="Pro Green Life Products" 
                    className="w-full h-auto drop-shadow-[0_40px_80px_rgba(14,33,20,0.15)]"
                  />
                </div>
                {/* Subtle Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-brand-500/5 rounded-full blur-[130px] -z-10"></div>
              </div>
            </motion.div>

            {/* Right Features */}
            <div className="w-full lg:w-1/3 space-y-16">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-start gap-6 text-left group"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-brand-600 border border-brand-100 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8" />
                </div>
                <div className="flex-1 space-y-2">
                  <h4 className="text-lg font-black text-[#0e2114] uppercase tracking-tight group-hover:text-brand-600 transition-colors">Xuất xứ rõ ràng</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    100% sản phẩm có mã vạch trên hệ thống Icheck và nguồn gốc thảo dược minh bạch.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-start gap-6 text-left group"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-brand-600 border border-brand-100 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div className="flex-1 space-y-2">
                  <h4 className="text-lg font-black text-[#0e2114] uppercase tracking-tight group-hover:text-brand-600 transition-colors">Hồ sơ sản phẩm</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    100% sản phẩm có hồ sơ tự công bố và được Bộ Y tế phê duyệt lưu hành.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-6 text-left group"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-brand-600 border border-brand-100 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-8 h-8" />
                </div>
                <div className="flex-1 space-y-2">
                  <h4 className="text-lg font-black text-[#0e2114] uppercase tracking-tight group-hover:text-brand-600 transition-colors">Sản xuất hiện đại</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    100% sản phẩm sản xuất trên dây chuyền đạt chuẩn GMP quốc tế.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-left mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Câu hỏi thường gặp</h2>
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

