// app/components/ui-elements.tsx
"use client";

import { THEME } from "@/app/data";
import { ArrowUpRight, Plus } from "lucide-react";

export const PillButton = ({ text, primary = false }: { text: string; primary?: boolean }) => (
  <button className={`w-full md:w-auto px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-xs md:text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 ${primary ? `bg-[${THEME.accent}] text-[#1a0518] hover:scale-105 shadow-[0_0_20px_rgba(157,176,53,0.3)]` : "bg-transparent border border-white/20 text-white hover:bg-white/5"}`} style={primary ? { backgroundColor: THEME.accent, color: "#1a0518" } : {}}>
    {text} {primary && <ArrowUpRight size={16} />}
  </button>
);

export const GlassCard = ({ children, className = "", title, sub, noPadding = false }: any) => (
  <div className={`group relative overflow-hidden rounded-[2rem] backdrop-blur-md border hover:border-white/30 hover:bg-white/5 transition-all duration-500 flex flex-col ${className} ${noPadding ? "p-0" : "p-6 md:p-8"}`} style={{ backgroundColor: THEME.cardBg, borderColor: THEME.cardBorder }}>
    {(title || sub) && !noPadding && (
      <div className="mb-6 flex justify-between items-start z-10 relative">
        <div>
          {sub && <span className="text-[#9db035] font-mono text-xs tracking-widest mb-2 block">{sub}</span>}
          {title && <h3 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-white">{title}</h3>}
        </div>
        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-[#9db035] group-hover:text-black group-hover:border-[#9db035] transition-all shrink-0 ml-4"><Plus size={14} /></div>
      </div>
    )}
    <div className="relative z-10 h-full">{children}</div>
  </div>
);

export const Marquee = () => (
  <div className="w-full py-6 md:py-10 overflow-hidden bg-[#9db035] text-[#1a0518] rotate-[-2deg] scale-105 shadow-2xl my-10 md:my-20 border-y-4 border-[#1a0518]">
    <div className="whitespace-nowrap flex gap-4 md:gap-8 animate-marquee">
      {[...Array(10)].map((_, i) => (
        <span key={i} className="text-3xl md:text-6xl font-black uppercase tracking-tighter flex items-center gap-4 md:gap-8">
          Event Management <span className="w-2 h-2 md:w-4 md:h-4 rounded-full bg-[#1a0518]" /> Creative Direction <span className="w-2 h-2 md:w-4 md:h-4 rounded-full bg-[#1a0518]" />
        </span>
      ))}
    </div>
    <style jsx>{`
      @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      .animate-marquee { animation: marquee 20s linear infinite; }
    `}</style>
  </div>
);