// app/components/navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowUpRight, Menu, X, Instagram, Mail, Phone, ArrowRight } from "lucide-react";
import { THEME, navLinks } from "@/app/data";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Cegah scroll saat menu terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // --- CONFIG ANIMASI PREMIUM (BEZIER CURVE) ---
  // FIX: Tambahkan tipe data eksplisit [number, number, number, number]
  // Ini memberi tahu TypeScript bahwa ini adalah Cubic Bezier yang valid, bukan array acak.
  const premiumEase: [number, number, number, number] = [0.76, 0, 0.24, 1]; 

  const menuVars: Variants = {
    initial: { y: "-100%" },
    animate: { 
      y: "0%", 
      transition: { duration: 0.8, ease: premiumEase } 
    },
    exit: { 
      y: "-100%", 
      transition: { duration: 0.8, ease: premiumEase } 
    }
  };

  const containerVars: Variants = {
    initial: { transition: { staggerChildren: 0.1, staggerDirection: -1 } },
    open: { transition: { delayChildren: 0.3, staggerChildren: 0.1, staggerDirection: 1 } }
  };

  const linkVars: Variants = {
    initial: { y: "100%", opacity: 0 },
    open: { 
        y: "0%", 
        opacity: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const handleScrollContact = () => {
    setIsOpen(false);
    setTimeout(() => {
        document.getElementById("footer-contact")?.scrollIntoView({ behavior: "smooth" });
    }, 800); // Tunggu menu nutup dulu baru scroll
  };

  return (
    <>
      {/* --- NAVBAR UTAMA (FIXED) --- */}
      <nav className="fixed top-6 left-0 w-full z-50 flex justify-center px-4">
        <div className="bg-[#1a0518]/80 backdrop-blur-xl border border-white/10 rounded-full px-2 pl-6 py-2 flex items-center justify-between gap-8 shadow-2xl w-full max-w-[95%] md:max-w-fit transition-all duration-500 hover:border-[#9db035]/30">
          
        {/* LOGO */}
          <div className="flex items-center gap-3 group cursor-default">
             <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-transform duration-700 group-hover:rotate-[360deg]" 
                style={{ backgroundColor: THEME.accent, color: THEME.bg }}
             >
               b
             </div>
             {/* PERBAIKAN: Hapus 'hidden md:block' agar teks muncul di semua ukuran layar */}
             <span className="font-bold tracking-widest text-sm text-white uppercase">
                Backstage.Ina
             </span>
          </div>
          {/* MENU DESKTOP */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1 border border-white/5">
            {navLinks.map((item) => (
               <a 
                 key={item.title} 
                 href={item.href} 
                 className="relative px-5 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-white transition-colors group overflow-hidden rounded-full"
               >
                 <span className="relative z-10">{item.title}</span>
                 <span className="absolute inset-0 bg-white/10 scale-0 rounded-full group-hover:scale-100 transition-transform duration-300 ease-out origin-center"></span>
               </a>
            ))}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-2">
            <button 
                onClick={handleScrollContact} 
                className="hidden md:flex bg-white text-[#1a0518] hover:bg-[#9db035] px-6 py-3 rounded-full transition-all text-xs font-bold uppercase items-center gap-2 group"
            >
               Hubungi Kami 
               <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
            </button>
            
            {/* Hamburger Mobile (Modern) */}
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className={`md:hidden w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 z-50 border 
                    ${isOpen 
                        ? 'bg-transparent border-[#1a0518]/20 text-[#1a0518]' 
                        : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                    }`}
            >
               {isOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE MENU FULLSCREEN (PREMIUM DESIGN) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            variants={menuVars} 
            initial="initial" 
            animate="animate" 
            exit="exit" 
            className="fixed inset-0 z-40 bg-[#9db035] flex flex-col md:hidden overflow-hidden"
          >
            
            {/* 1. MAIN LINKS AREA */}
            <div className="flex-1 flex flex-col justify-center px-6 pb-20 pt-32">
                <motion.div 
                    variants={containerVars} 
                    initial="initial" 
                    animate="open" 
                    exit="initial" 
                    className="flex flex-col"
                >
                  {navLinks.map((link, index) => (
                    <div key={index} className="overflow-hidden border-b border-[#1a0518]/10 last:border-none">
                      <motion.div variants={linkVars} className="relative group py-4">
                        <a href={link.href} onClick={() => setIsOpen(false)} className="flex items-center justify-between w-full">
                            <span className="block text-[#1a0518] text-5xl sm:text-6xl font-black tracking-tighter uppercase transition-transform duration-300 group-active:scale-95">
                                {link.title}
                            </span>
                            {/* Arrow Icon on Right */}
                            <div className="w-10 h-10 rounded-full border border-[#1a0518]/20 flex items-center justify-center text-[#1a0518] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                <ArrowRight size={20} className="-rotate-45" />
                            </div>
                        </a>
                      </motion.div>
                    </div>
                  ))}
                  
                  {/* Tombol Kontak Khusus */}
                  <div className="overflow-hidden mt-6">
                      <motion.div variants={linkVars}>
                        <button onClick={handleScrollContact} className="w-full py-6 bg-[#1a0518] text-[#9db035] rounded-2xl text-xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-transform">
                            Hubungi Kami <ArrowUpRight size={24}/>
                        </button>
                      </motion.div>
                  </div>
                </motion.div>
            </div>
            
            {/* 2. FOOTER INFO & MARQUEE */}
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1, transition: { delay: 0.6 } }} 
                exit={{ opacity: 0 }}
                className="relative bg-[#1a0518] py-6"
            >
                {/* Marquee Text Kecil */}
                <div className="absolute -top-8 left-0 w-full overflow-hidden">
                    <div className="flex whitespace-nowrap animate-marquee-infinite text-[#1a0518] text-xs font-mono uppercase tracking-[0.5em]">
                        {Array(5).fill("Backstage Ina • Event Production • Creative • ").map((t, i) => <span key={i}>{t}</span>)}
                    </div>
                </div>

                <div className="px-6 flex justify-between items-center">
                    <div className="flex gap-4">
                        {[Instagram, Mail, Phone].map((Icon, i) => (
                            <a key={i} href="#" className="text-[#9db035] hover:text-white transition-colors">
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                    <div className="text-right">
                        <p className="text-[#9db035] text-[10px] font-bold uppercase tracking-widest">Jakarta, ID</p>
                        <p className="text-white/40 text-[10px] uppercase">Est. 2024</p>
                    </div>
                </div>
            </motion.div>

            {/* Style khusus untuk marquee mobile */}
            <style jsx>{`
                @keyframes marquee-infinite {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee-infinite {
                    animation: marquee-infinite 10s linear infinite;
                }
            `}</style>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};