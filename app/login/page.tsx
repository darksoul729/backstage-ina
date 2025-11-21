"use client";

import { handleLogin } from "./action";
import { useState, useEffect } from "react";
import { Lock, User, ArrowRight, AlertCircle, Timer } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --- STATE UNTUK LOCKOUT ---
  const [failCount, setFailCount] = useState(0); // Menghitung jumlah gagal
  const [lockoutTime, setLockoutTime] = useState(0); // Waktu hitung mundur (detik)
  const [penaltyDuration, setPenaltyDuration] = useState(30); // Durasi hukuman awal (30 detik)

  // --- EFFECT: Menjalankan Hitung Mundur ---
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (lockoutTime > 0) {
      interval = setInterval(() => {
        setLockoutTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [lockoutTime]);

  async function onSubmit(formData: FormData) {
    // Cegah submit jika sedang dikunci
    if (lockoutTime > 0) return;

    setIsLoading(true);
    setError("");
    
    const result = await handleLogin(formData);
    
    // JIKA LOGIN GAGAL
    if (result?.error) {
      const newFailCount = failCount + 1;
      setFailCount(newFailCount);
      setIsLoading(false);

      // Cek apakah sudah 3x salah
      if (newFailCount >= 3) {
        setLockoutTime(penaltyDuration); // Mulai timer sesuai durasi hukuman saat ini
        setPenaltyDuration((prev) => prev + 30); // Hukuman berikutnya tambah 30 detik (30 -> 60 -> 90...)
        setFailCount(0); // Reset hitungan agar user dapat kesempatan 3x lagi setelah menunggu
        setError(`Terlalu banyak percobaan. Tunggu ${penaltyDuration} detik.`);
      } else {
        // Info sisa percobaan
        setError(`Password salah! Sisa percobaan: ${3 - newFailCount}x lagi.`);
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#1a0518] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/[0.03] border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-xl">
        
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#9db035] rounded-full flex items-center justify-center mx-auto mb-4 text-[#1a0518]">
            {lockoutTime > 0 ? <Timer size={24} className="animate-pulse"/> : <Lock size={24} />}
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Access</h1>
          <p className="text-slate-400 text-sm mt-2">Masuk untuk mengelola konten.</p>
        </div>

        <form action={onSubmit} className="flex flex-col gap-4">
          
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#9db035] transition-colors" size={18} />
            <input 
              name="username" 
              type="text" 
              placeholder="Username" 
              required
              disabled={lockoutTime > 0} // Disable saat terkunci
              className="w-full bg-[#1a0518]/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#9db035] transition-all disabled:opacity-50"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#9db035] transition-colors" size={18} />
            <input 
              name="password" 
              type="password" 
              placeholder="Password" 
              required
              disabled={lockoutTime > 0} // Disable saat terkunci
              className="w-full bg-[#1a0518]/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#9db035] transition-all disabled:opacity-50"
            />
          </div>

          {/* ERROR MESSAGE AREA */}
          {error && (
            <div className={`border text-xs p-3 rounded-lg flex items-center gap-2 transition-all
              ${lockoutTime > 0 
                ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' 
                : 'bg-red-500/10 border-red-500/20 text-red-400'
              }`}
            >
               <AlertCircle size={14} /> 
               {lockoutTime > 0 
                 ? `Sistem terkunci. Coba lagi dalam ${lockoutTime} detik.` 
                 : error
               }
            </div>
          )}

          <button 
            disabled={isLoading || lockoutTime > 0}
            type="submit" 
            className={`mt-4 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2
              ${isLoading || lockoutTime > 0 
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                : 'bg-[#9db035] hover:bg-[#8ca025] text-[#1a0518]'
              }`}
          >
            {lockoutTime > 0 
              ? `Tunggu ${lockoutTime}s` 
              : (isLoading ? "Memproses..." : "Masuk Dashboard")
            }
            {!isLoading && lockoutTime === 0 && <ArrowRight size={18} />}
          </button>

          <div className="text-center mt-4">
             <a href="/" className="text-xs text-slate-500 hover:text-white transition-colors">← Kembali ke Website</a>
          </div>
        </form>
      </div>
    </div>
  );
}