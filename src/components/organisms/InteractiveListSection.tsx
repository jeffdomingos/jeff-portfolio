"use client";

import { useState, useRef, useEffect, useMemo, Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TracingItem } from "@/components/atoms/TracingBorders";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BoldReserver } from "@/components/atoms/BoldReserver";

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
    hideFilters?: boolean;
}

function InteractiveRow({ 
    item, 
    index, 
    hoverState, 
    onMouseEnter, 
    onMouseLeave,
    isFadeItem,
    locale
}: { 
    item: ListItem, 
    index: number, 
    hoverState: string, 
    onMouseEnter: () => void, 
    onMouseLeave: () => void,
    isFadeItem?: boolean,
    locale?: string
}) {
    const router = useRouter();
    
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
                if (!isFadeItem) setIsHovered(true);
                onMouseEnter();
            }}
            onMouseLeave={() => {
                if (!isFadeItem) setIsHovered(false);
                onMouseLeave();
            }}
            onClick={() => {
                if (item.href) router.push(item.href);
            }}
            className={`${!isFadeItem ? 'group' : ''} group/row w-full relative flex flex-col items-stretch -mt-[1px] first:mt-0`}
        >
            {/* 100vw Animated Borders */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-0 border-t border-foreground origin-right group-hover/row:origin-left scale-x-0 transition-transform duration-500 ease-[0.21,0.47,0.32,0.98] delay-100 group-hover/row:scale-x-100 group-hover/row:delay-0 z-[80] pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100vw] h-0 border-b border-foreground origin-right group-hover/row:origin-left scale-x-0 transition-transform duration-500 ease-[0.21,0.47,0.32,0.98] delay-0 group-hover/row:scale-x-100 group-hover/row:delay-100 z-[80] pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-stretch justify-between cursor-pointer transition-colors duration-500 rounded-xl md:rounded-none flex-1">
                <div className="flex flex-row items-stretch w-full md:w-2/3 lg:w-[40%]">
                    {item.thumbnailImage && (
                        <div className="relative w-24 md:w-[200px] shrink-0 overflow-hidden bg-muted hidden md:block my-[2px]">
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
                            <span className="block type-label font-heading text-step--1 md:text-[0.875rem] opacity-80 font-semibold uppercase tracking-widest shrink-0 transition-opacity duration-300 group-hover:opacity-100">
                                {item.context}
                                {item.tags && (() => {
                                    const year = item.tags.find((t: string) => /^\d{4}$/.test(String(t)));
                                    return year ? <span className="opacity-75 font-normal ml-2">{year}</span> : null;
                                })()}
                            </span>
                        )}
                        <h3 className={`text-step-0 md:text-step-2 type-display m-0 p-0 transition-transform duration-500 ease-[0.21,0.47,0.32,0.98] ${isHovered ? 'md:translate-x-2' : ''}`}>
                            {item.title}
                        </h3>
                    </div>
                </div>
                
                <div className="relative flex flex-col w-full lg:w-[45%] h-full">
                    {item.summary && item.summary.includes(' • ') ? (
                        <>
                            {/* BACKGROUND BORDERS */}
                            <div className="absolute inset-0 py-2 lg:py-6 px-4 md:px-6 pointer-events-none">
                                <div className="grid grid-cols-1 md:grid-cols-3 w-full h-full">
                                    {item.summary.split(' • ').map((_, i, arr) => (
                                        <div key={`border-${i}`} className={`h-full border-foreground/10 border-l ${i === arr.length - 1 ? 'md:border-r' : ''}`} />
                                    ))}
                                </div>
                            </div>

                            {/* GHOST GRID */}
                            <div className="invisible pointer-events-none flex flex-col justify-center h-full w-full py-2 lg:py-6 px-4 md:px-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 w-full">
                                    {item.summary.split(' • ').map((metric, i) => {
                                        const [title, ...descParts] = metric.split(':');
                                        const desc = descParts.join(':').trim();
                                        const colClass = i === 0 ? 'md:col-start-1' : i === 1 ? 'md:col-start-2' : 'md:col-start-3';
                                        return (
                                            <Fragment key={`ghost-${i}`}>
                                                <div className={`${colClass} md:row-start-1 flex flex-col px-3 md:px-4 h-full`}>
                                                    <div className="w-fit max-w-full mr-auto text-left flex flex-col h-full">
                                                        <div className="grow" />
                                                        <span className="type-label font-heading text-step--1 md:text-[0.875rem] font-semibold uppercase tracking-widest shrink-0">{title.trim()}</span>
                                                        <div className="grow" />
                                                    </div>
                                                </div>
                                                {desc && (
                                                    <div className={`${colClass} md:row-start-2 flex flex-col px-3 md:px-4`}>
                                                        <div className="w-fit max-w-full mr-auto text-left">
                                                            <span className="type-body text-step--1 leading-tight mt-1 block">{desc}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </Fragment>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* ACTIVE CONTENT */}
                            <div className="absolute inset-0 py-2 lg:py-6 px-4 md:px-6 flex flex-col justify-center pointer-events-none">
                                <div className="grid grid-cols-1 md:grid-cols-3 w-full pointer-events-auto">
                                    {item.summary.split(' • ').map((metric, i) => {
                                        const [title, ...descParts] = metric.split(':');
                                        const desc = descParts.join(':').trim();
                                        const colClass = i === 0 ? 'md:col-start-1' : i === 1 ? 'md:col-start-2' : 'md:col-start-3';
                                        return (
                                            <Fragment key={`active-${i}`}>
                                                <div className={`${colClass} md:row-start-1 flex flex-col h-full px-3 md:px-4`}>
                                                    <div className="flex flex-col h-full shrink-0 w-fit max-w-full mr-auto text-left">
                                                        <div className="transition-all duration-500 ease-[0.21,0.47,0.32,0.98] grow" />
                                                        <span className="type-label font-heading text-step--1 md:text-[0.875rem] font-semibold uppercase tracking-widest text-foreground/50 transition-colors duration-500 lg:group-hover:text-foreground shrink-0">
                                                            {title.trim()}
                                                        </span>
                                                        <div className="transition-all duration-500 ease-[0.21,0.47,0.32,0.98] grow" />
                                                    </div>
                                                </div>
                                                {desc && (
                                                    <div className={`${colClass} md:row-start-2 flex flex-col px-3 md:px-4`}>
                                                        <div className="w-fit max-w-full mr-auto text-left">
                                                            <div className="grid transition-[grid-template-rows] duration-500 ease-[0.21,0.47,0.32,0.98] grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
                                                                <div className="overflow-hidden">
                                                                    <span className={`type-body text-step--1 text-foreground/60 leading-tight block pt-1 transition-all duration-500 ease-[0.21,0.47,0.32,0.98] lg:opacity-0 lg:translate-y-2 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 ${
                                                                        i === 0 ? "lg:group-hover:delay-0 lg:delay-200" : 
                                                                        i === 1 ? "lg:group-hover:delay-100 lg:delay-100" : 
                                                                        "lg:group-hover:delay-200 lg:delay-0"
                                                                    }`}>
                                                                        {desc}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Fragment>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col h-full justify-center py-2 lg:py-6 px-4 md:px-6">
                            <p className="text-step--1 type-body text-foreground line-clamp-2 m-0 p-0 py-3 md:py-6">
                                {item.summary}
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-1/3 lg:w-[15%] justify-start shrink-0 py-4 md:py-6 px-4 md:px-6">
                    {item.tags && item.tags.length > 0 && (() => {
                        const filteredTags = item.tags.filter((tag: string) => !/^\d{4}$/.test(String(tag)));
                        if (filteredTags.length === 0) return null;
                        
                        return (
                            <div className="flex flex-wrap flex-1 justify-start text-left text-step--2 md:text-[0.75rem] type-label opacity-70">
                                {filteredTags.slice(0, 3).map((tag, tagIndex, arr) => (
                                    <span key={tagIndex} className="whitespace-nowrap">
                                        #{tag}{tagIndex < arr.length - 1 ? ', ' : ''}&nbsp;
                                    </span>
                                ))}
                            </div>
                        );
                    })()}
                    
                    <div className="flex-shrink-0 ml-auto md:ml-0 lg:ml-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 md:w-6 md:h-6 text-foreground transition-transform duration-500 ease-[0.21,0.47,0.32,0.98] ${isHovered ? '-rotate-45' : 'rotate-0'}`}>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </div>
                </div>
            </div>
            {isFadeItem && (
                <div 
                    className="group/fade absolute inset-[-1px] z-[70] bg-gradient-to-t from-background via-background/95 to-transparent flex flex-col items-center justify-center pointer-events-auto cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/${locale || 'en'}/projects`);
                    }}
                >
                    <div className="pointer-events-auto overflow-hidden py-1">
                        <div className="transition-transform duration-500 ease-[0.21,0.47,0.32,0.98] translate-y-[120%] group-hover/fade:translate-y-0">
                            <div className="transition-opacity duration-300 delay-100 ease-out opacity-0 group-hover/fade:opacity-100">
                                <Link href={`/${locale || 'en'}/projects`} className="flex flex-row items-center gap-2 text-foreground font-heading type-label tracking-widest text-step-0 font-semibold">
                                    {locale === 'pt' ? 'VEJA MAIS PROJETOS' : 'VIEW MORE PROJECTS'}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export function InteractiveListSection({ items, locale, hideFilters = false }: InteractiveListSectionProps) {
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
                (item.summary && item.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item.context && item.context.toLowerCase().includes(searchQuery.toLowerCase()));
            
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
            {!hideFilters && (
                <>
                    {/* Toolbar: Search and Filters */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8 w-full items-start md:items-center justify-between px-fluid-xs md:px-fluid-m">
                        <div className="relative w-full md:w-1/3 shrink-0">
                            <div className="relative w-full border-2 border-foreground bg-background focus-within:bg-foreground/5 transition-colors">
                                <input 
                                    type="text" 
                                    placeholder={locale === 'pt' ? 'BUSCAR...' : 'SEARCH...'}
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setDisplayCount(10);
                                    }}
                                    className="w-full bg-transparent py-2.5 pl-10 pr-4 outline-none type-label uppercase tracking-wider text-xs font-semibold text-foreground placeholder:text-foreground/50"
                                />
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </div>
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
                </>
            )}

            {/* List and Pagination Wrapper */}
            <div className="flex flex-col w-full pb-fluid-2xl px-fluid-xs md:px-fluid-m">
                {/* List */}
                <div className="grid grid-cols-1 auto-rows-fr w-full bg-background/90 relative z-10" onMouseLeave={handleMouseLeaveSection}>
                    {visibleItems.length === 0 ? (
                        <div className="w-full text-center py-20 text-foreground/50 italic bg-muted/30 rounded-xl border border-dashed mt-4">
                            {locale === 'pt' ? 'Nenhum resultado encontrado.' : 'No results found.'}
                        </div>
                    ) : (
                        (hideFilters ? visibleItems.slice(0, 4) : visibleItems).map((item, i, arr) => {
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
                                    isFadeItem={hideFilters && i === 3}
                                    locale={locale}
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
