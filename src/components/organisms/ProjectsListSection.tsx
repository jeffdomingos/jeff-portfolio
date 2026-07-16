"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { CaseItem } from "@/content/schema";
import { useTransitionRouter } from "next-view-transitions";

interface ProjectsListSectionProps {
    items: CaseItem[];
    locale: string;
}

export function ProjectsListSection({ items, locale }: ProjectsListSectionProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const router = useTransitionRouter();
    
    // Mouse tracking for floating thumbnail
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="relative w-full pb-fluid-2xl px-fluid-xs md:px-fluid-m mt-fluid-xl">
            {/* Floating Thumbnail (Hidden on mobile) */}
            <motion.div 
                className="hidden md:block fixed top-0 left-0 w-[400px] h-[500px] pointer-events-none z-50 overflow-hidden bg-background border border-border"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: hoveredIndex !== null ? 1 : 0,
                    scale: hoveredIndex !== null ? 1 : 0.8,
                }}
                transition={{ 
                    opacity: { duration: 0.3, ease: "easeInOut" }, 
                    scale: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] } 
                }}
            >
                {hoveredIndex !== null && items[hoveredIndex] && (
                    <Image 
                        src={items[hoveredIndex].thumbnailImage} 
                        alt={items[hoveredIndex].title} 
                        fill 
                        className="object-cover"
                        sizes="400px"
                    />
                )}
            </motion.div>

            {/* Table List */}
            <div className="flex flex-col w-full border-t border-foreground/20">
                {items.map((item, index) => {
                    const isHovered = hoveredIndex === index;
                    
                    return (
                        <div 
                            key={index}
                            className="group flex flex-col md:flex-row md:items-center justify-between py-10 md:py-16 border-b border-foreground/20 cursor-pointer transition-colors duration-500 hover:bg-foreground/5 px-4 md:px-8 -mx-4 md:-mx-8"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => {
                                if (item.href) router.push(item.href);
                            }}
                        >
                            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 w-full md:w-2/3">
                                {item.context && (
                                    <span className="block md:w-1/4 type-label font-heading text-step--1 md:text-step-0 opacity-60 font-semibold uppercase tracking-widest shrink-0 transition-opacity duration-300 group-hover:opacity-100">
                                        {item.context}
                                    </span>
                                )}
                                <h3 className={`text-step-2 md:text-step-5 type-display m-0 p-0 transition-transform duration-500 ease-[0.21,0.47,0.32,0.98] ${isHovered ? 'md:translate-x-4' : ''}`}>
                                    {item.title}
                                </h3>
                            </div>
                            
                            <div className="mt-8 md:mt-0 flex flex-col md:flex-row md:items-center gap-6 md:w-1/3 justify-start md:justify-end shrink-0">
                                {item.tags && item.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {item.tags.slice(0, 3).map((tag, tagIndex) => (
                                            <span 
                                                key={tagIndex} 
                                                className="px-4 py-1.5 bg-transparent text-foreground text-step--2 type-label rounded-full border border-foreground/30 transition-colors duration-300 group-hover:border-foreground border-dashed"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                
                                <div className="flex-shrink-0 md:ml-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`w-6 h-6 md:w-8 md:h-8 text-foreground transition-transform duration-500 ease-[0.21,0.47,0.32,0.98] ${isHovered ? '-rotate-45' : 'rotate-0'}`}>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
