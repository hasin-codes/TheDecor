'use client';

import React from 'react';
import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isMenuOpen, toggleMenu }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-10 md:py-8 lg:px-14 pointer-events-none">
      {/* Logo Area - Pointer events auto to make it clickable */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex-shrink-0 pointer-events-auto"
      >
        <img
          src="/logo.png"
          alt="The Decor"
          className="h-8 md:h-10 w-auto object-contain"
        />
      </motion.div>

      {/* Right Controls - Pointer events auto */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center gap-3 pointer-events-auto"
      >
        {/* CTA Button */}
        <button className="hidden md:flex h-11 px-6 rounded-full bg-[#2B2B30] text-white font-bold text-xs tracking-widest hover:bg-black transition-all duration-300 shadow-lg items-center gap-2 group uppercase">
          <span>Let&apos;s Talk</span>
          <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-green-400 transition-colors"></span>
        </button>

        {/* Menu Toggle Button */}
        <button
          onClick={toggleMenu}
          className="h-11 px-6 rounded-full bg-white hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center shadow-sm border border-black/5 min-w-[100px]"
        >
          <span className="font-bold text-xs tracking-widest text-black uppercase">
            {isMenuOpen ? 'Close' : 'Menu'}
          </span>
        </button>
      </motion.div>
    </header>
  );
};
