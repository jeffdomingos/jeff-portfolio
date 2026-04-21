import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
});

export const metadata = {
    title: "Jeff Domingos Portfolio",
    description: "Senior Product Designer",
};

import { PostHogProvider } from "@/components/PostHogProvider";
import PostHogPageView from "@/components/PostHogPageView";
import { Suspense } from "react";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning className={montserrat.variable}>
            <body>
                <PostHogProvider>
                    <Suspense fallback={null}>
                        <PostHogPageView />
                    </Suspense>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </PostHogProvider>
            </body>
        </html>
    );
}
