'use client';

import React, { useCallback } from 'react';
import { ArrowUpRight, ArrowUp, Mail, Phone, Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <footer className="relative w-full bg-[#050505] text-white pt-6 pb-4 overflow-hidden">

      {/* 1. CTA Card (Red 'Built By' Box) - Reduced Size */}
      <div className="w-full max-w-360 mx-auto px-4 md:px-10 lg:px-14 mb-6">
        <div className="w-full bg-brandRed rounded-2xl md:rounded-4xl p-6 md:p-10 flex flex-col items-start relative overflow-hidden">

          {/* Background Decor */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
          <div className="absolute -top-[50%] -left-[20%] w-[150%] h-[150%] bg-linear-to-b from-white/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10">
            <div className="flex flex-col gap-2 md:gap-4 max-w-xl text-center md:text-left">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-medium tracking-tight text-white leading-tight">
                Built by <br className="hidden md:block" />
                <a
                  href="https://hasin.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-cursive font-bold italic hover:text-black transition-colors duration-300 inline-block ml-1 md:ml-0"
                  style={{ fontFamily: '"Caution", "Playfair Display", serif', fontStyle: 'italic' }}
                >
                  Hasin Raiyan
                </a>
              </h2>
              <p className="text-sm md:text-base text-white/90 font-medium leading-relaxed hidden md:block">
                Crafting digital experiences with passion and precision.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
              <a
                href="mailto:hasin.innit@gmail.com"
                className="px-6 py-3 bg-white text-brandRed rounded-full font-bold text-xs md:text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group whitespace-nowrap min-w-35"
              >
                Hire Me
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <div className="flex gap-2">
                <a
                  href="mailto:hasin.innit@gmail.com"
                  className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:text-brandRed transition-all duration-300"
                  title="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/8801319376899"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:text-brandRed transition-all duration-300"
                  title="WhatsApp"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links Area */}
      <div className="w-full max-w-360 mx-auto px-6 md:px-10 lg:px-14">

        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-16 border-b border-white/10 pb-10">

          {/* Left Side: Contact */}
          <div className="lg:w-[40%] flex flex-col gap-4 md:gap-6">
            <h3 className="text-lg font-bold text-white">Build something together?</h3>

            <div className="flex flex-col gap-1">
              <a href="mailto:info@thedecorbd.com" className="text-xl md:text-2xl font-light hover:text-brandRed transition-colors duration-300 self-start">
                info@thedecorbd.com
              </a>
              <a
                href="https://www.google.com/maps/dir//Agrabad+Access+Rd,+Chattogram/@22.3279141,91.7272955,12z"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors duration-300 leading-relaxed max-w-xs mt-2 text-xs md:text-sm"
              >
                Agrabad Access Rd,<br />
                Chattogram, Bangladesh
              </a>
            </div>
          </div>

          {/* Right Side: Links Columns */}
          <div className="lg:w-[50%] grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">

            {/* Column 1 */}
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-white mb-1">The Company</h4>
              <ul className="flex flex-col gap-2 text-white/60">
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="/services/" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="/clients/" className="hover:text-white transition-colors">Clients Diary</a></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-white mb-1">Resources</h4>
              <ul className="flex flex-col gap-2 text-white/60">
                <li><a href="/newsletter/" className="hover:text-white transition-colors">Newsletter</a></li>
                <li><a href="/career/" className="hover:text-white transition-colors">Career</a></li>
                <li><a href="/contact/" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-white mb-1">Legal</h4>
              <ul className="flex flex-col gap-2 text-white/60">
                <li><a href="/privacy/" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms/" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>

          </div>
        </div>

        {/* 3. Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6">
          <div className="text-xs font-medium text-white/40">
            &copy; 2026 Decor&apos;s Digital
          </div>

          <div className="flex items-center gap-4">
            {/* Social Icons - Smaller */}
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, href: "https://www.facebook.com/decorsdigital", name: "facebook" },
                { icon: Instagram, href: "https://www.instagram.com/decorsdigital", name: "instagram" },
                { icon: Twitter, href: "https://x.com/DecorsDigital", name: "twitter" },
                { icon: Linkedin, href: "https://www.linkedin.com/company/decorsdigital", name: "linkedin" },
                { icon: Youtube, href: "https://www.youtube.com/@DecorsDigital", name: "youtube" }
              ].map((Social) => (
                <a key={Social.name} href={Social.href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-brandRed hover:border-brandRed transition-all duration-300">
                  <Social.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>

            {/* Scroll Top */}
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-brandRed flex items-center justify-center text-white transition-colors duration-300 ml-2"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Developer Credit */}
        <div className="w-full text-center mt-6 py-2 border-t border-white/5 text-[9px] text-white/10 uppercase tracking-widest">
          Developed by Decor&apos;s Digital
        </div>

      </div>
    </footer>
  );
};
