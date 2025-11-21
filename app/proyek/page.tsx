import { getProjects } from "@/app/actions"; 
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ClientProjectCard from "./client"; 

export default async function ProyekPage() {
  const projects = await getProjects(); 
  
  const highlightProject = projects.length > 0 ? projects[0] : null;
  const gridProjects = projects.length > 1 ? projects.slice(1) : [];

  return (
    // Background Polos (#1a0518) tanpa dekorasi aneh-aneh
    <div className="min-h-screen bg-[#1a0518] text-[#f8fafc] relative overflow-x-hidden selection:bg-[#9DB035] selection:text-[#3F1D38]">
      
      {/* --- NAVIGASI FIXED --- */}
      <div className="fixed top-6 left-6 md:top-10 md:left-10 z-50">
        <Link 
            href="/" 
            className="group flex items-center gap-3 pl-2 pr-6 py-2 bg-[#1a0518]/80 backdrop-blur-md border border-white/10 rounded-full transition-all duration-300 hover:border-[#9DB035]"
        >
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-[#9DB035] group-hover:text-[#1a0518] transition-all duration-300">
                <ArrowRight className="text-white w-4 h-4 rotate-180 transition-colors duration-300 group-hover:-translate-x-1" />
            </div>
            <div className="flex flex-col">
                <span className="text-[8px] text-slate-400 uppercase tracking-widest font-mono mb-[2px] group-hover:text-[#9DB035] transition-colors">Navigasi</span>
                <span className="text-xs font-bold text-white tracking-[0.15em] uppercase group-hover:tracking-[0.2em] transition-all duration-300">
                    Beranda
                </span>
            </div>
        </Link>
      </div>

      {/* (BAGIAN BACKGROUND DECOR DIHAPUS AGAR POLOS) */}

      {/* --- MAIN CONTENT --- */}
      <div className="px-6 md:px-24 py-32 relative z-10">

        {/* 1. HEADER SIMPLE & BERSIH */}
        <div className="mb-20 mt-10">
            <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter text-white">
                Proyek.
            </h1>
            
            <div className="h-1 w-24 bg-[#9DB035] rounded-full mb-8"></div>

            <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed border-l-4 border-[#9DB035] pl-6">
                Jejak rekam kami dalam mengubah konsep abstrak menjadi realita visual yang menakjubkan. Karya terpilih dengan eksekusi presisi.
            </p>
        </div>

        {/* 2. HIGHLIGHT PROJECT (Clean Look) */}
        {highlightProject && (
            <div className="mb-16 group relative w-full h-[500px] md:h-[600px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl cursor-pointer hover:border-[#9DB035] transition-all duration-500">
                {/* Gambar */}
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-[1.5s]" style={{ backgroundImage: `url(${highlightProject.image})` }}></div>
                
                {/* Gradient Hitam Standar (Supaya teks terbaca) */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0518] via-black/20 to-transparent opacity-90"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex justify-between items-end">
                    <div>
                        <span className="inline-block px-3 py-1 rounded-full border border-[#9DB035] text-[#9DB035] text-[10px] font-bold uppercase tracking-widest mb-4 bg-black/50 backdrop-blur-md">
                            Latest Project
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-2">{highlightProject.title}</h2>
                        <p className="text-slate-300 font-mono text-sm tracking-widest uppercase">{highlightProject.category}</p>
                    </div>
                    
                    <div className="w-16 h-16 rounded-full bg-white text-[#1a0518] flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-[#9DB035]">
                        <ArrowRight size={28} className="group-hover:-rotate-45 transition-transform duration-300"/>
                    </div>
                </div>
            </div>
        )}

        {/* 3. GRID PROJECT SISA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {gridProjects.map((item: any, i: number) => (
               <ClientProjectCard key={item.id} project={item} index={i} />
            ))}
        </div>
        
        {/* Empty State */}
        {projects.length === 0 && (
            <div className="w-full h-64 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-3xl text-center">
                <p className="text-slate-500 text-lg">Belum ada proyek yang ditampilkan.</p>
            </div>
        )}

        {/* 4. BOTTOM CTA SIMPLE */}
        <div className="mt-32 text-center border-t border-white/10 pt-16">
            <h3 className="text-2xl font-bold text-white mb-4">Tertarik membuat sesuatu yang serupa?</h3>
            <Link href="/layanan" className="inline-flex items-center gap-2 text-[#9DB035] hover:text-white font-bold uppercase tracking-widest text-sm transition-colors border-b border-[#9DB035] pb-1 hover:border-white">
                Lihat Layanan Kami <ArrowRight size={16}/>
            </Link>
        </div>

      </div>
    </div>
  );
}