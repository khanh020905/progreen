import React from 'react';

const Logo = ({ className = "h-10", inverted = false }) => {
  const textColor = inverted ? "text-white" : "text-slate-900";
  const subTextColor = inverted ? "text-slate-400" : "text-slate-400";
  const proTextColor = inverted ? "text-slate-300" : "text-slate-800";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official PGL Icon - Circular leaf design */}
      <div className="relative w-10 h-10 flex-shrink-0">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="50" cy="50" r="48" fill="url(#pgl_grad)" />
          <path d="M75 35C75 35 65 25 50 25C35 25 25 35 25 50C25 65 35 75 50 75C65 75 75 65 75 50V35Z" fill="white" />
          <path d="M50 40C55 40 60 45 60 50C60 55 55 60 50 60C45 60 40 55 40 50C40 45 45 40 50 40Z" fill="url(#pgl_grad_inner)" />
          <defs>
            <linearGradient id="pgl_grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#22c55e" />
              <stop offset="1" stopColor="#166534" />
            </linearGradient>
            <linearGradient id="pgl_grad_inner" x1="40" y1="40" x2="60" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4ade80" />
              <stop offset="1" stopColor="#15803d" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Text - Styled as per official logo */}
      <div className="flex flex-col leading-none">
        <span className={`text-[10px] font-black tracking-[0.2em] uppercase ${proTextColor}`}>Pro</span>
        <div className="flex items-baseline gap-1">
          <span className={`text-xl font-extrabold tracking-tight uppercase ${textColor}`}>Green L</span>
          {/* Custom 'i' with leaf */}
          <div className="relative inline-block w-3">
             <span className={`text-xl font-extrabold tracking-tight uppercase ${textColor}`}>f</span>
             <div className="absolute -top-1 left-0.5 w-2 h-2 bg-brand-500 rounded-full rotate-45" style={{ borderRadius: '0 50% 50% 50%' }}></div>
          </div>
          <span className={`text-xl font-extrabold tracking-tight uppercase ml-0.5 ${textColor}`}>e</span>
        </div>
        <span className={`text-[9px] font-medium italic mt-0.5 ${subTextColor}`}>Nâng niu sức khỏe Việt</span>
      </div>
    </div>
  );
};

export default Logo;
