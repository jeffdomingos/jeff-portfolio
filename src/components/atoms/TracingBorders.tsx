"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const ANIMATION_DURATION = 0.15;
const ANIMATION_EASE = "linear";

type SharedWall = "top" | "right" | "bottom" | "left" | null;

interface TracingContextState {
    activeId: string | null;
    previousId: string | null;
    activeSharedWall: SharedWall;
    previousSharedWall: SharedWall;
    registerItem: (id: string, element: HTMLElement) => void;
    unregisterItem: (id: string) => void;
    setActiveId: (id: string | null) => void;
}

const TracingContext = createContext<TracingContextState | null>(null);

export function TracingGrid({ children, className, onMouseLeave, activeId: controlledActiveId }: { children: React.ReactNode, className?: string, onMouseLeave?: () => void, activeId?: string | null }) {
    const [state, setState] = useState<{ activeId: string | null, previousId: string | null, activeSharedWall: SharedWall, previousSharedWall: SharedWall }>({
        activeId: null,
        previousId: null,
        activeSharedWall: null,
        previousSharedWall: null
    });
    const elementsRef = useRef<Record<string, HTMLElement>>({});
    const stateRef = useRef(state);

    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    useEffect(() => {
        if (controlledActiveId !== undefined) {
            setActiveId(controlledActiveId);
        }
    }, [controlledActiveId]);

    const registerItem = (id: string, element: HTMLElement) => {
        elementsRef.current[id] = element;
    };

    const unregisterItem = (id: string) => {
        delete elementsRef.current[id];
    };

    const setActiveId = (id: string | null) => {
        setState(prev => {
            if (prev.activeId === id) return prev;

            let activeSharedWall: SharedWall = null;
            let previousSharedWall: SharedWall = null;

            if (id !== null && prev.activeId !== null) {
                const elA = elementsRef.current[prev.activeId];
                const elB = elementsRef.current[id];

                if (elA && elB) {
                    const rectA = elA.getBoundingClientRect();
                    const rectB = elB.getBoundingClientRect();

                    const isSame = (v1: number, v2: number) => Math.abs(v1 - v2) <= 2; // 2px tolerance

                    if (isSame(rectA.right, rectB.left)) {
                        activeSharedWall = "left";
                        previousSharedWall = "right";
                    } else if (isSame(rectA.left, rectB.right)) {
                        activeSharedWall = "right";
                        previousSharedWall = "left";
                    } else if (isSame(rectA.bottom, rectB.top)) {
                        activeSharedWall = "top";
                        previousSharedWall = "bottom";
                    } else if (isSame(rectA.top, rectB.bottom)) {
                        activeSharedWall = "bottom";
                        previousSharedWall = "top";
                    }
                }
            }

            return {
                activeId: id,
                previousId: prev.activeId,
                activeSharedWall,
                previousSharedWall
            };
        });
    };

    // Optional global mouse/scroll tracker can be implemented here if needed,
    // but typically the items themselves can trigger setActiveId onMouseEnter.
    // However, to mimic CasesSection scroll-tracking perfectly, we can expose setActiveId
    // or let the parent component handle the scroll tracking and just pass activeId down.
    // For maximum flexibility, the context provides setActiveId for items to call.

    return (
        <TracingContext.Provider value={{ ...state, registerItem, unregisterItem, setActiveId }}>
            <div className={className} onMouseLeave={() => {
                setActiveId(null);
                if (onMouseLeave) onMouseLeave();
            }}>
                {children}
            </div>
        </TracingContext.Provider>
    );
}

// Master variants
function getVariants(linePosition: "top" | "right" | "bottom" | "left", isShared: boolean, delayOffset: number) {
    const isHorizontal = linePosition === "top" || linePosition === "bottom";
    const scaleProp = isHorizontal ? "scaleX" : "scaleY";
    
    // Always Clockwise logic
    const entryOrigin = linePosition === "top" ? "left" : linePosition === "right" ? "top" : linePosition === "bottom" ? "right" : "bottom";
    const entryDelay = linePosition === "top" ? 0 : linePosition === "right" ? ANIMATION_DURATION : linePosition === "bottom" ? ANIMATION_DURATION * 2 : ANIMATION_DURATION * 3;

    // Exit Unwinds clockwise (same order as entry, shrinking in same direction)
    const exitOrigin = linePosition === "top" ? "right" : linePosition === "right" ? "bottom" : linePosition === "bottom" ? "left" : "top";
    const exitDelay = linePosition === "top" ? 0 : linePosition === "right" ? ANIMATION_DURATION : linePosition === "bottom" ? ANIMATION_DURATION * 2 : ANIMATION_DURATION * 3;

    return {
        idle: { 
            scaleX: isHorizontal ? (isShared ? 1 : 0) : undefined,
            scaleY: !isHorizontal ? (isShared ? 1 : 0) : undefined,
            transition: { duration: 0 } 
        },
        hover: { 
            scaleX: isHorizontal ? 1 : undefined,
            scaleY: !isHorizontal ? 1 : undefined,
            originX: isHorizontal ? (entryOrigin === "left" ? 0 : 1) : undefined,
            originY: !isHorizontal ? (entryOrigin === "top" ? 0 : 1) : undefined,
            transition: { duration: isShared ? 0 : ANIMATION_DURATION, delay: (isShared ? 0 : entryDelay) + delayOffset, ease: ANIMATION_EASE }
        },
        exit: { 
            scaleX: isHorizontal ? (isShared ? 1 : 0) : undefined,
            scaleY: !isHorizontal ? (isShared ? 1 : 0) : undefined,
            originX: isHorizontal ? (exitOrigin === "left" ? 0 : 1) : undefined,
            originY: !isHorizontal ? (exitOrigin === "top" ? 0 : 1) : undefined,
            transition: { duration: isShared ? 0 : ANIMATION_DURATION, delay: (isShared ? 0 : exitDelay) + delayOffset, ease: ANIMATION_EASE } 
        }
    } as any;
}

export function TracingItem({ 
    id, 
    children, 
    className = "",
    forceActive = false,
    hiddenWalls = [],
    delayOffset = 0,
    forceSharedWall,
    forceExiting
}: { 
    id: string, 
    children: React.ReactNode, 
    className?: string,
    forceActive?: boolean,
    hiddenWalls?: ("top" | "right" | "bottom" | "left")[],
    delayOffset?: number,
    forceSharedWall?: "top" | "right" | "bottom" | "left" | null,
    forceExiting?: boolean
}) {
    const context = useContext(TracingContext);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (context && ref.current) {
            context.registerItem(id, ref.current);
        }
        return () => {
            if (context) context.unregisterItem(id);
        };
    }, [id, context]);

    const isHovered = forceActive || (context?.activeId === id);
    const isExiting = (forceExiting !== undefined ? forceExiting : (!forceActive && (context?.previousId === id && context?.activeId !== id)));
    
    const sharedWall = forceSharedWall !== undefined ? forceSharedWall : (isHovered ? context?.activeSharedWall : (isExiting ? context?.previousSharedWall : null));

    let state = "idle";
    if (isHovered) state = "hover";
    else if (isExiting) state = "exit";

    return (
        <div 
            ref={ref}
            className={`relative ${className}`}
            onMouseEnter={() => context?.setActiveId(id)}
            data-tracing-id={id}
            data-tracing-state={state}
        >
            {!hiddenWalls.includes("top") && (
                <motion.span variants={getVariants("top", sharedWall === "top", delayOffset)} initial="idle" animate={state} className="absolute top-0 left-0 -right-[1px] h-0 border-t border-foreground z-40 pointer-events-none" />
            )}
            {!hiddenWalls.includes("right") && (
                <motion.span variants={getVariants("right", sharedWall === "right", delayOffset)} initial="idle" animate={state} className="absolute top-0 -bottom-[1px] -right-[1px] w-0 border-l border-foreground z-40 pointer-events-none" />
            )}
            {!hiddenWalls.includes("bottom") && (
                <motion.span variants={getVariants("bottom", sharedWall === "bottom", delayOffset)} initial="idle" animate={state} className="absolute -bottom-[1px] left-0 -right-[1px] h-0 border-t border-foreground z-40 pointer-events-none" />
            )}
            {!hiddenWalls.includes("left") && (
                <motion.span variants={getVariants("left", sharedWall === "left", delayOffset)} initial="idle" animate={state} className="absolute top-0 -bottom-[1px] left-0 w-0 border-l border-foreground z-40 pointer-events-none" />
            )}
            
            {children}
        </div>
    );
}
