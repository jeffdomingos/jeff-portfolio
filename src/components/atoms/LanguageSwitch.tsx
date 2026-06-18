"use client";

import { usePathname, useRouter } from "next/navigation";


export function LanguageSwitch({
    currentLocale,
    otherLocale,
}: {
    currentLocale: string;
    otherLocale: string;
}) {
    const pathname = usePathname();
    const router = useRouter();

    const toggleLanguage = (targetLocale: string) => {
        if (!pathname || targetLocale === currentLocale) return;
        const newPath = pathname.replace(`/${currentLocale}`, `/${targetLocale}`);
        router.push(newPath, { scroll: false });
    };

    return (
        <div className="flex items-center gap-2 text-step--2">
            <button 
                onClick={() => toggleLanguage('pt')} 
                className={`transition-all ${currentLocale === 'pt' ? 'text-foreground font-bold' : 'text-foreground font-light hover:font-semibold'}`}
                aria-label="Português"
            >
                PT
            </button>
            <span className="text-foreground font-light">/</span>
            <button 
                onClick={() => toggleLanguage('en')} 
                className={`transition-all ${currentLocale === 'en' ? 'text-foreground font-bold' : 'text-foreground font-light hover:font-semibold'}`}
                aria-label="English"
            >
                EN
            </button>
        </div>
    );
}
