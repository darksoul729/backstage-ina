"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// PERBAIKAN ADA DI BARIS BAWAH INI: Tambahkan Briefcase dan Users
import { LayoutDashboard, CalendarDays, LogOut, Settings, Menu, X, AlertTriangle, Briefcase, Users } from "lucide-react";
import { handleLogout } from "@/app/login/action";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); 

  // Menu Navigasi Lengkap
  const menuItems = [
    { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Kelola Events", href: "/admin/events", icon: CalendarDays },
    { name: "Kelola Tim", href: "/admin/teams", icon: Users },       // Menu Tim
    { name: "Kelola Proyek", href: "/admin/projects", icon: Briefcase }, // Menu Proyek
    { name: "Pengaturan", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#1a0518] relative">
      
      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-[#150313] sticky top-0 z-30">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-full bg-[#9db035] text-[#1a0518] flex items-center justify-center font-bold">b</div>
           <span className="font-bold text-white tracking-wide">Admin Panel</span>
        </div>
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-white hover:bg-white/10 rounded-lg">
            <Menu size={24} />
        </button>
      </div>

      {/* --- OVERLAY --- */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm animate-in fade-in"
            onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-[#150313] border-r border-white/10 flex flex-col z-40 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0
      `}>
        
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-[#9db035] text-[#1a0518] flex items-center justify-center font-bold">b</div>
             <span className="font-bold text-white tracking-wide">Admin Panel</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
             <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${isActive 
                    ? "bg-[#9db035] text-[#1a0518] font-bold shadow-[0_0_15px_rgba(157,176,53,0.2)]" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-all uppercase tracking-widest"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 md:ml-64 p-6 md:p-12 min-h-screen transition-all">
        {children}
      </main>

      {/* --- MODAL LOGOUT --- */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#150313] border border-white/10 w-full max-w-sm rounded-3xl p-6 shadow-2xl ring-1 ring-white/10 text-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                    <AlertTriangle size={32} />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Konfirmasi Logout</h2>
                <p className="text-slate-400 text-sm mb-6">Apakah Anda yakin ingin keluar dari panel admin?</p>
                <div className="flex gap-3">
                    <button onClick={() => setIsLogoutModalOpen(false)} className="flex-1 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all">Batal</button>
                    <form action={handleLogout} className="flex-1">
                        <button type="submit" className="w-full px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)]">Ya, Keluar</button>
                    </form>
                </div>
            </div>
        </div>
      )}

    </div>
  );
}