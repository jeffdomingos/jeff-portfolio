import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
    weight: ["300", "400", "500", "600", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    variable: "--font-barlow",
});

const barlowCondensed = Barlow_Condensed({
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    variable: "--font-barlow-condensed",
});

export const metadata = {
    title: "Jeff Domingos Portfolio",
    description: "Senior Product Designer",
};

import { PostHogProvider } from "@/components/PostHogProvider";
import PostHogPageView from "@/components/PostHogPageView";
import { Suspense } from "react";
import { ViewTransitions } from "next-view-transitions";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ViewTransitions>
            <html lang="en" suppressHydrationWarning className={`${barlow.variable} ${barlowCondensed.variable}`}>
                <head>
                    <script dangerouslySetInnerHTML={{ __html: `if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; } window.scrollTo(0, 0); window.addEventListener('DOMContentLoaded', function() { window.scrollTo(0, 0); }); window.addEventListener('load', function() { window.scrollTo(0, 0); }); const p = window.location.pathname; if (p === '/' || p === '/en' || p === '/pt' || p === '/en/' || p === '/pt/') { document.documentElement.classList.add('is-loading'); }` }} />
                </head>
                <body>
                    <PostHogProvider>
                        <Suspense fallback={null}>
                            <PostHogPageView />
                        </Suspense>
                        {children}
                    </PostHogProvider>
                </body>
            </html>
        </ViewTransitions>
    );
}
