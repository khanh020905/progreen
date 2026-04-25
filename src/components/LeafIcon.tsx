import React from 'react';

interface LeafIconProps {
  className?: string;
}

const LeafIcon = ({ className = "w-6 h-6" }: LeafIconProps) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a7 7 0 0 1-10 10z" />
      <path d="M11 20c-1 0-3-1-3-3" />
      <path d="M11 13c3.5-3.5 7-4.5 9-6" />
    </svg>
  );
};

export default LeafIcon;
