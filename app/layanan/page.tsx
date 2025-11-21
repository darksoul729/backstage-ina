"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Speaker, Lightbulb, PenTool, LayoutTemplate, ArrowRight, Box } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamic Import (Penting agar halaman tidak berat saat load awal)
const ServiceScene = dynamic(() => import("./scene"), { 
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center text-[#9DB035] animate-pulse font-mono text-xs">LOADING 3D...</div>
});

export default function LayananPage() {
  // Menyimpan string judul layanan yang sedang aktif (diklik)
  const [activeService, setActiveService] = useState<string | null>(null);

  const services = [
    { 
      icon: Speaker, 
      title: "Sound System", 
      desc: "Line array engineering, acoustics tuning, dan live mixing untuk kejernihan suara mutlak." 
    },
    { 
      icon: Lightbulb, 
      title: "Lighting Design", 
      desc: "Pemrograman DMX, timecode show, dan instalasi visual yang sinkron dengan emosi acara." 
    },
    { 
      icon: LayoutTemplate, 
      title: "Stage Rigging", 
      desc: "Struktur panggung bersertifikasi keamanan tinggi dengan desain modular yang fleksibel." 
    },
    { 
      icon: PenTool, 
      title: "Concept Art", 
      desc: "Visualisasi 3D pre-event untuk memastikan ekspektasi klien sesuai dengan realita." 
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a0518] text-[#f8fafc] px-6 md:px-24 py-32 relative overflow-x-hidden selection:bg-[#9DB035] selection:text-[#3F1D38]">
      
      {/* --- NAVIGASI FIXED (SESUAI TEMA BARU) --- */}
      <div className="fixed top-6 left-6 md:top-10 md:left-10 z-50">
        <Link 
            href="/" 
            className="group flex items-center gap-3 pl-2 pr-6 py-2 bg-[#3F1D38]/40 backdrop-blur-md border border-[#9DB035]/20 rounded-full transition-all duration-300 hover:bg-[#3F1D38]/80 hover:border-[#9DB035] hover:shadow-[0_0_30px_rgba(157,176,53,0.2)]"
        >
            <div className="w-10 h-10 rounded-full bg-[#9DB035]/10 flex items-center justify-center border border-[#9DB035]/20 group-hover:bg-[#9DB035] group-hover:border-[#9DB035] transition-all duration-300">
                <ArrowRight className="text-[#9DB035] w-4 h-4 rotate-180 group-hover:text-[#3F1D38] transition-colors duration-300 group-hover:-translate-x-1" />
            </div>
            <div className="flex flex-col">
                <span className="text-[8px] text-slate-400 uppercase tracking-widest font-mono mb-[2px] group-hover:text-[#9DB035] transition-colors">Navigasi</span>
                <span className="text-xs font-bold text-white tracking-[0.15em] uppercase group-hover:tracking-[0.2em] transition-all duration-300">
                    Beranda
                </span>
            </div>
        </Link>
      </div>

      {/* --- BACKGROUND DECOR --- */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#9DB035] rounded-full blur-[250px] opacity-10 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#3F1D38] rounded-full blur-[200px] opacity-30 pointer-events-none"></div>

      {/* --- HEADER --- */}
      <div className="mb-20 text-center relative z-10 mt-10">
        <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter">
          Spesialisasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9DB035] to-white">Teknis.</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-lg">Klik kartu di bawah untuk mengaktifkan simulasi visual interaktif.</p>
      </div>

      {/* --- GRID SERVICES --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 max-w-6xl mx-auto">
        {services.map((item, i) => {
          
          const isActive = activeService === item.title;

          return (
            <motion.div 
              layout // MAGIC PROP: Transisi halus
              key={item.title}
              onClick={() => setActiveService(isActive ? null : item.title)} 
              className={`relative p-8 md:p-10 rounded-[2.5rem] border transition-all cursor-pointer overflow-hidden duration-500
                ${isActive 
                    ? 'bg-[#1a0518] border-[#9DB035] shadow-[0_0_50px_rgba(157,176,53,0.15)] ring-1 ring-[#9DB035]' 
                    : 'bg-white/[0.02] border-white/10 hover:border-[#9DB035]/50 hover:bg-[#3F1D38]/20'
                }
              `}
            >
                {/* Bagian Visual (Icon atau 3D) */}
                <motion.div layout className="relative w-full mb-8">
                    {isActive ? (
                        // TAMPILAN 3D (Saat Aktif)
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="h-64 w-full rounded-2xl overflow-hidden bg-gradient-to-b from-black/40 to-black/0 border border-[#9DB035]/20"
                        >
                            {/* Panggil Scene 3D disini */}
                            <ServiceScene type={item.title} />
                            
                            {/* Hint Text Kecil */}
                            <div className="absolute bottom-2 w-full text-center text-[10px] text-[#9DB035] font-mono uppercase tracking-widest opacity-80">
                                Interactive Model
                            </div>
                        </motion.div>
                    ) : (
                        // TAMPILAN ICON BIASA (Saat Tidak Aktif)
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-20 h-20 rounded-2xl bg-[#9DB035] text-[#3F1D38] flex items-center justify-center shadow-[0_0_30px_rgba(157,176,53,0.3)]"
                        >
                            <item.icon size={36} strokeWidth={1.5} />
                        </motion.div>
                    )}
                </motion.div>
                
                {/* Teks Info */}
                <motion.div layout>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className={`text-3xl font-bold transition-colors ${isActive ? 'text-[#9DB035]' : 'text-white group-hover:text-[#9DB035]'}`}>
                            {item.title}
                        </h3>
                        {/* Indikator Status */}
                        <div className={`p-2 rounded-full border transition-colors duration-300 ${isActive ? 'border-[#9DB035] text-[#9DB035] bg-[#9DB035]/10' : 'border-white/10 text-slate-500 group-hover:border-[#9DB035]/50 group-hover:text-white'}`}>
                            {isActive ? <ArrowRight size={16} className="-rotate-45"/> : <Box size={16}/>}
                        </div>
                    </div>
                    
                    <p className="text-slate-400 leading-relaxed text-lg">
                        {item.desc}
                    </p>
                </motion.div>

            </motion.div>
          );
        })}
      </div>

    </div>
  );
}