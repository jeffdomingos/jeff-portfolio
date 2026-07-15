"use client";

import Image from "next/image";
import { Link } from "next-view-transitions";
import { motion, useInView } from "framer-motion";
import { CaseItem } from "@/content/schema";
import { BELOW_FOLD_IMAGE, IMAGE_SIZES } from "@/lib/performance/image-hints";

interface CasesSectionProps {
    items: CaseItem[];
    locale: string;
}

import { useRef, useState, useEffect } from "react";
import { useLenis } from "lenis/react";

import { TracingGrid, TracingItem } from "@/components/atoms/TracingBorders";

function CaseRow({ item, index, locale, hoverState, onMouseEnter, onMouseLeave }: { item: CaseItem, index: number, locale: string, hoverState: string, onMouseEnter: () => void, onMouseLeave: () => void }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);
    const [isCtaHovered, setIsCtaHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const isEven = index % 2 === 0;
    const indexStr = (index + 1).toString().padStart(2, "0");
    
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const lenis = useLenis();
    const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });
    const isMobileHovered = isMobile && isInView;

    useEffect(() => {
        setIsMobile(window.innerWidth < 1024);
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Row hover trigger
    const isRowHovered = isMobileHovered || hoverState.startsWith("hover");
    const isRowExiting = hoverState.startsWith("exit");
    
    let sharedWall: "top" | "bottom" | null = null;
    if (hoverState === "hover_down") sharedWall = "top";
    else if (hoverState === "hover_up") sharedWall = "bottom";
    else if (hoverState === "exit_down") sharedWall = "bottom";
    else if (hoverState === "exit_up") sharedWall = "top";

    const handleToggleExpand = (e: React.MouseEvent) => {
        const nextState = !isExpanded;
        setIsExpanded(nextState);
        
        if (nextState && containerRef.current && lenis) {
            // Scroll to perfectly frame the card, accounting for 56px header
            lenis.scrollTo(containerRef.current, { offset: -56, duration: 1.2, lock: false });
        }
    };

    const showChevron = !isExpanded ? isRowHovered : (isRowHovered && hoveredSide === "left");

    return (
        <div 
            ref={containerRef}
            data-case-index={index}
            data-hover={isRowHovered}
            className={`group flex flex-col md:flex-row items-stretch relative cursor-pointer ${isExpanded ? 'min-h-[100svh]' : 'min-h-[200px] md:min-h-[280px]'} transition-[min-height] duration-700 ease-in-out`}
            onClick={handleToggleExpand}
            onMouseEnter={onMouseEnter}
            onMouseLeave={(e) => {
                onMouseLeave(); // Signal leave for external cases logic
            }}
        >
            <div 
                ref={ref}
                className="absolute inset-0 z-0 pointer-events-none"
            />
            {/* Left Card */}
            <TracingItem 
                id={`case-${index}-left`}
                className={`w-full md:w-1/2 flex flex-col justify-center py-8 md:py-12 px-fluid-xs md:px-fluid-m z-40 ${isEven ? 'md:order-1' : 'md:order-2'}`}
                hiddenWalls={isEven ? ["left"] : ["right"]} // Leak to outside edge
                forceActive={isRowHovered}
                forceExiting={isRowExiting}
                forceSharedWall={sharedWall}
                delayOffset={0}
            >
                <div 
                    className="w-full h-full flex flex-col justify-center"
                    onMouseEnter={() => setHoveredSide("left")}
                    onMouseLeave={() => setHoveredSide(null)}
                >
                    <div className="w-full pointer-events-auto cursor-pointer flex items-start md:items-center justify-between gap-4">
                        <div 
                        style={{ viewTransitionName: `project-header-${item.href.split('/').pop()}`, width: 'fit-content' }}
                        className="flex flex-col items-start"
                    >
                        <div className="mb-6">
                            {item.context && (
                                <span className="block text-step--1 md:text-step-0 font-heading opacity-90 type-label font-semibold text-foreground tracking-widest uppercase mb-2">
                                    {item.context}
                                </span>
                            )}
                            <h3 className="text-step-4 md:text-step-5 type-display text-foreground leading-none m-0 p-0 line-clamp-2">
                                {item.title}
                            </h3>
                        </div>
                        
                        {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {item.tags.slice(0, 3).map((tag, tagIndex) => (
                                    <span 
                                        key={tagIndex} 
                                        className="px-4 py-1.5 bg-transparent text-foreground text-step--2 type-label rounded-full border border-foreground border-dashed"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <div className="flex-shrink-0 self-center mt-[-30px]">
                        <motion.svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className={`w-8 h-8 md:w-10 md:h-10 text-foreground transition-transform duration-500 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
                        >
                            <motion.path 
                                d="m6 9 6 6 6-6"
                                strokeWidth="1.5"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ 
                                    pathLength: showChevron ? 1 : 0,
                                    opacity: showChevron ? 1 : 0
                                }}
                                transition={{ 
                                    duration: 0.6, 
                                    ease: [0.21, 0.47, 0.32, 0.98],
                                    opacity: { duration: 0.1 }
                                }}
                            />
                        </motion.svg>
                    </div>
                </div>

                <div className={`grid transition-all duration-500 ease-in-out mt-4 ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden flex flex-col justify-start">
                        <div className="pt-fluid-m">
                            <p className="text-step-0 type-body text-foreground max-w-xl">
                                {item.summary}
                            </p>
                            
                            <Link 
                                href={item.href || "#"} 
                                onClick={(e) => e.stopPropagation()} 
                                className={`inline-flex mt-fluid-m items-center gap-2 text-foreground transition-all duration-300 ${isCtaHovered ? 'font-bold' : 'font-normal'}`}
                                onMouseEnter={() => setIsCtaHovered(true)}
                                onMouseLeave={() => setIsCtaHovered(false)}
                            >
                                <span className={`border-b pb-0.5 type-label text-step--2 transition-colors duration-300 ${isCtaHovered ? 'border-foreground' : 'border-foreground/30'}`}>
                                    {item.customCtaLabel || (locale === 'pt' ? 'Ver case completo' : 'Read full case')}
                                </span> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transform transition-transform duration-300 ${isCtaHovered ? 'translate-x-4' : 'group-hover:translate-x-2 group-data-[hover=true]:translate-x-2'}`}>
                                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
                </div>
            </TracingItem>

            {/* Right Card */}
            <TracingItem 
                id={`case-${index}-right`}
                className={`w-full md:w-1/2 relative min-h-[200px] md:min-h-full mt-0 ${isEven ? 'md:order-2' : 'md:order-1'}`}
                hiddenWalls={isEven ? ["right"] : ["left"]} // Leak to outside edge
                forceActive={isRowHovered}
                forceExiting={isRowExiting}
                forceSharedWall={sharedWall}
                delayOffset={0.6} // Starts filling right after Left Card finishes (4 * 0.15s)
            >
                <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.1 }}
                    className={`block absolute top-[1px] bottom-[1px] w-[calc(100%-1px)] ${isEven ? 'right-0' : 'left-0'} bg-background overflow-hidden z-0 rounded-none cursor-pointer pointer-events-auto`}
                    onMouseEnter={() => setHoveredSide("right")}
                    onMouseLeave={() => setHoveredSide(null)}
                >
                    {isExpanded && item.href && (
                        <Link 
                            href={item.href} 
                            onClick={(e) => e.stopPropagation()} 
                            className="absolute inset-0 z-10" 
                            aria-label={`Ver case ${item.title}`} 
                            onMouseEnter={() => setIsCtaHovered(true)}
                            onMouseLeave={() => setIsCtaHovered(false)}
                        />
                    )}
                    <Image 
                        src={item.thumbnailImage} 
                        alt={item.title} 
                        fill
                        sizes={IMAGE_SIZES.card}
                        {...BELOW_FOLD_IMAGE}
                        className={`object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 group-data-[hover=true]:grayscale-0 group-data-[hover=true]:contrast-100 transition-all duration-700 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] cursor-pointer pointer-events-auto ${isExpanded && isCtaHovered ? 'scale-105' : 'scale-100'}`} 
                    />
                </motion.div>
            </TracingItem>
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

    const handleMouseLeaveSection = (e: React.MouseEvent) => {
        // Only trigger if we are actually leaving the section, not bubbling from a child
        if (e.currentTarget === e.target) {
            setHoverState(prev => prev.current !== null ? { current: null, previous: prev.current } : prev);
        }
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
                            onMouseEnter={() => handleMouseEnter(i)}
                            onMouseLeave={() => setHoverState(prev => prev.current !== null ? { current: null, previous: prev.current } : prev)}
                        />
                    );
                })}
            </div>
        </section>
    );
}
