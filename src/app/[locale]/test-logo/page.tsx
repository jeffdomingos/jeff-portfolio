"use client";

import { useMotionValue } from "framer-motion";
import { IconAnimatedLogo } from "@/components/organisms/IconAnimatedLogo";
import { useState, useRef } from "react";

export default function TestLogoPage() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isIdle, setIsIdle] = useState(true);
    const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

    const resetIdleTimer = () => {
        setIsIdle(false);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => {
            setIsIdle(true);
        }, 2500);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        resetIdleTimer();
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const normalizedX = (x / rect.width) * 2 - 1;
        const normalizedY = (y / rect.height) * 2 - 1;
        mouseX.set(normalizedX);
        mouseY.set(normalizedY);
    };

    return (
        <div 
            className="w-full h-[100svh] flex items-center justify-center bg-background text-foreground"
            onMouseMove={handleMouseMove} 
            onMouseLeave={() => resetIdleTimer()}
        >
            <div className="w-[300px] border border-foreground/20 p-8 rounded-xl flex flex-col items-center gap-8">
                <p className="type-body text-center opacity-50">Mova o mouse aqui dentro (ou ao redor) para testar a responsividade e o parallax</p>
                <div className="w-full">
                    <IconAnimatedLogo mouseX={mouseX} mouseY={mouseY} isIdle={isIdle} />
                </div>
            </div>
        </div>
    );
}
