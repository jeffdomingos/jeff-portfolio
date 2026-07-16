"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { CaseItem } from "@/content/schema";
import { useTransitionRouter } from "next-view-transitions";
import { TracingItem } from "@/components/atoms/TracingBorders";

interface ProjectsListSectionProps {
    items: CaseItem[];
    locale: string;
}

function ProjectRow({ 
    item, 
    index, 
    hoverState, 
    onMouseEnter, 
    onMouseLeave 
}: { 
    item: CaseItem, 
    index: number, 
    hoverState: string, 
    onMouseEnter: () => void, 
    onMouseLeave: () => void 
}) {
    const router = useTransitionRouter();
    
    // Row hover trigger
    const isRowHovered = hoverState.startsWith("hover");
    const isRowExiting = hoverState.startsWith("exit");
    
    let sharedWall: "top" | "bottom" | null = null;
    if (hoverState === "hover_down") sharedWall = "top";
    else if (hoverState === "hover_up") sharedWall = "bottom";
    else if (hoverState === "exit_down") sharedWall = "bottom";
    else if (hoverState === "exit_up") sharedWall = "top";

    // Reusing the same hover tracking for inner elements if needed
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            data-project-index={index}
            onMouseEnter={() => {
                setIsHovered(true);
                onMouseEnter();
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                onMouseLeave();
            }}
            onClick={() => {
                if (item.href) router.push(item.href);
            }}
            className={`w-full relative ${hoverState !== "idle" ? "z-50" : "z-10"}`}
        >
            <TracingItem 
                id={`project-${index}`}
                forceActive={isRowHovered}
                forceExiting={isRowExiting}
                forceSharedWall={sharedWall}
                className="group flex flex-col md:flex-row md:items-center justify-between cursor-pointer transition-colors duration-500"
            >
                <div className="flex flex-row items-center w-full md:w-2/3 lg:w-[40%]">
                    <div className="relative w-24 md:w-[200px] aspect-video shrink-0 overflow-hidden bg-muted hidden md:block my-[2px]">
                        <div className="absolute inset-0 z-10 bg-halftone-mask pointer-events-none opacity-100" />
                        <Image 
                            src={item.thumbnailImage} 
                            alt={item.title} 
                            fill 
                            className={`object-cover transition-transform duration-700 ease-[0.21,0.47,0.32,0.98] grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 ${isHovered ? 'scale-110' : 'scale-100'}`}
                            sizes="(max-width: 768px) 128px, 200px"
                        />
                    </div>
                    
                    <div className="flex flex-col justify-center gap-1 py-4 md:py-6 px-4 md:px-6">
                        {item.context && (
                            <span className="block type-label font-heading text-step--2 md:text-[0.75rem] opacity-60 font-semibold uppercase tracking-widest shrink-0 transition-opacity duration-300 group-hover:opacity-100">
                                {item.context}
                            </span>
                        )}
                        <h3 className={`text-step-0 md:text-step-2 type-display m-0 p-0 transition-transform duration-500 ease-[0.21,0.47,0.32,0.98] ${isHovered ? 'md:translate-x-2' : ''}`}>
                            {item.title}
                        </h3>
                    </div>
                </div>
                
                <div className="hidden lg:flex flex-col justify-center lg:w-[35%] py-4 md:py-6 px-4 md:px-6">
                    <p className="text-step--1 type-body text-foreground line-clamp-2 m-0 p-0">
                        {item.summary}
                    </p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-4 md:w-1/3 lg:w-[25%] justify-start md:justify-end shrink-0 py-4 md:py-6 px-4 md:px-6">
                    {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap justify-start md:justify-end text-step--2 md:text-[0.75rem] type-label opacity-70">
                            {item.tags.slice(0, 3).map((tag, tagIndex, arr) => (
                                <span key={tagIndex} className="whitespace-nowrap">
                                    #{tag}{tagIndex < arr.length - 1 ? ', ' : ''}&nbsp;
                                </span>
                            ))}
                        </div>
                    )}
                    
                    <div className="flex-shrink-0 ml-0 md:ml-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 md:w-6 md:h-6 text-foreground transition-transform duration-500 ease-[0.21,0.47,0.32,0.98] ${isHovered ? '-rotate-45' : 'rotate-0'}`}>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </div>
                </div>
            </TracingItem>
        </div>
    );
}

export function ProjectsListSection({ items, locale }: ProjectsListSectionProps) {
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
                    const row = el?.closest('[data-project-index]');
                    
                    if (row) {
                        const index = parseInt(row.getAttribute('data-project-index') || '-1');
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

    const handleMouseEnter = (index: number) => {
        setHoverState(prev => ({ current: index, previous: prev.current }));
    };

    const handleMouseLeaveSection = (e: React.MouseEvent) => {
        if (e.currentTarget === e.target) {
            setHoverState(prev => prev.current !== null ? { current: null, previous: prev.current } : prev);
        }
    };

    return (
        <div className="relative w-full pb-fluid-2xl px-fluid-xs md:px-fluid-m mt-fluid-xl" onMouseLeave={handleMouseLeaveSection}>
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
                        <ProjectRow 
                            key={i} 
                            item={item} 
                            index={i} 
                            hoverState={state} 
                            onMouseEnter={() => handleMouseEnter(i)}
                            onMouseLeave={() => {}}
                        />
                    );
                })}
            </div>
        </div>
    );
}
