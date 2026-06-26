"use client";

import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { Loader2 } from "lucide-react";
import { ResumeSkeleton } from "./ResumeSkeleton";

interface NativeDocsResumeProps {
    docId: string;
    loadingText?: string;
    containerClassName?: string;
    className?: string;
}

export function NativeDocsResume({ docId, loadingText = "Loading...", containerClassName = "", className = "" }: NativeDocsResumeProps) {
    const [htmlContent, setHtmlContent] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let isMounted = true;
        let t1: NodeJS.Timeout, t2: NodeJS.Timeout, t3: NodeJS.Timeout;

        async function fetchContent() {
            try {
                // We use our Next.js API route as a proxy to avoid CORS issues
                const response = await fetch(`/api/docs?id=${docId}`);
                if (!response.ok) throw new Error("Failed to fetch document");
                
                const html = await response.text();
                if (isMounted) {
                    setHtmlContent(html);
                    setIsLoading(false);
                    setProgress(100);
                }
            } catch (err) {
                console.error("Error fetching native doc:", err);
                if (isMounted) {
                    setError("Failed to load resume.");
                    setIsLoading(false);
                }
            }
        }

        if (isLoading) {
            setProgress(0);
            t1 = setTimeout(() => setProgress(30), 100);
            t2 = setTimeout(() => setProgress(60), 500);
            t3 = setTimeout(() => setProgress(85), 1500);
            fetchContent();
        }

        return () => {
            isMounted = false;
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [docId, isLoading]);

    return (
        <div className="w-full relative flex flex-col pt-fluid-xl pb-20 px-4 md:px-0">
            {/* Progress Bar anchored to the top edge of the outer container (flush with hero line) */}
            <div 
                className={`absolute top-0 left-0 h-1.5 md:h-2 bg-foreground z-20 transition-all ease-out ${isLoading ? 'opacity-100 duration-500' : 'opacity-0 duration-300'}`}
                style={{ width: `${progress}%` }}
            />

            {/* Inner container for the actual resume paper, with brutalist shadow */}
            <div className={`relative w-full max-w-[900px] mx-auto ${containerClassName}`}>
                <div className="absolute top-3 left-3 w-full h-full bg-halftone z-0 hidden md:block"></div>
                <div className={`relative z-10 w-full flex-grow block transition-opacity duration-300 border-2 border-foreground ${className}`}>
                {isLoading && (
                    <div className="w-full pointer-events-none">
                        <ResumeSkeleton />
                    </div>
                )}

                {error && (
                    <div className="w-full flex items-center justify-center p-8 text-destructive">
                        {error}
                    </div>
                )}

                {htmlContent && !isLoading && (
                    <div className={`
                        w-full 
                        prose 
                        max-w-none
                        prose-p:leading-relaxed 
                        prose-headings:font-heading 
                        prose-headings:text-black
                        prose-p:text-black
                        prose-strong:text-black
                        prose-li:text-black
                        prose-h1:text-step-4 
                        prose-h2:text-step-2
                        prose-a:text-black
                        prose-li:marker:text-black
                        animate-in fade-in duration-500
                    `}>
                        {parse(htmlContent)}
                    </div>
                )}
            </div>
            </div>
        </div>
    );
}
