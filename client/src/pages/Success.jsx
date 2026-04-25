import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Home, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import LeafIcon from '../components/LeafIcon';

const Success = () => {
  const location = useLocation();
  const reference = location.state?.reference || 'PGL-2026-XXXXXX';

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full bg-white border border-slate-50 rounded-[3rem] p-12 text-center shadow-2xl shadow-slate-200/50"
      >
        <div className="flex justify-center mb-10">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10, stiffness: 100 }}
            className="w-24 h-24 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="w-12 h-12" />
          </motion.div>
        </div>

        <h1 className="text-4xl font-black text-slate-900 mb-4">Gửi yêu cầu thành công!</h1>
        <p className="text-slate-500 font-medium leading-relaxed mb-10">
          Cảm ơn bạn! Yêu cầu nhận quà của bạn đã được ghi nhận. <br />
          Chúng tôi sẽ sớm liên hệ với bạn.
        </p>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 mb-10">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Mã tham chiếu của bạn</p>
          <p className="text-3xl font-black text-slate-900 tracking-tight">{reference}</p>
        </div>

        <div className="flex flex-col gap-4">
          <Link to="/" className="w-full py-4 bg-brand-950 text-white rounded-xl font-bold hover:bg-black transition-colors flex items-center justify-center gap-2">
            Quay lại Trang chủ <Home className="w-4 h-4" />
          </Link>
          <div className="flex items-center justify-center gap-2 text-brand-600 text-[10px] font-bold uppercase tracking-widest mt-4">
            <LeafIcon className="w-3 h-3" /> 
            Pro Green Life Rewards
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Success;
