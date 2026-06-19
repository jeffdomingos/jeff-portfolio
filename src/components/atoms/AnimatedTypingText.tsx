"use client";

import React, { useState, useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export type TargetStyle = {
    text: string | RegExp;
    className: string;
};

export interface AnimatedTypingTextProps {
    text: string;
    mode?: 'auto' | 'scroll';
    animationType?: 'typing' | 'selection';
    defaultClassName?: string;
    targets?: TargetStyle[];
    
    // Auto Mode Props
    speed?: number; // ms per character (default 40)
    delay?: number; // ms before starting (default 800)
    onFinished?: () => void;
    
    // Scroll Mode Props
    scrollOffset?: any; // Framer motion offset (default ["start 95%", "start 40%"])
    
    // Element type
    as?: React.ElementType;
    className?: string;

    // Selection Props
    selectionClassName?: string;
}

export function AnimatedTypingText({
    text,
    mode = 'auto',
    animationType = 'typing',
    defaultClassName = '',
    targets = [],
    speed = 40,
    delay = 800,
    onFinished,
    scrollOffset = ["start 95%", "start 40%"],
    as: Component = "span",
    className = "",
    selectionClassName = "bg-foreground text-background transition-all duration-75"
}: AnimatedTypingTextProps) {
    const ref = useRef<HTMLElement>(null);
    const [count, setCount] = useState(0);
    const [typingState, setTypingState] = useState<'idle' | 'typing' | 'paused' | 'finished'>('idle');

    // Manter a referência mais recente de onFinished sem engatilhar re-render/reset
    const onFinishedRef = useRef(onFinished);
    useEffect(() => {
        onFinishedRef.current = onFinished;
    }, [onFinished]);

    // MODO AUTO
    useEffect(() => {
        if (mode !== 'auto') return;

        setCount(0);
        setTypingState('idle');

        let i = 0;
        let intervalId: NodeJS.Timeout;

        const startTyping = () => {
            setTypingState('typing');
            intervalId = setInterval(() => {
                i++;
                setCount(i);
                if (i >= text.length) {
                    clearInterval(intervalId);
                    setTypingState('finished');
                    if (onFinishedRef.current) onFinishedRef.current();
                }
            }, speed);
        };

        const timeoutId = setTimeout(startTyping, delay);

        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, [text, mode, speed, delay]); // onFinished removido daqui para não reiniciar a animação

    // MODO SCROLL
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: scrollOffset
    });
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (mode !== 'scroll') return;

        const newCount = Math.floor(latest * text.length);
        setCount(newCount);
        setTypingState('typing');

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            if (latest === 0) {
                setTypingState('idle');
            } else if (latest >= 0.99) {
                setTypingState('finished');
            } else {
                setTypingState('paused');
            }
        }, 150);
    });

    // TOKENIZATION (para estilos heterogêneos)
    const tokens: { text: string, className: string }[] = [];
    if (!targets || targets.length === 0) {
        tokens.push({ text, className: defaultClassName });
    } else {
        let matches: { start: number, end: number, className: string }[] = [];
        
        targets.forEach(target => {
            let regex: RegExp;
            if (typeof target.text === 'string') {
                regex = new RegExp(`(${target.text})`, 'gi');
            } else {
                // Ensure the global flag is present to prevent infinite loops in regex.exec
                const flags = target.text.flags.includes('g') ? target.text.flags : target.text.flags + 'g';
                regex = new RegExp(target.text.source, flags);
            }
            
            let match;
            while ((match = regex.exec(text)) !== null) {
                matches.push({
                    start: match.index,
                    end: match.index + match[0].length,
                    className: target.className
                });
                if (match[0].length === 0) regex.lastIndex++; 
            }
        });
        
        matches.sort((a, b) => a.start - b.start);
        
        let currentIndex = 0;
        matches.forEach(m => {
            if (m.start > currentIndex) {
                tokens.push({ text: text.substring(currentIndex, m.start), className: defaultClassName });
            }
            if (m.start >= currentIndex) {
                tokens.push({ text: text.substring(m.start, m.end), className: m.className });
                currentIndex = m.end;
            }
        });
        
        if (currentIndex < text.length) {
            tokens.push({ text: text.substring(currentIndex), className: defaultClassName });
        }
    }

    let globalIndex = 0;
    
    // Descobre qual é o índice da última letra visível que NÃO seja um espaço
    let lastVisibleNonSpaceIndex = -1;
    for (let i = count - 1; i >= 0; i--) {
        if (text[i] !== ' ') {
            lastVisibleNonSpaceIndex = i;
            break;
        }
    }

    const isBlinking = typingState !== 'typing';

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
            
            {tokens.map((token, tokenIdx) => {
                // Divide em palavras inteiras
                const words = token.text.split(/(\s+)/);
                
                return (
                    <span key={tokenIdx} className={token.className}>
                        {words.map((word, wordIdx) => {
                            if (!word) return null;

                            const wordStartIndex = globalIndex;
                            const wordEndIndex = globalIndex + word.length;
                            globalIndex += word.length;

                            const typedLength = Math.max(0, Math.min(word.length, count - wordStartIndex));
                            const typedStr = word.substring(0, typedLength);
                            const untypedStr = word.substring(typedLength);
                            
                            const wrapperClass = word.trim() === '' ? '' : 'whitespace-nowrap';

                            // --- MODO SELEÇÃO ---
                            if (animationType === 'selection') {
                                return (
                                    <span key={wordIdx} className={wrapperClass}>
                                        {typedStr && <span className={selectionClassName}>{typedStr}</span>}
                                        {untypedStr && <span>{untypedStr}</span>}
                                    </span>
                                );
                            }

                            // --- MODO TYPING ---
                            const isFirstWord = wordStartIndex === 0;
                            const showInitialCursor = count === 0 && isFirstWord;
                            const hasCursorAfter = count > 0 && lastVisibleNonSpaceIndex >= wordStartIndex && lastVisibleNonSpaceIndex < wordEndIndex;

                            if (showInitialCursor) {
                                return (
                                    <span key={wordIdx} className={wrapperClass}>
                                        <span 
                                            className={`inline-block align-baseline bg-current w-[4px] mr-[-4px] ${isBlinking ? 'animate-hard-blink' : ''}`}
                                            style={{ height: '0.85em' }}
                                        />
                                        <span className="opacity-0">{word}</span>
                                    </span>
                                );
                            }

                            if (hasCursorAfter) {
                                return (
                                    <span key={wordIdx} className={wrapperClass}>
                                        {typedStr && <span className="opacity-100">{typedStr}</span>}
                                        <span 
                                            className={`inline-block align-baseline bg-current w-[4px] mr-[-4px] ${isBlinking ? 'animate-hard-blink' : ''}`}
                                            style={{ height: '0.85em' }}
                                        />
                                        {untypedStr && <span className="opacity-0">{untypedStr}</span>}
                                    </span>
                                );
                            }

                            return (
                                <span key={wordIdx} className={wrapperClass}>
                                    {typedStr && <span className="opacity-100">{typedStr}</span>}
                                    {untypedStr && <span className="opacity-0">{untypedStr}</span>}
                                </span>
                            );
                        })}
                    </span>
                );
            })}
        </Component>
    );
}
