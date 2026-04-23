import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Download, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Success = () => {
  const location = useLocation();
  const reference = location.state?.reference;

  if (!reference) {
    return <Navigate to="/redeem" replace />;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card max-w-lg w-full text-center p-12"
      >
        <div className="w-20 h-20 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-12 h-12" />
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Claim Successful!</h1>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Your eco-friendly reward has been successfully claimed. Our team will verify your information and start the shipping process shortly.
        </p>
        
        <div className="bg-slate-50 rounded-2xl p-6 mb-10 border border-dashed border-slate-200">
          <p className="text-sm text-slate-500 uppercase tracking-widest font-bold mb-2">Claim Reference Number</p>
          <p className="text-3xl font-mono font-bold text-brand-700">{reference}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary flex items-center justify-center gap-2">
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </Link>
          <button className="btn-secondary flex items-center justify-center gap-2">
            <Download className="w-5 h-5" /> Save Receipt
          </button>
        </div>
        
        <p className="mt-12 text-sm text-slate-400">
          A confirmation email will be sent to you if provided. Need help? Contact us at support@progreenlife.com
        </p>
      </motion.div>
    </div>
  );
};

export default Success;
