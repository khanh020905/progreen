'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Option {
  code: number;
  name: string;
}

interface Props {
  label: string;
  options: Option[];
  value: string;
  onChange: (name: string, code: number) => void;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
}

export default function SearchableSelect({ label, options, value, onChange, disabled, placeholder, required }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(opt => 
    opt.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-3 relative" ref={containerRef}>
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
        {label} {required && '*'}
      </label>
      <div 
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full px-8 py-5 bg-slate-50 border-2 rounded-2xl font-bold flex justify-between items-center cursor-pointer transition-all ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-green-500'
        } ${isOpen ? 'border-green-500 bg-white ring-4 ring-green-50 shadow-lg' : 'border-transparent shadow-inner'}`}
      >
        <span className={value ? 'text-slate-900' : 'text-slate-400'}>
          {value || placeholder || `Chọn ${label}`}
        </span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-slate-50 relative">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                autoFocus
                className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl outline-none text-sm font-bold focus:bg-white transition-colors"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="max-h-60 overflow-y-auto p-2 custom-scrollbar">
              {filteredOptions.length > 0 ? filteredOptions.map(opt => (
                <div 
                  key={opt.code}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(opt.name, opt.code);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  className={`px-6 py-4 rounded-xl flex items-center justify-between cursor-pointer transition-colors group ${
                    value === opt.name ? 'bg-green-50 text-green-700' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="text-sm font-bold">{opt.name}</span>
                  {value === opt.name && <Check className="w-4 h-4 text-green-600" />}
                </div>
              )) : (
                <div className="p-8 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">Không tìm thấy kết quả</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
