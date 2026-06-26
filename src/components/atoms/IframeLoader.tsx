"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface IframeLoaderProps {
    src: string;
    className?: string;
    containerClassName?: string;
    title?: string;
    id?: string;
    loadingText?: string;
    skeleton?: React.ReactNode;
}

export function IframeLoader({ src, className, containerClassName = "", title, id, loadingText = "Loading...", skeleton }: IframeLoaderProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let t1: NodeJS.Timeout, t2: NodeJS.Timeout, t3: NodeJS.Timeout, t4: NodeJS.Timeout;
        if (isLoading) {
            setProgress(0);
            t1 = setTimeout(() => setProgress(30), 100);
            t2 = setTimeout(() => setProgress(60), 500);
            t3 = setTimeout(() => setProgress(85), 1500);
            
            // Safety fallback: if onLoad doesn't fire within a reasonable time 
            // (e.g., due to browser cache or React hydration race conditions), force complete.
            t4 = setTimeout(() => setIsLoading(false), 3500);
            
            return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
        } else {
            setProgress(100);
        }
    }, [isLoading]);

    return (
        <div className={`relative w-full h-full flex flex-col items-center justify-start ${containerClassName}`}>
            {/* Progress Bar anchored to the top edge of the container */}
            <div 
                className={`absolute top-0 left-0 h-1.5 md:h-2 bg-foreground z-20 transition-all ease-out ${isLoading ? 'opacity-100 duration-500' : 'opacity-0 duration-300'}`}
                style={{ width: `${progress}%` }}
            />

            {/* Inner Wrapper for Iframe and Skeleton (respects padding) */}
            <div className="relative w-full h-full block">
                {skeleton && (
                    <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none transition-opacity duration-300 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
                        {skeleton}
                    </div>
                )}

                <iframe
                    id={id}
                    src={src}
                    className={`${className} block w-full ${isLoading ? 'opacity-0' : 'opacity-100'} relative z-10 transition-opacity duration-300 ease-in-out`}
                    title={title}
                    onLoad={() => setIsLoading(false)}
                />
            </div>
        </div>
    );
}
