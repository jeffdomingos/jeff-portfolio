import React from 'react';

export function BoldReserver({ text, className = "" }: { text: string; className?: string }) {
    return (
        <span
            data-text={text}
            className={`inline-flex flex-col items-center justify-center after:content-[attr(data-text)] after:font-bold after:h-0 after:invisible after:overflow-hidden after:pointer-events-none after:select-none ${className}`}
        >
            <span className="w-full text-center block leading-none">{text}</span>
        </span>
    );
}
