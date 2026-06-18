"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function HeroCarousel({ items, isActive = true }: { items: { src: string, caption: string }[], isActive?: boolean }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        // Só libera o autoplay do carrossel quando a orquestração do Hero (isActive) permitir
        if (!isActive) return;

        setHasStarted(true);

        const intervalId = setInterval(() => {
            setPrevIndex(currentIndex);
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [isActive, currentIndex, items.length]);

    return (
        <div className="relative w-[150%] max-w-none mt-12 lg:mt-0">
            {/* DUMMY container invisível para ditar a altura real do DOM e não amassar a página */}
            <div className="invisible flex flex-col items-end w-full pointer-events-none">
                <div className="relative w-full">
                    <img src={items[0].src} className="w-full h-[60vh] lg:h-[80vh] object-cover object-center" alt="" />
                </div>
                <div className="mt-4 text-step-0 italic pr-fluid-m">{items[0].caption}</div>
            </div>

            {/* Imagem Base (Sempre a imagem anterior, estática no fundo) */}
            <div className="absolute inset-0 flex flex-col items-end w-full pointer-events-none">
                <div className="relative w-full bg-background">
                    <img src={items[prevIndex].src} className="w-full h-[60vh] lg:h-[80vh] object-cover object-center grayscale contrast-125" alt="" />
                    <div className="absolute inset-0 bg-halftone-mask pointer-events-none"></div>
                </div>
                <div className="mt-4 text-right text-step-0 font-light italic text-foreground/80 pr-fluid-m">{items[prevIndex].caption}</div>
            </div>

            {/* Nova Imagem surgindo progressivamente revelada pelo clip-path */}
            <AnimatePresence initial={false}>
                {hasStarted && currentIndex !== prevIndex && (
                    <motion.div
                        key={currentIndex}
                        initial={{ clipPath: "polygon(0% 0%, -80% 0%, -80% 100%, 0% 100%)" }}
                        animate={{ clipPath: "polygon(0% 0%, 180% 0%, 180% 100%, 0% 100%)" }}
                        transition={{ duration: 2.4, ease: "easeInOut" }} // Mais lento e mais suave
                        className="absolute inset-0 flex flex-col items-end w-full z-10 pointer-events-none"
                    >
                        <div className="relative w-full bg-background">
                            <img src={items[currentIndex].src} alt={items[currentIndex].caption} className="w-full h-[60vh] lg:h-[80vh] object-cover object-center grayscale contrast-125" />
                            <div className="absolute inset-0 bg-halftone-mask pointer-events-none"></div>
                        </div>
                        <div className="mt-4 text-right text-step-0 font-light italic text-foreground/80 pr-fluid-m">{items[currentIndex].caption}</div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* A Faixa Branca Brilhante com Gradiente (O "Laser" do Wipe) */}
            <AnimatePresence initial={false}>
                {hasStarted && currentIndex !== prevIndex && (
                    <motion.div
                        key={`wipe-${currentIndex}`}
                        initial={{ left: "-80%" }}
                        animate={{ left: "180%" }}
                        transition={{ duration: 2.4, ease: "easeInOut" }}
                        className="absolute top-0 bottom-0 w-[150%] -translate-x-1/2 pointer-events-none z-20"
                        style={{ backgroundImage: "linear-gradient(to right, transparent 0%, oklch(var(--color-background)) 40%, oklch(var(--color-background)) 60%, transparent 100%)" }}
                    />
                )}
            </AnimatePresence>

            {/* O gradiente estático da borda esquerda do carrossel (sempre visível no topo para mesclar suavemente com o texto do Hero) */}
            <div className="absolute top-0 bottom-0 left-0 w-[30%] bg-gradient-to-r from-background to-transparent pointer-events-none z-30"></div>
        </div>
    );
}
