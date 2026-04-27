"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Gift,
  ArrowRight,
  Ticket,
  ShieldCheck,
  RotateCcw,
  Globe,
  Plus,
  Users,
  CreditCard,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import LeafIcon from "@/components/LeafIcon";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [code, setCode] = useState("");

  const faqs = [
    {
      q: "Phiếu giảm giá Pro Green Life là gì?",
      a: "Phiếu giảm giá Pro Green Life là một mã phần thưởng đặc biệt cho phép bạn nhận các món quà thân thiện với môi trường từ bộ sưu tập của chúng tôi.",
    },
    {
      q: "Tôi có thể tìm mã số ở đâu?",
      a: "Mã số 12 ký tự được in trên thẻ vật lý hoặc được gửi đến email đăng ký của bạn.",
    },
    {
      q: "Tôi có thể sử dụng mã nhiều lần không?",
      a: "Không, mỗi mã số là duy nhất và chỉ có thể được sử dụng một lần.",
    },
    {
      q: "Khi nào tôi sẽ nhận được quà?",
      a: "Quà thường được xử lý và vận chuyển trong vòng 5-7 ngày làm việc sau khi yêu cầu của bạn được xác nhận.",
    },
  ];

  return (
    <div className="flex flex-col w-full bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.jpeg"
            alt="Pro Green Life Hero Background"
            fill
            className="object-cover object-center lg:object-right"
            priority
          />
          {/* Subtle overlay for better text contrast on mobile */}
          <div className="absolute inset-0 bg-white/40 lg:hidden backdrop-blur-[2px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-10 pb-40 lg:pb-0">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-[65%] space-y-8 lg:space-y-10">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md shadow-[0_4px_20px_rgba(45,90,39,0.08)] border border-white"
                >
                  <div className="w-5 h-5 bg-[#2d5a27] rounded-full flex items-center justify-center">
                    <LeafIcon className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2d5a27]">
                    Premium Reward Experience
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl sm:text-5xl lg:text-6xl xl:text-[4.5rem] font-black text-[#0e2114] leading-[1.1] tracking-[-0.02em]"
                >
                  Mỗi lần quét mã <br /> là một trải nghiệm <br />
                  <span className="text-[#3a6934] relative">
                    xứng đáng.
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="absolute -bottom-2 left-0 h-1.5 bg-[#3a6934]/20 rounded-full"
                    />
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-base md:text-lg text-[#0e2114]/60 font-medium max-w-xl leading-relaxed"
                >
                  <span className="text-[#3a6934] font-bold">
                    Pro Green Life
                  </span>{" "}
                  mang đến cho bạn hệ thống thẻ quà tặng điện tử tinh tế, dễ sử
                  dụng và đầy cảm hứng – cho mọi khoảnh khắc tri ân.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative w-full max-w-xl"
              >
                <div className="flex flex-col sm:flex-row items-center bg-white p-2 rounded-3xl sm:rounded-full shadow-[0_20px_50px_rgba(45,90,39,0.1)] border border-slate-50 group transition-all duration-500 focus-within:shadow-[0_25px_80px_rgba(45,90,39,0.15)] focus-within:border-green-100/50">
                  <div className="hidden sm:flex pl-6 text-slate-300 group-focus-within:text-[#2d5a27] transition-colors">
                    <Ticket className="w-6 h-6" />
                  </div>
                  <input
                    type="text"
                    placeholder="Nhập mã số thẻ quà tặng"
                    className="w-full sm:flex-1 h-14 sm:h-16 px-6 sm:px-5 outline-none text-lg sm:text-xl font-black text-[#0e2114] uppercase tracking-[0.15em] placeholder:text-slate-200 placeholder:normal-case placeholder:tracking-normal placeholder:font-bold"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                  />
                  <Link
                    href={code ? `/redeem?code=${code}` : "/redeem"}
                    className="w-full sm:w-auto h-14 sm:h-16 px-10 bg-[#3a6934] text-white rounded-2xl sm:rounded-full text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 hover:bg-[#2d5a27] hover:shadow-lg hover:shadow-green-900/20 active:scale-95 group/btn mt-2 sm:mt-0"
                  >
                    Xác thực{" "}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Trust Indicators Under Input (Glassmorphic Cards) */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                  {[
                    { icon: ShieldCheck, label: "Chính hãng", sub: "Verified" },
                    { icon: RotateCcw, label: "Dễ dàng nhận", sub: "Simple" },
                    { icon: Star, label: "98% Hài lòng", sub: "Trustworthy" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="flex-1 min-w-[140px] bg-white/40 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-[0_8px_32px_rgba(45,90,39,0.08)] flex items-center gap-4 group hover:bg-white/60 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#2d5a27]/10 flex items-center justify-center text-[#2d5a27] group-hover:scale-110 transition-transform">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-[#0e2114] uppercase tracking-widest whitespace-nowrap">
                          {item.label}
                        </p>
                        <p className="text-[8px] text-[#0e2114]/40 font-bold uppercase tracking-wider">
                          {item.sub}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 space-y-3">
            <h2 className="text-4xl font-extrabold text-[#0e2114] tracking-tight">
              Cách thức hoạt động
            </h2>
            <p className="text-[#0e2114]/40 font-medium text-sm">
              Nhận phần thưởng của bạn chỉ trong 3 bước đơn giản
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
            {/* Steps */}
            <div className="flex-1 text-center space-y-6 max-w-xs">
              <div className="relative inline-block">
                <div className="w-16 h-16 bg-[#e9f5ed] rounded-2xl flex items-center justify-center text-green-700 mx-auto">
                  <Ticket className="w-8 h-8" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#3a6934] text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">
                  1
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-slate-900">
                  Nhập mã số thẻ
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Điền mã số 12 ký tự từ thẻ của bạn.
                </p>
              </div>
            </div>

            <div className="hidden md:block w-20 border-t-2 border-dashed border-slate-100 mb-20" />

            <div className="flex-1 text-center space-y-6 max-w-xs">
              <div className="relative inline-block">
                <div className="w-16 h-16 bg-[#e9f5ed] rounded-2xl flex items-center justify-center text-green-700 mx-auto">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  >
                    <Gift className="w-8 h-8" />
                  </motion.div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#3a6934] text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">
                  2
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-slate-900">
                  Chọn phần thưởng
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Chọn món quà bạn yêu thích từ danh sách.
                </p>
              </div>
            </div>

            <div className="hidden md:block w-20 border-t-2 border-dashed border-slate-100 mb-20" />

            <div className="flex-1 text-center space-y-6 max-w-xs">
              <div className="relative inline-block">
                <div className="w-16 h-16 bg-[#e9f5ed] rounded-2xl flex items-center justify-center text-green-700 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#3a6934] text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">
                  3
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-slate-900">
                  Điền thông tin
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Cung cấp địa chỉ nhận quà và xác nhận yêu cầu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discovery Section */}
      <section id="discovery" className="py-24 bg-[#f8faf9] overflow-hidden">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="text-center mb-20 space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-xs font-black uppercase tracking-[0.4em] text-green-600"
            >
              KHÁM PHÁ
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black text-[#0e2114]"
            >
              Thương hiệu{" "}
              <span className="text-[#3a6934] underline decoration-green-200 underline-offset-8">
                Pro Green Life
              </span>
            </motion.h2>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Features Grid */}
            <div className="w-full lg:w-1/3 space-y-16">
              {[
                {
                  title: "Thương hiệu uy tín",
                  desc: "Giải thưởng chất lượng vàng vì sức khỏe cộng đồng 2020, 2021, 2022 do Hiệp hội thực phẩm chức năng Việt Nam trao tặng.",
                  icon: ShieldCheck,
                },
                {
                  title: "Chuỗi phân phối",
                  desc: "Nhãn hiệu PGL được phân phối chính thức tại chuỗi các nhà thuốc Pharmacity và FPT Long Châu.",
                  icon: Globe,
                },
                {
                  title: "Tôn trọng khách hàng",
                  desc: "Bồi hoàn 100% đơn hàng nếu lỗi do nhà sản xuất hoặc giao hàng trễ hẹn.",
                  icon: CheckCircle2,
                },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-row-reverse lg:flex-row items-start gap-6 text-right group"
                >
                  <div className="flex-1 space-y-2">
                    <h4 className="text-lg font-black text-[#0e2114] uppercase tracking-tight group-hover:text-green-600 transition-colors">
                      {f.title}
                    </h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-green-600 border border-green-100 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <f.icon className="w-8 h-8" />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="w-full lg:w-1/3 flex justify-center py-10 order-first lg:order-none"
            >
              <div className="relative">
                <div className="w-full max-w-[550px] relative z-10">
                  <Image
                    src="/premium_product_cluster_realistic.png"
                    alt="Pro Green Life Products"
                    width={550}
                    height={550}
                    className="w-full h-auto drop-shadow-[0_40px_80px_rgba(14,33,20,0.15)]"
                  />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-green-500/5 rounded-full blur-[130px] -z-10"></div>
              </div>
            </motion.div>

            <div className="w-full lg:w-1/3 space-y-16">
              {[
                {
                  title: "Xuất xứ rõ ràng",
                  desc: "100% sản phẩm có mã vạch trên hệ thống Icheck và nguồn gốc thảo dược minh bạch.",
                  icon: Globe,
                },
                {
                  title: "Hồ sơ sản phẩm",
                  desc: "100% sản phẩm có hồ sơ tự công bố và được Bộ Y tế phê duyệt lưu hành.",
                  icon: ShieldCheck,
                },
                {
                  title: "Sản xuất hiện đại",
                  desc: "100% sản phẩm sản xuất trên dây chuyền đạt chuẩn GMP quốc tế.",
                  icon: ArrowRight,
                },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-6 text-left group"
                >
                  <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-green-600 border border-green-100 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <f.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="text-lg font-black text-[#0e2114] uppercase tracking-tight group-hover:text-green-600 transition-colors">
                      {f.title}
                    </h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-left mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Câu hỏi thường gặp
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="flex-1 space-y-4 w-full">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border border-slate-100 rounded-2xl overflow-hidden bg-white"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left group"
                  >
                    <span className="font-bold text-slate-800 text-base">
                      {faq.q}
                    </span>
                    <Plus
                      className={`w-5 h-5 text-slate-400 transition-transform ${activeFaq === i ? "rotate-45" : ""}`}
                    />
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
                <Image
                  src="/faq-gift.png"
                  alt="FAQ Reward"
                  width={400}
                  height={400}
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
