'use client'

import { useState, useEffect } from 'react'
import { HeroCarousel } from "@/components/organisms/HeroCarousel"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Calendar, Mail, Phone, ChevronDown } from "lucide-react"

export function HeroAnimatedContent({ headline, subheadline, carouselItems, ctaLabel, ctaHref }: { headline: string, subheadline?: string, carouselItems: any[], ctaLabel?: string, ctaHref?: string }) {
    const [visibleCount, setVisibleCount] = useState(0)
    const [typingState, setTypingState] = useState<'idle' | 'typing' | 'finished'>('idle')
    const [moveUp, setMoveUp] = useState(false)
    const [showSubAndImage, setShowSubAndImage] = useState(false)
    const [showButtons, setShowButtons] = useState(false)

    useEffect(() => {
        setVisibleCount(0)
        setTypingState('idle')
        setMoveUp(false)
        setShowSubAndImage(false)
        setShowButtons(false)

        let i = 0
        let intervalId: NodeJS.Timeout;

        const startTyping = () => {
            setTypingState('typing')
            intervalId = setInterval(() => {
                i++
                setVisibleCount(i)
                if (i >= headline.length) {
                    clearInterval(intervalId)
                    setTypingState('finished')
                    
                    // Orchestrate the sequence
                    setTimeout(() => {
                        setMoveUp(true) // 1. Move text up
                        setShowSubAndImage(true) // 2. Subtitle & Image appear at the exact same time as it starts moving up
                    }, 200) 
                    setTimeout(() => setShowButtons(true), 600) // 3. Buttons appear right after
                }
            }, 40)
        }

        // Aguarda 800ms piscando no lugar antes de começar a digitar
        const timeoutId = setTimeout(startTyping, 800)

        return () => {
            clearTimeout(timeoutId)
            clearInterval(intervalId)
        }
    }, [headline])

    const formatHeadline = (text: string, count: number) => {
        const targets = ["Product Design", "Web Design", "Alto Padrão", "High-End", "premium"];
        const regex = new RegExp(`(${targets.join('|')})`, 'gi');
        
        const parts = text.split(regex);
        let globalIndex = 0;

        return parts.map((part, index) => {
            const pLower = part.toLowerCase();
            let baseColorClass = "";
            if (pLower === 'product design' || pLower === 'web design') {
                baseColorClass = "text-foreground";
            } else if (targets.some(t => new RegExp(`^${t}$`, 'i').test(part))) {
                baseColorClass = "text-foreground/90";
            }
            
            // Render the string character by character but keep them in the DOM to prevent layout shift
            const chars = part.split('');
            const renderedChars = chars.map((char, charIdx) => {
                const isVisible = globalIndex < count;
                const isLastVisible = globalIndex === count - 1;
                const isFirstChar = globalIndex === 0;
                
                // Se ainda não começou a digitar, o cursor fica no começo piscando
                const showCursorBefore = count === 0 && isFirstChar;
                // O cursor depois da letra ativa (se estiver digitando) ou na última letra (quando terminar)
                const showCursorAfter = isLastVisible || (count === headline.length && charIdx === chars.length - 1 && index === parts.length - 1);
                
                const isBlinking = typingState !== 'typing';

                globalIndex++;
                return (
                    <span key={charIdx} className={`relative ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                        {showCursorBefore && (
                            <span className="absolute left-0 top-[0.05em] opacity-100">
                                <span className={`block w-[4px] h-[1em] bg-current ${isBlinking ? 'animate-hard-blink' : ''}`} />
                            </span>
                        )}
                        {char}
                        <span className={`absolute left-full ml-[1px] top-[0.05em] ${showCursorAfter ? 'opacity-100' : 'opacity-0'}`}>
                            <span className={`block w-[4px] h-[1em] bg-current ${isBlinking ? 'animate-hard-blink' : ''}`} />
                        </span>
                    </span>
                );
            });

            return (
                <span key={index} className={baseColorClass}>
                    {renderedChars}
                </span>
            );
        });
    }

    return (
        <div className="w-full flex-1 flex flex-col lg:flex-row items-center justify-between">
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes hard-blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                .animate-hard-blink {
                    animation: hard-blink 1s step-end infinite;
                }
            `}} />
            {/* Left Column: Text and CTA */}
            <div className="w-full lg:w-1/2 flex flex-col items-start text-left px-fluid-m z-20 pt-14 lg:pt-0">
                <h1 className={`text-step-5 md:text-step-6 font-heading font-semibold uppercase tracking-normal text-foreground w-full max-w-4xl leading-[1.1] text-balance drop-shadow-sm z-10 relative text-left transition-all duration-1000 transform ${moveUp ? 'translate-y-0 mb-fluid-m' : 'translate-y-[10vh] mb-0'}`}>
                    {formatHeadline(headline, visibleCount)}
                </h1>

                {subheadline && (
                    <p className={`text-step-0 font-light text-foreground max-w-2xl text-left leading-relaxed transition-all duration-1000 transform ${showSubAndImage ? 'translate-y-0 opacity-100 mb-fluid-m' : 'translate-y-10 opacity-0 mb-0'}`}>
                        {subheadline}
                    </p>
                )}

                <div className={`w-full transition-all duration-1000 transform ${showButtons ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} flex flex-col items-start`}>
                    {ctaLabel && ctaHref && (
                        <div className="mb-12 mt-6 flex flex-col sm:flex-row gap-4 items-start justify-start">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                                        {ctaLabel}
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                    </button>
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

                            <a 
                                href="#cases"
                                className="inline-flex h-12 items-center justify-center rounded-full bg-secondary/80 hover:bg-secondary px-8 py-2 text-sm font-medium text-secondary-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            >
                                Ver Projetos
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column: Slider / Carousel animated reveal */}
            <div className={`w-full lg:w-[65vw] lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-[50%] z-10 pointer-events-none transition-all duration-1000 transform ${showSubAndImage ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                <div className="pointer-events-auto">
                    <HeroCarousel items={carouselItems} isActive={showSubAndImage} />
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 transition-all duration-1000 transform ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <a href="#cases" className="block animate-bounce motion-reduce:animate-none text-foreground font-light hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full" aria-label="Scroll down">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </a>
            </div>
        </div>
    )
}
