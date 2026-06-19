"use client";

import { ApproachSection as ApproachSectionData } from "@/content/schema";
import * as motion from "framer-motion/client";
import { TerminalTitle } from "@/components/atoms/TerminalTitle";

interface ApproachSectionProps {
    data: ApproachSectionData;
}

import { useRef } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

function ApproachColumn({ col, index }: { col: any, index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 95%", "start 40%"]
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

    return (
        <motion.div 
            ref={ref}
            style={{ opacity, y }}
            className="flex flex-col col-span-12 lg:col-span-4 relative z-10"
        >
            <h3 className="inspectable inline-block text-step-2 font-bold mb-fluid-s tracking-tight">{col.title}</h3>
            <p className="inspectable text-step-0 text-foreground font-light leading-relaxed">{col.description}</p>
        </motion.div>
    );
}

export function ApproachSection({ data }: ApproachSectionProps) {
    if (!data) return null;

    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress: sectionScroll } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const headerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: headerScroll } = useScroll({
        target: headerRef,
        offset: ["start 95%", "start 40%"]
    });
    const headerOpacity = useTransform(headerScroll, [0, 1], [0, 1]);
    const headerY = useTransform(headerScroll, [0, 1], [30, 0]);

    return (
        <section 
            id="approach-section" 
            ref={sectionRef}
            className="py-fluid-4xl border-t border-foreground overflow-clip w-full grid-layout relative min-h-[100vh]"
        >

            <div ref={headerRef} className="col-span-12 mb-fluid-2xl relative z-10">
                <div className="inline-block inspectable">
                    <TerminalTitle 
                        as="h2"
                        text={data.title}
                        className="text-step-6 font-heading font-semibold tracking-normal mb-fluid-s uppercase"
                    />
                </div>
                <motion.p 
                    style={{ opacity: headerOpacity, y: headerY }}
                    className="inspectable text-step-1 text-foreground font-light leading-relaxed max-w-4xl"
                >
                    {data.subtitle}
                </motion.p>
            </div>

            {data.columns?.map((col, i) => (
                <ApproachColumn key={i} col={col} index={i} />
            ))}
        </section>
    );
}
