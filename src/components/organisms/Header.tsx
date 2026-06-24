"use client";

import { useState } from "react";
import Link from "next/link";
import { GlobalHeader } from "@/content/schema";
import { LanguageSwitch } from "@/components/atoms/LanguageSwitch";

export function Header({ data, locale, otherLocale }: { data: GlobalHeader, locale: string, otherLocale: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 w-full z-50 pointer-events-none mix-blend-difference text-white">
                <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md font-bold z-[60] shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 pointer-events-auto">
                    Skip to Content
                </a>
                
                <div className="w-full px-fluid-xs md:px-fluid-m h-12 md:h-14 flex items-center justify-between relative">
                    <Link href={`/${locale}`} className="flex items-center pointer-events-auto z-[60]" onClick={() => setIsOpen(false)}>
                        <img src="/images/logo-header-horiz.svg" alt={data.brandName} className="h-6 md:h-8 w-auto object-contain invert" />
                        <span className="sr-only">{data.brandName}</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-fluid-m text-current text-step--2 uppercase tracking-widest font-medium pointer-events-auto">
                        <Link href={`/${locale}`} className="font-light hover:font-bold transition-all relative group">
                            {data.navItemHome}
                            <span className="absolute -bottom-1 left-0 w-full h-px bg-current scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left"></span>
                        </Link>
                        <Link href={`/${locale}/resume`} className="font-light hover:font-bold transition-all relative group">
                            {data.navItemResume}
                            <span className="absolute -bottom-1 left-0 w-full h-px bg-current scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left"></span>
                        </Link>
                        <Link href={`/${locale}/contact`} className="font-light hover:font-bold transition-all relative group">
                            {data.navItemContact}
                            <span className="absolute -bottom-1 left-0 w-full h-px bg-current scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left"></span>
                        </Link>
                        <div className="flex items-center gap-4 border-l border-current pl-fluid-m ml-2">
                            <LanguageSwitch currentLocale={locale} otherLocale={otherLocale} />
                        </div>
                    </nav>

                    {/* Mobile Hamburger Toggle */}
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden pointer-events-auto z-[60] p-2 flex flex-col justify-center items-center gap-[6px] focus:outline-none"
                        aria-expanded={isOpen}
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-6 h-[2px] bg-white transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
                        <span className={`block w-6 h-[2px] bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                        <span className={`block w-6 h-[2px] bg-white transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-background text-foreground z-[45] flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <nav className="flex flex-col items-center gap-8 text-step-2 uppercase tracking-widest font-medium">
                    <Link href={`/${locale}`} onClick={() => setIsOpen(false)} className="hover:font-bold transition-all">
                        {data.navItemHome}
                    </Link>
                    <Link href={`/${locale}/resume`} onClick={() => setIsOpen(false)} className="hover:font-bold transition-all">
                        {data.navItemResume}
                    </Link>
                    <Link href={`/${locale}/contact`} onClick={() => setIsOpen(false)} className="hover:font-bold transition-all">
                        {data.navItemContact}
                    </Link>
                    <div className="mt-8 pt-8 border-t border-border flex items-center justify-center">
                        <LanguageSwitch currentLocale={locale} otherLocale={otherLocale} />
                    </div>
                </nav>
            </div>
        </>
    );
}
