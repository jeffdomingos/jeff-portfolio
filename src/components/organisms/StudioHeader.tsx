"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { LanguageSwitch } from "@/components/atoms/LanguageSwitch";

export function StudioHeader({ locale, otherLocale }: { locale: string, otherLocale: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isFooterVisible, setIsFooterVisible] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsFooterVisible(entry.isIntersecting);
            },
            { threshold: 0.05 }
        );
        
        const tryObserve = () => {
            const footer = document.querySelector('footer');
            if (footer) {
                observer.observe(footer);
                return true;
            }
            return false;
        };

        if (!tryObserve()) {
            const interval = setInterval(() => {
                if (tryObserve()) clearInterval(interval);
            }, 500);
            return () => clearInterval(interval);
        }

        return () => observer.disconnect();
    }, []);

    const ctaLabel = locale === 'pt' ? 'Iniciar Projeto' : 'Start a Project';

    return (
        <>
            <header className="fixed top-0 w-full z-[80] pointer-events-none mix-blend-difference text-white">
                <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md font-bold z-[70] shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 pointer-events-auto">
                    Skip to Content
                </a>
                
                <div className="w-full px-fluid-xs md:px-fluid-m h-12 md:h-14 flex items-center justify-between relative">
                    <Link href={`/${locale}/studio`} className="flex items-center pointer-events-auto z-[70] overflow-hidden" onClick={() => setIsOpen(false)}>
                        <Image 
                            src="/images/logo-header-horiz.svg" 
                            alt="Jeff Domingos Studio" 
                            width={160}
                            height={32}
                            priority={true}
                            className={`h-6 md:h-8 w-auto object-contain invert transition-all duration-500 ease-in-out ${isFooterVisible ? '-translate-y-[150%] opacity-0' : 'translate-y-0 opacity-100'}`} 
                        />
                        <span className="sr-only">Jeff Domingos Studio</span>
                    </Link>

                    {/* Desktop Nav — Minimal: only CTA + Language */}
                    <nav className="hidden md:flex items-center gap-fluid-m text-current text-step--2 type-label pointer-events-auto">
                        <a 
                            href="https://calendly.com/jeffdomingos/call45min" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            data-text={ctaLabel} 
                            className="font-light hover:font-bold transition-colors relative group flex flex-col items-center after:content-[attr(data-text)] after:font-bold after:h-0 after:invisible after:overflow-hidden after:pointer-events-none after:select-none"
                        >
                            {ctaLabel}
                            <span className="absolute -bottom-1 left-0 w-full h-px bg-current scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left"></span>
                        </a>
                        <div className="flex items-center gap-4 border-l border-current pl-fluid-m ml-2">
                            <LanguageSwitch currentLocale={locale} otherLocale={otherLocale} />
                        </div>
                    </nav>

                    {/* Mobile Hamburger Toggle */}
                    <button 
                        onClick={toggleMenu}
                        className="md:hidden pointer-events-auto z-[70] p-2 flex flex-col justify-center items-center gap-[6px] focus:outline-none"
                        aria-expanded={isOpen}
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-6 h-[2px] bg-white transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
                        <span className={`block w-6 h-[2px] bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                        <span className={`block w-6 h-[2px] bg-white transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay — Studio-specific (no portfolio links) */}
            <div className={`fixed inset-0 z-[70] flex flex-col justify-center items-center transition-all duration-500 ease-in-out bg-background text-foreground ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <nav className="flex flex-col items-center gap-8 text-step-2 type-label">
                    <a 
                        href="https://calendly.com/jeffdomingos/call45min" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)} 
                        data-text={ctaLabel} 
                        className="hover:font-bold transition-colors flex flex-col items-center after:content-[attr(data-text)] after:font-bold after:h-0 after:invisible after:overflow-hidden after:pointer-events-none after:select-none"
                    >
                        {ctaLabel}
                    </a>
                    <a 
                        href="mailto:jeffsalb@gmail.com" 
                        onClick={() => setIsOpen(false)} 
                        data-text="Email" 
                        className="hover:font-bold transition-colors flex flex-col items-center after:content-[attr(data-text)] after:font-bold after:h-0 after:invisible after:overflow-hidden after:pointer-events-none after:select-none"
                    >
                        Email
                    </a>
                    <a 
                        href="https://api.whatsapp.com/send/?phone=5521999374516" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)} 
                        data-text="WhatsApp" 
                        className="hover:font-bold transition-colors flex flex-col items-center after:content-[attr(data-text)] after:font-bold after:h-0 after:invisible after:overflow-hidden after:pointer-events-none after:select-none"
                    >
                        WhatsApp
                    </a>
                    <div className="mt-8 pt-8 border-t border-border flex items-center justify-center">
                        <LanguageSwitch currentLocale={locale} otherLocale={otherLocale} />
                    </div>
                </nav>
            </div>
        </>
    );
}
