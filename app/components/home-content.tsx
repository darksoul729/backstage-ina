"use client";

import { useState, MouseEvent } from "react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Mail, Phone, Instagram, MapPin, Zap, Layers, Trophy } from "lucide-react";
import { PillButton } from "./ui-elements";
import { workflowSteps } from "@/app/data";

// --- 1. SUB-KOMPONEN: SPOTLIGHT CARD (Bento Grid Keren) ---
function SpotlightCard({ children, className = "", title, sub }: any) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-white/10 bg-white/[0.02] overflow-hidden rounded-[2rem] ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Efek Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(157, 176, 53, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      {/* Border Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              rgba(157, 176, 53, 0.4),
              transparent 80%
            )
          `,
        }}
      />

      {/* Content */}
      <div className="relative h-full p-8 flex flex-col z-10">
        {title && (
            <div className="mb-6 flex justify-between items-start">
                <div>
                    <span className="text-[#9db035] font-mono text-xs tracking-widest mb-2 block uppercase">{sub}</span>
                    <h3 className="text-2xl font-bold text-white leading-tight group-hover:text-[#9db035] transition-colors">{title}</h3>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-[#9db035] group-hover:text-[#1a0518] group-hover:border-[#9db035] transition-all duration-500">
                    <ArrowUpRight size={18} />
                </div>
            </div>
        )}
        {children}
      </div>
      
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
    </div>
  );
}

// --- 2. SUB-KOMPONEN: DUAL MARQUEE (Solid & Jelas) ---
const DualMarquee = () => {
    return (
        <div className="w-full py-12 overflow-hidden relative flex flex-col gap-0 rotate-[-2deg] scale-110 origin-center my-20 bg-[#9db035] shadow-[0_0_50px_rgba(157,176,53,0.4)] border-y-8 border-[#1a0518] z-20">
            <div className="flex whitespace-nowrap animate-marquee border-b border-[#1a0518]/20 pb-1">
                {[...Array(10)].map((_, i) => (
                    <span key={i} className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-[#1a0518] mx-4 flex items-center gap-6">
                        Event Production <div className="w-4 h-4 bg-[#1a0518] rounded-full"></div>
                    </span>
                ))}
            </div>
            <div className="flex whitespace-nowrap animate-marquee-reverse pt-1">
                {[...Array(10)].map((_, i) => (
                    <span key={i} className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-transparent mx-4 flex items-center gap-6" style={{ WebkitTextStroke: "2px #1a0518" }}>
                        Live Experience <div className="w-4 h-4 bg-[#1a0518] rounded-full"></div>
                    </span>
                ))}
            </div>
            <style jsx>{`
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                @keyframes marquee-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
                .animate-marquee { animation: marquee 30s linear infinite; }
                .animate-marquee-reverse { animation: marquee-reverse 30s linear infinite; }
            `}</style>
        </div>
    )
}

// --- 3. MAIN COMPONENT (Disatukan) ---
export const HomeContent = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="w-full flex flex-col">
      
      {/* SECTION 1: HERO */}
      <section className="w-full min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-24 md:pt-0 relative">
        <div className="max-w-4xl z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#9db035] animate-pulse" />
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/60">Open Booking 2025</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-medium leading-[1.1] md:leading-[1] tracking-tight mb-8 text-white">
              Merekayasa <br /><span className="italic font-serif text-[#9db035]">Kekacauan</span> <br className="md:hidden" />Menjadi Keajaiban.
            </h1>
            <p className="text-sm md:text-lg lg:text-xl text-slate-400 mb-10 max-w-xl leading-relaxed">Backstage Ina mengubah kerumitan acara korporat menjadi pengalaman yang cair. Kami membereskan kabel kusut, Anda terima tepuk tangan.</p>
            <div className="flex flex-col md:flex-row gap-4 max-w-sm md:max-w-none">
              <PillButton text="Mulai Proyek" primary /><PillButton text="Lihat Showreel" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: DUAL MARQUEE */}
      <section className="py-10 overflow-hidden">
          <DualMarquee />
      </section>

      {/* SECTION 3: LAYANAN (SPOTLIGHT BENTO GRID) */}
      <section className="w-full px-6 md:px-16 lg:px-24 py-10 md:py-20 flex flex-col justify-center">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-2">Keahlian Kami</h2>
            <div className="h-1 w-24 bg-[#9db035] rounded-full"></div>
          </div>
          <p className="text-slate-400 max-w-sm text-right hidden md:block">
              Kombinasi teknologi presisi dan kreativitas tanpa batas untuk hasil yang memukau.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-6 h-auto lg:h-[800px]">
          
          {/* Kartu 1: Produksi (Gambar Besar) */}
          <SpotlightCard className="lg:col-span-2 lg:row-span-2 min-h-[400px]" title="Produksi Skala Penuh" sub="01 / CORE">
            <p className="text-slate-400 max-w-md mb-8 text-sm md:text-base relative z-10">
                Manajemen teknis end-to-end. Sound, lighting, rig, hingga crowd control dengan standar keamanan internasional.
            </p>
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0518] via-[#1a0518]/80 to-transparent z-10" />
                <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[1.5s]" alt="Stage" />
            </div>
            <div className="mt-auto relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#9db035]/20 text-[#9db035] text-xs font-bold border border-[#9db035]/30">
                    <Zap size={12}/> Live Concert Ready
                </div>
            </div>
          </SpotlightCard>

          {/* Kartu 2: Kreatif (Abstrak) */}
          <SpotlightCard className="min-h-[300px]" title="Konsep Kreatif" sub="02 / VISUAL">
            <div className="flex items-center justify-center h-full relative py-8">
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <Layers size={150} strokeWidth={0.5} className="text-white group-hover:text-[#9db035] transition-colors duration-500 rotate-12"/>
                </div>
                <div className="text-center z-10">
                    <div className="text-4xl md:text-5xl font-black text-white tracking-tighter">Unik.</div>
                    <div className="text-xs font-mono text-[#9db035] mt-2 tracking-widest">TIDAK ADA DUANYA</div>
                </div>
            </div>
          </SpotlightCard>

          {/* Kartu 3: Data (Angka Besar) */}
          <SpotlightCard className="!bg-[#9db035] !border-none text-[#1a0518] min-h-[300px]" title="Kepuasan" sub="03 / DATA">
            <div className="flex flex-col h-full justify-end relative overflow-hidden">
                <Trophy size={120} className="absolute -right-6 -top-6 opacity-10 text-[#1a0518]" />
                <div className="text-7xl md:text-8xl font-black tracking-tighter leading-none">
                    100<span className="text-4xl align-top">%</span>
                </div>
                <p className="font-bold text-sm opacity-80 uppercase tracking-widest mt-2 border-t border-[#1a0518]/20 pt-4">
                    On-Time Delivery
                </p>
            </div>
          </SpotlightCard>

        </div>
      </section>

      {/* SECTION 4: WORKFLOW */}
      <section className="w-full px-6 md:px-16 lg:px-24 py-20 relative z-20">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 relative">
                <div className="mb-10">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Workflow.</h2>
                    <p className="text-slate-400">Proses kami transparan, cepat, dan mematikan.</p>
                </div>
                
                <div className="absolute left-[19px] top-24 bottom-4 w-[2px] bg-white/10 hidden md:block"></div>

                {workflowSteps.map((step, idx) => (
                    <div key={idx} onMouseEnter={() => setActiveStep(idx)} className={`group relative flex gap-6 cursor-pointer transition-all duration-300 ${activeStep === idx ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}>
                        <div className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500
                            ${activeStep === idx 
                                ? 'border-[#9db035] bg-[#9db035] text-[#1a0518] scale-110 shadow-[0_0_20px_rgba(157,176,53,0.4)]' 
                                : 'border-white/20 bg-[#1a0518] text-slate-500'
                            }`}
                        >
                            {activeStep === idx ? <CheckCircle2 size={20}/> : <span className="font-mono text-xs font-bold">0{idx + 1}</span>}
                        </div>

                        <div>
                            <h4 className={`text-xl md:text-2xl font-bold mb-2 transition-colors ${activeStep === idx ? 'text-white' : 'text-slate-300'}`}>
                                {step.title}
                            </h4>
                            <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-md">
                                {step.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* KOLOM KANAN: Visual Dinamis */}
            <div className="h-[400px] md:h-[500px] w-full relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                    >
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${workflowSteps[activeStep].image})` }}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0518] via-[#1a0518]/50 to-transparent"></div>
                        
                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-10">
                            <div className="inline-block px-3 py-1 rounded-full border border-[#9db035] text-[#9db035] text-[10px] font-bold uppercase tracking-widest mb-4 bg-[#1a0518]/80 backdrop-blur-md">
                                Langkah 0{activeStep + 1}
                            </div>
                            <h3 className="text-3xl md:text-5xl font-black text-white uppercase leading-none">
                                {workflowSteps[activeStep].keyword}
                            </h3>
                        </div>
                    </motion.div>
                </AnimatePresence>
                
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
            </div>
         </div>
      </section>

      {/* SECTION 5: FOOTER LENGKAP & SOLID */}
      <footer id="footer-contact" className="w-full relative bg-[#150313] border-t border-white/10 mt-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9db035] rounded-full blur-[150px] opacity-5 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="px-6 md:px-16 lg:px-24 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* KOLOM KIRI: Info & Kontak */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8">
                  <span className="w-2 h-2 rounded-full bg-[#9db035] animate-pulse"/>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">Siap untuk Musim 2025</span>
                </div>
                
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Punya visi gila? <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9db035] to-white">Kami yang eksekusi.</span>
                </h2>
                <p className="text-slate-400 max-w-md leading-relaxed mb-10 text-sm md:text-base">
                  Jangan biarkan ide besar Anda hanya menjadi konsep. Isi formulir untuk konsultasi gratis. Kami akan membedah konsep acara Anda dan memberikan blueprint teknis awal.
                </p>
              </div>

              <div className="space-y-6">
                 <div className="flex items-center md:items-start gap-4">
                    <div className="p-3 rounded-full bg-white/5 border border-white/10 text-[#9db035] shrink-0"><Mail size={20}/></div>
                    <div>
                      <p className="text-[10px] md:text-xs text-slate-500 font-mono uppercase tracking-widest mb-1">Email Resmi</p>
                      <a href="mailto:project@backstage.ina" className="text-lg font-bold text-white hover:text-[#9db035] transition-colors break-all">project@backstage.ina</a>
                    </div>
                 </div>
                 <div className="flex items-center md:items-start gap-4">
                    <div className="p-3 rounded-full bg-white/5 border border-white/10 text-[#9db035] shrink-0"><Phone size={20}/></div>
                    <div>
                      <p className="text-[10px] md:text-xs text-slate-500 font-mono uppercase tracking-widest mb-1">WhatsApp / Telepon</p>
                      <a href="#" className="text-lg font-bold text-white hover:text-[#9db035] transition-colors">+62 821 5555 9000</a>
                    </div>
                 </div>
              </div>
            </div>

            {/* KOLOM KANAN: Form High Contrast */}
            <div className="bg-[#13020e] border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl ring-1 ring-white/5">
              <form className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#9db035] uppercase tracking-widest ml-1">Nama / Perusahaan</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-[#1a0518] border border-white/20 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#9db035] focus:ring-1 focus:ring-[#9db035] transition-all" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#9db035] uppercase tracking-widest ml-1">Email Resmi</label>
                    <input type="email" placeholder="email@kantor.com" className="w-full bg-[#1a0518] border border-white/20 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#9db035] focus:ring-1 focus:ring-[#9db035] transition-all" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#9db035] uppercase tracking-widest ml-1">Jenis Acara</label>
                  <div className="relative">
                    <select className="w-full bg-[#1a0518] border border-white/20 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#9db035] focus:ring-1 focus:ring-[#9db035] transition-all appearance-none cursor-pointer">
                        <option className="bg-[#1a0518]">Konser Musik / Festival</option>
                        <option className="bg-[#1a0518]">Corporate Gathering</option>
                        <option className="bg-[#1a0518]">Product Launch</option>
                        <option className="bg-[#1a0518]">Pameran / Eksibisi</option>
                        <option className="bg-[#1a0518]">Lainnya</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▼</div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#9db035] uppercase tracking-widest ml-1">Detail Kebutuhan</label>
                  <textarea rows={4} placeholder="Ceritakan visi acara Anda..." className="w-full bg-[#1a0518] border border-white/20 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#9db035] focus:ring-1 focus:ring-[#9db035] transition-all resize-none leading-relaxed"></textarea>
                </div>

                <button type="button" className="group w-full py-4 mt-2 bg-[#9db035] hover:bg-[#8ca025] text-[#1a0518] rounded-xl font-bold text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#9db035]/20 hover:shadow-[#9db035]/40 hover:scale-[1.02]">
                  Kirim Pesan
                  <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/>
                </button>
              </form>
            </div>

          </div>

          {/* Footer Bottom */}
          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 text-xs font-mono">
             <div className="flex items-center gap-2">
               <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-white font-bold text-xs">b</div>
               <span><a href="/admin/dashboard" className="hover:text-[#9db035] cursor-default">&copy;</a> 2025 Backstage Ina Group.</span>
             </div>
             <div className="flex flex-wrap justify-center gap-6 md:gap-8">
               <a href="#" className="hover:text-[#9db035] transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-[#9db035] transition-colors">Terms of Service</a>
               <a href="/karir" className="hover:text-[#9db035] transition-colors">Karir</a>
             </div>
             <div className="flex gap-4">
                {[Instagram, Mail, Phone, MapPin].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#9db035] hover:text-[#1a0518] hover:border-[#9db035] transition-all">
                    <Icon size={14}/>
                  </a>
                ))}
             </div>
          </div>
        </div>
      </footer>
      
      <div className="w-full h-10 bg-[#150313]"></div>
    </div>
  );
};