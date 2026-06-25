"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export function InteractiveDeskSVG({
    scrollYProgress,
    activeIndex = 0
}: {
    scrollYProgress?: any,
    activeIndex?: number
}) {
    const containerRef = useRef<SVGSVGElement>(null);

    // Se não for passado de fora, criamos um scroll tracker local
    const localScroll = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const progress = scrollYProgress || localScroll.scrollYProgress;

    // Body move de forma constante e lenta
    const yBody = useTransform(
        useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [24, 12, 0, -12, -24]),
        v => Math.round(v)
    );

    // Mesa agora também sobe no final do scroll para "perseguir" o notebook e não deixar ele vazar
    const yDesk = useTransform(
        useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [5, 2, 0, -15, -30]),
        v => Math.round(v)
    );

    // Notebook também perde velocidade, mas move mais que a mesa
    const yNotebook = useTransform(
        useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [200, 100, 0, -75, -150]),
        v => Math.round(v)
    );

    // Head parallax
    const yHead = useTransform(
        useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [36, 18, 0, -18, -36]),
        v => Math.round(v)
    );

    // Distorção de perspectiva VERDADEIRA (3D Vanishing Point)
    // rotateX inclina o elemento para dentro ou para fora da tela, criando o efeito de trapézio
    const rotateXNotebook = useTransform(
        useTransform(progress, [0, 0.5, 1], [-12, 0, 12]),
        v => Math.round(v * 10) / 10
    );
    const rotateXHead = useTransform(
        useTransform(progress, [0, 0.5, 1], [-8, 0, 8]),
        v => Math.round(v * 10) / 10
    );
    const rotateXBody = useTransform(
        useTransform(progress, [0, 0.5, 1], [-4, 0, 4]),
        v => Math.round(v * 10) / 10
    );

    // Constantes compartilhadas para os SVGs
    const svgProps = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "913.05 0 105.953 430",
        className: "absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none",
        preserveAspectRatio: "xMidYMax meet"
    };

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ perspective: 2000 }}
        >
            {/* Camada Traseira: Corpo */}
            <motion.svg
                {...svgProps}
                style={{ y: yBody, rotateX: rotateXBody, transformOrigin: "center center", willChange: "transform" }}
            >
                <g transform="translate(87, 8) scale(0.9)" style={{ transformOrigin: "center top" }}>
                    <path d="M1170.6,437.1c1.58-1.24,3.42-3.42,5.24-6.84,1.3-2.44,2.2-4.94,3.2-7.51,2.02-5.2,2.25-9.86,2.03-15.26-.18-4.3-.26-8.18-1.58-12.33l-4.13-13.07s0-.03-.02-.04l-12.29-31.64-8.73-21.3s-.02-.05-.03-.08l-1.64-6.03s-.02-.06-.03-.1l-4.48-11.18s-.02-.06-.03-.09c-.9-3.38-2.07-6.64-3.95-9.91-.07-.12-.1-.26-.09-.4.62-7.33-3.07-13.46-5.44-19.92-.02-.05-.03-.1-.04-.16-.57-4.36-1.31-8.77-2.48-13.12-3.95-14.77-8.98-28.67-16.99-41.91-2.52-4.45-5.65-8.23-9.44-11.73-.13-.12-.2-.28-.22-.45-.39-3.5-3.25-5.59-6.86-5.76-.07,0-.14-.02-.21-.04l-17.21-6.08c-.1-.04-.2-.1-.27-.17-2.51-2.48-5.97-3.96-9.71-2.67-.09.03-.18.05-.28.04-2.5-.11-5.2-.5-7.49-1.45l-5.82-2.4c-4.13-1.71-7.59-2.92-12.05-3.81-10.44-2.08-15.59-6.83-19.18-7.24-3.03-.34-5.27-1.31-7.84-2.88-3.78-2.3-7.89,1.11-14.1-4.58-.03-.02-.06-.05-.08-.07,0,0-.21-22.49-.38-23.51-3.64-22.74-19.14-39.15-39.35-39.15-21.58,0-37.5,15.69-39.42,40.73h0c-.3,3.32-.31,6.67.11,9.97.52,4.03-.28,8.76-.34,12.61,0,.03,0,.06,0,.08-.13,3-4.62,3.63-6.85,3.55-2.62-.1-5.14,2.59-7.12,3.22-.06.02-.11.03-.17.03-5.24.54-8.54,2.06-12.74,4.95-3.62,2.5-9.19,4.31-13.7,4.68-4.21.33-7.79,1.33-10.47,4.38-.09.1-.21.18-.35.22l-5.05,1.51c-4.7,1.4-8.48,2.55-13.58,2.37-1.32-.05-3.76,1.46-5.14,1.95l-18.67,6.75c-.08.03-.17.04-.26.04-3.87-.03-6.45,2.69-6.74,6.22-.01.18-.1.36-.23.48-3.91,3.55-7.3,7.09-10.05,11.38-7.11,10.45-12.22,21.31-16.81,32.96-1.69,4.29-5.11,8.1-7.05,11.86-2.88,5.58-5.57,9.51-5.18,16.13.2,3.27-4.17,6.95-5.41,9.88l-2.77,6.51s-.02.05-.04.08l-7.36,12.75c-.04.08-.07.16-.09.24l-.44,2.9c-.01.08-.04.16-.08.23l-9.11,23.69-18.54,38.88s-.02.05-.03.07l-3.05,8.7c-2.94,8.38-4.47,19.46-1.26,27.44l3.57,8.92c7.28,17.5,404.37,23.73,426.38,6.46ZM820.73,394l-4.98-2.72c-.39-.2-.52-.67-.28-1.03l9.43-17.54c.39-.6,5.62-.09,5.66.61l.96,20.27c.02.35-.23.66-.58.74-1.67.35-8.96.3-10.2-.32ZM1106.59,390.92l-1.65,1.81c-.21.23-.69-.05-1.08-.37-.34-.29-.86-.24-1.12.12h0c-.38.52-9.52.41-9.66-.21-.37-1.69-.57-3.54-.42-5.41l.71-9.38c.05-.72,9.03-.74,9.39-.1l4.66,10.16c.23.42.55,1.54.61,1.89.16,1,.04-.12-1.44,1.5Z" fill="#000000" />
                </g>
            </motion.svg>

            {/* Rostos e Silhueta integrados no SVG */}
            <motion.svg
                {...svgProps}
                style={{ y: yHead, rotateX: rotateXHead, transformOrigin: "center center", willChange: "transform" }}
            >
                <image
                    href="/images/RostoEsqu.png"
                    x="466.02" y="0.028" width="1000" height="187.232"
                    preserveAspectRatio="xMidYMax meet"
                    style={{ filter: "brightness(0)" }}
                />
                <image
                    href="/images/RostoDir.png"
                    x="466.02" y="0.028" width="1000" height="187.232"
                    preserveAspectRatio="xMidYMax meet"
                    style={{ filter: "brightness(0)" }}
                />

                <motion.image
                    href="/images/RostoEsqu.png"
                    x="466.02" y="0.028" width="1000" height="187.232"
                    preserveAspectRatio="xMidYMax meet"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeIndex === 0 ? 1 : 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                />

                <motion.image
                    href="/images/RostoDir.png"
                    x="466.02" y="0.028" width="1000" height="187.232"
                    preserveAspectRatio="xMidYMax meet"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeIndex === 1 ? 1 : 0 }}
                    transition={{ duration: 1.1, ease: "easeInOut" }}
                />
            </motion.svg>

            {/* Camada Frontal: Mesa */}
            <svg {...svgProps}>
                <motion.g style={{ y: yDesk, willChange: "transform" }}>
                    <g transform="translate(87, 12) scale(0.9)" style={{ transformOrigin: "center top" }}>
                        <rect x="-5000" y="406.39" width="10000" height="1000" fill="#000000" />
                    </g>
                </motion.g>
            </svg>

            {/* Camada Frontal: Notebook */}
            <motion.svg
                {...svgProps}
                style={{ y: yNotebook, rotateX: rotateXNotebook, transformOrigin: "center center", willChange: "transform" }}
            >
                <g transform="translate(105, 8) scale(0.9)" style={{ transformOrigin: "center top" }}>
                    <path d="M1091.41 258.24H809.7c-3.35 0-5.86 2.71-5.64 6.05l10.58 155.24c0.23 3.35 3.12 6.05 6.47 6.05h258.91c3.35 0 6.23-2.71 6.46-6.05l10.58-155.24c0.23-3.35-2.3-6.05-5.63-6.05Z" fill="#666666" />
                    <path d="M1097.06 264.29l-0.13 1.84c-0.03-0.95-0.41-1.87-1.08-2.59-0.76-0.82-1.83-1.28-2.94-1.27H808.2c-1.12 0-2.17 0.46-2.94 1.27-0.66 0.71-1.03 1.62-1.07 2.58l-0.13-1.83c-0.23-3.33 2.29-6.05 5.64-6.05h281.71c3.35 0 5.86 2.71 5.65 6.05Z" fill="#858585" />
                    <path d="M936.73 348.7c-0.39-0.06-0.79-0.02-1.05 0.38l0.05 7.64c0 1.05 0.34 2 0.64 2.98 0.52 1.69 1.44 3.16 2.64 4.45v2.83c0.02 0.46 0.3 0.78 0.67 1.08l13.47-0.03c0.44 0 0.93-0.21 1.36-0.26 3.9-0.59 7.13-2.63 9.07-6.08 0.87-1.55 1.44-3.24 1.63-5.04 0.11-1.02 0.07-2.05 0.08-3.09l0.08-7.33 0.06-18.05c-0.22-1.63-0.62-3.12-1.26-4.62-0.05-0.05-0.21-0.13-0.23-0.07l-0.08 0.21c0.11 0.59 0.11 1.1 0.02 1.7l-0.05 14.21-0.07 14.15c-0.01 2.79-1.14 6.43-3.08 8.41l-1.25 1.29c-0.06 0.02-0.18 0.06-0.18 0.02v-0.2c1.06-1.23 1.74-2.67 2.18-4.22 0.25-0.93 0.46-1.85 0.48-2.81l0.08-3.41 0.08-16.15 0.08-13.63 0.04-6.44c-0.06-0.28-0.33-0.67-0.51-0.85h-0.93c-0.43 0.24-0.83 0.37-1.26 0.53-0.71 0.25-1.35 0.61-2.02 1.02-1.39-0.48-2.85-0.77-4.35-0.86l-1.1-0.07h-12.38c-0.47 0-0.85 0.48-0.85 0.92l0.02 4.51 0.08 16.62 0.03 8.28c0 0.36 0.13 0.48 0.46 0.56 3.45 0.77 5.99 3.93 6.36 7.41 0.16 1.09 0.55 2 1.21 2.89l0.3 0.05v-26.13s-0.07-0.67-0.07-0.67v-6.45c0-0.14 0.16-0.47 0.3-0.46h4.93c0.29 0 0.66 0.16 0.96 0.21 0.13 0.02 0.44 0.17 0.44 0.34l-0.04 13.74-0.08 17.55c0 2.25-1.76 4.66-4.2 4.95-1.54 0.18-3-0.2-4.04-1.32-0.84-0.9-1.32-2-1.49-3.22-0.23-1.78-0.93-3.4-2.11-4.75l-0.74-0.74c-1.22-1.12-2.74-1.76-4.38-2.01Z" fill="#e6e6e6" />
                </g>
            </motion.svg>
        </div>
    );
}
