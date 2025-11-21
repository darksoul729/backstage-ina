"use client";

import Link from "next/link";
import { Linkedin, Instagram, Twitter, ArrowRight } from "lucide-react";
import { Suspense, useState, useEffect } from "react"; 
import dynamic from "next/dynamic"; 
import { ReactLenis } from "lenis/react"; 
import { motion, useScroll, useTransform } from "framer-motion"; 

// DYNAMIC IMPORT (Non-SSR) - Ringan
const StudioGraphic = dynamic(() => import("./scene"), { 
  ssr: false, 
  loading: () => <div className="w-full h-full flex items-center justify-center text-white/20 text-sm">Loading Visual...</div> 
});

// --- DATA TEAM MEMBER ---
const teamMembers = [
  { 
    id: 1, 
    name: "Atlas Suryo", 
    role: "Founder & Show Director", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    bio: "Visoner di balik kekacauan yang terorganisir. 15 tahun memimpin festival musik internasional." 
  },
  { 
    id: 2, 
    name: "Elena Wijaya", 
    role: "Head of Production", 
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    bio: "Ahli logistik dan manajemen krisis. Memastikan setiap kabel terpasang presisi." 
  },
  { 
    id: 3, 
    name: "Raka Dimas", 
    role: "Creative Director", 
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
    bio: "Otak di balik visual panggung. Mengubah konsep abstrak menjadi pengalaman nyata." 
  },
  { 
    id: 4, 
    name: "Sarah Jenkins", 
    role: "Technical Lead", 
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80",
    bio: "Engineer suara bersertifikat. Obsesif terhadap frekuensi audio dan sinkronisasi lighting." 
  },
  { 
    id: 5, 
    name: "Budi Santoso", 
    role: "Stage Manager", 
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    bio: "Komandan lapangan. Penghubung antara artis, kru, dan manajemen saat acara berlangsung." 
  },
  { 
    id: 6, 
    name: "Maya Putri", 
    role: "Client Relations", 
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80",
    bio: "Wajah ramah Backstage Ina. Menerjemahkan keinginan klien menjadi bahasa teknis tim." 
  },
];

export default function StudioPage() {
  // Parallax Ringan (Hanya Y transform)
  const { scrollYProgress } = useScroll();
  const textParallax = useTransform(scrollYProgress, [0, 1], [0, 200]); 
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Hack Hydration
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null; 

  return (
    // OPTIMASI: durasi diperpendek agar lebih responsif, touchMultiplier ditingkatkan
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true, touchMultiplier: 2 }}> 
      
      <div 
        className="min-h-screen bg-[#1a0518] text-[#f8fafc] relative overflow-x-hidden selection:bg-[#9db035] selection:text-[#1a0518]"
        suppressHydrationWarning
      >
         
         {/* Navigasi Fixed - Simplified Blur */}
         <div className="fixed top-6 left-6 md:top-10 md:left-10 z-50">
            <Link 
                href="/" 
                className="group flex items-center gap-3 pl-2 pr-6 py-2 bg-[#1a0518]/80 border border-white/10 rounded-full transition-all hover:border-[#9db035]/50 hover:shadow-lg"
            >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-[#9db035] group-hover:border-[#9db035] transition-all duration-300">
                    <ArrowRight className="text-white w-4 h-4 rotate-180 group-hover:text-[#1a0518]" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[8px] text-slate-400 uppercase tracking-widest font-mono mb-[2px]">Navigasi</span>
                    <span className="text-xs font-bold text-white tracking-[0.15em] uppercase">Beranda</span>
                </div>
            </Link>
         </div>

         {/* --- SECTION 1: HERO GRAPHIC (OPTIMIZED) --- */}
         <section className="h-[100vh] w-full relative flex items-center justify-center bg-gradient-to-b from-[#1a0518] to-[#150313] overflow-hidden">
            
            {/* Graphic Component */}
            <div className="absolute inset-0 w-full h-full z-10">
               <StudioGraphic />
            </div>

            {/* PARALLAX TEXT (Will-change untuk optimasi render) */}
            <motion.div 
                style={{ y: textParallax, willChange: "transform" }} 
                className="relative z-0 text-center px-4 select-none"
            >
               <h1 className="text-[18vw] font-black leading-none text-white/[0.04] tracking-tighter">
                  STUDIO
               </h1>
            </motion.div>

            {/* HERO CONTENT */}
            <motion.div 
                style={{ opacity: heroOpacity }} 
                className="absolute bottom-20 left-6 md:bottom-24 md:left-24 z-20 max-w-sm md:max-w-2xl pointer-events-none"
            >
               <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 leading-[0.9]">
                 The Architects of <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9db035] to-white">Experience.</span>
               </h2>
               <p className="text-slate-400 text-sm md:text-xl max-w-lg leading-relaxed mt-4 md:mt-6">
                 Di balik setiap detik acara yang sempurna, ada ratusan jam obsesi, perhitungan teknis, dan kopi dingin dari tim ini.
               </p>
            </motion.div>
         </section>


         {/* --- SECTION 2: THE SQUAD (OPTIMIZED GRID) --- */}
         <div className="relative z-30 bg-[#1a0518] rounded-t-[3rem] -mt-20 border-t border-white/10">
            <section className="px-6 md:px-24 py-20 md:py-32">
            
            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-12 md:mb-24">
                <h2 className="text-4xl md:text-6xl font-bold text-white">Struktur Inti</h2>
                <div className="hidden md:block h-[1px] flex-grow bg-white/10 mb-4 mx-6"></div>
                <span className="text-[#9db035] font-mono text-xs tracking-widest mb-2">MEET THE TEAM</span>
            </div>

            {/* Grid: Hapus perspective berat, ganti shadow ringan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {teamMembers.map((member, i) => (
                <motion.div 
                    key={member.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "50px" }} // Load lebih awal
                    transition={{ duration: 0.4, delay: i * 0.05 }} // Animasi lebih cepat
                    className="group relative bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden hover:border-[#9db035]/30 transition-colors"
                >
                {/* Image: Gunakan opacity layer daripada mix-blend (berat) */}
                <div className="h-80 md:h-[450px] w-full overflow-hidden relative bg-gray-900">
                    <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover opacity-80 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        loading="lazy"
                    />
                    {/* Gradient overlay simple */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a0518] to-transparent opacity-90"></div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-[1px] w-8 bg-[#9db035]"></div>
                            <p className="text-[#9db035] font-mono text-[10px] md:text-xs uppercase tracking-widest">{member.role}</p>
                        </div>
                        
                        <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-none">{member.name}</h3>
                        
                        {/* Bio: Opacity transition (lebih ringan dari height animation) */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                            <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-4 border-t border-white/10 pt-3 line-clamp-3">
                                {member.bio}
                            </p>
                            <div className="flex gap-4">
                                <SocialIcon icon={Linkedin} />
                                <SocialIcon icon={Instagram} />
                                <SocialIcon icon={Twitter} />
                            </div>
                        </div>
                    </div>
                </div>
                </motion.div>
            ))}
            </div>

        

            </section>
         </div>
      </div>
    </ReactLenis>
  );
}

function SocialIcon({ icon: Icon }: any) {
    return (
        <a href="#" className="text-white/50 hover:text-[#9db035] transition-colors">
            <Icon size={16} />
        </a>
    )
}