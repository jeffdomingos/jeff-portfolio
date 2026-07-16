"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export { Ref, Footnotes, FootnoteItem } from "./Footnotes";

export function MDXImage({ src, alt, invertInDark, lightBgInDark, cleanLayout, scrollingMockup }: { src: string; alt: string; invertInDark?: boolean; lightBgInDark?: boolean; cleanLayout?: boolean; scrollingMockup?: boolean }) {
    if (scrollingMockup) {
        return (
            <motion.figure 
                className="my-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="relative">
                    <div className="absolute top-3 left-3 w-full h-full bg-halftone z-0"></div>
                    <div className="relative z-10 flex flex-col w-full h-[300px] md:h-[400px] overflow-hidden border-2 border-foreground bg-background">
                        <div 
                            className="w-full h-full bg-cover bg-no-repeat animate-scroll-vertical"
                            style={{ backgroundImage: `url(${src})`, backgroundSize: '100% auto' }}
                            aria-label={alt || "Scrolling Mockup"}
                            role="img"
                        />
                    </div>
                </div>
                {alt && <figcaption className="text-center text-sm text-foreground font-light mt-6">{alt}</figcaption>}
            </motion.figure>
        );
    }

    if (cleanLayout) {
        return (
            <motion.figure 
                className="my-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={alt || "Illustration"} className="w-full h-auto block !m-0 rounded-lg" />
            </motion.figure>
        );
    }

    return (
        <motion.figure 
            className="my-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="relative">
                <div className="absolute top-3 left-3 w-full h-full bg-halftone z-0"></div>
                <div className="relative z-10 flex flex-col w-full overflow-hidden border-2 border-foreground bg-background">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={alt || "Illustration"} className="w-full h-auto block !m-0" />
                </div>
            </div>
            {alt && <figcaption className="text-center text-sm text-foreground font-light mt-6">{alt}</figcaption>}
        </motion.figure>
    );
}

export function Callout({ children, type = "info" }: { children: ReactNode; type?: "info" | "warning" }) {
    const isWarning = type === "warning";
    return (
        <div className="not-prose flex gap-3 items-start py-3 px-4 rounded-xl bg-muted/30 border border-border/50 text-sm md:text-base text-foreground/70 my-8">
            <div className="mt-0.5 shrink-0 opacity-40">
                {isWarning ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                )}
            </div>
            <div className="leading-relaxed [&>strong]:text-foreground [&>strong]:font-medium">
                {children}
            </div>
        </div>
    );
}

export function Quote({ children, author }: { children: ReactNode; author?: string }) {
    return (
        <blockquote className="border-l-4 border-foreground pl-4 italic my-8 text-lg text-heading">
            {children}
            {author && <footer className="text-sm mt-2 font-semibold not-italic text-foreground">— {author}</footer>}
        </blockquote>
    );
}

export function Metric({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col items-center justify-center p-6 bg-muted rounded-xl border border-border text-center my-6">
            <span className="text-4xl font-extrabold text-foreground tracking-tighter mb-1">{value}</span>
            <span className="text-sm uppercase tracking-widest text-subtle font-semibold">{label}</span>
        </div>
    );
}

export function VideoEmbed({ src, title }: { src: string; title?: string }) {
    const isDirectVideo = src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.gif');
    return (
        <motion.figure 
            className="my-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="relative">
                <div className="absolute top-3 left-3 w-full h-full bg-halftone z-0"></div>
                <div className="relative z-10 flex flex-col w-full overflow-hidden border-2 border-foreground bg-background">
                    {isDirectVideo ? (
                        <video src={src} title={title} controls className="w-full h-auto block !m-0" autoPlay muted loop playsInline />
                    ) : (
                        <div className="relative w-full overflow-hidden !m-0" style={{ paddingTop: '56.25%' }}>
                            <iframe src={src} title={title || "Video player"} className="absolute top-0 left-0 w-full h-full block !m-0" frameBorder="0" allowFullScreen />
                        </div>
                    )}
                </div>
            </div>
            {title && <figcaption className="text-center text-sm text-foreground font-light mt-6">{title}</figcaption>}
        </motion.figure>
    );
}

export function FigmaEmbed({ src, title }: { src: string; title?: string }) {
    return (
        <motion.figure 
            className="my-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="relative">
                <div className="absolute top-3 left-3 w-full h-full bg-halftone z-0"></div>
                <div className="relative z-10 flex w-full overflow-hidden border-2 border-foreground bg-background" style={{ height: '600px' }}>
                    <iframe 
                        src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(src)}&scaling=scale-down-width`} 
                        title={title || "Figma Prototype"} 
                        width="100%" 
                        height="100%" 
                        className="w-full h-full border-none block" 
                        allowFullScreen 
                    />
                </div>
            </div>
            {title && <figcaption className="text-center text-sm text-foreground font-light mt-6">{title}</figcaption>}
        </motion.figure>
    );
}

export { ProductTrioDiagram } from "./ProductTrioDiagram";


