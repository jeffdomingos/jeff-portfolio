"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GlobalHeader } from "@/content/schema";
import { LanguageSwitch } from "@/components/atoms/LanguageSwitch";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
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
            "fixed top-0 w-full z-50 bg-zinc-50/95 dark:bg-zinc-900/95 backdrop-blur-md border-b shadow-sm transition-transform duration-300 ease-in-out",
            isVisible ? "translate-y-0" : "-translate-y-full"
        )}>
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md font-bold z-[60] shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Skip to Content
            </a>
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href={`/${locale}`} className="font-bold text-xl text-foreground flex items-center gap-2">
                    <img src="/images/logo.png" alt={data.brandName} className="h-8 w-auto object-contain" />
                    <span className="sr-only md:not-sr-only">{data.brandName}</span>
                </Link>
                <nav className="flex items-center gap-6 text-foreground">
                    <Link href={`/${locale}`}>{data.navItemHome}</Link>
                    <Link href={`/${locale}/resume`}>{data.navItemResume}</Link>
                    <Link href={`/${locale}/contact`}>{data.navItemContact}</Link>
                    <div className="flex items-center gap-4 border-l pl-4 ml-2">
                        <LanguageSwitch currentLocale={locale} otherLocale={otherLocale} />
                        <ThemeToggle />
                    </div>
                </nav>
            </div>
        </header>
    );
}
