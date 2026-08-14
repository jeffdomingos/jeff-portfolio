'use client'

import { useEffect, useState, useRef } from 'react'
import { useLenis } from 'lenis/react'
import { AnimatedTypingText } from "@/components/atoms/AnimatedTypingText"
import { useMotionValue, motion } from "framer-motion"
import { IconAnimatedLogo } from "./IconAnimatedLogo"

export function CompactHeroContent({ headline, subheadline, ctaLabel, ctaHref }: { headline: string, subheadline?: string, ctaLabel?: string, ctaHref?: string }) {
    const lenis = useLenis()

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isIdle, setIsIdle] = useState(true);
    const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [showSubheadline, setShowSubheadline] = useState(false);

    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            setIsIdle(false);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            idleTimerRef.current = setTimeout(() => {
                setIsIdle(true);
            }, 2500);

            // Normalize based on the entire window viewport
            const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
            const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
            
            mouseX.set(normalizedX);
            mouseY.set(normalizedY);
        };

        window.addEventListener('mousemove', handleGlobalMouseMove);
        
        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        };
    }, [mouseX, mouseY]);

    useEffect(() => {
        // Ensure scroll is unlocked and we are not in loading state
        document.documentElement.classList.remove('is-loading');
        if (lenis) {
            lenis.start();
            if (window.location.hash) {
                const targetId = window.location.hash.substring(1);
                setTimeout(() => {
                    const el = document.getElementById(targetId);
                    if (el) lenis.scrollTo(el, { immediate: true });
                }, 50);
            }
        }
    }, [lenis]);

    const typingTargets = [
        { text: /Product Design/i, className: "text-foreground" },
        { text: /Web Design/i, className: "text-foreground" },
        { text: /Alto Padrão/i, className: "text-foreground" },
        { text: /High-End/i, className: "text-foreground" },
        { text: /premium/i, className: "text-foreground" }
    ];

    return (
        <div className="w-full flex-1 grid-layout items-center">
            <div className="col-span-12 lg:col-span-7 flex flex-col items-start text-left relative z-40 max-w-full lg:max-w-4xl">
                <div className="w-full pr-0 lg:pr-8">
                    {/* Headline with continuous non-blocking typing */}
                    <AnimatedTypingText 
                        as="h1"
                        text={headline}
                        mode="auto"
                        animationType="typing"
                        targets={typingTargets}
                        delay={0}
                        speed={30}
                        onFinished={() => setShowSubheadline(true)}
                        className="text-step-4 md:text-step-5 type-display text-foreground w-full text-balance drop-shadow-sm z-40 relative text-left mb-3 md:mb-4"
                    />

                    {/* Subheadline animated reveal */}
                    {subheadline && (
                        <div className="w-full z-40 relative mt-2 md:mt-3">
                            <div 
                                className={`transition-all ${showSubheadline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                                style={{ transitionDuration: '1200ms', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                            >
                                <p className="text-step-0 type-body text-foreground max-w-[700px] text-left leading-[1.8] -ml-2">
                                    <span className="bg-white py-1 px-2 box-decoration-clone">
                                        {subheadline}
                                    </span>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Logo expandido no canto direito escalando de forma dinâmica com respiros no topo e na base em relação ao hero-wrapper */}
            <div className="hidden lg:block absolute right-[-20px] xl:right-[calc(50vw-680px)] top-[-40px] bottom-[140px] rotate-[24deg] z-20 pointer-events-none">
                <div className="h-full aspect-[220/326] text-foreground transition-all duration-1000">
                    <IconAnimatedLogo mouseX={mouseX} mouseY={mouseY} isIdle={isIdle} />
                </div>
            </div>
        </div>
    )
}
