"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CaseItem } from "@/content/schema";
import { BELOW_FOLD_IMAGE, IMAGE_SIZES } from "@/lib/performance/image-hints";

interface CasesSectionProps {
    items: CaseItem[];
    locale: string;
}

import { useRef, useState } from "react";

function CaseRow({ item, index, locale }: { item: CaseItem, index: number, locale: string }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const isEven = index % 2 === 0;
    const indexStr = (index + 1).toString().padStart(2, "0");
    
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div 
            ref={ref}
            className="group flex flex-col md:flex-row items-stretch relative cursor-pointer min-h-[200px] md:min-h-[280px]"
            onClick={() => setIsExpanded(!isExpanded)}
        >
            {/* Animated Dividers */}
            <span className="absolute top-0 left-0 w-full h-px bg-foreground scale-x-0 origin-right transition-transform duration-500 ease-in-out z-20 group-hover:scale-x-100 group-hover:origin-left"></span>
            <span className="absolute bottom-0 right-0 w-full h-px bg-foreground scale-x-0 origin-left transition-transform duration-500 ease-in-out z-20 group-hover:scale-x-100 group-hover:origin-right"></span>

            {/* Text Content */}
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={`w-full md:w-1/2 flex flex-col justify-center py-8 md:py-12 px-fluid-xs md:px-fluid-m z-10 relative ${isEven ? 'md:order-1' : 'md:order-2'}`}
            >
                <span className="font-normal group-hover:font-semibold transition-all duration-500 italic text-step-3 bg-halftone bg-clip-text text-transparent mb-1">
                    {indexStr}
                </span>
                <h3 className="text-step-4 md:text-step-5 font-semibold uppercase tracking-normal leading-[1.1] mb-3 line-clamp-2">
                    {item.title}
                </h3>
                
                {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                        {item.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span key={tagIndex} className="px-3 py-1 bg-transparent text-foreground text-step--2 font-normal rounded-full border border-foreground border-dashed uppercase tracking-wider">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden flex flex-col justify-start">
                        <div className="pt-fluid-m">
                            <p className="text-step-0 font-light text-foreground leading-relaxed max-w-xl">
                                {item.summary}
                            </p>
                            
                            <Link href={item.href || "#"} onClick={(e) => e.stopPropagation()} className="inline-flex mt-fluid-m items-center gap-2 font-normal text-foreground hover:font-bold transition-all">
                                <span className="border-b border-foreground/30 hover:border-foreground pb-0.5 uppercase tracking-widest text-step--2">
                                    {locale === 'pt' ? 'Ver Case' : 'Read Case'}
                                </span> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-2 transition-transform duration-300">
                                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Image Content */}
            <motion.div 
                initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.1 }}
                className={`w-full md:w-1/2 relative min-h-[200px] md:min-h-full bg-background overflow-hidden z-0 mt-6 md:mt-0 ${isEven ? 'md:order-2' : 'md:order-1'}`}
            >
                <div className="block relative w-full h-full min-h-[200px] md:min-h-full bg-background overflow-hidden transition-all duration-500 ease-in-out rounded-none">
                    {/* Vertical Animated Divider */}
                    <span className={`absolute top-0 w-px h-0 bg-foreground group-hover:h-full transition-all duration-500 ease-in-out z-30 ${isEven ? 'left-0' : 'right-0'}`}></span>
                    
                    <Image 
                        src={item.thumbnailImage} 
                        alt={item.title} 
                        fill
                        sizes={IMAGE_SIZES.card}
                        {...BELOW_FOLD_IMAGE}
                        className="object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-1000 ease-in-out" 
                    />
                    <div className="absolute inset-0 bg-halftone-mask-dense z-[11] pointer-events-none"></div>
                    <div className={`absolute inset-0 bg-halftone-mask z-[12] pointer-events-none transition-opacity duration-1000 ease-in-out ${isExpanded ? 'opacity-0' : 'group-hover:opacity-0'}`}></div>
                </div>
            </motion.div>
        </div>
    );
}

export function CasesSection({ items, locale }: CasesSectionProps) {
    if (!items || items.length === 0) return null;

    return (
        <section className="w-full pb-fluid-4xl overflow-hidden">
            <div className="flex flex-col w-full">
                {items.map((item, i) => (
                    <CaseRow key={i} item={item} index={i} locale={locale} />
                ))}
            </div>
        </section>
    );
}
