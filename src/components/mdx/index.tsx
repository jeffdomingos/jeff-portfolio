import { ReactNode } from "react";
import Image from "next/image";

export function MDXImage({ src, alt, invertInDark, lightBgInDark }: { src: string; alt: string; invertInDark?: boolean; lightBgInDark?: boolean }) {
    return (
        <figure className="my-10">
            <div className="relative">
                <div className="absolute top-3 left-3 w-full h-full bg-halftone z-0"></div>
                <div className="relative z-10 flex flex-col w-full overflow-hidden border-2 border-foreground bg-background">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={alt || "Illustration"} className="w-full h-auto block !m-0" />
                </div>
            </div>
            {alt && <figcaption className="text-center text-sm text-foreground font-light mt-6">{alt}</figcaption>}
        </figure>
    );
}

export function Callout({ children, type = "info" }: { children: ReactNode; type?: "info" | "warning" }) {
    const bg = type === "warning" ? "bg-amber-50 border-amber-200" : "bg-muted border-border";
    return (
        <div className={`p-4 rounded-lg border-l-4 ${bg} my-6`}>
            {children}
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
        <figure className="my-10">
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
        </figure>
    );
}

export function FigmaEmbed({ src, title }: { src: string; title?: string }) {
    return (
        <figure className="my-10">
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
        </figure>
    );
}

// Map the components to be injected in MDXRemote
export const mdxComponents = {
    Image: MDXImage,
    Callout,
    Quote,
    Metric,
    VideoEmbed,
    FigmaEmbed,
    h2: (props: any) => <h2 className="text-3xl font-bold mt-12 mb-6 text-heading" {...props} />,
    p: (props: any) => <p className="text-lg text-foreground/90 leading-relaxed mb-6" {...props} />,
    a: (props: any) => <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
};
