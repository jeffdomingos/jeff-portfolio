import Image from "next/image";

export { AnimatedTypingText } from "./AnimatedTypingText";
export { IframeLoader } from "./IframeLoader";
export { ResumeSkeleton } from "./ResumeSkeleton";

export function Button({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <a href={href} className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-gray-800 transition" {...props}>
            {children}
        </a>
    );
}

export function ImagePlaceholder({ src, alt }: { src: string, alt: string }) {
    return (
        <div className="relative bg-gray-200 flex items-center justify-center w-full h-full text-gray-400 overflow-hidden">
            {src === '/images/placeholder.png' ? <span>[ Image Placeholder ]</span> : <Image src={src} alt={alt} fill={true} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />}
        </div>
    );
}
