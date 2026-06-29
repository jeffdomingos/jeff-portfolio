"use client";

import { ApproachSection as ApproachSectionData } from "@/content/schema";
import * as motion from "framer-motion/client";
import { TerminalTitle } from "@/components/atoms/TerminalTitle";

interface ApproachSectionProps {
    data: ApproachSectionData;
}

import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, useMotionTemplate, MotionValue } from "framer-motion";

function ApproachColumn({ col, index, sectionProgress }: { col: any, index: number, sectionProgress: MotionValue }) {
    const ref = useRef<HTMLDivElement>(null);
    const startPoint = 95 - index * 15;
    const endPoint = 40 - index * 15;

    const { scrollYProgress: localProgress } = useScroll({
        target: ref,
        offset: [`start ${startPoint}%`, `start ${endPoint}%`]
    });

    const [isDesktop, setIsDesktop] = useState(true);
    useEffect(() => {
        setIsDesktop(window.innerWidth >= 1024);
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Desktop Timings (Global Scroll)
    // Section is 200svh. Enters at 0, pins at ~0.33, unpins at ~0.66, leaves at 1.0.
    const baseStart = 0.16 + index * 0.08;
    const baseEnd = 0.40 + index * 0.08;
    const fadeOutEnd = baseEnd + 0.05;

    const desktopDraw = useTransform(sectionProgress, [baseStart, baseEnd], [0, 100]);
    const desktopClipR = useTransform(sectionProgress, [baseStart, baseEnd], [100, 0]);
    const desktopClipB = useTransform(sectionProgress, [baseStart, baseEnd], [100, 0]);
    const desktopOpacity = useTransform(sectionProgress, [baseEnd, fadeOutEnd], [1, 0]);

    // Mobile Timings (Local Scroll)
    const mobileDraw = useTransform(localProgress, [0, 0.7], [0, 100]);
    const mobileClipR = useTransform(localProgress, [0, 0.7], [100, 0]);
    const mobileClipB = useTransform(localProgress, [0, 0.7], [100, 0]);
    const mobileOpacity = useTransform(localProgress, [0.7, 1], [1, 0]);

    // Animação Bounding Box
    const drawProgress = useTransform(() => isDesktop ? desktopDraw.get() : mobileDraw.get());
    const clipInsetRight = useTransform(() => isDesktop ? desktopClipR.get() : mobileClipR.get());
    const clipInsetBottom = useTransform(() => isDesktop ? desktopClipB.get() : mobileClipB.get());
    const clipPath = useMotionTemplate`inset(0% ${clipInsetRight}% ${clipInsetBottom}% 0%)`;

    const boxWidth = useMotionTemplate`${drawProgress}%`;
    const boxHeight = useMotionTemplate`${drawProgress}%`;
    const boxOpacity = useTransform(() => isDesktop ? desktopOpacity.get() : mobileOpacity.get());

    return (
        <div 
            ref={ref}
            className="flex flex-col items-start col-span-12 lg:col-span-4 relative z-10 mb-24 lg:mb-0"
        >
            <div className="relative inline-block w-fit">
                {/* The Animated Bounding Box */}
                <motion.div 
                    style={{ width: boxWidth, height: boxHeight, opacity: boxOpacity }}
                    className="absolute top-0 left-0 border border-foreground pointer-events-none z-20"
                >
                    {/* 4 Corner Nodes */}
                    <div className="absolute top-0 left-0 w-2 h-2 bg-background border border-foreground -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute top-0 right-0 w-2 h-2 bg-background border border-foreground translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 bg-background border border-foreground -translate-x-1/2 translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-background border border-foreground translate-x-1/2 translate-y-1/2" />
                </motion.div>

                {/* The Masked Content */}
                <motion.div style={{ clipPath }} className="flex flex-col items-start">
                    <motion.h3 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="inspectable inline-block text-step-2 type-subheading mb-fluid-s"
                    >
                        {col.title}
                    </motion.h3>
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="inspectable text-step-0 type-body text-foreground"
                    >
                        {col.description}
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
}

export function ApproachSection({ data }: ApproachSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress: sectionProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const { scrollYProgress: headerScroll } = useScroll({
        target: headerRef,
        offset: ["start 95%", "start 40%"]
    });
    const headerOpacity = useTransform(headerScroll, [0, 1], [0, 1]);
    const headerY = useTransform(headerScroll, [0, 1], [30, 0]);

    if (!data) return null;

    return (
        <section 
            id="approach-section" 
            ref={sectionRef}
            className="border-t border-foreground overflow-clip w-full relative z-40 bg-background lg:h-[200svh]"
        >
            <div id="approach-sticky-container" className="lg:sticky lg:top-0 w-full lg:h-[100svh] flex flex-col justify-start lg:justify-center pt-fluid-4xl pb-fluid-4xl lg:py-0">
                <div className="grid-layout w-full">
                    <div ref={headerRef} className="col-span-12 mb-fluid-2xl relative z-10 flex flex-col items-start">
                        <div className="inline-block inspectable">
                            <TerminalTitle 
                                as="h2"
                                text={data.title}
                                className="text-step-6 type-display mb-fluid-s"
                            />
                        </div>
                        <motion.p 
                            style={{ opacity: headerOpacity, y: headerY }}
                            className="inspectable text-step-1 type-body text-foreground max-w-4xl"
                        >
                            {data.subtitle}
                        </motion.p>
                    </div>

                    {data.columns?.map((col, i) => (
                        <ApproachColumn key={i} col={col} index={i} sectionProgress={sectionProgress} />
                    ))}
                </div>
            </div>
        </section>
    );
}
