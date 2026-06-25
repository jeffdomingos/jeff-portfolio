'use client'

import { useState, useEffect } from 'react'
import { HeroCarousel } from "@/components/organisms/HeroCarousel"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Calendar, Mail, Phone, ChevronDown } from "lucide-react"
import { AnimatedTypingText } from "@/components/atoms/AnimatedTypingText"

export function HeroAnimatedContent({ headline, subheadline, carouselItems, ctaLabel, ctaHref }: { headline: string, subheadline?: string, carouselItems: any[], ctaLabel?: string, ctaHref?: string }) {
    const [moveUp, setMoveUp] = useState(false)
    const [showSubAndImage, setShowSubAndImage] = useState(false)
    const [showButtons, setShowButtons] = useState(false)

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
        { text: /Alto Padrão/i, className: "text-foreground/90" },
        { text: /High-End/i, className: "text-foreground/90" },
        { text: /premium/i, className: "text-foreground/90" }
    ];

    return (
        <div className="w-full flex-1 grid-layout items-center relative">
            {/* Left Column: Text and CTA */}
            <div className="col-span-12 lg:col-span-6 flex flex-col items-start text-left z-40 pt-0 relative">
                <AnimatedTypingText 
                    as="h1"
                    text={headline}
                    mode="auto"
                    animationType="typing"
                    targets={typingTargets}
                    onFinished={handleTypingFinished}
                    delay={800}
                    speed={40}
                    className={`text-step-4 md:text-step-6 font-heading font-semibold uppercase tracking-normal text-foreground w-full max-w-4xl leading-[1.1] text-balance drop-shadow-sm z-10 relative text-left transition-all duration-1000 transform ${moveUp ? 'translate-y-0 mb-3 md:mb-fluid-m' : 'translate-y-[10vh] mb-0'}`}
                />

                {subheadline && (
                    <p className={`text-step-0 font-light text-foreground max-w-2xl text-left leading-relaxed transition-all duration-1000 transform ${showSubAndImage ? 'translate-y-0 opacity-100 mb-4 md:mb-fluid-m' : 'translate-y-10 opacity-0 mb-0'}`}>
                        {subheadline}
                    </p>
                )}

                <div className={`w-full transition-all duration-1000 transform ${showButtons ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} flex flex-col items-start`}>
                    {ctaLabel && ctaHref && (
                        <div className="mb-6 mt-2 md:mb-12 md:mt-6 flex flex-row flex-wrap gap-2 md:gap-4 items-start justify-start">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="default" size="default" className="md:h-12 md:px-8 md:text-sm h-10 px-6 text-xs">
                                        {ctaLabel}
                                        <ChevronDown className="ml-2 h-3 w-3 md:h-4 md:w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-64 p-2 bg-background border shadow-xl">
                                    <DropdownMenuItem asChild className="cursor-pointer py-3 rounded-md">
                                        <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="flex items-center w-full">
                                            <Calendar className="mr-3 h-5 w-5 text-foreground stroke-1" />
                                            <span className="font-medium">Agendar via Calendly</span>
                                        </a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="cursor-pointer py-3 rounded-md">
                                        <a href="mailto:jeffsalb@gmail.com" className="flex items-center w-full">
                                            <Mail className="mr-3 h-5 w-5 text-foreground stroke-1" />
                                            <span className="font-medium">Enviar um E-mail</span>
                                        </a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="cursor-pointer py-3 rounded-md">
                                        <a href="https://wa.me/5521999374516" target="_blank" rel="noopener noreferrer" className="flex items-center w-full">
                                            <Phone className="mr-3 h-5 w-5 text-foreground stroke-1" />
                                            <span className="font-medium">Chamar no WhatsApp</span>
                                        </a>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Button asChild variant="secondary" size="default" className="md:h-12 md:px-8 md:text-sm h-10 px-6 text-xs bg-secondary/80 hover:bg-secondary">
                                <a href="#cases">
                                    Ver Projetos
                                </a>
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column: Slider / Carousel animated reveal */}
            {/* Right Column Wrapper (No Z-Index, No Transform, establishes relative bounds) */}
            <div className="col-span-12 w-full lg:w-[65vw] lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-[50%] relative">
                
                {/* Images Layer (Z-10, behind halftone) */}
                <div className={`w-full z-10 pointer-events-none transition-all duration-1000 transform ${showSubAndImage ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                    <div className="pointer-events-auto mt-8 lg:mt-0">
                        <HeroCarousel items={carouselItems} isActive={showSubAndImage} />
                    </div>
                </div>

                {/* Portal Target Layer (Z-40, above halftone) */}
                <div id="hero-caption-portal" className={`absolute inset-0 w-full z-40 pointer-events-none transition-all duration-1000 transform ${showSubAndImage ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-1000 transform ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <a href="#cases" className="block animate-bounce motion-reduce:animate-none text-foreground font-light hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full" aria-label="Scroll down">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </a>
            </div>
        </div>
    )
}
