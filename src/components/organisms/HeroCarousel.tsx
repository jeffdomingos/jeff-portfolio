"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function HeroCarousel({ items, isActive = true }: { items: { src: string, caption: string }[], isActive?: boolean }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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
        <div className="relative w-full lg:w-[150%] max-w-none mt-12 lg:mt-0">
            {/* DUMMY container invisível para ditar a altura real do DOM e não amassar a página */}
            <div className="invisible flex flex-col items-end w-full pointer-events-none">
                <div className="relative w-full h-[30svh] md:h-[45svh] lg:h-[80svh]">
                    <Image src={items[0].src} fill={true} sizes="100vw" priority={true} className="object-cover object-center" alt="" />
                </div>
                <div className="mt-4 text-step-0 italic pr-fluid-m">{items[0].caption}</div>
            </div>

            {/* Imagem do Carrossel com AnimatePresence */}
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentIndex}
                    initial={{ clipPath: "polygon(0% 0%, -80% 0%, -80% 100%, 0% 100%)", zIndex: 20 }}
                    animate={{ clipPath: "polygon(0% 0%, 180% 0%, 180% 100%, 0% 100%)", zIndex: 20 }}
                    exit={{ zIndex: 10, transition: { duration: 2.4 } }}
                    transition={{ duration: 2.4, ease: "easeInOut" }}
                    className="absolute inset-0 flex flex-col items-end w-full pointer-events-none"
                >
                    <div className="relative w-full h-[30svh] md:h-[45svh] lg:h-[80svh] bg-background">
                        <Image src={items[currentIndex].src} fill={true} sizes="100vw" priority={true} alt={items[currentIndex].caption} className="object-cover object-center grayscale contrast-125" />
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* A Faixa Branca Brilhante com Gradiente (O "Laser" do Wipe) */}
            <AnimatePresence initial={false}>
                <motion.div
                    key={`wipe-${currentIndex}`}
                    initial={{ left: "-80%" }}
                    animate={{ left: "180%" }}
                    exit={{ left: "180%", transition: { duration: 0 } }}
                    transition={{ duration: 2.4, ease: "easeInOut" }}
                    className="absolute top-0 bottom-0 w-[150%] -translate-x-1/2 pointer-events-none z-20"
                    style={{ backgroundImage: "linear-gradient(to right, transparent 0%, oklch(var(--color-background)) 40%, oklch(var(--color-background)) 60%, transparent 100%)" }}
                />
            </AnimatePresence>

            {/* O gradiente estático da borda esquerda do carrossel (sempre visível no topo para mesclar suavemente com o texto do Hero) */}
            <div className="absolute top-0 bottom-0 left-0 w-[30%] bg-gradient-to-r from-background to-transparent pointer-events-none z-40"></div>

            {/* Dynamic Fading Caption via React Portal */}
            {mounted && document.getElementById('hero-caption-portal') ? createPortal(
                <div className="text-right text-step-0 font-light italic text-foreground/80 pointer-events-none">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.6 }}
                        >
                            {items[currentIndex].caption}
                        </motion.div>
                    </AnimatePresence>
                </div>,
                document.getElementById('hero-caption-portal')!
            ) : null}
        </div>
    );
}
