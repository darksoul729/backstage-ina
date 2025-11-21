"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ClientProjectCard({ project, index }: { project: any, index: number }) {
  return (
    <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer border border-white/10"
    >
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${project.image})` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0518] to-transparent opacity-80"></div>
        
        <div className="absolute bottom-0 left-0 p-8 w-full">
            <div className="flex justify-between items-end">
            <div>
                <p className="text-[#9db035] font-mono text-xs uppercase tracking-widest mb-2">{project.category}</p>
                <h3 className="text-3xl font-bold group-hover:text-[#9db035] transition-colors">{project.title}</h3>
            </div>
          
            </div>
        </div>
    </motion.div>
  );
}