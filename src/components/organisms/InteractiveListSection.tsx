"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { useTransitionRouter } from "next-view-transitions";
import { TracingItem } from "@/components/atoms/TracingBorders";

export interface ListItem {
    id: string;
    title: string;
    summary?: string;
    href: string;
    thumbnailImage?: string;
    tags?: string[];
    context?: string; // used for project context or journal date
}

interface InteractiveListSectionProps {
    items: ListItem[];
    locale: string;
}

function InteractiveRow({ 
    item, 
    index, 
    hoverState, 
    onMouseEnter, 
    onMouseLeave 
}: { 
    item: ListItem, 
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

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            data-item-index={index}
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
                id={`item-${item.id}-${index}`}
                forceActive={isRowHovered}
                forceExiting={isRowExiting}
                forceSharedWall={sharedWall}
                className="group flex flex-col md:flex-row md:items-center justify-between cursor-pointer transition-colors duration-500"
            >
                <div className="flex flex-row items-center w-full md:w-2/3 lg:w-[40%]">
                    {item.thumbnailImage && (
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
                    )}
                    
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

export function InteractiveListSection({ items, locale }: InteractiveListSectionProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [displayCount, setDisplayCount] = useState(10);

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
                    const row = el?.closest('[data-item-index]');
                    
                    if (row) {
                        const index = parseInt(row.getAttribute('data-item-index') || '-1');
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

    const uniqueTags = useMemo(() => {
        const tags = new Set<string>();
        items.forEach(item => {
            if (item.tags) {
                item.tags.forEach(tag => tags.add(tag));
            }
        });
        return Array.from(tags).sort();
    }, [items]);

    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const matchesSearch = !searchQuery || 
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                (item.summary && item.summary.toLowerCase().includes(searchQuery.toLowerCase()));
            
            const matchesTags = selectedTags.length === 0 || 
                selectedTags.every(tag => item.tags && item.tags.includes(tag));
            
            return matchesSearch && matchesTags;
        });
    }, [items, searchQuery, selectedTags]);

    const visibleItems = filteredItems.slice(0, displayCount);

    const handleTagToggle = (tag: string) => {
        setSelectedTags(prev => 
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
        setDisplayCount(10);
    };

    return (
        <div className="relative w-full mt-fluid-xl">
            {/* Toolbar: Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 w-full items-start md:items-center justify-between px-fluid-xs md:px-fluid-m">
                <div className="relative w-full md:w-1/3 shrink-0">
                    <input 
                        type="text" 
                        placeholder={locale === 'pt' ? 'Buscar...' : 'Search...'}
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setDisplayCount(10);
                        }}
                        className="w-full bg-transparent border-b border-foreground/20 focus:border-foreground py-2 pl-8 pr-4 outline-none transition-colors type-body text-step--1 text-foreground placeholder:text-foreground/40"
                    />
                    <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
                
                {uniqueTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 items-center justify-start md:justify-end">
                        {uniqueTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => handleTagToggle(tag)}
                                className={`px-3 py-1 rounded-full border border-dashed text-step--2 type-label transition-colors
                                    ${selectedTags.includes(tag) 
                                        ? 'bg-foreground text-background border-foreground' 
                                        : 'bg-transparent text-foreground/70 border-foreground/30 hover:border-foreground'}
                                `}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Full Width Divider */}
            <div className="w-full h-px bg-border mb-8" />

            {/* List and Pagination Wrapper */}
            <div className="flex flex-col w-full pb-fluid-2xl px-fluid-xs md:px-fluid-m">
                {/* List */}
                <div className="flex flex-col w-full" onMouseLeave={handleMouseLeaveSection}>
                    {visibleItems.length === 0 ? (
                        <div className="w-full text-center py-20 text-foreground/50 italic bg-muted/30 rounded-xl border border-dashed mt-4">
                            {locale === 'pt' ? 'Nenhum resultado encontrado.' : 'No results found.'}
                        </div>
                    ) : (
                        visibleItems.map((item, i) => {
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
                                <InteractiveRow 
                                    key={item.id} 
                                    item={item} 
                                    index={i} 
                                    hoverState={state} 
                                    onMouseEnter={() => handleMouseEnter(i)}
                                    onMouseLeave={() => {}}
                                />
                            );
                        })
                    )}
                </div>

                {/* Pagination / Load More */}
                {filteredItems.length > displayCount && (
                    <div className="w-full flex justify-center mt-12">
                        <button
                            onClick={() => setDisplayCount(prev => prev + 10)}
                            className="px-8 py-3 rounded-full border border-foreground/20 hover:border-foreground bg-transparent text-foreground transition-colors type-label text-step--1 uppercase tracking-wider"
                        >
                            {locale === 'pt' ? 'Carregar Mais' : 'Load More'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
