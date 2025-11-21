"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Center, ContactShadows, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

// --- MODEL 3D (Sama seperti sebelumnya) ---

function SoundModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if(meshRef.current) {
        const s = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.05; // Denyut lebih halus
        meshRef.current.scale.set(s, s, s);
    }
  });
  return (
    <Float speed={4} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#9db035" roughness={0.2} metalness={0.8} wireframe />
      </mesh>
      <mesh scale={1.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#9db035" opacity={0.5} transparent />
      </mesh>
    </Float>
  );
}

function LightModel() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => { if(ref.current) ref.current.rotation.y += 0.02; });
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={ref} rotation={[0,0,Math.PI]}>
        <coneGeometry args={[1.2, 3, 32]} />
        <meshStandardMaterial color="#00ffff" opacity={0.6} transparent roughness={0.1} />
      </mesh>
      <pointLight intensity={20} color="#00ffff" distance={5} />
    </Float>
  );
}

function RiggingModel() {
  return (
    <Float speed={1} rotationIntensity={1} floatIntensity={0.5}>
      <group scale={0.8}>
        <mesh>
            <torusGeometry args={[1.5, 0.15, 16, 100]} />
            <meshStandardMaterial color="#aaaaaa" metalness={1} roughness={0.2} />
        </mesh>
        <mesh rotation={[Math.PI/2, 0, 0]}>
            <torusGeometry args={[1.5, 0.15, 16, 100]} />
            <meshStandardMaterial color="#aaaaaa" metalness={1} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

function ConceptModel() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => { if(ref.current) ref.current.rotation.x += 0.01; });
  return (
    <Float speed={2} rotationIntensity={0.5}>
      <mesh ref={ref} scale={1.8}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#ffffff" wireframe />
      </mesh>
      <mesh scale={0.8}>
         <icosahedronGeometry args={[1, 0]} />
         <meshStandardMaterial color="#9db035" emissive="#9db035" emissiveIntensity={2} />
      </mesh>
    </Float>
  );
}

// --- MAIN SCENE ---
export default function ServiceScene({ type }: { type: string }) {
  return (
    <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        
        {/* OrbitControls: Enable Rotate, Disable Zoom (biar ga ganggu scroll) */}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={10} color="white" />
        <Environment preset="city" />
        
        <Center>
            {type === "Sound System" && <SoundModel />}
            {type === "Lighting Design" && <LightModel />}
            {type === "Stage Rigging" && <RiggingModel />}
            {type === "Concept Art" && <ConceptModel />}
        </Center>

        <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2} far={4} color="black"/>
    </Canvas>
  );
}