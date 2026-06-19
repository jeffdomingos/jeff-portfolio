"use client";

import { AvailabilitySection as AvailabilitySectionData } from "@/content/schema";
import * as motion from "framer-motion/client";
import { TerminalTitle } from "@/components/atoms/TerminalTitle";

interface AvailabilitySectionProps {
    data: AvailabilitySectionData;
}

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

function AvailabilityBlock({ block, index }: { block: any, index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 95%", "start 40%"]
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <motion.div 
            ref={ref}
            style={{ opacity }}
            className="group bg-background hover:bg-halftone-light transition-all duration-500 p-fluid-2xl flex flex-col items-start overflow-hidden relative cursor-crosshair h-full"
        >
            <div className="mb-fluid-l z-10 w-full flex-1">
                <span className="inline-block px-4 py-1.5 bg-transparent border border-foreground text-foreground text-step--2 font-semibold uppercase tracking-wider rounded-full mb-fluid-m">
                    {block.title}
                </span>
                <h3 className="text-step-4 font-heading font-semibold tracking-normal mt-2 leading-none">{block.subtitle}</h3>
            </div>
            
            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] w-full z-10">
                <div className="overflow-hidden">
                    <p className="text-step-0 text-foreground font-normal leading-relaxed max-w-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                        {block.description}
                    </p>
                    <div className="mt-fluid-l flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 transform translate-y-4 group-hover:translate-y-0">
                        <div className="w-12 h-12 rounded-full border-2 border-foreground flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform -rotate-45">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function AvailabilitySection({ data }: AvailabilitySectionProps) {
    if (!data || !data.blocks || data.blocks.length === 0) return null;

    return (
        <section className="px-fluid-m py-fluid-4xl border-t border-foreground w-full mb-fluid-3xl">
            <TerminalTitle 
                as="h2"
                text={data.title}
                className="text-step-6 font-heading font-semibold tracking-normal mb-fluid-2xl uppercase"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground border border-foreground w-full">
                {data.blocks.map((block, i) => (
                    <AvailabilityBlock key={i} block={block} index={i} />
                ))}
            </div>
        </section>
    );
}
