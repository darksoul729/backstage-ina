"use client";

import { addProject, deleteProject, getProjects, updateProject } from "@/app/actions";
import { useState, useEffect, useRef } from "react";
import { 
  Trash2, Plus, Loader2, X, 
  Image as ImageIcon, Pencil, Type, Tag, ArrowUpRight
} from "lucide-react";

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const refreshData = async () => {
    setIsLoading(true);
    const data = await getProjects();
    setProjects(data);
    setIsLoading(false);
  };

  useEffect(() => { refreshData(); }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project: any) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-white">Kelola Proyek</h1>
            <p className="text-slate-400 text-sm mt-1">Portfolio hasil karya Backstage Ina.</p>
        </div>
        
        <button onClick={openCreateModal} className="flex items-center gap-2 bg-[#9db035] hover:bg-[#8ca025] text-[#1a0518] px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-transform hover:scale-105 shadow-[0_0_20px_rgba(157,176,53,0.3)]">
            <Plus size={18} /> Tambah Proyek
        </button>
      </div>

      {/* LIST PROJECTS */}
      {isLoading ? (
        <div className="py-20 text-center"><Loader2 className="animate-spin text-[#9db035] mx-auto" size={40}/></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {projects.map((project) => (
                <div key={project.id} className="group relative h-64 rounded-3xl overflow-hidden border border-white/10 hover:border-[#9db035] transition-all">
                    {/* Background Image */}
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: `url(${project.image})` }}></div>
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors"></div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end">
                        <div>
                            <p className="text-[#9db035] font-mono text-xs uppercase tracking-widest mb-1">{project.category}</p>
                            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex gap-2">
                            <button onClick={() => openEditModal(project)} className="p-2 rounded-lg bg-white/10 text-white hover:bg-[#9db035] hover:text-[#1a0518] transition-all backdrop-blur-md">
                                <Pencil size={18}/>
                            </button>
                            <button onClick={async()=>{if(confirm('Hapus proyek ini?')) {await deleteProject(project.id); refreshData();}}} className="p-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all backdrop-blur-md">
                                <Trash2 size={18}/>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      )}
      
      {!isLoading && projects.length === 0 && (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl text-slate-500">Belum ada proyek portfolio.</div>
      )}

      {/* MODAL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#150313] border border-white/10 w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl relative ring-1 ring-white/10">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        {editingProject ? <Pencil className="text-[#9db035]" size={20}/> : <Plus className="text-[#9db035]" size={20}/>}
                        {editingProject ? "Edit Proyek" : "Tambah Proyek"}
                    </h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white bg-white/5 p-2 rounded-full hover:bg-red-500/20 hover:text-red-500 transition-all"><X size={20} /></button>
                </div>

                <form ref={formRef} action={async (fd) => { 
                        if (editingProject) { fd.append("id", editingProject.id); await updateProject(fd); } 
                        else { await addProject(fd); }
                        formRef.current?.reset(); refreshData(); setIsModalOpen(false);
                    }} className="flex flex-col gap-5">
                    
                    <InputGroup label="Nama Proyek / Acara" icon={Type} name="title" placeholder="Contoh: Neon Festival 2024" defaultValue={editingProject?.title} />
                    
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-[#9db035] uppercase tracking-widest ml-1">Kategori</label>
                        <div className="relative group">
                            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#9db035] transition-colors" size={18} />
                            <select name="category" defaultValue={editingProject?.category} className="w-full bg-[#1a0518] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-[#9db035] transition-all appearance-none cursor-pointer hover:border-white/30">
                                <option value="Music Festival">Music Festival</option>
                                <option value="Corporate Event">Corporate Event</option>
                                <option value="Exhibition">Exhibition</option>
                                <option value="Gala Dinner">Gala Dinner</option>
                                <option value="Product Launch">Product Launch</option>
                            </select>
                        </div>
                    </div>

                    <InputGroup label="URL Gambar Dokumentasi" icon={ImageIcon} name="image" placeholder="https://..." defaultValue={editingProject?.image} />
                    
                    <div className="pt-4 border-t border-white/10 flex justify-end gap-4">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl text-slate-400 hover:text-white font-bold uppercase text-xs">Batal</button>
                        <button type="submit" className="bg-[#9db035] hover:bg-[#8ca025] text-[#1a0518] font-bold px-8 py-3 rounded-xl transition-all uppercase text-xs shadow-[0_0_20px_rgba(157,176,53,0.3)] hover:scale-105">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}

function InputGroup({ label, name, type = "text", placeholder, icon: Icon, defaultValue }: any) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#9db035] uppercase tracking-widest ml-1">{label}</label>
            <div className="relative group">
                <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#9db035] transition-colors" size={18} />
                <input name={name} type={type} placeholder={placeholder} defaultValue={defaultValue} required className="w-full bg-[#1a0518] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-[#9db035] transition-all hover:border-white/30" />
            </div>
        </div>
    )
}