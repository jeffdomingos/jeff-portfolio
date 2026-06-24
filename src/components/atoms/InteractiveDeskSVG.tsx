"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

interface InteractiveDeskSVGProps {
    layer?: 'back' | 'front' | 'all';
    scrollYProgress?: any;
}

export function InteractiveDeskSVG({ layer = 'all', scrollYProgress: externalScrollYProgress }: InteractiveDeskSVGProps) {
    const containerRef = useRef<SVGSVGElement>(null);

    const localScroll = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const progress = externalScrollYProgress || localScroll.scrollYProgress;

    // Parallax values in SVG units (1 unit is roughly 6.6 pixels on screen)
    // Centered at 0 so they align perfectly when scroll is at 0.5 (middle of screen)
    // Usamos 5 estágios [0, 0.25, 0.5, 0.75, 1]

    // Body move de forma constante e lenta
    const yBody = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [6, 3, 0, -3, -6]);

    // Desk vai perdendo velocidade aos poucos
    const yDesk = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [45, 20, 0, -10, -15]);

    // Notebook também perde velocidade, mas move mais que a mesa
    const yNotebook = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [90, 40, 0, -20, -55]);

    return (
        <svg
            ref={containerRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="913.05 0.028 105.953 187.232"
            className="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none"
            style={{ overflow: "visible" }}
            preserveAspectRatio="xMidYMax meet"
        >
            {/* AJUSTE FINO DE ALINHAMENTO E ESCALA DO SVG
                Altere os valores de X e Y no translate() abaixo para mover corpo, mesa e notebook.
                Valores negativos em X movem para a esquerda, positivos para a direita.
                Valores negativos em Y movem para cima (aproximando da cabeça).
                
                Para ajustar o TAMANHO (escala) do corpo/mesa em relação à cabeça, altere o scale().
                1 = 100% (tamanho original). 1.05 = 105%. 0.95 = 95%.
                
                Exemplo com tudo junto: transform="translate(-5, -15) scale(1.02)"
            */}
            <g transform="translate(86, 8) scale(0.9)" style={{ transformOrigin: "center top" }}>
                {/* Base Colors - Black Shapes */}
                {(layer === 'all' || layer === 'front') && (
                    <motion.g style={{ y: yDesk }}>
                        <polygon points="1471.61 406.39 448.39 406.39 0 483.68 1920 483.68 1471.61 406.39" fill="#000000" />
                    </motion.g>
                )}

                {(layer === 'all' || layer === 'back') && (
                    <motion.g style={{ y: yBody }}>
                        <path d="M1170.6,437.1c1.58-1.24,3.42-3.42,5.24-6.84,1.3-2.44,2.2-4.94,3.2-7.51,2.02-5.2,2.25-9.86,2.03-15.26-.18-4.3-.26-8.18-1.58-12.33l-4.13-13.07s0-.03-.02-.04l-12.29-31.64-8.73-21.3s-.02-.05-.03-.08l-1.64-6.03s-.02-.06-.03-.1l-4.48-11.18s-.02-.06-.03-.09c-.9-3.38-2.07-6.64-3.95-9.91-.07-.12-.1-.26-.09-.4.62-7.33-3.07-13.46-5.44-19.92-.02-.05-.03-.1-.04-.16-.57-4.36-1.31-8.77-2.48-13.12-3.95-14.77-8.98-28.67-16.99-41.91-2.52-4.45-5.65-8.23-9.44-11.73-.13-.12-.2-.28-.22-.45-.39-3.5-3.25-5.59-6.86-5.76-.07,0-.14-.02-.21-.04l-17.21-6.08c-.1-.04-.2-.1-.27-.17-2.51-2.48-5.97-3.96-9.71-2.67-.09.03-.18.05-.28.04-2.5-.11-5.2-.5-7.49-1.45l-5.82-2.4c-4.13-1.71-7.59-2.92-12.05-3.81-10.44-2.08-15.59-6.83-19.18-7.24-3.03-.34-5.27-1.31-7.84-2.88-3.78-2.3-7.89,1.11-14.1-4.58-.03-.02-.06-.05-.08-.07,0,0-.21-22.49-.38-23.51-3.64-22.74-19.14-39.15-39.35-39.15-21.58,0-37.5,15.69-39.42,40.73h0c-.3,3.32-.31,6.67.11,9.97.52,4.03-.28,8.76-.34,12.61,0,.03,0,.06,0,.08-.13,3-4.62,3.63-6.85,3.55-2.62-.1-5.14,2.59-7.12,3.22-.06.02-.11.03-.17.03-5.24.54-8.54,2.06-12.74,4.95-3.62,2.5-9.19,4.31-13.7,4.68-4.21.33-7.79,1.33-10.47,4.38-.09.1-.21.18-.35.22l-5.05,1.51c-4.7,1.4-8.48,2.55-13.58,2.37-1.32-.05-3.76,1.46-5.14,1.95l-18.67,6.75c-.08.03-.17.04-.26.04-3.87-.03-6.45,2.69-6.74,6.22-.01.18-.1.36-.23.48-3.91,3.55-7.3,7.09-10.05,11.38-7.11,10.45-12.22,21.31-16.81,32.96-1.69,4.29-5.11,8.1-7.05,11.86-2.88,5.58-5.57,9.51-5.18,16.13.2,3.27-4.17,6.95-5.41,9.88l-2.77,6.51s-.02.05-.04.08l-7.36,12.75c-.04.08-.07.16-.09.24l-.44,2.9c-.01.08-.04.16-.08.23l-9.11,23.69-18.54,38.88s-.02.05-.03.07l-3.05,8.7c-2.94,8.38-4.47,19.46-1.26,27.44l3.57,8.92c7.28,17.5,404.37,23.73,426.38,6.46ZM820.73,394l-4.98-2.72c-.39-.2-.52-.67-.28-1.03l9.43-17.54c.39-.6,5.62-.09,5.66.61l.96,20.27c.02.35-.23.66-.58.74-1.67.35-8.96.3-10.2-.32ZM1106.59,390.92l-1.65,1.81c-.21.23-.69-.05-1.08-.37-.34-.29-.86-.24-1.12.12h0c-.38.52-9.52.41-9.66-.21-.37-1.69-.57-3.54-.42-5.41l.71-9.38c.05-.72,9.03-.74,9.39-.1l4.66,10.16c.23.42.55,1.54.61,1.89.16,1,.04-.12-1.44,1.5Z" fill="#000000" />
                    </motion.g>
                )}

                {(layer === 'all' || layer === 'front') && (
                    <motion.g style={{ y: yNotebook }}>
                        <path d="M1092.97,444.53c-1.02,6.84-5.9,9.44-12.53,9.57-4.67.13-237.09-.31-246.22-.51s-8.62-19.77-9.85-25.7c0,0-5.92-118.27-5-125.68,2.13-11.55,18.54-6.95,26.57-6.99,4.68.19,8.54.99,13.3.86,6.8-.17,13.84.55,20.51.46,8.96-.28,18.07-.56,26.82-.26,8.58.14,17.25-.34,25.85-.32,8.88.09,17.91.27,26.8.34,14.31-.07,28.53-.88,42.83-.54,7.87.06,15.71.08,23.55.84,9.28.9,19.53.88,28.86,1.04,6.37.22,11.4,1.16,18.28,1.19,3.66-.04,10.19-1.54,13.78-1.28,5.02.47,13.5,2.93,14.29,5.15s-6.32,134.91-7.85,141.82Z" fill="#404040" />
                        <path d="M1079.53,294.55c7.76.32,17.64-.88,20.78,1.77,1.03.87.67,2.81.65,4.71,0,.82.19,7.28-1.27,6.68-3.86-1.57-1.32-6.95-5.36-6.98-9.69-.14-266.89-4.63-270.13-4.03-2.33.43-4.01,7.78-4.75,7.36-.91-.52-.27-4.9-.2-8,.06-2.56,1.97-3.36,3.12-3.57,2.38-.44,246.92,2.07,257.15,2.06Z" fill="#595959" />
                    </motion.g>
                )}
            </g>
        </svg>
    );
}
