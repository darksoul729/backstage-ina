"use client";

import { addEvent, deleteEvent, getEvents, updateEvent } from "@/app/actions";
import { useState, useEffect, useRef } from "react";
import { 
  Trash2, Plus, Loader2, Calendar, MapPin, X, 
  Image as ImageIcon, DollarSign, Pencil, Type, AlignLeft, Tag, Clock 
} from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State Modal & Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const refreshData = async () => {
    setIsLoading(true);
    const data = await getEvents();
    setEvents(data);
    setIsLoading(false);
  };

  useEffect(() => { refreshData(); }, []);

  // Handler Buka Modal
  const openCreateModal = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const openEditModal = (event: any) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-white">Kelola Events</h1>
            <p className="text-slate-400 text-sm mt-1">Atur jadwal acara yang akan ditampilkan ke publik.</p>
        </div>
        
        <button 
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-[#9db035] hover:bg-[#8ca025] text-[#1a0518] px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-transform hover:scale-105 shadow-[0_0_20px_rgba(157,176,53,0.3)]"
        >
            <Plus size={18} /> Tambah Event
        </button>
      </div>

      {/* --- LIST EVENTS --- */}
      {isLoading ? (
        <div className="py-20 text-center"><Loader2 className="animate-spin text-[#9db035] mx-auto" size={40}/></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
             {events.map((ev) => (
                <div key={ev.id} className="group flex flex-col bg-white/[0.02] border border-white/5 p-4 rounded-2xl hover:bg-white/[0.05] transition-all hover:border-[#9db035]/30 relative overflow-hidden">
                    
                    {/* Gambar */}
                    <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4 bg-gray-800 border border-white/5">
                        <img src={ev.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={ev.title} />
                        <div className="absolute top-3 right-3 flex gap-2">
                             <span className={`text-[10px] px-2 py-1 rounded-md border font-bold uppercase bg-black/60 backdrop-blur-md ${ev.status === 'Available' ? 'border-[#9db035] text-[#9db035]' : 'border-red-500 text-red-500'}`}>
                                {ev.status}
                            </span>
                             <span className={`text-[10px] px-2 py-1 rounded-md border font-bold uppercase bg-black/60 backdrop-blur-md ${ev.timeline === 'Finished' ? 'border-slate-500 text-slate-500' : 'border-blue-400 text-blue-400'}`}>
                                {ev.timeline === 'Finished' ? 'Selesai' : 'Segera'}
                            </span>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-grow">
                        <h3 className="font-bold text-white text-lg mb-2">{ev.title}</h3>
                        <div className="space-y-1 text-xs text-slate-400 font-mono mb-4">
                            <div className="flex items-center gap-2"><Calendar size={12} className="text-[#9db035]"/>{ev.date}</div>
                            <div className="flex items-center gap-2"><MapPin size={12} className="text-[#9db035]"/>{ev.location}</div>
                            <div className="flex items-center gap-2"><DollarSign size={12} className="text-[#9db035]"/>{ev.price}</div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-white/5 flex justify-between items-center mt-auto gap-3">
                        <span className="text-xs text-slate-500 truncate max-w-[120px] opacity-50">{ev.description}</span>
                        
                        <div className="flex gap-2">
                            <button 
                                onClick={() => openEditModal(ev)}
                                className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all"
                                title="Edit"
                            >
                                <Pencil size={16}/>
                            </button>
                            <button 
                                onClick={async()=>{if(confirm('Hapus event ini selamanya?')) {await deleteEvent(ev.id); refreshData();}}} 
                                className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                title="Hapus"
                            >
                                <Trash2 size={16}/>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      )}
      
      {!isLoading && events.length === 0 && (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl text-slate-500">
              Belum ada event. Klik tombol tambah di atas.
          </div>
      )}

      {/* --- MODAL FORM --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#150313] border border-white/10 w-full max-w-2xl rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-y-auto max-h-[95vh] ring-1 ring-white/10">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            {editingEvent ? <Pencil className="text-[#9db035]" size={24} /> : <Plus className="text-[#9db035]" size={24} />}
                            {editingEvent ? "Edit Event" : "Buat Event Baru"}
                        </h2>
                        <p className="text-slate-400 text-sm mt-1">Pastikan data yang dimasukkan sudah benar.</p>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white bg-white/5 p-2 rounded-full hover:bg-red-500/20 hover:text-red-500 transition-all">
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form 
                    ref={formRef} 
                    action={async (fd) => { 
                        if (editingEvent) {
                             fd.append("id", editingEvent.id);
                             await updateEvent(fd);
                        } else {
                             await addEvent(fd); 
                        }
                        formRef.current?.reset(); 
                        refreshData(); 
                        setIsModalOpen(false);
                    }} 
                    className="flex flex-col gap-6"
                >
                    
                    {/* Group 1: Judul */}
                    <InputGroup 
                        label="Nama Event" icon={Type} name="title" 
                        placeholder="Contoh: Neon Genesis 2025" 
                        defaultValue={editingEvent?.title} 
                    />
                    
                    {/* Group 2: Date & Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputGroup 
                            label="Tanggal" icon={Calendar} name="date" 
                            placeholder="15 Ags 2025" 
                            defaultValue={editingEvent?.date} 
                        />
                        <InputGroup 
                            label="Harga Tiket" icon={DollarSign} name="price" 
                            placeholder="IDR 1.500.000" 
                            defaultValue={editingEvent?.price} 
                        />
                    </div>

                    {/* Group 3: Location */}
                    <InputGroup 
                        label="Lokasi Venue" icon={MapPin} name="location" 
                        placeholder="GWK Cultural Park, Bali" 
                        defaultValue={editingEvent?.location} 
                    />

                    {/* Group 4: Status & Timeline (Grid) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         
                         {/* Status Tiket */}
                         <div className="flex flex-col gap-2">
                             <label className="text-xs font-bold text-[#9db035] uppercase tracking-widest ml-1">Status Tiket</label>
                             <div className="relative group">
                                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#9db035] transition-colors" size={18} />
                                <select 
                                    name="status" 
                                    defaultValue={editingEvent?.status || "Available"}
                                    className="w-full bg-[#1a0518] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#9db035] focus:ring-1 focus:ring-[#9db035] transition-all appearance-none cursor-pointer hover:border-white/30"
                                >
                                    <option value="Available">Available</option>
                                    <option value="Selling Fast">Selling Fast</option>
                                    <option value="Sold Out">Sold Out</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▼</div>
                             </div>
                        </div>

                        {/* Timeline (Baru) */}
                        <div className="flex flex-col gap-2">
                             <label className="text-xs font-bold text-[#9db035] uppercase tracking-widest ml-1">Waktu Pelaksanaan</label>
                             <div className="relative group">
                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#9db035] transition-colors" size={18} />
                                <select 
                                    name="timeline" 
                                    defaultValue={editingEvent?.timeline || "Upcoming"}
                                    className="w-full bg-[#1a0518] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#9db035] focus:ring-1 focus:ring-[#9db035] transition-all appearance-none cursor-pointer hover:border-white/30"
                                >
                                    <option value="Upcoming">Segera Datang (Upcoming)</option>
                                    <option value="Finished">Sudah Berakhir (Finished)</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▼</div>
                             </div>
                        </div>

                    </div>

                    {/* Group 5: Image */}
                    <InputGroup 
                        label="URL Poster / Gambar" icon={ImageIcon} name="image" 
                        placeholder="https://..." 
                        defaultValue={editingEvent?.image} 
                    />

                    {/* Group 6: Description */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-[#9db035] uppercase tracking-widest ml-1">Deskripsi Lengkap</label>
                        <div className="relative group">
                            <AlignLeft className="absolute left-4 top-5 text-slate-500 group-focus-within:text-[#9db035] transition-colors" size={18} />
                            <textarea 
                                name="description" 
                                rows={4} 
                                placeholder="Ceritakan detail acara, lineup, dan experience..." 
                                defaultValue={editingEvent?.description}
                                required 
                                className="w-full bg-[#1a0518] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#9db035] focus:ring-1 focus:ring-[#9db035] transition-all resize-none hover:border-white/30 leading-relaxed" 
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex justify-end gap-4">
                        <button 
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-6 py-4 rounded-xl text-slate-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors"
                        >
                            Batal
                        </button>
                        <button type="submit" className="bg-[#9db035] hover:bg-[#8ca025] text-[#1a0518] font-bold px-8 py-4 rounded-xl transition-all uppercase text-xs tracking-widest shadow-[0_0_20px_rgba(157,176,53,0.3)] hover:shadow-[0_0_30px_rgba(157,176,53,0.5)] hover:scale-105">
                            {editingEvent ? "Simpan Perubahan" : "Publish Event"}
                        </button>
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
                <input 
                    name={name} 
                    type={type} 
                    placeholder={placeholder} 
                    defaultValue={defaultValue}
                    required 
                    className="w-full bg-[#1a0518] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#9db035] focus:ring-1 focus:ring-[#9db035] transition-all hover:border-white/30 placeholder:text-slate-600" 
                />
            </div>
        </div>
    )
}