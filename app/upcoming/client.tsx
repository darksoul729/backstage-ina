"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Ticket, ArrowUpRight, Bell, Clock, History, ArrowLeft } from "lucide-react";

// THEME COLORS DARI LOGO
const BRAND = {
  green: "#9DB035", // Warna Hijau Lime Logo
  purple: "#3F1D38", // Warna Ungu Tua Logo
  dark: "#1a0518",   // Background Website
};

export default function UpcomingClient({ initialEvents }: { initialEvents: any[] }) {
  
  const featuredEvent = initialEvents && initialEvents.length > 0 ? initialEvents[0] : null;
  
  const listEvents = initialEvents && initialEvents.length > 1 
    ? initialEvents.slice(1).sort((a, b) => (a.timeline === 'Finished' ? 1 : -1)) 
    : [];

  return (
    <div className="min-h-screen bg-[#1a0518] text-[#f8fafc] px-6 md:px-24 py-32 relative overflow-hidden font-sans selection:bg-[#9DB035] selection:text-[#3F1D38]">
      
      {/* --- NAVIGASI FIXED (SESUAI LOGO) --- */}
      <div className="fixed top-6 left-6 md:top-10 md:left-10 z-50">
        <Link 
            href="/" 
            className="group flex items-center gap-3 pl-2 pr-6 py-2 bg-[#3F1D38]/40 backdrop-blur-md border border-[#9DB035]/20 rounded-full transition-all duration-300 hover:bg-[#3F1D38]/80 hover:border-[#9DB035] hover:shadow-[0_0_30px_rgba(157,176,53,0.2)]"
        >
            <div className="w-10 h-10 rounded-full bg-[#9DB035]/10 flex items-center justify-center border border-[#9DB035]/20 group-hover:bg-[#9DB035] group-hover:border-[#9DB035] transition-all duration-300">
                <ArrowLeft className="text-[#9DB035] w-4 h-4 group-hover:text-[#3F1D38] transition-colors duration-300 group-hover:-translate-x-1" />
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
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#3F1D38] rounded-full blur-[300px] opacity-30 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#9DB035] rounded-full blur-[300px] opacity-10 pointer-events-none"></div>

      {/* --- HEADER --- */}
      <div className="mb-20 mt-10 relative z-10">
        <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight">
          Timeline <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9DB035] to-white">Event.</span>
        </h1>
        <div className="h-1 w-24 bg-[#9DB035] rounded-full"></div>
      </div>

      {/* --- FEATURED EVENT --- */}
      {featuredEvent ? (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`relative w-full h-[550px] md:h-[650px] rounded-[2.5rem] overflow-hidden mb-24 group border border-white/10 shadow-2xl
            ${featuredEvent.timeline === 'Finished' ? 'grayscale' : ''} 
          `}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
            style={{ backgroundImage: `url(${featuredEvent.image})` }}
          ></div>
          
          {/* Gradient Overlay menggunakan warna Ungu Logo */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0518] via-[#3F1D38]/60 to-transparent opacity-90"></div>
          
          {/* Badge Status */}
          <div className="absolute top-8 right-8">
             <span className={`px-5 py-2 rounded-full backdrop-blur-md border font-bold text-xs uppercase tracking-widest shadow-lg flex items-center gap-2
                ${featuredEvent.timeline === 'Finished' 
                    ? 'bg-black/50 border-white/20 text-white' 
                    : 'bg-[#9DB035] border-[#9DB035] text-[#3F1D38]'
                }`}>
                {featuredEvent.timeline === 'Finished' ? 'Selesai' : (
                    <>
                        <span className="w-2 h-2 rounded-full bg-[#3F1D38] animate-pulse"></span> Highlight
                    </>
                )}
             </span>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4 opacity-80">
                 <div className="w-8 h-8 rounded-full bg-[#9DB035] text-[#3F1D38] flex items-center justify-center">
                    <Ticket size={16} />
                 </div>
                 <span className="text-sm font-mono tracking-widest uppercase text-white">Featured Production</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-black mb-6 text-white leading-[0.9] uppercase tracking-tighter">
                {featuredEvent.title}
              </h2>
              
              <div className="flex flex-wrap gap-6 text-sm md:text-base text-slate-300 mb-8 font-mono border-l-4 border-[#9DB035] pl-6">
                 <div className="flex items-center gap-2"><Calendar size={16} className="text-[#9DB035]"/> {featuredEvent.date}</div>
                 <div className="flex items-center gap-2"><MapPin size={16} className="text-[#9DB035]"/> {featuredEvent.location}</div>
              </div>
              
              <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl">
                 {featuredEvent.description}
              </p>
            </div>

            <div className="flex flex-col items-end gap-2 bg-[#3F1D38]/30 backdrop-blur-md p-6 rounded-2xl border border-white/5">
                <p className="text-[10px] text-[#9DB035] uppercase tracking-widest font-bold">Tiket Masuk</p>
                <div className="text-3xl md:text-4xl font-black text-white tracking-tight">
                    {featuredEvent.price}
                </div>
                <div className="mt-1 px-3 py-1 rounded border border-white/10 text-[10px] uppercase tracking-widest text-slate-300 bg-white/5">
                    {featuredEvent.status}
                </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="w-full h-64 flex items-center justify-center border border-dashed border-white/10 rounded-3xl mb-20">
            <p className="text-slate-500">Belum ada event yang dijadwalkan.</p>
        </div>
      )}


      {/* --- LIST EVENT LAINNYA --- */}
      <div className="relative z-10">
        <div className="flex items-end gap-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Jadwal Lengkap</h2>
            <div className="h-[1px] flex-grow bg-white/10 mb-2"></div>
        </div>

        <div className="flex flex-col gap-6">
          {listEvents.map((event, i) => {
            const isFinished = event.timeline === 'Finished';
            
            return (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative p-6 md:p-8 rounded-[2rem] border transition-all duration-500 flex flex-col md:flex-row gap-8 items-center
                ${isFinished 
                    ? 'bg-[#1a0518] border-white/5 grayscale opacity-60' 
                    : 'bg-[#3F1D38]/10 border-white/10 hover:border-[#9DB035]/50 hover:bg-[#3F1D38]/30 hover:shadow-[0_0_30px_rgba(157,176,53,0.1)]'
                }
              `}
            >
              {/* Date Box */}
              <div className={`flex-shrink-0 w-full md:w-32 h-32 rounded-2xl flex flex-col items-center justify-center text-center border transition-colors
                  ${isFinished ? 'bg-white/5 border-white/5' : 'bg-[#1a0518] border-white/10 group-hover:border-[#9DB035] group-hover:bg-[#9DB035] group-hover:text-[#3F1D38]'}
              `}>
                 {isFinished ? <History size={24} className="text-slate-500 mb-2"/> : <Clock size={24} className="text-[#9DB035] group-hover:text-[#3F1D38] mb-2 transition-colors"/>}
                 <span className={`text-xs font-bold px-2 ${isFinished ? 'text-slate-500' : 'text-white group-hover:text-[#3F1D38]'}`}>{event.date}</span>
              </div>

              {/* Info */}
              <div className="flex-grow text-center md:text-left w-full">
                 <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <h3 className={`text-2xl md:text-3xl font-bold transition-colors ${isFinished ? 'text-slate-500' : 'text-white group-hover:text-[#9DB035]'}`}>
                        {event.title}
                    </h3>
                    {isFinished && (
                        <span className="px-2 py-1 rounded bg-white/10 text-[10px] uppercase font-bold text-slate-400">Selesai</span>
                    )}
                 </div>
                 
                 <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-sm font-mono">
                    <span className={`flex items-center gap-2 ${isFinished ? 'text-slate-600' : 'text-slate-400'}`}>
                        <MapPin size={14} /> {event.location}
                    </span>
                    <span className={`hidden md:block w-1 h-1 rounded-full ${isFinished ? 'bg-slate-700' : 'bg-slate-500'}`}></span>
                    <span className={`${isFinished ? 'text-slate-600' : 'text-[#9DB035] font-bold'}`}>
                        {event.price}
                    </span>
                 </div>
              </div>

              {/* Action Button (Sesuai Logo) */}
              <div className="flex-shrink-0 w-full md:w-auto flex flex-col gap-3 items-center md:items-end">
                 {!isFinished && (
                     <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border 
                        ${event.status === 'Available' ? 'border-[#9DB035] text-[#9DB035]' : 'border-red-500 text-red-500'}`}>
                        {event.status}
                     </span>
                 )}

                 {isFinished ? (
                     <button disabled className="px-8 py-4 rounded-xl border border-white/5 text-slate-600 text-xs font-bold uppercase tracking-widest cursor-not-allowed bg-white/[0.02]">
                        Event Ended
                     </button>
                 ) : (
                     <button className="group/btn relative px-8 py-4 rounded-xl bg-white text-[#3F1D38] text-xs font-bold uppercase tracking-widest transition-all hover:bg-[#9DB035] hover:scale-105 hover:shadow-lg overflow-hidden flex items-center gap-2">
                        <span>Info Detail</span>
                        <ArrowUpRight size={14} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"/>
                     </button>
                 )}
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>

      {/* --- NEWSLETTER (Matching Gradient) --- */}
      <div className="mt-32 relative">
         <div className="absolute inset-0 bg-gradient-to-r from-[#9DB035] to-[#3F1D38] rounded-[2.5rem] blur-lg opacity-40"></div>
         <div className="relative p-10 md:p-16 rounded-[2.5rem] bg-[#1a0518] border border-[#9DB035]/30 overflow-hidden flex flex-col md:flex-row justify-between items-center gap-10">
            
            {/* Background Graphic */}
            <div className="absolute -right-20 -bottom-40 opacity-10 pointer-events-none text-[#9DB035]">
                <Bell size={400} strokeWidth={0.5} />
            </div>

            <div className="max-w-xl relative z-10">
                <h3 className="text-3xl md:text-5xl font-black mb-4 text-white">Jangan Ketinggalan Hype.</h3>
                <p className="text-slate-400 text-lg">Dapatkan akses prioritas untuk tiket Early Bird dan pengumuman lineup rahasia.</p>
            </div>

            <div className="flex w-full md:w-auto gap-2 relative z-10 bg-white/5 p-2 rounded-full border border-white/10 backdrop-blur-sm">
                <input type="email" placeholder="Email Anda..." className="px-6 py-3 rounded-full bg-transparent text-white placeholder-white/30 focus:outline-none w-full md:w-80" />
                <button className="px-8 py-3 rounded-full bg-[#9DB035] hover:bg-[#bada55] text-[#3F1D38] font-bold uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(157,176,53,0.5)]">
                    Join
                </button>
            </div>
         </div>
      </div>

    </div>
  );
}