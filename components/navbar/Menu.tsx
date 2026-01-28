'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-[100px] right-6 md:right-10 lg:right-14 w-[calc(100%-3rem)] md:w-80 z-40 flex flex-col gap-3"
        >
          {/* Navigation Card */}
          <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl flex flex-col gap-6">
            <nav className="flex flex-col gap-6">
              {['HOME', 'ABOUT US', 'PROJECTS', 'CONTACT'].map((item, i) => (
                <a
                  key={item}
                  href="#"
                  className="group flex items-center justify-between text-sm font-bold tracking-wide text-gray-900 hover:text-red-600 transition-colors"
                >
                  {item}
                  {i === 0 && <div className="w-1.5 h-1.5 rounded-full bg-red-600" />}
                </a>
              ))}
            </nav>
          </div>

          {/* Newsletter Card */}
          <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl flex flex-col gap-4">
            <h3 className="font-display text-2xl font-medium leading-tight tracking-tight">Subscribe to our newsletter</h3>
            <div className="relative mt-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full h-12 px-5 rounded-2xl bg-background text-sm outline-none placeholder:text-foreground/40 focus:ring-2 focus:ring-black/5 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-black/5 rounded-full transition-colors">
                <ArrowRight className="w-4 h-4 text-foreground" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
