'use client'

import { useState, useEffect } from 'react'
import { useLenis } from 'lenis/react'
import { BoldReserver } from "@/components/atoms/BoldReserver"
import { HeroCarousel } from "@/components/organisms/HeroCarousel"
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { AnimatedTypingText } from "@/components/atoms/AnimatedTypingText"

export function StudioHeroContent({ headline, subheadline, carouselItems, ctaLabel, ctaHref }: { headline: string, subheadline?: string, carouselItems: any[], ctaLabel?: string, ctaHref?: string }) {
    const params = useParams()
    const locale = params?.locale === 'en' ? 'en' : 'pt'
    const [moveUp, setMoveUp] = useState(false)
    const [showSubAndImage, setShowSubAndImage] = useState(false)
    const [showButtons, setShowButtons] = useState(false)
    const lenis = useLenis()

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
        <div className="w-full flex-1 grid-layout items-center relative">
            {/* Left Column: Text and CTA */}
            <div className="col-span-12 lg:col-span-7 flex flex-col items-start text-left pt-0 pb-[320px] md:pb-0 relative transition-all z-40">
                <AnimatedTypingText 
                    as="h1"
                    text={headline}
                    mode="auto"
                    animationType="typing"
                    targets={typingTargets}
                    onFinished={handleTypingFinished}
                    delay={0}
                    speed={40}
                    className={`text-step-6 type-display text-foreground w-full max-w-4xl text-balance drop-shadow-sm z-10 relative text-left transition-all duration-1000 transform ${moveUp ? 'translate-y-0 mb-3 md:mb-fluid-m' : 'translate-y-[10svh] mb-0'}`}
                />

                {subheadline && (
                    <div className={`hidden md:block transition-all duration-1000 transform z-20 relative ${showSubAndImage ? 'translate-y-0 opacity-100 mb-4 md:mb-fluid-m' : 'translate-y-10 opacity-0 mb-0'}`}>
                        <p className={`text-step-0 type-body text-foreground max-w-[700px] text-left leading-[1.8] -ml-2`}>
                            <span className="bg-white py-1 px-2 box-decoration-clone">
                                {subheadline}
                            </span>
                        </p>
                    </div>
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
                                <Link href={`/${locale}/projects`}>
                                    {locale === 'en' ? 'View Projects' : 'Ver Projetos'}
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column: Slider / Carousel animated reveal */}
            <div className="col-span-12 w-full absolute bottom-[40px] left-0 md:bottom-auto md:left-auto md:relative lg:w-[65vw] lg:absolute lg:right-0 lg:inset-y-0 lg:flex lg:flex-col lg:justify-center pointer-events-none">
                <div className={`w-full z-10 pointer-events-none transition-all duration-1000 transform ${showSubAndImage ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                    <div className="pointer-events-auto">
                        <HeroCarousel items={carouselItems} isActive={showSubAndImage} />
                    </div>
                </div>
            </div>
        </div>
        
        {/* Bottom Elements: Scroll Down & Caption */}
        <div className="absolute top-[99svh] -translate-y-full w-full z-40 pointer-events-none px-fluid-xs md:px-fluid-m h-12">
            <div className="relative w-full h-full flex items-center justify-between md:justify-end">
                {/* Scroll Down Indicator */}
                <div className={`absolute left-1/2 -translate-x-1/2 flex justify-center transition-all duration-1000 ${showButtons ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <a 
                        href="#cases" 
                        onClick={(e) => {
                            e.preventDefault();
                            lenis?.scrollTo('#cases', { offset: -50 });
                        }}
                        className="pointer-events-auto flex items-center justify-center w-12 h-12 text-foreground hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full" 
                        aria-label="Scroll down"
                    >
                        <ChevronDown className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
                    </a>
                </div>

                {/* Portal Target Layer */}
                <div id="hero-caption-portal" className={`hidden md:flex transition-all duration-1000 ${showSubAndImage ? 'opacity-100' : 'opacity-0'}`}>
                </div>
            </div>
        </div>
        </>
    )
}
