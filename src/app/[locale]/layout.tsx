import { getGlobalContent } from "@/utils/content";
import { Header, Footer } from "@/components/organisms";
import { Toaster } from "@/components/ui/sonner";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

import { InspectorCursor } from "@/components/organisms/InspectorCursor";

export default function LocaleLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const global = getGlobalContent(locale);
    const otherLocale = locale === "pt" ? "en" : "pt";

    return (
        <SmoothScrollProvider>
            <div className="w-full min-h-[100svh] flex flex-col">
                <Header data={global.header} locale={locale} otherLocale={otherLocale} />

                <main id="main-content" className="flex-1 w-full min-w-0 overflow-x-clip outline-none" tabIndex={-1}>
                    {/* Global Mesh Layer */}
                    <div id="global-halftone" className="fixed inset-0 pointer-events-none bg-halftone-mask z-[30]" />
                    {children}
                </main>

                <Footer data={global.footer} />
                <Toaster richColors />
                <InspectorCursor />
            </div>
        </SmoothScrollProvider>
    );
}
