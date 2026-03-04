"use client";

import { usePathname, useRouter } from "next/navigation";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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

    const isEnglish = currentLocale === "en";

    return (
        <ToggleGroup type="single" value={currentLocale} onValueChange={(value) => { if (value) toggleLanguage(value) }} className="bg-muted p-1 rounded-full border">
            <ToggleGroupItem value="pt" aria-label="Português" className="rounded-full px-3 h-8 text-xs font-semibold data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm transition-all">
                🇧🇷 PT
            </ToggleGroupItem>
            <ToggleGroupItem value="en" aria-label="English" className="rounded-full px-3 h-8 text-xs font-semibold data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm transition-all">
                🇬🇧 EN
            </ToggleGroupItem>
        </ToggleGroup>
    );
}
