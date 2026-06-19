"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

function FloatingSVG({ 
    src, top, left, scale, width, index, scrollYProgress 
}: { 
    src: string, top: string, left: string, scale: number, width: string, index: number, scrollYProgress: MotionValue<number> 
}) {
    // Usando uma conversão matemática rígida para pixels (retornando número puro) para garantir que a engine do Framer Motion aplique o transform.
    const distance = 80 + (scale * 40); 
    const x = useTransform(scrollYProgress, v => {
        const vw = typeof window !== 'undefined' ? window.innerWidth / 100 : 19.2;
        return (-distance * vw) + (v * distance * 2 * vw);
    });
    const y = useTransform(scrollYProgress, v => {
        const vw = typeof window !== 'undefined' ? window.innerWidth / 100 : 19.2;
        return (-distance * vw) + (v * distance * 2 * vw);
    });
    
    // Profundidade
    const zIndex = Math.round(scale * 100);

    // Ótica fotográfica e atmosfera
    const blurPx = scale < 1.0 ? (1.0 - scale) * 8 : (scale - 1.0) * 4;
    const opacityVal = scale < 1.0 ? 0.4 + (scale * 0.6) : 1.0;

    // Rotação sutil determinística (sem Math.random para evitar Hydration Mismatch)
    const rotate = useTransform(scrollYProgress, [0, 1], [-(scale * 5), scale * 5]);

    // Animação senoidal desincronizada baseada no index em vez de random
    const bobDuration = 3 + (index % 3);
    const bobDelay = (index % 4) * 0.5;

    return (
        <motion.div 
            style={{ x, y, scale, rotate, top, left, width, zIndex }} 
            className="absolute pointer-events-none"
        >
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ 
                    duration: bobDuration, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: bobDelay 
                }}
            >
                <img 
                    src={src} 
                    style={{ filter: `blur(${blurPx}px)`, opacity: opacityVal }}
                    className="w-full h-auto object-contain grayscale" 
                    alt="Transition decoration"
                />
            </motion.div>
        </motion.div>
    );
}

export function IntermissionSVGs() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Malha espalhada (Grid orgânico com 15 itens pós-remoção)
    const floatingItems = [
        // Layer 1 (Top)
        { src: "/images/approach-anima/04-pentool.svg", top: "5%", left: "10%", width: "16%", scale: 1.2 },
        { src: "/images/approach-anima/11-quest3.svg", top: "15%", left: "45%", width: "15%", scale: 0.8 },
        { src: "/images/approach-anima/12-macbook.svg", top: "10%", left: "80%", width: "20%", scale: 1.4 },
        
        // Layer 2 (Mid-Top)
        { src: "/images/approach-anima/05-wireframe.svg", top: "35%", left: "20%", width: "18%", scale: 0.6 },
        { src: "/images/approach-anima/06-AI.svg", top: "25%", left: "60%", width: "12%", scale: 0.8 },
        { src: "/images/approach-anima/13-iphone.svg", top: "30%", left: "90%", width: "12%", scale: 0.7 },
        
        // Layer 3 (Middle)
        { src: "/images/approach-anima/07-code.svg", top: "55%", left: "15%", width: "18%", scale: 1.4 },
        { src: "/images/approach-anima/08-NPS.svg", top: "50%", left: "50%", width: "14%", scale: 0.9 },
        { src: "/images/approach-anima/14-ipad.svg", top: "45%", left: "75%", width: "18%", scale: 1.3 },
        
        // Layer 4 (Mid-Bottom)
        { src: "/images/approach-anima/15-steamdeck.svg", top: "70%", left: "30%", width: "15%", scale: 0.5 },
        { src: "/images/approach-anima/16-saw.svg", top: "75%", left: "65%", width: "14%", scale: 0.9 },
        { src: "/images/approach-anima/17-rings.svg", top: "80%", left: "95%", width: "16%", scale: 1.5 },
        
        // Layer 5 (Bottom)
        { src: "/images/approach-anima/18-guittar.svg", top: "90%", left: "10%", width: "18%", scale: 0.6 },
        { src: "/images/approach-anima/19-CRFmug.svg", top: "95%", left: "45%", width: "15%", scale: 1.1 },
        { src: "/images/approach-anima/20-Kindle.svg", top: "85%", left: "85%", width: "14%", scale: 0.8 },
    ];

    return (
        <section 
            ref={sectionRef}
            className="relative w-full min-h-[150vh] bg-background overflow-hidden flex items-center justify-center"
        >
            {/* Máscara global de retícula fixa em todo o container */}
            <div className="absolute inset-0 w-full h-full pointer-events-none bg-halftone-mask z-20"></div>

            <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
                {floatingItems.map((item, i) => (
                    <FloatingSVG 
                        key={i}
                        index={i}
                        src={item.src}
                        top={item.top}
                        left={item.left}
                        scale={item.scale}
                        width={item.width}
                        scrollYProgress={scrollYProgress}
                    />
                ))}
            </div>
            
            {/* Um fade out opcional no topo e no fundo pode ajudar a mesclar bem com as seções vizinhas se necessário */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none"></div>
        </section>
    );
}
