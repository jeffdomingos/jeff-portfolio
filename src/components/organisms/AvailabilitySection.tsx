"use client";

import { AvailabilitySection as AvailabilitySectionData } from "@/content/schema";
import { TerminalTitle } from "@/components/atoms/TerminalTitle";
import { InteractiveDeskSVG } from "@/components/atoms/InteractiveDeskSVG";

interface AvailabilitySectionProps {
    data: AvailabilitySectionData;
    locale: string;
}

import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

function AvailabilityBlockDesktop({ 
    block, 
    index, 
    locale, 
    activeIndex,
    onActivate 
}: { 
    block: any, 
    index: number, 
    locale: string,
    activeIndex: number,
    onActivate: () => void
}) {
    const isActive = activeIndex === index;
    const h3Desktop = index === 1 ? 'translate-x-[75%] opacity-40' : '-translate-x-[75%] opacity-40';

    return (
        <div 
            className={`w-full group flex flex-col justify-center cursor-pointer 
                py-fluid-2xl
                ${index === 1 ? 'pl-[200px] lg:pl-[260px] xl:pl-[300px] 2xl:pl-[350px]' : 'pr-[200px] lg:pr-[260px] xl:pr-[300px] 2xl:pr-[350px]'} 
            `}
            onClick={onActivate}
            onMouseEnter={onActivate}
        >
            <div className="relative w-full flex flex-col justify-center">
                {/* TEXT & BLUR LAYER - ABOVE HALFTONE (z-30) */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                    className="relative z-30"
                >
                    {/* Glassmorphism Backdrop restricted to content area */}
                    <div className={`absolute inset-y-[-20%] inset-x-[-30%] z-0 pointer-events-none 
                        bg-background/60 backdrop-blur-md 
                        [mask-image:radial-gradient(ellipse_at_center,_black_40%,_transparent_80%)]
                        transition-opacity duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                        ${isActive ? 'opacity-100' : 'opacity-0'}
                    `} />

                <div className={`z-10 w-full relative flex items-start ${index === 1 ? 'justify-end pr-fluid-m' : 'justify-start pl-fluid-m'}`}>
                    <div className={`transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? 'translate-x-0 translate-y-0' : (index === 1 ? 'translate-x-[50%]' : '-translate-x-[50%]')}`}>
                        <h3 className={`text-step-4 type-heading transition-opacity duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? 'opacity-100' : 'opacity-40'} ${index === 1 ? 'text-right' : 'text-left'}`}>
                            {index === 1 && (
                                <ChevronRight 
                                    className={`inline-block align-top mt-2 md:mt-4 mr-8 md:mr-16 lg:mr-24 w-8 h-8 md:w-10 md:h-10 shrink-0 text-foreground transition-opacity duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? 'opacity-0' : 'opacity-40'}`}
                                    strokeWidth={1.5}
                                />
                            )}
                            {block.subtitle}
                            {index === 0 && (
                                <ChevronLeft 
                                    className={`inline-block align-top mt-2 md:mt-4 ml-8 md:ml-16 lg:ml-24 w-8 h-8 md:w-10 md:h-10 shrink-0 text-foreground transition-opacity duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? 'opacity-0' : 'opacity-40'}`}
                                    strokeWidth={1.5}
                                />
                            )}
                        </h3>
                    </div>
                </div>
            
            <div className={`overflow-hidden grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] w-full relative z-10 ${isActive ? 'grid-rows-[1fr] pointer-events-auto' : 'grid-rows-[0fr] pointer-events-none'}`}>
                <motion.div 
                    className={`flex flex-col w-full max-w-sm lg:max-w-md xl:max-w-lg ${index === 1 ? 'ml-auto items-end text-right pr-fluid-m' : 'mr-auto items-start text-left pl-fluid-m'}`}
                    variants={{
                        hidden: { opacity: 0, transition: { staggerChildren: 0.1, staggerDirection: -1 } },
                        show: { opacity: 1, transition: { staggerChildren: 0.35, delayChildren: 0.45 } }
                    }}
                    initial="hidden"
                    animate={isActive ? "show" : "hidden"}
                >
                    <motion.p 
                        variants={{
                            hidden: { opacity: 0, x: index === 0 ? '-100%' : '100%', y: 0 },
                            show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
                        }}
                        className="text-step-0 type-body text-foreground pt-fluid-m"
                    >
                        {block.description}
                    </motion.p>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: index === 0 ? '-100%' : '100%', y: 0 },
                            show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
                        }}
                    >
                        <Button asChild className="mt-fluid-m pointer-events-auto">
                            <Link href={`/${locale}/contact`}>
                                {locale === 'en' ? "Let's talk" : 'Vamos conversar'}
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
        </div>
    </div>
    );
}

function AvailabilityBlockMobile({ 
    block, 
    index, 
    locale, 
    stickyProgress 
}: { 
    block: any, 
    index: number, 
    locale: string,
    stickyProgress: any
}) {
    // Definimos os momentos (progress) para cada elemento criar o efeito escalonado no scroll (scrub)
    // index 0: entra (0 a 0.25), espera, sai reverso e rápido (0.35 a 0.55)
    // index 1: entra (0.5 a 0.75), e não sai (sobe com a página)
    
    const h3In = index === 0 ? [0, 0.15, 0.45, 0.55] : [0.5, 0.65, 1];
    const pIn = index === 0 ? [0.05, 0.2, 0.4, 0.5] : [0.55, 0.7, 1];
    const btnIn = index === 0 ? [0.1, 0.25, 0.35, 0.45] : [0.6, 0.75, 1];
    const bgIn = index === 0 ? [0, 0.15, 0.45, 0.55] : [0.5, 0.65, 1];

    // Valores dinâmicos (estritamente horizontais, sem subir)
    const startX = index === 0 ? "-100%" : "100%";
    const exitX = index === 0 ? "-100%" : "0%";
    
    const xVals = index === 0 ? [startX, "0%", "0%", exitX] : [startX, "0%", "0%"];
    const yVals = index === 0 ? [0, 0, 0, 0] : [0, 0, 0];
    const opVals = index === 0 ? [0, 1, 1, 0] : [0, 1, 1];

    // Aplicando transforms escalonados (scrub)
    const xH3 = useTransform(stickyProgress, h3In, xVals);
    const yH3 = useTransform(stickyProgress, h3In, yVals);
    const opH3 = useTransform(stickyProgress, h3In, opVals);

    const xP = useTransform(stickyProgress, pIn, xVals);
    const yP = useTransform(stickyProgress, pIn, yVals);
    const opP = useTransform(stickyProgress, pIn, opVals);

    const xBtn = useTransform(stickyProgress, btnIn, xVals);
    const yBtn = useTransform(stickyProgress, btnIn, yVals);
    const opBtn = useTransform(stickyProgress, btnIn, opVals);

    const opBg = useTransform(stickyProgress, bgIn, opVals);

    return (
        <div className={`w-full group flex flex-col justify-center relative px-fluid-xs md:px-fluid-m pointer-events-auto`}>
            {/* Glassmorphism Backdrop individualizado em opacity */}
            <motion.div 
                style={{ opacity: opBg }}
                className="absolute inset-[-50%] z-0 pointer-events-none bg-background/60 backdrop-blur-md [mask-image:radial-gradient(ellipse_at_center,_black_20%,_transparent_60%)]" 
            />

            <div className={`z-10 w-full relative ${index === 1 ? 'ml-auto text-right' : 'mr-auto text-left'}`}>
                <motion.h3 
                    style={{ x: xH3, y: yH3, opacity: opH3 }}
                    className="inline-block text-step-4 type-display mt-2"
                >
                    {block.subtitle}
                </motion.h3>
            </div>
            
            <div className="w-full relative z-10">
                <div className={`flex flex-col w-full max-w-sm ${index === 1 ? 'ml-auto items-end text-right' : 'mr-auto items-start text-left'}`}>
                    <motion.p 
                        style={{ x: xP, y: yP, opacity: opP }}
                        className="text-step-0 type-body text-foreground pt-fluid-m"
                    >
                        {block.description}
                    </motion.p>
                    <motion.div 
                        style={{ x: xBtn, y: yBtn, opacity: opBtn }}
                        className="mt-fluid-m pointer-events-auto"
                    >
                        <Button asChild>
                            <Link href={`/${locale}/contact`}>
                                {locale === 'en' ? "Let's talk" : 'Vamos conversar'}
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export function AvailabilitySection({ data, locale }: AvailabilitySectionProps) {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const trackRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ["start end", "end start"]
    });

    const { scrollYProgress: stickyProgress } = useScroll({
        target: trackRef,
        offset: ["start start", "end end"]
    });

    // Sync face lighting based on scroll on mobile
    useMotionValueEvent(stickyProgress, "change", (latest) => {
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            setActiveIndex(latest > 0.45 ? 1 : 0);
        }
    });

    const yHead = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [100, 45, 0, -22, -45]);

    if (!data || !data.blocks || data.blocks.length === 0) return null;

    return (
        <section 
            className="pt-fluid-4xl border-t border-foreground w-full relative z-40"
            onMouseMove={(e) => {
                if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    let progress = (e.clientX - rect.left) / rect.width;
                    progress = Math.max(0, Math.min(1, progress));
                    
                    setActiveIndex(progress < 0.5 ? 0 : 1);
                }
            }}
        >
            <TerminalTitle 
                as="h2"
                text={data.title}
                className="relative z-40 text-step-6 type-display mb-fluid-2xl px-fluid-xs md:px-fluid-m"
            />

            <div ref={trackRef} className="w-full relative h-[250svh] md:h-auto">
                <div className="w-full h-[100svh] md:h-auto sticky top-0 md:relative md:top-auto flex flex-col justify-start bg-background">
                    
                    {/* Malha local restaurada para o container sticky. 
                        Isso aplica a retícula no SVG (z-10) mas mantém ela atrás dos textos (z-50).
                        Como usa background-attachment: fixed, alinha perfeitamente com a global mesh externa. */}
                    <div className="absolute inset-0 w-full h-full pointer-events-none bg-halftone-mask bg-scroll z-20"></div>

                    {/* Main content part (100svh on mobile to fit the screen stably, auto on desktop) */}
                    <div className="grid grid-cols-1 grid-rows-1 w-full h-[100svh] md:h-auto overflow-hidden md:overflow-visible relative shrink-0">
                        {/* Fundo preto de segurança na base removido conforme solicitado */}

                        <div className="col-start-1 row-start-1 justify-self-center self-start w-[120%] sm:w-[90%] max-w-[600px] lg:max-w-[750px] aspect-[10/21] z-10 pointer-events-none">
                            <InteractiveDeskSVG scrollYProgress={scrollYProgress} activeIndex={activeIndex} />
                        </div>

                        {/* Desktop Layer */}
                        <div className="hidden md:grid col-start-1 row-start-1 grid-cols-2 relative w-full h-full items-start pt-[15%] lg:pt-[12%] pb-fluid-3xl pointer-events-none">
                            {data.blocks.map((block, i) => (
                                <div key={`desktop-${i}`} className="pointer-events-auto w-full">
                                    <AvailabilityBlockDesktop 
                                        block={block} 
                                        index={i} 
                                        locale={locale} 
                                        activeIndex={activeIndex}
                                        onActivate={() => setActiveIndex(i)}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Mobile Layer */}
                        <div className="grid md:hidden absolute left-0 bottom-[1svh] z-50 w-full pointer-events-none">
                            {data.blocks.map((block, i) => (
                                <div key={`mobile-${i}`} className="col-start-1 row-start-1 pointer-events-auto w-full">
                                    <AvailabilityBlockMobile 
                                        block={block} 
                                        index={i} 
                                        locale={locale} 
                                        stickyProgress={stickyProgress}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Transition Gradient at the base of the sticky container */}
                    <div 
                        className="absolute bottom-[-2px] left-0 w-full pointer-events-none z-40"
                        style={{
                            height: 'calc(80svh + 2px)',
                            background: 'linear-gradient(to bottom, transparent 0%, oklch(var(--color-background) / 0.05) 20%, oklch(var(--color-background) / 0.3) 50%, oklch(var(--color-background) / 0.7) 80%, oklch(var(--color-background)) 100%)'
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
