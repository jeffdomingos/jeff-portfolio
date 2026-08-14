"use client";

import { m, useSpring, useTransform, MotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";

interface IconAnimatedLogoProps {
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
    isIdle?: boolean;
}

export function IconAnimatedLogo({ mouseX, mouseY, isIdle = true }: IconAnimatedLogoProps) {
    // Mola para suavizar o movimento do mouse
    const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        setIsMobile(window.innerWidth < 1024);
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!isIdle) return;
        
        let isActive = true;

        const runAnimation = async () => {
            const poses = [
                { x: 1, y: -1 },      // Mostra o outro lado (esquerda/frente)
                { x: -0.75, y: 1 },   // Canto inferior esquerdo (Intermediário)
                { x: 0.9, y: 0.4 },   // Canto inferior direito (Intermediário)
                { x: 0, y: -1 },      // Inclina para cima
            ];
            
            let poseIndex = 0;

            while (isActive) {
                // 1) Repouso absoluto na posição original (marca canônica)
                await new Promise(resolve => setTimeout(resolve, 2500));
                if (!isActive) break;

                const pose = poses[poseIndex];
                poseIndex = (poseIndex + 1) % poses.length;

                // 2) Vai para a pose aleatória bonitinha com um pouco mais de velocidade (duration menor)
                animate(mouseX, pose.x, { duration: 0.8, ease: "easeOut" });
                animate(mouseY, pose.y, { duration: 0.8, ease: "easeOut" });
                
                // 3) Segura na pose para o usuário observar
                await new Promise(resolve => setTimeout(resolve, 1000));
                if (!isActive) break;

                // 4) Volta suavemente para a posição original (0,0)
                animate(mouseX, 0, { duration: 1.2, ease: "easeInOut" });
                animate(mouseY, 0, { duration: 1.2, ease: "easeInOut" });
            }
        };

        runAnimation();

        return () => {
            isActive = false;
        };
    }, [isIdle, mouseX, mouseY]);

    // Mapeamentos de Parallax ASSIMÉTRICOS
    const jFrenteX = useTransform(smoothX, [-1, 0, 1], [-15, 0, 26]);
    const jFrenteY = useTransform(smoothY, [-1, 0, 1], [-24, 0, 21]);

    const jSombraX = useTransform(smoothX, [-1, 0, 1], [7.5, 0, -13]);
    const jSombraY = useTransform(smoothY, [-1, 0, 1], [12, 0, -11]);

    const bgX = useTransform(smoothX, [-1, 0, 1], [2.5, 0, -4.5]);
    const bgY = useTransform(smoothY, [-1, 0, 1], [4, 0, -3.5]);

    const rotateX = useTransform(smoothY, [-1, 0, 1], [15, 0, -14]); 
    const rotateY = useTransform(smoothX, [-1, 0, 1], [-10, 0, 16.5]);

    return (
        <div 
            className="w-full aspect-[220/317] relative cursor-crosshair opacity-40"
            style={{ perspective: 1000 }}
        >
            <m.svg 
                viewBox="0 0 220 326.33" 
                className="w-full h-full overflow-visible"
                preserveAspectRatio="xMidYMid meet"
                style={{ willChange: "transform, opacity", transform: "translateZ(0)", backfaceVisibility: "hidden",  rotateX, rotateY }}
            >
                {/* O D Fica estático servindo como plano de fundo */}
                <m.path 
                    id="D-3" 
                    style={{ willChange: "transform, opacity", transform: "translateZ(0)", backfaceVisibility: "hidden",  x: bgX, y: bgY }}
                    fill="currentColor" 
                    d="M21.63,309.02c-1-.99-1.49-2.2-1.49-3.62V17.39c0-1.42.49-2.62,1.49-3.62.99-.99,2.2-1.49,3.62-1.49h72.86c24.42,0,43.95,7.39,58.58,22.15,14.63,14.77,21.94,34.51,21.94,59.22v135.48c0,24.71-7.32,44.46-21.94,59.22-14.63,14.77-34.16,22.15-58.58,22.15H25.25c-1.42,0-2.63-.49-3.62-1.49ZM71.69,267.91l25.56-.43c9.37,0,16.97-3.76,22.79-11.29,5.82-7.52,8.87-17.53,9.16-30.04V96.64c0-12.78-2.92-22.93-8.73-30.47-5.82-7.52-13.71-11.29-23.64-11.29h-25.14c-1.42,0-2.13.71-2.13,2.13v208.77c0,1.42.71,2.13,2.13,2.13Z"
                />
                
                {/* J-SOMBRA atua como o preenchimento de extrusão sólido */}
                <m.g 
                    id="J-sombra" 
                    style={{ willChange: "transform, opacity", transform: "translateZ(0)", backfaceVisibility: "hidden",  x: jSombraX, y: jSombraY }}
                >
                    <path fill="white" d="M167.26,1.23c-.08-.08-.19-.17-.31-.25-1.04-.78-2.38-1.08-3.68-.94-24.72,2.67-43.94,23.61-43.94,49.03v176.19c0,9.95-2.77,18.04-8.3,24.29-5.55,6.25-12.72,9.37-21.52,9.37s-15.91-3.11-21.3-9.37c-4.03-4.67-6.56-10.36-7.58-17.08-.01-.03-.01-.05-.01-.09-.09-.65-.17-1.32-.25-1.98-3.24-22.57-21.64-40.25-44.54-42.39-1.18-.11-2.4.18-3.31.94,0,0-.01.01-.02.02-1.21,1.05-1.81,2.37-1.81,3.92v31.53c0,23.29,7.25,41.97,21.74,56.03.49.48.98.93,1.48,1.38,14.3,13.14,32.83,19.7,55.61,19.7s42.68-7.02,57.31-21.08c14.62-14.06,21.94-32.74,21.94-56.03V4.85c0-1.41-.49-2.62-1.49-3.62Z"/>
                </m.g>
                
                {/* J-FRENTE move-se na direção do mouse */}
                <m.g id="J-frente" style={{ willChange: "transform, opacity", transform: "translateZ(0)", backfaceVisibility: "hidden",  x: jFrenteX, y: jFrenteY }}>
                    <path 
                        fill="currentColor" 
                        d="M156.57,10.53c-.08-.08-.19-.17-.31-.25-1.04-.78-2.38-1.08-3.68-.94-24.72,2.67-43.94,23.61-43.94,49.03v176.19c0,9.95-2.77,18.04-8.3,24.29-5.55,6.25-12.72,9.37-21.52,9.37s-15.91-3.11-21.3-9.37c-4.03-4.67-6.56-10.36-7.58-17.08-.01-.03-.01-.05-.01-.09-.09-.65-.17-1.32-.25-1.98-3.24-22.57-21.64-40.25-44.54-42.39-1.18-.11-2.4.18-3.31.94,0,0-.01.01-.02.02-1.21,1.05-1.81,2.37-1.81,3.92v31.53c0,23.29,7.25,41.97,21.74,56.03.49.48.98.93,1.48,1.38,14.3,13.14,32.83,19.7,55.61,19.7s42.68-7.02,57.31-21.08c14.62-14.06,21.94-32.74,21.94-56.03V14.15c0-1.41-.49-2.62-1.49-3.62Z"
                    />
                </m.g>
            </m.svg>
        </div>
    );
}
