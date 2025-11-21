"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll, Float, Environment, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { THEME } from "@/app/data";

// --- 1. AUDIO VISUALIZER (Internal Animation Only) ---
const AudioVisualizer = ({ scale = 1 }: { scale?: number }) => {
  const barsRef = useRef<THREE.Mesh[]>([]); 

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Animasi Bar Naik Turun (Equalizer Effect)
    barsRef.current.forEach((bar, i) => {
      if (bar) {
        bar.scale.y = 0.8 + Math.sin(t * 3 + i) * 0.5; 
      }
    });
  });

  return (
    <group scale={scale}>
      {[...Array(5)].map((_, i) => (
        <mesh 
            key={i} 
            ref={(el) => { if (el) barsRef.current[i] = el; }}
            position={[(i - 2) * 0.5, 0, 0]} 
        >
          <boxGeometry args={[0.3, 2.5, 0.3]} />
          <meshStandardMaterial 
            color={THEME.accent} 
            emissive={THEME.accent}
            emissiveIntensity={0.5}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

// --- 2. VINYL DISC (Internal Animation Only) ---
const VinylDisc = ({ position, isMobile }: { position: [number, number, number], isMobile: boolean }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    
    useFrame((state, delta) => {
       if(meshRef.current) {
           meshRef.current.rotation.x += delta * 0.3;
           meshRef.current.rotation.y += delta * 0.1;
       }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} position={position} rotation={[1, 0, 0]}>
                <torusGeometry args={[1.4, 0.05, 16, 48]} />
                {isMobile ? (
                    <meshStandardMaterial color="white" opacity={0.3} transparent roughness={0.1} />
                ) : (
                    <MeshTransmissionMaterial 
                        backside backsideThickness={1} samples={2} resolution={128}
                        transmission={1} roughness={0.2} thickness={0.5} ior={1.2}
                        chromaticAberration={0.1} anisotropy={0.1}
                        color="#ffffff" background={new THREE.Color(THEME.bg)}
                    />
                )}
            </mesh>
        </Float>
    )
}


// --- KOMPONEN UTAMA: PARALLAX SHAPES ---
export const ParallaxShapes = () => {
  const { viewport } = useThree();
  const scroll = useScroll();
  
  // Refs untuk objek
  const donutRef = useRef<THREE.Mesh>(null);
  const capsuleRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const visualizerRef = useRef<THREE.Group>(null); // Ref baru untuk Visualizer
  
  const isMobile = viewport.width < 5;
  const isTablet = viewport.width >= 5 && viewport.width < 10;

  // --- CONFIG POSISI AWAL ---
  const vinylPos: [number, number, number] = isMobile ? [0, 3.5, -3] : [-5, 2, -3];

  useFrame((state, delta) => {
    const offset = scroll.offset; // 0 (atas) sampai 1 (bawah)

    // 1. Animasi Donut
    if (donutRef.current) {
      donutRef.current.rotation.x += delta * 0.2;
      const targetX = isMobile ? 1.2 : 3.5 - (offset * 5); 
      const targetY = isMobile ? 1.5 - (offset * 5) : 2 - (offset * 8); 
      donutRef.current.position.x = THREE.MathUtils.damp(donutRef.current.position.x, targetX, 3, delta);
      donutRef.current.position.y = THREE.MathUtils.damp(donutRef.current.position.y, targetY, 3, delta);
    }

    // 2. Animasi Kapsul
    if (capsuleRef.current) {
        const targetX = isMobile ? -1.2 : -4 + (offset * 6);
        const targetY = isMobile ? -1 + (offset * 3) : -1.5 + (offset * 6);
        capsuleRef.current.rotation.z += delta * 0.2;
        capsuleRef.current.position.x = THREE.MathUtils.damp(capsuleRef.current.position.x, targetX, 3, delta);
        capsuleRef.current.position.y = THREE.MathUtils.damp(capsuleRef.current.position.y, targetY, 3, delta);
    }

    // 3. Animasi Bola
    if (sphereRef.current) {
        const targetY = isMobile ? 3 - (offset * 15) : 1 - (offset * 12); 
        sphereRef.current.position.y = THREE.MathUtils.damp(sphereRef.current.position.y, targetY, 2, delta);
    }

    // 4. Animasi Audio Visualizer (PARALLAX BARU)
    if (visualizerRef.current) {
        // Target Posisi Y (Naik ke atas saat scroll)
        // Mobile: Mulai dari -2.5, Naik cepat ke 2
        // Desktop: Mulai dari -0.5, Naik pelan ke 1.5
        const targetY = isMobile 
            ? -2.5 + (offset * 6) 
            : -0.5 + (offset * 3);
        
        // Target Rotasi (Berputar pelan saat scroll)
        const targetRotY = offset * Math.PI * 0.5;

        // Terapkan dengan damp (smooth)
        visualizerRef.current.position.y = THREE.MathUtils.damp(visualizerRef.current.position.y, targetY, 2, delta);
        visualizerRef.current.rotation.y = THREE.MathUtils.damp(visualizerRef.current.rotation.y, targetRotY, 2, delta);
    }
  });

  return (
    <group>
      {/* 1. DONAT */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={donutRef} position={[2, 2, 0]} castShadow={!isMobile}>
          <torusGeometry args={isMobile ? [0.3, 0.12, 16, 32] : [0.7, 0.25, 32, 64]} />
          <meshStandardMaterial color={THEME.accent} roughness={0.4} metalness={0.5} />
        </mesh>
      </Float>

      {/* 2. KAPSUL */}
      <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={capsuleRef} position={[-2, -1, 0]} rotation={[0,0,0.5]} castShadow={!isMobile}>
          <capsuleGeometry args={isMobile ? [0.2, 0.6, 4, 16] : [0.4, 1.2, 8, 32]} />
          {isMobile ? (
             <meshStandardMaterial color={THEME.primary} opacity={0.7} transparent roughness={0.1} />
          ) : (
             <MeshTransmissionMaterial 
                backside backsideThickness={1} samples={3} resolution={128}
                transmission={1} roughness={0.3} thickness={0.5} ior={1.2}
                chromaticAberration={0.1} anisotropy={0.2}
                color={THEME.primary} background={new THREE.Color(THEME.bg)}
             />
          )}
        </mesh>
      </Float>

      {/* 3. BOLA */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
         <mesh ref={sphereRef} position={[3, 0, -2]} scale={isMobile ? 0.5 : 1}>
            <sphereGeometry args={[0.8, 24, 24]} />
            <meshStandardMaterial color="#2d122a" roughness={0.2} metalness={0.6} />
         </mesh>
      </Float>

      {/* 4. AUDIO VISUALIZER (PARALLAX GROUP) */}
      {/* Kita bungkus dalam group yang memiliki ref agar bisa digerakkan */}
      <group 
        ref={visualizerRef} 
        position={isMobile ? [0, -2.5, -2] : [4, -0.5, -1]}
        rotation={[0, -0.2, 0]} // Sedikit miring awal
      >
          <AudioVisualizer scale={isMobile ? 0.6 : 0.8} />
      </group>

      {/* 5. VINYL DISC (Tetap Float) */}
      <VinylDisc position={vinylPos} isMobile={isMobile} />

    </group>
  );
};

// --- PENCAHAYAAN ---
export const Lighting = () => (
  <>
    <ambientLight intensity={0.6} />
    <spotLight 
        position={[5, 10, 5]} 
        angle={0.5} penumbra={1} intensity={2} 
        castShadow={false} 
    />
    <pointLight position={[0, -5, 0]} intensity={3} color={THEME.primary} distance={8} />
    <pointLight position={[-5, 5, -5]} intensity={2} color={THEME.accent} distance={8} />
    <Environment preset="city" blur={1} />
  </>
);