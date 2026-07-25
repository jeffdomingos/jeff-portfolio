import { Toaster } from "@/components/ui/sonner";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { StudioHeader } from "@/components/organisms/StudioHeader";
import { StudioFooter } from "@/components/organisms/StudioFooter";

export default function StudioLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const otherLocale = locale === "pt" ? "en" : "pt";

    return (
        <SmoothScrollProvider>
            <div className="w-full min-h-[100svh] flex flex-col">
                <StudioHeader locale={locale} otherLocale={otherLocale} />

                <main id="main-content" className="flex-1 w-full min-w-0 overflow-x-clip outline-none" tabIndex={-1}>
                    {/* Global Mesh Layer */}
                    <div id="global-halftone" className="fixed inset-0 pointer-events-none bg-halftone-mask z-[30]" />
                    {children}
                </main>

                <StudioFooter locale={locale} />
                <Toaster richColors />
            </div>
        </SmoothScrollProvider>
    );
}
