export function Button({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <a href={href} className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-gray-800 transition" {...props}>
            {children}
        </a>
    );
}

export function ImagePlaceholder({ src, alt }: { src: string, alt: string }) {
    return (
        <div className="bg-gray-200 flex items-center justify-center w-full h-full text-gray-400">
            {src === '/images/placeholder.png' ? <span>[ Image Placeholder ]</span> : <img src={src} alt={alt} className="object-cover w-full h-full" />}
        </div>
    );
}
