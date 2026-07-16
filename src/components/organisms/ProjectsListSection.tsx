"use client";

import { useState } from "react";
import Image from "next/image";
import { CaseItem } from "@/content/schema";
import { useTransitionRouter } from "next-view-transitions";

interface ProjectsListSectionProps {
    items: CaseItem[];
    locale: string;
}

export function ProjectsListSection({ items, locale }: ProjectsListSectionProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const router = useTransitionRouter();

    return (
        <div className="relative w-full pb-fluid-2xl px-fluid-xs md:px-fluid-m mt-fluid-xl">

            {/* Table List */}
            <div className="flex flex-col w-full border-t border-foreground/20">
                {items.map((item, index) => {
                    const isHovered = hoveredIndex === index;
                    
                    return (
                        <div 
                            key={index}
                            className="group flex flex-col md:flex-row md:items-center justify-between py-6 md:py-8 border-b border-foreground/20 cursor-pointer transition-colors duration-500 hover:bg-foreground/5 px-4 md:px-8 -mx-4 md:-mx-8"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => {
                                if (item.href) router.push(item.href);
                            }}
                        >
                            <div className="flex flex-row items-center gap-4 md:gap-8 w-full md:w-2/3">
                                <div className="relative w-20 h-20 md:w-32 md:h-20 shrink-0 rounded-lg overflow-hidden border border-foreground/10 bg-muted hidden md:block">
                                    <Image 
                                        src={item.thumbnailImage} 
                                        alt={item.title} 
                                        fill 
                                        className={`object-cover transition-transform duration-700 ease-[0.21,0.47,0.32,0.98] ${isHovered ? 'scale-110' : 'scale-100'}`}
                                        sizes="(max-width: 768px) 80px, 128px"
                                    />
                                </div>
                                
                                <div className="flex flex-col gap-1">
                                    {item.context && (
                                        <span className="block type-label font-heading text-step--2 md:text-step--1 opacity-60 font-semibold uppercase tracking-widest shrink-0 transition-opacity duration-300 group-hover:opacity-100">
                                            {item.context}
                                        </span>
                                    )}
                                    <h3 className={`text-step-1 md:text-step-4 type-display m-0 p-0 transition-transform duration-500 ease-[0.21,0.47,0.32,0.98] ${isHovered ? 'md:translate-x-2' : ''}`}>
                                        {item.title}
                                    </h3>
                                </div>
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
