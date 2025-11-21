"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent } from "react";

export default function StudioGraphic() {
  // --- LOGIKA PARALLAX MOUSE ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 50, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 15 });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    
    const xPos = (clientX / innerWidth - 0.5) * 2;
    const yPos = (clientY / innerHeight - 0.5) * 2;

    x.set(xPos);
    y.set(yPos);
  }

  const rotateX = useTransform(mouseY, [-1, 1], [15, -15]); 
  const rotateY = useTransform(mouseX, [-1, 1], [-15, 15]); 
  const moveX = useTransform(mouseX, [-1, 1], [-20, 20]);   

  return (
    <div 
        className="w-full h-full flex items-center justify-center perspective-1000"
        onMouseMove={handleMouseMove}
    >
        <motion.div
            style={{
                rotateX,
                rotateY,
                x: moveX,
            }}
            animate={{ 
                y: [0, -25, 0], 
            }}
            transition={{ 
                y: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }}
            // CONTAINER UTAMA (GLASS/KACA)
            className="relative w-[300px] md:w-[450px] aspect-square flex items-center justify-center rounded-full bg-white/[0.02] border border-white/10 backdrop-blur-sm shadow-2xl overflow-hidden"
        >
            {/* EFEK GLOW DI DALAM LINGKARAN */}
            <div className="absolute inset-0 bg-[#9db035] blur-[90px] opacity-10 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 bg-[#59234d] blur-[100px] opacity-20 translate-y-10 rounded-full"></div>

            {/* CONTAINER GAMBAR LOGO (DIPAKSA BULAT) */}
            {/* Saya menambahkan 'rounded-full overflow-hidden' di sini juga */}
            <div className="relative w-[65%] h-[65%] rounded-full overflow-hidden drop-shadow-2xl z-10 bg-black/20">
                <Image 
                    src="/logo-studio.png" 
                    alt="Backstage Ina Logo"
                    fill
                    className="object-cover" // Ganti object-contain jadi object-cover agar memenuhi lingkaran
                    priority
                />
            </div>

            {/* EFEK KILAUAN KACA (Overlay) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent rounded-full opacity-40 pointer-events-none mix-blend-overlay"></div>
            
            {/* Cincin Dekorasi Tipis di dalam */}
            <div className="absolute inset-4 rounded-full border border-white/5 pointer-events-none"></div>
            
        </motion.div>
    </div>
  );
}