import { getGlobalContent } from "@/utils/content";
import { Header, Footer } from "@/components/organisms";
import { Toaster } from "@/components/ui/sonner";

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
        <div className="min-h-screen flex flex-col">
            <Header data={global.header} locale={locale} otherLocale={otherLocale} />

            <main id="main-content" className="flex-1 pt-16 outline-none" tabIndex={-1}>
                {children}
            </main>

            <Footer data={global.footer} />
            <Toaster richColors />
        </div>
    );
}
