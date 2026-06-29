'use client'

import { useState, useEffect } from 'react'
import { useLenis } from 'lenis/react'
import { BoldReserver } from "@/components/atoms/BoldReserver"
import { HeroCarousel } from "@/components/organisms/HeroCarousel"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"
import { Calendar, Mail, Phone, ChevronDown, CalendarDays, MessageCircle } from "lucide-react"
import { AnimatedTypingText } from "@/components/atoms/AnimatedTypingText"

export function HeroAnimatedContent({ headline, subheadline, carouselItems, ctaLabel, ctaHref }: { headline: string, subheadline?: string, carouselItems: any[], ctaLabel?: string, ctaHref?: string }) {
    const params = useParams()
    const locale = params?.locale === 'en' ? 'en' : 'pt'
    const [moveUp, setMoveUp] = useState(false)
    const [showSubAndImage, setShowSubAndImage] = useState(false)
    const [showButtons, setShowButtons] = useState(false)
    const [isInitialLoading, setIsInitialLoading] = useState(true)
    const [loadingProgress, setLoadingProgress] = useState(0)
    const lenis = useLenis()

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isInitialLoading) {
            if (lenis) lenis.stop();
            document.documentElement.classList.add('is-loading');
            
            let prog = 0;
            interval = setInterval(() => {
                prog += Math.floor(Math.random() * 8) + 2;
                if (prog >= 100) {
                    prog = 100;
                    setLoadingProgress(100);
                    clearInterval(interval);
                    setIsInitialLoading(false);
                    document.documentElement.classList.remove('is-loading');
                    if (lenis) {
                        lenis.start();
                        if (window.location.hash) {
                            const targetId = window.location.hash.substring(1);
                            setTimeout(() => {
                                const el = document.getElementById(targetId);
                                if (el) {
                                    lenis.scrollTo(el, { duration: 1.5, offset: 0 });
                                }
                            }, 300); // Small delay to let the overlay start fading
                        }
                    }
                } else {
                    setLoadingProgress(prog);
                }
            }, 60);
        }
        
        return () => {
            if (interval) clearInterval(interval);
            document.documentElement.classList.remove('is-loading');
        };
    }, [isInitialLoading, lenis]);

    // Removido o useEffect original de intervalo aqui, pois ele agora reside e é processado pelo AnimatedTypingText

    const handleTypingFinished = () => {
        setTimeout(() => {
            setMoveUp(true);
            setShowSubAndImage(true);
        }, 200);
        setTimeout(() => setShowButtons(true), 600);
    };

    const typingTargets = [
        { text: /Product Design/i, className: "text-foreground" },
        { text: /Web Design/i, className: "text-foreground" },
        { text: /Alto Padrão/i, className: "text-foreground" },
        { text: /High-End/i, className: "text-foreground" },
        { text: /premium/i, className: "text-foreground" }
    ];

    return (
        <>
        <div className={`fixed inset-0 bg-background transition-opacity duration-1000 ease-in-out ${isInitialLoading ? 'opacity-100 pointer-events-auto z-[70]' : 'opacity-0 pointer-events-none z-[-1]'}`} />
        <div className="w-full flex-1 grid-layout items-center relative">
            {/* Left Column: Text and CTA */}
            <div className={`col-span-12 lg:col-span-6 flex flex-col items-start text-left pt-0 relative transition-all ${isInitialLoading ? 'z-[80]' : 'z-40'}`}>
                <AnimatedTypingText 
                    as="h1"
                    text={headline}
                    mode="auto"
                    animationType="typing"
                    targets={typingTargets}
                    onFinished={handleTypingFinished}
                    delay={800}
                    speed={40}
                    isLoadingPhase={isInitialLoading}
                    loadingProgress={loadingProgress}
                    className={`text-step-6 type-display text-foreground w-full max-w-4xl text-balance drop-shadow-sm z-10 relative text-left transition-all duration-1000 transform ${moveUp ? 'translate-y-0 mb-3 md:mb-fluid-m' : 'translate-y-[10svh] mb-0'}`}
                />

                {subheadline && (
                    <p className={`hidden md:block text-step-0 type-body text-foreground max-w-2xl text-left transition-all duration-1000 transform ${showSubAndImage ? 'translate-y-0 opacity-100 mb-4 md:mb-fluid-m' : 'translate-y-10 opacity-0 mb-0'}`}>
                        {subheadline}
                    </p>
                )}

                <div className={`w-full transition-all duration-1000 transform ${showButtons ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} flex flex-col items-start`}>
                    {ctaLabel && ctaHref && (
                        <div className="mb-6 mt-2 md:mb-12 md:mt-6 flex flex-row flex-wrap gap-2 md:gap-4 items-start justify-start">
                            <Button asChild variant="default" size="default" className="md:h-12 md:px-8 md:text-sm h-10 px-6 text-xs group">
                                <Link href={`/${locale}/contact`}>
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        <BoldReserver text={ctaLabel || "Start a Project"} />
                                    </span>
                                </Link>
                            </Button>

                            <Button asChild variant="secondary" size="default" className="md:h-12 md:px-8 md:text-sm h-10 px-6 text-xs">
                                <a href="#cases">
                                    {locale === 'en' ? 'View Projects' : 'Ver Projetos'}
                                </a>
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column: Slider / Carousel animated reveal */}
            {/* Right Column Wrapper (No Z-Index, No Transform, establishes relative bounds) */}
            <div className="col-span-12 w-full lg:w-[65vw] lg:absolute lg:right-0 lg:inset-y-0 lg:flex lg:flex-col lg:justify-center relative pointer-events-none">
                
                {/* Images Layer (Z-10, behind halftone) */}
                <div className={`w-full z-10 pointer-events-none transition-all duration-1000 transform ${showSubAndImage ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                    <div className="pointer-events-auto mt-8 lg:mt-0">
                        <HeroCarousel items={carouselItems} isActive={showSubAndImage} />
                    </div>
                </div>
            </div>
        </div>
        
        {/* Bottom Elements: Scroll Down & Caption (grouped for vertical alignment) */}
        <div className="absolute top-[99svh] -translate-y-full w-full flex items-center justify-between z-40 pointer-events-none px-fluid-xs md:px-fluid-m">
            {/* Left Spacer for true center alignment */}
            <div className="flex-1"></div>

            {/* Scroll Down Indicator */}
            <div className={`flex justify-center transition-all duration-1000 ${showButtons ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <a href="#cases" className="pointer-events-auto flex items-center justify-center w-12 h-12 border border-transparent text-foreground hover:border-foreground hover:bg-foreground hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full" aria-label="Scroll down">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </a>
            </div>

            {/* Portal Target Layer */}
            <div id="hero-caption-portal" className={`flex-1 flex justify-end transition-all duration-1000 ${showSubAndImage ? 'opacity-100' : 'opacity-0'}`}>
            </div>
        </div>
        </>
    )
}
