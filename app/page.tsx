// app/page.tsx
"use client";

import { Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import { Navbar } from "@/app/components/navbar";
import { ParallaxShapes, Lighting } from "@/app/components/home-3d";
import { HomeContent } from "@/app/components/home-content";

// Wrapper untuk logika scroll pages
const ResponsiveScrollWrapper = () => {
  const { width } = useThree((state) => state.viewport);
  
  let pageCount = 4.4; 
  if (width < 5) pageCount = 5.8; 
  else if (width < 10) pageCount = 4.8; 

  return (
    <ScrollControls pages={pageCount} damping={0.2}>
      <Lighting />
      <ParallaxShapes />
      <Scroll html style={{ width: "100%" }}>
        <HomeContent />
      </Scroll>
    </ScrollControls>
  );
};

export default function Page() {
  return (
    <div className="h-screen w-full relative bg-[#1a0518] text-[#f8fafc] selection:bg-[#9db035] selection:text-[#1a0518] overflow-hidden">
      
      <Navbar />

      <Canvas shadows dpr={[1, 2]} performance={{ min: 0.5 }} camera={{ position: [0, 0, 8], fov: 35 }} className="pointer-events-none">
        <Suspense fallback={null}>
          <ResponsiveScrollWrapper />
        </Suspense>
      </Canvas>

      {/* Noise Texture */}
      <div className="fixed inset-0 z-[60] pointer-events-none opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
    
    </div>
  );
}