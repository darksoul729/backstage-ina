import { getEvents } from "@/app/actions";
import { Ticket, CheckCircle, CalendarDays, Clock } from "lucide-react";

export default async function DashboardOverview() {
  const events = await getEvents();

  // --- LOGIKA PERHITUNGAN SIMPLE ---
  const totalEvents = events.length;
  const finishedEvents = events.filter((e: any) => e.timeline === 'Finished').length;
  const soldOutEvents = events.filter((e: any) => e.status === 'Sold Out').length;
  // Pengganti Traffic: Hitung event yang masih akan datang
  const upcomingEvents = events.filter((e: any) => e.timeline === 'Upcoming').length; 

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
      <p className="text-slate-400 mb-8">Pantau performa acara secara real-time.</p>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* 1. Total Event */}
        <StatCard 
            title="Total Event Dibuat" 
            value={totalEvents} 
            icon={CalendarDays} 
            color="bg-blue-500/20" 
            textColor="text-blue-400" 
        />

        {/* 2. Event Upcoming (Baru) */}
        <StatCard 
            title="Segera Datang" 
            value={upcomingEvents} 
            icon={Clock} 
            color="bg-purple-500/20" 
            textColor="text-purple-400" 
        />

        {/* 3. Event Selesai */}
        <StatCard 
            title="Event Selesai" 
            value={finishedEvents} 
            icon={CheckCircle} 
            color="bg-slate-500/20" 
            textColor="text-slate-400" 
        />

        {/* 4. Tiket Sold Out */}
        <StatCard 
            title="Event Sold Out" 
            value={soldOutEvents} 
            icon={Ticket} 
            color="bg-[#9db035]/20" 
            textColor="text-[#9db035]" 
        />
      </div>

      {/* --- TABEL RINGKASAN EVENT --- */}
      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Status Event Terbaru</h3>
            <span className="text-xs text-slate-500 bg-white/5 px-3 py-1 rounded-full">5 Teratas</span>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-400">
                <thead className="text-xs uppercase bg-white/5 text-white font-bold tracking-wider">
                    <tr>
                        <th className="px-6 py-4 rounded-l-xl">Event</th>
                        <th className="px-6 py-4">Tanggal</th>
                        <th className="px-6 py-4">Timeline</th>
                        <th className="px-6 py-4 rounded-r-xl">Status Tiket</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {events.slice(0, 5).map((ev: any) => (
                        <tr key={ev.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-6 py-4 font-bold text-white">{ev.title}</td>
                            <td className="px-6 py-4">{ev.date}</td>
                            
                            {/* Kolom Timeline */}
                            <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest 
                                    ${ev.timeline === 'Finished' ? 'bg-slate-700/50 text-slate-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                    {ev.timeline === 'Finished' ? 'Selesai' : 'Upcoming'}
                                </span>
                            </td>

                            {/* Kolom Status Tiket */}
                            <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest 
                                    ${ev.status === 'Available' ? 'bg-[#9db035]/20 text-[#9db035]' : 
                                      ev.status === 'Sold Out' ? 'bg-red-500/20 text-red-500' : 'bg-orange-500/20 text-orange-400'}`}>
                                    {ev.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {events.length === 0 && (
                <p className="text-center py-8 text-slate-500 italic">Belum ada data event.</p>
            )}
        </div>
      </div>
    </div>
  );
}

// --- KOMPONEN KARTU STATISTIK ---
function StatCard({ title, value, icon: Icon, color, textColor, trend }: any) {
    return (
        <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl flex items-start justify-between hover:bg-white/[0.04] transition-all group">
            <div>
                <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{title}</div>
                <div className="text-3xl font-black text-white flex items-end gap-2">
                    {value}
                    {trend && <span className="text-xs font-bold text-[#9db035] mb-1 bg-[#9db035]/10 px-1 rounded">{trend}</span>}
                </div>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color} ${textColor} group-hover:scale-110 transition-transform`}>
                <Icon size={24} />
            </div>
        </div>
    )
}