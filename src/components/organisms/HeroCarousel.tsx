"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

export function HeroCarousel({ items, isActive = true }: { items: { src: string, caption: string }[], isActive?: boolean }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const [mounted, setMounted] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        setMounted(true);
        // Preload all carousel images into browser cache so transitions never stutter or pop
        items.forEach((item) => {
            if (typeof window !== "undefined" && item.src) {
                const img = new window.Image();
                img.src = item.src;
            }
        });
    }, [items]);

    useEffect(() => {
        // Só libera o autoplay do carrossel quando a orquestração do Hero (isActive) permitir
        if (!isActive || items.length <= 1) return;

        setHasStarted(true);

        const intervalId = setInterval(() => {
            // Pause transitions when tab is hidden to avoid catch-up burst / lag on refocus
            if (typeof document !== "undefined" && document.hidden) return;

            setCurrentIndex((curr) => {
                setPrevIndex(curr);
                return (curr + 1) % items.length;
            });
        }, 5000);

        return () => clearInterval(intervalId);
    }, [isActive, items.length]);

    return (
        <div className="relative w-full lg:w-[150%] max-w-none mt-12 lg:mt-0">
            {/* DUMMY container invisível para ditar a altura real do DOM e não amassar a página */}
            <div className="invisible flex flex-col items-end w-full pointer-events-none" aria-hidden="true">
                <div className="relative w-full h-[30svh] md:h-[45svh] lg:h-[80svh]">
                    <Image src={items[0].src} fill sizes="100vw" priority className="object-cover object-center" alt="" />
                </div>
                <div className="mt-4 text-step-0 italic pr-fluid-m">{items[0].caption}</div>
            </div>

            {/* Imagens do Carrossel (Renderizando a atual e a anterior simultaneamente para não piscar) */}
            {items.map((item, index) => {
                if (index !== currentIndex && index !== prevIndex) return null;

                const isCurrent = index === currentIndex;

                // Para usuários com "Reduzir Movimento" ativo, usamos crossfade de opacidade ultra-leve
                const initialStyle = shouldReduceMotion
                    ? { opacity: isCurrent && hasStarted ? 0 : 1 }
                    : isCurrent && hasStarted 
                        ? { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" } 
                        : { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" };

                const animateStyle = shouldReduceMotion
                    ? (isCurrent ? { opacity: 1 } : undefined)
                    : (isCurrent ? { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" } : undefined);

                return (
                    <m.div 
                        key={`img-${index}`}
                        initial={initialStyle}
                        animate={animateStyle}
                        transition={{ duration: shouldReduceMotion ? 0.8 : 1.8, ease: "easeInOut" }}
                        className={`absolute inset-0 flex flex-col items-end w-full pointer-events-none ${isCurrent ? 'z-20' : 'z-10'}`}
                        style={{ 
                            transform: "translateZ(0)", 
                            backfaceVisibility: "hidden" 
                        }}
                    >
                        <div className="relative w-full h-[30svh] md:h-[45svh] lg:h-[80svh] bg-background">
                            <Image 
                                src={item.src} 
                                fill 
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 65vw" 
                                priority 
                                alt={item.caption || "Hero project preview"} 
                                className="object-cover object-center grayscale contrast-125" 
                            />
                        </div>
                    </m.div>
                );
            })}

            {/* A Faixa Branca Brilhante com Gradiente (O "Laser" do Wipe) - Sincronizado 1:1 sobre a linha do corte */}
            <AnimatePresence initial={false}>
                {!shouldReduceMotion && hasStarted && currentIndex !== prevIndex && (
                    <m.div
                        key={`wipe-${currentIndex}`}
                        initial={{ x: "-50%" }}
                        animate={{ x: "50%" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.8, ease: "easeInOut" }}
                        className="absolute inset-y-0 left-0 w-full pointer-events-none z-30"
                        style={{ 
                            transform: "translateZ(0)", 
                            backfaceVisibility: "hidden",  
                            backgroundImage: "linear-gradient(to right, transparent 0%, transparent 35%, oklch(var(--color-background)) 46%, oklch(var(--color-background)) 54%, transparent 65%, transparent 100%)" 
                        }}
                    />
                )}
            </AnimatePresence>

            {/* O gradiente estático da borda esquerda do carrossel (sempre visível no topo para mesclar suavemente com o texto do Hero) */}
            <div className="absolute top-0 bottom-0 left-0 w-[30%] bg-gradient-to-r from-background to-transparent pointer-events-none z-40"></div>

            {/* Dynamic Fading Caption via React Portal */}
            {mounted && typeof document !== "undefined" && document.getElementById('hero-caption-portal') ? createPortal(
                <div className="text-right text-step-0 type-body italic text-foreground/80 pointer-events-none">
                    <AnimatePresence mode="wait">
                        <m.div 
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                            style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
                        >
                            {items[currentIndex]?.caption}
                        </m.div>
                    </AnimatePresence>
                </div>,
                document.getElementById('hero-caption-portal')!
            ) : null}
        </div>
    );
}
