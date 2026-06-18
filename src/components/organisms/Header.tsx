"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GlobalHeader } from "@/content/schema";
import { LanguageSwitch } from "@/components/atoms/LanguageSwitch";
import { cn } from "@/lib/utils";

export function Header({ data, locale, otherLocale }: { data: GlobalHeader, locale: string, otherLocale: string }) {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (typeof window !== "undefined") {
                const currentScrollY = window.scrollY;
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    setIsVisible(false);
                } else if (currentScrollY < lastScrollY) {
                    setIsVisible(true);
                }
                setLastScrollY(currentScrollY);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <header className={cn(
            "fixed top-0 w-full z-50 bg-background transition-transform duration-300 ease-in-out",
            isVisible ? "translate-y-0" : "-translate-y-full"
        )}>
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md font-bold z-[60] shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Skip to Content
            </a>
            <div className="w-full px-fluid-m h-14 flex items-center justify-between">
                <Link href={`/${locale}`} className="flex items-center">
                    <img src="/images/logo-header-horiz.svg" alt={data.brandName} className="h-8 w-auto object-contain" />
                    <span className="sr-only">{data.brandName}</span>
                </Link>
                <nav className="flex items-center gap-fluid-m text-foreground text-step--2 uppercase tracking-widest font-medium">
                    <Link href={`/${locale}`} className="font-light hover:font-bold transition-all relative group">
                        {data.navItemHome}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300"></span>
                    </Link>
                    <Link href={`/${locale}/resume`} className="font-light hover:font-bold transition-all relative group">
                        {data.navItemResume}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300"></span>
                    </Link>
                    <Link href={`/${locale}/contact`} className="font-light hover:font-bold transition-all relative group">
                        {data.navItemContact}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300"></span>
                    </Link>
                    <div className="flex items-center gap-4 border-l border-foreground pl-fluid-m ml-2">
                        <LanguageSwitch currentLocale={locale} otherLocale={otherLocale} />
                    </div>
                </nav>
            </div>
        </header>
    );
}
