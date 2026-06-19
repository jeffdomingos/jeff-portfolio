import Link from "next/link";
import { GlobalHeader } from "@/content/schema";
import { LanguageSwitch } from "@/components/atoms/LanguageSwitch";

export function Header({ data, locale, otherLocale }: { data: GlobalHeader, locale: string, otherLocale: string }) {
    return (
        <header className="fixed top-0 w-full z-50 pointer-events-none mix-blend-difference text-white">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md font-bold z-[60] shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 pointer-events-auto">
                Skip to Content
            </a>
            
            <div className="w-full px-fluid-m h-14 flex items-center justify-between relative">
                <Link href={`/${locale}`} className="flex items-center pointer-events-auto">
                    <img src="/images/logo-header-horiz.svg" alt={data.brandName} className="h-8 w-auto object-contain invert" />
                    <span className="sr-only">{data.brandName}</span>
                </Link>
                <nav className="flex items-center gap-fluid-m text-current text-step--2 uppercase tracking-widest font-medium pointer-events-auto">
                    <Link href={`/${locale}`} className="font-light hover:font-bold transition-all relative group">
                        {data.navItemHome}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-current group-hover:w-full transition-all duration-300"></span>
                    </Link>
                    <Link href={`/${locale}/resume`} className="font-light hover:font-bold transition-all relative group">
                        {data.navItemResume}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-current group-hover:w-full transition-all duration-300"></span>
                    </Link>
                    <Link href={`/${locale}/contact`} className="font-light hover:font-bold transition-all relative group">
                        {data.navItemContact}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-current group-hover:w-full transition-all duration-300"></span>
                    </Link>
                    <div className="flex items-center gap-4 border-l border-current pl-fluid-m ml-2">
                        <LanguageSwitch currentLocale={locale} otherLocale={otherLocale} />
                    </div>
                </nav>
            </div>
        </header>
    );
}
