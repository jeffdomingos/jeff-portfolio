"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ANIMATION_DURATION = 0.15;
const ANIMATION_EASE = "linear" as const;

const variantsTop = {
    idle: { scaleX: 0, originX: 0 },
    hover_external: { scaleX: 1, originX: 0, transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION * 1, ease: ANIMATION_EASE } },
    exit_external: { scaleX: 0, originX: 1, transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION * 2, ease: ANIMATION_EASE } },
    hover_right: { scaleX: 1, originX: 0, transition: { duration: ANIMATION_DURATION, delay: 0, ease: ANIMATION_EASE } },
    exit_right: { scaleX: 0, originX: 1, transition: { duration: ANIMATION_DURATION, delay: 0, ease: ANIMATION_EASE } },
    hover_left: { scaleX: 1, originX: 1, transition: { duration: ANIMATION_DURATION, delay: 0, ease: ANIMATION_EASE } },
    exit_left: { scaleX: 0, originX: 0, transition: { duration: ANIMATION_DURATION, delay: 0, ease: ANIMATION_EASE } }
};

const variantsRight = {
    idle: { scaleY: 0, originY: 0 },
    hover_external: { scaleY: 1, originY: 0, transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION * 2, ease: ANIMATION_EASE } },
    exit_external: { scaleY: 0, originY: 1, transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION * 1, ease: ANIMATION_EASE } },
    hover_right: { scaleY: 1, originY: 0, transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION * 1, ease: ANIMATION_EASE } },
    exit_right: { scaleY: 0, originY: 0, transition: { duration: ANIMATION_DURATION, delay: 0, ease: ANIMATION_EASE } },
    hover_left: { scaleY: 1, originY: 0, transition: { duration: ANIMATION_DURATION, delay: 0, ease: ANIMATION_EASE } },
    exit_left: { scaleY: 0, originY: 1, transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION * 1, ease: ANIMATION_EASE } }
};

const variantsBottom = {
    idle: { scaleX: 0, originX: 1 },
    hover_external: { scaleX: 1, originX: 1, transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION * 3, ease: ANIMATION_EASE } },
    exit_external: { scaleX: 0, originX: 0, transition: { duration: ANIMATION_DURATION, delay: 0, ease: ANIMATION_EASE } },
    hover_right: { scaleX: 1, originX: 1, transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION * 2, ease: ANIMATION_EASE } },
    exit_right: { scaleX: 0, originX: 1, transition: { duration: ANIMATION_DURATION, delay: 0, ease: ANIMATION_EASE } },
    hover_left: { scaleX: 1, originX: 0, transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION * 2, ease: ANIMATION_EASE } },
    exit_left: { scaleX: 0, originX: 0, transition: { duration: ANIMATION_DURATION, delay: 0, ease: ANIMATION_EASE } }
};

const variantsLeft = {
    idle: { scaleY: 0, originY: 1 },
    hover_external: { scaleY: 1, originY: 1, transition: { duration: ANIMATION_DURATION, delay: 0, ease: ANIMATION_EASE } },
    exit_external: { scaleY: 0, originY: 0, transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION * 3, ease: ANIMATION_EASE } },
    hover_right: { scaleY: 1, originY: 1, transition: { duration: ANIMATION_DURATION, delay: 0, ease: ANIMATION_EASE } },
    exit_right: { scaleY: 0, originY: 0, transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION * 1, ease: ANIMATION_EASE } },
    hover_left: { scaleY: 1, originY: 0, transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION * 1, ease: ANIMATION_EASE } },
    exit_left: { scaleY: 0, originY: 0, transition: { duration: ANIMATION_DURATION, delay: 0, ease: ANIMATION_EASE } }
};

export function CaseGallery({ projects, locale, currentSlug, title }: { projects: any[], locale: string, currentSlug: string, title: string }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isSnapping, setIsSnapping] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startScrollLeft, setStartScrollLeft] = useState(0);
    const [dragDistance, setDragDistance] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isScrollable, setIsScrollable] = useState(true);
    const [cardWidth, setCardWidth] = useState<number | null>(null);
    const [hoverState, setHoverState] = useState<{current: number | null, previous: number | null}>({current: null, previous: null});
    const [hasScrolledToCurrent, setHasScrolledToCurrent] = useState(false);
    const hoverStateRef = useRef(hoverState);

    useEffect(() => {
        hoverStateRef.current = hoverState;
    }, [hoverState]);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            const maxScroll = scrollWidth - clientWidth;
            const scrollable = maxScroll > 5; // tolerance for sub-pixel and micro-scrolls
            
            setIsScrollable(scrollable);
            setCanScrollLeft(scrollable && scrollLeft > 2);
            setCanScrollRight(scrollable && Math.ceil(scrollLeft) < maxScroll - 2);
        }
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const updateWidth = () => {
            const dummy = document.createElement('div');
            dummy.style.width = 'var(--space-m)';
            dummy.style.position = 'absolute';
            document.body.appendChild(dummy);
            const sidePadding = dummy.getBoundingClientRect().width || 24; 
            document.body.removeChild(dummy);
            
            const containerWidth = el.clientWidth;
            const availableForPeek = containerWidth - sidePadding; 
            const availableForAll = containerWidth - (sidePadding * 2);
            
            const minC = containerWidth < 768 ? 260 : 320;
            const maxC = 500;
            const totalCards = projects.length;
            
            const fitAllC = availableForAll / totalCards;
            
            if (fitAllC >= minC) {
                setCardWidth(Math.min(fitAllC, maxC));
            } else {
                let bestC = maxC;
                let foundValid = false;
                for (let n = 1; n < totalCards; n++) {
                    const c = availableForPeek / (n + 0.25);
                    if (c >= minC && c <= maxC) {
                        bestC = c;
                        foundValid = true;
                        break;
                    }
                }
                if (!foundValid) {
                    let closestC = maxC;
                    let minDiff = Infinity;
                    for (let n = 1; n < totalCards; n++) {
                        const c = availableForPeek / (n + 0.25);
                        const diff = c < minC ? minC - c : c > maxC ? c - maxC : 0;
                        if (diff < minDiff) {
                            minDiff = diff;
                            closestC = c;
                        }
                    }
                    bestC = Math.max(minC, Math.min(maxC, closestC));
                }
                setCardWidth(bestC);
            }
        };

        const resizeObserver = new ResizeObserver(() => {
            updateWidth();
        });
        resizeObserver.observe(el);

        // Removed mount setTimeout scroll - handled by cardWidth effect instead

        el.addEventListener('scroll', checkScroll);

        let lastX = -1;
        let lastY = -1;
        let ticking = false;

        const handleMouseMove = (e: MouseEvent) => {
            lastX = e.clientX;
            lastY = e.clientY;
        };

        const handleScrollTracking = () => {
            if (lastX === -1 && lastY === -1) return;
            
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const pointedEl = document.elementFromPoint(lastX, lastY);
                    const card = pointedEl?.closest('[data-gallery-card-index]');
                    const isInsideGallery = pointedEl?.closest('[data-gallery-section]');
                    
                    if (card) {
                        const index = parseInt(card.getAttribute('data-gallery-card-index') || '-1');
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
        window.addEventListener('scroll', handleScrollTracking, { passive: true });
        el.addEventListener('scroll', handleScrollTracking, { passive: true });

        return () => {
            resizeObserver.disconnect();
            el.removeEventListener('scroll', checkScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScrollTracking);
            el.removeEventListener('scroll', handleScrollTracking);
        };
    }, [projects.length]);

    // Check scrollability strictly whenever cardWidth or elements update
    useEffect(() => {
        const timer = setTimeout(checkScroll, 150);
        return () => clearTimeout(timer);
    }, [cardWidth]);

    // Scroll to current case once card widths are actually calculated
    useEffect(() => {
        if (cardWidth !== null && !hasScrolledToCurrent && scrollRef.current) {
            const el = scrollRef.current;
            const currentEl = el.querySelector('[data-current="true"]') as HTMLElement;
            if (currentEl) {
                const cardEl = currentEl.closest('[data-card="true"]') as HTMLElement;
                if (cardEl) {
                    const scrollPadding = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
                    el.scrollTo({ left: cardEl.offsetLeft - scrollPadding, behavior: 'auto' });
                }
            }
            setHasScrolledToCurrent(true);
        }
    }, [cardWidth, hasScrolledToCurrent]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setIsSnapping(false);
        setDragDistance(0);
        if (!scrollRef.current) return;
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setStartScrollLeft(scrollRef.current.scrollLeft);
    };

    const snapToClosest = () => {
        if (!scrollRef.current) return;
        const el = scrollRef.current;
        const scrollPadding = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
        const cards = Array.from(el.querySelectorAll('[data-card="true"]')) as HTMLElement[];
        
        const currentScroll = el.scrollLeft;
        const scrollDiff = currentScroll - startScrollLeft;
        
        // Add a momentum bias (50% of drag distance) in the direction of the drag
        const biasedScroll = currentScroll + (scrollDiff * 0.5);
        
        let closestTarget = 0;
        let minDiff = Infinity;
        
        cards.forEach((card) => {
            const targetScroll = card.offsetLeft - scrollPadding;
            const diff = Math.abs(biasedScroll - targetScroll);
            if (diff < minDiff) {
                minDiff = diff;
                closestTarget = targetScroll;
            }
        });
        
        closestTarget = Math.max(0, Math.min(closestTarget, el.scrollWidth - el.clientWidth));
        el.scrollTo({ left: closestTarget, behavior: 'smooth' });
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            setIsDragging(false);
            setIsSnapping(true);
            snapToClosest();
            setTimeout(() => setIsSnapping(false), 500);
        }
    };

    const handleMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
        setIsSnapping(true);
        snapToClosest();
        setTimeout(() => setIsSnapping(false), 500);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        setDragDistance(Math.abs(walk));
        scrollRef.current.scrollLeft = startScrollLeft - walk;
    };

    const handleClick = (e: React.MouseEvent, isCurrent: boolean) => {
        if (isCurrent || dragDistance > 10) {
            e.preventDefault();
        }
    };

    const scrollByAmount = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            // Scroll by one card width approximately
            const amount = window.innerWidth > 768 ? 420 : window.innerWidth * 0.85;
            scrollRef.current.scrollBy({ left: direction === 'right' ? amount : -amount, behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between px-fluid-xs md:px-fluid-m mb-fluid-m">
                <h3 className="text-step-3 md:text-step-4 type-heading text-foreground">
                    {title}
                </h3>
                {/* Navigation Buttons */}
                {isScrollable && (
                    <div className="hidden md:flex items-center gap-2 py-1">
                        {/* Wrapper fixes the layout space to 48x48 so they never jump */}
                        <div className="w-12 h-12 flex items-center justify-center">
                            <motion.button 
                                layout
                                animate={canScrollLeft ? { 
                                    height: 48, width: 48, borderRadius: 24, opacity: 1
                                } : { 
                                    height: 2, width: 24, borderRadius: 2, opacity: 1
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                onClick={() => scrollByAmount('left')}
                                disabled={!canScrollLeft}
                                className={cn(
                                    "group flex-shrink-0 flex items-center justify-center overflow-hidden transition-colors focus:outline-none",
                                    canScrollLeft ? "border border-foreground bg-transparent hover:bg-foreground hover:text-background cursor-pointer" : "bg-foreground border-none cursor-default"
                                )}
                                aria-label="Previous cases"
                            >
                                <motion.svg 
                                    animate={{ opacity: canScrollLeft ? 1 : 0, scale: canScrollLeft ? 1 : 0 }} 
                                    transition={{ duration: 0.2 }}
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                                    className="transition-transform duration-300 group-hover:scale-125"
                                >
                                    <path d="m15 18-6-6 6-6"/>
                                </motion.svg>
                            </motion.button>
                        </div>
                        
                        <div className="w-12 h-12 flex items-center justify-center">
                            <motion.button 
                                layout
                                animate={canScrollRight ? { 
                                    height: 48, width: 48, borderRadius: 24, opacity: 1
                                } : { 
                                    height: 2, width: 24, borderRadius: 2, opacity: 1 
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                onClick={() => scrollByAmount('right')}
                                disabled={!canScrollRight}
                                className={cn(
                                    "group flex-shrink-0 flex items-center justify-center overflow-hidden transition-colors focus:outline-none",
                                    canScrollRight ? "border border-foreground bg-transparent hover:bg-foreground hover:text-background cursor-pointer" : "bg-foreground border-none cursor-default"
                                )}
                                aria-label="Next cases"
                            >
                                <motion.svg 
                                    animate={{ opacity: canScrollRight ? 1 : 0, scale: canScrollRight ? 1 : 0 }} 
                                    transition={{ duration: 0.2 }}
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                                    className="transition-transform duration-300 group-hover:scale-125"
                                >
                                    <path d="m9 18 6-6-6-6"/>
                                </motion.svg>
                            </motion.button>
                        </div>
                    </div>
                )}
            </div>

            <div 
                ref={scrollRef}
                data-gallery-section="true"
                onMouseDown={handleMouseDown}
                onMouseLeave={(e) => {
                    handleMouseLeave();
                    setHoverState(prev => ({ current: null, previous: prev.current }));
                }}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className={cn(
                    "relative flex flex-nowrap overflow-x-auto snap-x snap-mandatory pb-fluid-m [scroll-padding-left:var(--space-m)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] transition-opacity duration-300",
                    (isDragging || isSnapping) ? "snap-none" : "",
                    isDragging ? "cursor-grabbing select-none" : "cursor-grab",
                    cardWidth === null ? "opacity-0" : "opacity-100"
                )}
            >
                {/* Left Spacer - Exactly the size of the margin */}
                <div className="shrink-0" style={{ width: 'var(--space-m)' }} />

                {projects.map((project, i) => {
                    const isCurrent = project.meta.slug === currentSlug;
                    const href = `/${locale}/projects/${project.meta.slug}`;
                    const isLast = i === projects.length - 1;

                    let state = "idle";
                    if (i === hoverState.current) {
                        if (hoverState.previous === null) state = "hover_external";
                        else if (hoverState.previous === i - 1) state = "hover_right";
                        else if (hoverState.previous === i + 1) state = "hover_left";
                        else state = "hover_external";
                    } else if (i === hoverState.previous && hoverState.current !== i) {
                        if (hoverState.current === null) state = "exit_external";
                        else if (hoverState.current === i - 1) state = "exit_left";
                        else if (hoverState.current === i + 1) state = "exit_right";
                        else state = "exit_external";
                    }

                    return (
                        <div 
                            key={i} 
                            data-card="true"
                            data-gallery-card-index={i}
                            className={cn(
                                "flex min-w-0 shrink-0 snap-start relative",
                                state !== "idle" ? "z-50" : "z-10"
                            )}
                            style={{ width: cardWidth || 300 }}
                            onMouseEnter={() => setHoverState(prev => ({ current: i, previous: prev.current }))}
                            onMouseLeave={(e) => {
                                const related = e.relatedTarget as HTMLElement;
                                if (!related || typeof related.closest !== 'function' || !related.closest('[data-gallery-card-index]')) {
                                    setHoverState(prev => ({ current: null, previous: prev.current }));
                                }
                            }}
                        >
                            <Link
                                href={isCurrent ? "#" : href}
                                aria-disabled={isCurrent}
                                data-current={isCurrent}
                                onClick={(e) => handleClick(e, isCurrent)}
                                className={cn(
                                    "group grow flex flex-col min-w-0 rounded-none overflow-hidden transition-all duration-500 relative bg-background",
                                    isCurrent
                                        ? "pointer-events-none"
                                        : "cursor-pointer"
                                )}
                                draggable={false}
                            >
                                {/* Animated Borders */}
                                {!isCurrent && (
                                    <>
                                        <motion.span variants={variantsTop} initial="idle" animate={state} className="absolute top-0 left-0 w-full h-[1px] bg-foreground z-50 pointer-events-none" />
                                        <motion.span variants={variantsRight} initial="idle" animate={state} className="absolute top-0 right-0 w-[1px] h-full bg-foreground z-50 pointer-events-none" />
                                        <motion.span variants={variantsBottom} initial="idle" animate={state} className="absolute bottom-0 right-0 w-full h-[1px] bg-foreground z-50 pointer-events-none" />
                                        <motion.span variants={variantsLeft} initial="idle" animate={state} className="absolute bottom-0 left-0 w-[1px] h-full bg-foreground z-50 pointer-events-none" />
                                    </>
                                )}

                                <div className="relative aspect-[2/1] w-[calc(100%-2px)] mx-[1px] mt-[1px] overflow-hidden">
                                    {/* Halftone mask always visible */}
                                    <div className="absolute inset-0 z-10 bg-halftone-mask pointer-events-none max-md:[background-attachment:scroll]" />
                                    <Image 
                                        src={project.meta.thumbnail} 
                                        alt={project.meta.title}
                                        fill={true}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        draggable={false}
                                        className={cn(
                                            "object-cover transition-all duration-1000 ease-in-out",
                                            isCurrent ? "grayscale contrast-125 opacity-40" : "md:grayscale md:contrast-125 md:group-hover:grayscale-0 md:group-hover:contrast-100"
                                        )}
                                    />
                                    {isCurrent && (
                                        <div className="absolute inset-0 flex items-center justify-center z-20">
                                            <span className="px-4 py-2 bg-foreground text-background type-label text-xs rounded-full">
                                                {locale === 'pt' ? 'Você está aqui' : 'You are here'}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex flex-col grow pointer-events-none">
                                    <div className="mb-2">
                                        {project.meta.title.includes(' - ') ? (
                                            <>
                                                <span className="block text-step--2 type-label opacity-60 mb-1">
                                                    {project.meta.title.split(' - ')[0]}
                                                </span>
                                                <h4 className="text-step-0 md:text-step-1 type-subheading line-clamp-2">
                                                    {project.meta.title.split(' - ').slice(1).join(' - ')}
                                                </h4>
                                            </>
                                        ) : (
                                            <h4 className="text-step-0 md:text-step-1 type-subheading line-clamp-2">
                                                {project.meta.title}
                                            </h4>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}

                {/* Right Spacer - Exactly the size of the margin */}
                <div className="shrink-0" style={{ width: 'var(--space-m)' }} />
            </div>
        </div>
    );
}
