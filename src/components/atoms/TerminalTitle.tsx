"use client";

import React, { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export function TerminalTitle({ 
    text, 
    className = "", 
    as: Component = "h2",
    typingSpeed = 40,
    delay = 300
}: { 
    text: string, 
    className?: string,
    as?: any,
    typingSpeed?: number,
    delay?: number
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "10000px 0px 0px 0px", once: false });
    
    const [visibleCount, setVisibleCount] = useState(0);
    const [typingState, setTypingState] = useState<'idle' | 'typing' | 'finished'>('idle');

    useEffect(() => {
        if (!isInView) {
            setVisibleCount(0);
            setTypingState('idle');
            return;
        }

        let i = 0;
        let intervalId: NodeJS.Timeout;

        const startTyping = () => {
            setTypingState('typing');
            intervalId = setInterval(() => {
                i++;
                setVisibleCount(i);
                if (i >= text.length) {
                    clearInterval(intervalId);
                    setTypingState('finished');
                }
            }, typingSpeed);
        };

        const timeoutId = setTimeout(startTyping, delay);

        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, [isInView, text, typingSpeed, delay]);

    const chars = text.split('');
    let globalIndex = 0;

    const renderedChars = chars.map((char, charIdx) => {
        const isVisible = globalIndex < visibleCount;
        const isLastVisible = globalIndex === visibleCount - 1;
        const isFirstChar = globalIndex === 0;
        
        const showCursorBefore = visibleCount === 0 && isFirstChar;
        const showCursorAfter = isLastVisible || (visibleCount >= text.length && charIdx === chars.length - 1);
        
        const isBlinking = typingState !== 'typing';

        globalIndex++;
        return (
            <span key={charIdx} className={`relative ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {showCursorBefore && (
                    <span className="absolute left-0 top-[0.05em] opacity-100">
                        <span className={`block w-[4px] h-[1em] bg-current ${isBlinking ? 'animate-hard-blink' : ''}`} />
                    </span>
                )}
                {char}
                <span className={`absolute left-full ml-[1px] top-[0.05em] ${showCursorAfter ? 'opacity-100' : 'opacity-0'}`}>
                    <span className={`block w-[4px] h-[1em] bg-current ${isBlinking ? 'animate-hard-blink' : ''}`} />
                </span>
            </span>
        );
    });

    return (
        <Component ref={ref} className={className}>
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes hard-blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                .animate-hard-blink {
                    animation: hard-blink 1s step-end infinite;
                }
            `}} />
            {renderedChars}
        </Component>
    );
}
