"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { CaseItem } from "@/content/schema";
import { BELOW_FOLD_IMAGE, IMAGE_SIZES } from "@/lib/performance/image-hints";

interface CasesSectionProps {
    items: CaseItem[];
    locale: string;
}

import { useRef, useState, useEffect } from "react";

const ANIMATION_DURATION = 0.2;
const ANIMATION_EASE = "linear"; // Linear makes the sequential 'drawing' effect look continuous

const variantsTop = {
    idle: { scaleX: 0, transformOrigin: "left" },
    hover_external: { scaleX: 1, transformOrigin: "left", transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION * 2, ease: ANIMATION_EASE } },
    exit_external: { scaleX: 0, transformOrigin: "right", transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION * 2, ease: ANIMATION_EASE } },
    hover_down: { scaleX: 1, transition: { duration: 0 } },
    exit_down: { scaleX: 0, transformOrigin: "center", transition: { duration: ANIMATION_DURATION, delay: 0, ease: ANIMATION_EASE } },
    hover_up: { scaleX: 1, transformOrigin: "center", transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION, ease: ANIMATION_EASE } },
    exit_up: { scaleX: 0, transition: { duration: 0 } },
    mobile_idle: { scaleX: 0, transformOrigin: "left" },
    mobile_hover: { scaleX: 1, transformOrigin: "left", transition: { duration: 0.5 } }
};

const variantsBottomLeft = {
    idle: { scaleX: 0, transformOrigin: "right" },
    hover_external: { scaleX: 1, transformOrigin: "right", transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION, ease: ANIMATION_EASE } },
    exit_external: { scaleX: 0, transformOrigin: "left", transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION, ease: ANIMATION_EASE } },
    hover_down: { scaleX: 1, transformOrigin: "right", transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION, ease: ANIMATION_EASE } },
    exit_down: { scaleX: 0, transition: { duration: 0 } },
    hover_up: { scaleX: 1, transition: { duration: 0 } },
    exit_up: { scaleX: 0, transformOrigin: "right", transition: { duration: ANIMATION_DURATION, delay: 0, ease: ANIMATION_EASE } },
    mobile_idle: { scaleX: 0, transformOrigin: "right" },
    mobile_hover: { scaleX: 1, transformOrigin: "right", transition: { duration: 0.5 } }
};

const variantsBottomRight = {
    idle: { scaleX: 0, transformOrigin: "right" },
    hover_external: { scaleX: 1, transformOrigin: "right", transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION * 3, ease: ANIMATION_EASE } },
    exit_external: { scaleX: 0, transformOrigin: "left", transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION * 3, ease: ANIMATION_EASE } },
    hover_down: { scaleX: 1, transformOrigin: "left", transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION, ease: ANIMATION_EASE } },
    exit_down: { scaleX: 0, transition: { duration: 0 } },
    hover_up: { scaleX: 1, transition: { duration: 0 } },
    exit_up: { scaleX: 0, transformOrigin: "left", transition: { duration: ANIMATION_DURATION, delay: 0, ease: ANIMATION_EASE } },
    mobile_idle: { scaleX: 0, transformOrigin: "left" },
    mobile_hover: { scaleX: 1, transformOrigin: "left", transition: { duration: 0.5 } }
};

const variantsMiddle = {
    idle: { scaleY: 0, transformOrigin: "top" },
    hover_external: { scaleY: 1, transformOrigin: "top", transition: { duration: ANIMATION_DURATION, delay: 0, ease: ANIMATION_EASE } },
    exit_external: { scaleY: 0, transformOrigin: "bottom", transition: { duration: ANIMATION_DURATION, delay: 0, ease: ANIMATION_EASE } },
    hover_down: { scaleY: 1, transformOrigin: "top", transition: { duration: ANIMATION_DURATION, delay: 0, ease: ANIMATION_EASE } },
    exit_down: { scaleY: 0, transformOrigin: "bottom", transition: { duration: ANIMATION_DURATION, delay: 0, ease: ANIMATION_EASE } },
    hover_up: { scaleY: 1, transformOrigin: "bottom", transition: { duration: ANIMATION_DURATION, delay: 0, ease: ANIMATION_EASE } },
    exit_up: { scaleY: 0, transformOrigin: "top", transition: { duration: ANIMATION_DURATION, delay: 0, ease: ANIMATION_EASE } },
    mobile_idle: { scaleY: 0, transformOrigin: "top" },
    mobile_hover: { scaleY: 1, transformOrigin: "top", transition: { duration: 0.5 } }
};

function CaseRow({ item, index, locale, hoverState, onMouseEnter }: { item: CaseItem, index: number, locale: string, hoverState: string, onMouseEnter: () => void }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const isEven = index % 2 === 0;
    const indexStr = (index + 1).toString().padStart(2, "0");
    
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { margin: "-30%" });
    const isMobileHovered = isMobile && isInView;

    useEffect(() => {
        setIsMobile(window.innerWidth < 1024);
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    let effectiveState = "idle";
    if (isMobile) {
        effectiveState = isMobileHovered ? "mobile_hover" : "mobile_idle";
    } else {
        effectiveState = hoverState;
    }

    return (
        <div 
            ref={ref}
            data-case-index={index}
            className="group flex flex-col md:flex-row items-stretch relative cursor-pointer min-h-[200px] md:min-h-[280px]"
            onClick={() => setIsExpanded(!isExpanded)}
            onMouseEnter={onMouseEnter}
            onMouseLeave={(e) => {
                const related = e.relatedTarget as HTMLElement;
                if (!related || typeof related.closest !== 'function' || !related.closest('[data-case-index]')) {
                    // Triggers exit if mouse leaves into padding/outside
                    onMouseEnter(null as any); // Signal leave
                }
            }}
            data-hover={isMobileHovered || hoverState.startsWith("hover")}
        >
            {/* Text Content */}
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={`w-full md:w-1/2 flex flex-col justify-center py-8 md:py-12 px-fluid-xs md:px-fluid-m z-40 relative ${isEven ? 'md:order-1' : 'md:order-2'}`}
            >
                <span className="font-normal group-hover:font-semibold group-data-[hover=true]:font-semibold transition-all duration-500 italic text-step-3 bg-halftone bg-clip-text text-transparent mb-1">
                    {item.customNumber || indexStr}
                </span>
                <div className="mb-3">
                    {item.title.includes(' - ') ? (
                        <>
                            <span className="block text-step-0 md:text-step-1 font-medium tracking-widest uppercase opacity-60 mb-2">
                                {item.title.split(' - ')[0]}
                            </span>
                            <h3 className="text-step-4 md:text-step-5 font-semibold uppercase tracking-normal leading-[1.1] line-clamp-2">
                                {item.title.split(' - ').slice(1).join(' - ')}
                            </h3>
                        </>
                    ) : (
                        <h3 className="text-step-4 md:text-step-5 font-semibold uppercase tracking-normal leading-[1.1] line-clamp-2">
                            {item.title}
                        </h3>
                    )}
                </div>
                
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
                                    {item.customCtaLabel || (locale === 'pt' ? 'Ver Case' : 'Read Case')}
                                </span> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-2 group-data-[hover=true]:translate-x-2 transition-transform duration-300">
                                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Image Content Wrapper */}
            <div className={`w-full md:w-1/2 relative min-h-[200px] md:min-h-full mt-6 md:mt-0 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.1 }}
                    className={`block absolute top-[1px] bottom-[1px] w-[calc(100%-1px)] ${isEven ? 'right-0' : 'left-0'} bg-background overflow-hidden z-0 rounded-none`}
                >
                    <Image 
                        src={item.thumbnailImage} 
                        alt={item.title} 
                        fill
                        sizes={IMAGE_SIZES.card}
                        {...BELOW_FOLD_IMAGE}
                        className="object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 group-data-[hover=true]:grayscale-0 group-data-[hover=true]:contrast-100 transition-all duration-1000 ease-in-out" 
                    />
                </motion.div>
            </div>

            {/* Animated Dividers (Rendered last to ensure they are on top of EVERYTHING) */}
            <motion.span variants={variantsTop} initial="idle" animate={effectiveState} className="absolute top-0 left-0 w-full h-[1px] bg-foreground z-[100] pointer-events-none" />
            <motion.span variants={variantsBottomLeft} initial="idle" animate={effectiveState} className="absolute bottom-0 left-0 w-[calc(50%-0.5px)] h-[1px] bg-foreground z-[100] pointer-events-none" />
            <motion.span variants={variantsBottomRight} initial="idle" animate={effectiveState} className="absolute bottom-0 right-0 w-[calc(50%-0.5px)] h-[1px] bg-foreground z-[100] pointer-events-none" />
            
            {/* Vertical Animated Divider (Centered on Desktop) */}
            <motion.span variants={variantsMiddle} initial="idle" animate={effectiveState} className={`hidden md:block absolute top-0 w-[1px] h-full bg-foreground left-1/2 -translate-x-1/2 z-[99] pointer-events-none`} />
            {/* Vertical Animated Divider (Mobile edges) */}
            <motion.span variants={variantsMiddle} initial="idle" animate={effectiveState} className={`md:hidden absolute top-0 w-[1px] h-full bg-foreground z-[99] pointer-events-none ${isEven ? 'left-0' : 'right-0'}`} />
        </div>
    );
}

export function CasesSection({ items, locale }: CasesSectionProps) {
    const [hoverState, setHoverState] = useState<{current: number | null, previous: number | null}>({current: null, previous: null});
    const hoverStateRef = useRef(hoverState);

    useEffect(() => {
        hoverStateRef.current = hoverState;
    }, [hoverState]);

    useEffect(() => {
        let lastX = -1;
        let lastY = -1;
        let ticking = false;

        const handleMouseMove = (e: MouseEvent) => {
            lastX = e.clientX;
            lastY = e.clientY;
        };

        const handleScroll = () => {
            if (lastX === -1 && lastY === -1) return;
            
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const el = document.elementFromPoint(lastX, lastY);
                    const row = el?.closest('[data-case-index]');
                    
                    if (row) {
                        const index = parseInt(row.getAttribute('data-case-index') || '-1');
                        if (index !== -1 && index !== hoverStateRef.current.current) {
                            setHoverState(prev => ({ current: index, previous: prev.current }));
                        }
                    } else if (hoverStateRef.current.current !== null) {
                        setHoverState(prev => ({ current: null, previous: prev.current }));
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (!items || items.length === 0) return null;

    const handleMouseEnter = (index: number) => {
        setHoverState(prev => ({ current: index, previous: prev.current }));
    };

    const handleMouseLeaveSection = () => {
        setHoverState(prev => ({ current: null, previous: prev.current }));
    };

    return (
        <section data-cases-section="true" className="w-full pb-fluid-4xl overflow-hidden" onMouseLeave={handleMouseLeaveSection}>
            <div className="flex flex-col w-full">
                {items.map((item, i) => {
                    let state = "idle";
                    
                    if (i === hoverState.current) {
                        if (hoverState.previous === null) state = "hover_external";
                        else if (hoverState.previous === i - 1) state = "hover_down";
                        else if (hoverState.previous === i + 1) state = "hover_up";
                        else state = "hover_external";
                    } else if (i === hoverState.previous && hoverState.current !== i) {
                        if (hoverState.current === null) state = "exit_external";
                        else if (hoverState.current === i - 1) state = "exit_up";
                        else if (hoverState.current === i + 1) state = "exit_down";
                        else state = "exit_external";
                    }

                    return (
                        <CaseRow 
                            key={i} 
                            item={item} 
                            index={i} 
                            locale={locale} 
                            hoverState={state} 
                            onMouseEnter={(newIndex) => {
                                if (newIndex === null as any) {
                                    setHoverState(prev => ({ current: null, previous: prev.current }));
                                } else {
                                    handleMouseEnter(i);
                                }
                            }} 
                        />
                    );
                })}
            </div>
        </section>
    );
}
