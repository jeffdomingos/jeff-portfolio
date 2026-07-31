"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { m } from "framer-motion";

export { Ref, Footnotes, FootnoteItem } from "./Footnotes";

export function MDXImage({ src, alt, invertInDark, lightBgInDark, cleanLayout, scrollingMockup }: { src: string; alt: string; invertInDark?: boolean; lightBgInDark?: boolean; cleanLayout?: boolean; scrollingMockup?: boolean }) {
    if (scrollingMockup) {
        return (
            <m.figure 
                className="my-10"
                initial={{ opacity: 0, y: 40 }}
                 style={{ willChange: "transform, opacity", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: "some", margin: "-10% 0px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="relative">
                    <div className="absolute top-3 left-3 w-full h-full bg-halftone z-0"></div>
                    <div className="relative z-10 flex flex-col w-full h-[300px] md:h-[400px] overflow-hidden border-2 border-foreground bg-background">
                        <Image 
                            src={src}
                            alt={alt || "Scrolling Mockup"}
                            fill
                            className="object-cover object-top animate-scroll-vertical-image"
                        />
                    </div>
                </div>
                {alt && <figcaption className="text-center !text-[11px] text-foreground type-label !mt-8">{alt}</figcaption>}
            </m.figure>
        );
    }

    if (cleanLayout) {
        return (
            <m.figure 
                className="my-10"
                initial={{ opacity: 0, y: 40 }}
                 style={{ willChange: "transform, opacity", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: "some", margin: "-10% 0px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <Image 
                    src={src} 
                    alt={alt || "Illustration"} 
                    width={1920} 
                    height={1080} 
                    className="w-full h-auto block !m-0 rounded-lg" 
                />
            </m.figure>
        );
    }

    return (
        <m.figure 
            className="my-10"
            initial={{ opacity: 0, y: 40 }}
             style={{ willChange: "transform, opacity", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some", margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="relative">
                <div className="absolute top-3 left-3 w-full h-full bg-halftone z-0"></div>
                <div className="relative z-10 flex flex-col w-full overflow-hidden border-2 border-foreground bg-background">
                    <Image 
                        src={src} 
                        alt={alt || "Illustration"} 
                        width={1920} 
                        height={1080} 
                        className="w-full h-auto block !m-0" 
                    />
                </div>
            </div>
            {alt && <figcaption className="text-center !text-[11px] text-foreground type-label !mt-8">{alt}</figcaption>}
        </m.figure>
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
            <span className="text-step-4 type-display text-foreground mb-1">{value}</span>
            <span className="text-sm uppercase tracking-widest text-subtle font-semibold">{label}</span>
        </div>
    );
}

export function VideoEmbed({ src, title }: { src: string; title?: string }) {
    const isDirectVideo = src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.gif');
    return (
        <m.figure 
            className="my-10"
            initial={{ opacity: 0, y: 40 }}
             style={{ willChange: "transform, opacity", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some", margin: "-10% 0px" }}
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
            {title && <figcaption className="text-center !text-[11px] text-foreground type-label !mt-8">{title}</figcaption>}
        </m.figure>
    );
}

export function FigmaEmbed({ src, title }: { src: string; title?: string }) {
    return (
        <m.figure 
            className="my-10"
            initial={{ opacity: 0, y: 40 }}
             style={{ willChange: "transform, opacity", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some", margin: "-10% 0px" }}
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
            {title && <figcaption className="text-center !text-[11px] text-foreground type-label !mt-8">{title}</figcaption>}
        </m.figure>
    );
}

export { ProductTrioDiagram } from "./ProductTrioDiagram";

export function BeforeAfter({ before, after }: { before: any, after: any }) {
    return (
        <div className="flex flex-col md:flex-row w-full gap-8 my-10">
            <div className="flex-1 flex flex-col">
                {before.label && <div className="bg-muted text-foreground text-xs font-bold py-1 px-3 rounded w-fit mb-4 uppercase tracking-widest border border-border">{before.label}</div>}
                <div className="relative z-10 flex flex-col w-full overflow-hidden border-2 border-foreground bg-background rounded-lg shadow-sm">
                    <Image 
                        src={before.src} 
                        alt={before.label || "Antes"} 
                        width={1920} 
                        height={1080} 
                        className="w-full h-auto block !m-0" 
                    />
                </div>
                {before.bullets && (
                    <ul className="mt-4 list-disc pl-5 marker:text-foreground/50">
                        {before.bullets.map((b: string, i: number) => (
                            <li key={i} className="text-foreground text-[15px] leading-relaxed my-1 font-light">{b}</li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="flex-1 flex flex-col">
                {after.label && <div className="bg-foreground text-background text-xs font-bold py-1 px-3 rounded w-fit mb-4 uppercase tracking-widest">{after.label}</div>}
                <div className="relative z-10 flex flex-col w-full overflow-hidden border-2 border-foreground bg-background rounded-lg shadow-sm">
                    <Image 
                        src={after.src} 
                        alt={after.label || "Depois"} 
                        width={1920} 
                        height={1080} 
                        className="w-full h-auto block !m-0" 
                    />
                </div>
                {after.bullets && (
                    <ul className="mt-4 list-disc pl-5 marker:text-foreground/50">
                        {after.bullets.map((b: string, i: number) => (
                            <li key={i} className="text-foreground text-[15px] leading-relaxed my-1 font-light">{b}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
