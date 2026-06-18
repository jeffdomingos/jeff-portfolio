"use client";

import Image from "next/image";
import Link from "next/link";
import * as motion from "framer-motion/client";
import { CaseItem } from "@/content/schema";
import { BELOW_FOLD_IMAGE, IMAGE_SIZES } from "@/lib/performance/image-hints";

interface CasesSectionProps {
    items: CaseItem[];
    locale: string;
}

export function CasesSection({ items, locale }: CasesSectionProps) {
    if (!items || items.length === 0) return null;

    return (
        <section className="w-full pb-fluid-4xl overflow-hidden">
            <div className="flex flex-col w-full">
                {items.map((item, i) => {
                    const isEven = i % 2 === 0;
                    const indexStr = (i + 1).toString().padStart(2, "0");
                    
                    return (
                        <div 
                            key={i}
                            className={`group w-full flex flex-col md:flex-row items-stretch border-t border-foreground border-dashed ${isEven ? '' : 'md:flex-row-reverse'}`}
                        >
                            {/* Text Content */}
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, margin: "10000px 0px -150px 0px" }}
                                transition={{ duration: 0.7 }}
                                className={`w-full md:w-1/2 flex flex-col pt-fluid-xl pb-fluid-2xl px-fluid-m ${isEven ? 'md:pr-fluid-xl' : 'md:pl-fluid-xl'}`}
                            >
                                <span className="italic text-step-3 bg-halftone bg-clip-text text-transparent mb-fluid-xs">
                                    {indexStr}
                                </span>
                                <h3 className="text-step-4 md:text-step-5 font-semibold uppercase tracking-normal leading-[1.1] mb-fluid-s group-hover:translate-x-4 transition-transform duration-500 ease-out">
                                    {item.title}
                                </h3>
                                <p className="text-step-0 font-light text-foreground leading-relaxed mb-fluid-m max-w-xl">
                                    {item.summary}
                                </p>
                                
                                {item.tags && item.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-fluid-m">
                                        {item.tags.slice(0, 3).map((tag, tagIndex) => (
                                            <span key={tagIndex} className="px-3 py-1 bg-transparent text-foreground text-step--2 font-normal rounded-full border border-foreground border-dashed uppercase tracking-wider">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                
                                <Link href={item.href || "#"} className="inline-flex mt-fluid-s items-center gap-2 font-normal text-foreground hover:font-bold transition-all">
                                    <span className="border-b border-foreground/30 hover:border-foreground pb-0.5 uppercase tracking-widest text-step--2">
                                        {locale === 'pt' ? 'Ver Case' : 'Read Case'}
                                    </span> 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-2 transition-transform duration-300">
                                        <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                                    </svg>
                                </Link>
                            </motion.div>

                            {/* Image Content */}
                            <motion.div 
                                initial={{ opacity: 0, x: isEven ? 100 : -100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, margin: "10000px 0px -150px 0px" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="w-full md:w-1/2 mt-fluid-l md:mt-0 flex"
                            >
                                <Link href={item.href || "#"} className="block relative w-full h-full min-h-[50vh] bg-background overflow-hidden">
                                    <Image 
                                        src={item.thumbnailImage} 
                                        alt={item.title} 
                                        fill
                                        sizes={IMAGE_SIZES.card}
                                        {...BELOW_FOLD_IMAGE}
                                        className="object-cover scale-100 grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-1000 ease-in-out" 
                                    />
                                    {/* Halftone Masks Overlay for dot growth effect */}
                                    <div className="absolute inset-0 bg-halftone-mask-dense z-[11] pointer-events-none"></div>
                                    <div className="absolute inset-0 bg-halftone-mask z-[12] pointer-events-none group-hover:opacity-0 transition-opacity duration-1000 ease-in-out"></div>
                                </Link>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
