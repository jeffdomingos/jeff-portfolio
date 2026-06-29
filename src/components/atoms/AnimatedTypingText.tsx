"use client";

import React, { useState, useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useLenis } from 'lenis/react';

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
    delay?: number; // delay before starting (default 800)
    onFinished?: () => void;
    isLoadingPhase?: boolean; // Se verdadeiro, exibe porcentagem de load e impede início
    loadingProgress?: number; // Porcentagem para exibir

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
    isLoadingPhase = false,
    loadingProgress = 0,
    scrollOffset = ["start end", "end start"],
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
        if (isLoadingPhase) return;

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

        const effectiveDelay = isLoadingPhase ? 0 : delay; // If we wait for loading, we start immediately after. Wait! We need to check if we WERE in loading phase.
        // Se isLoadingPhase acabou de virar false e antes era true, o effect roda e effectiveDelay seria bom ser 0.
        // Como o effect re-roda quando isLoadingPhase muda, se for false ele executa. 
        // Vamos apenas usar 0 delay. Ou o original delay.
        // Vamos usar 0 delay se ele foi acionado apó o loading (ou seja, se delay é passado mas isLoadingPhase é a dependência, 
        // na real se renderiza a tela com loading, delay = 0 depois. Mas pode ser que queira zero mesmo.
        const timeoutId = setTimeout(startTyping, 0); // Sempre inicia instantâneo pq o delay real é o load.

        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, [text, mode, speed, delay, isLoadingPhase]);

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
        <Component ref={ref} className={`${className || ''} pr-2`}>
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
                            return (
                                <span key={wordIdx} className={wrapperClass}>
                                    {word.split('').map((char, charIdx) => {
                                        const charGlobalIdx = wordStartIndex + charIdx;
                                        const isCharTyped = charGlobalIdx < count;
                                        const showCursorBefore = count === 0 && charGlobalIdx === 0;
                                        const showCursorAfter = count > 0 && charGlobalIdx === lastVisibleNonSpaceIndex;

                                        return (
                                            <span key={charIdx}>
                                                {showCursorBefore && (
                                                    <span className="relative inline-block w-0 h-0 overflow-visible align-baseline">
                                                        <span className={`absolute left-0 bottom-[-0.1em] bg-current w-[4px] ${isBlinking ? 'animate-hard-blink' : ''}`} style={{ height: '0.85em' }} />
                                                        {isLoadingPhase && loadingProgress !== undefined && (
                                                            <span className="absolute left-[12px] bottom-[-0.1em] h-[0.85em] flex items-center whitespace-nowrap text-step--2 md:text-step--1 type-body opacity-100 text-black font-normal tracking-widest">
                                                                {loadingProgress.toString().padStart(2, '0')}%
                                                            </span>
                                                        )}
                                                    </span>
                                                )}
                                                <span className={isCharTyped ? 'opacity-100' : 'opacity-0'}>{char}</span>
                                                {showCursorAfter && (
                                                    <span className="relative inline-block w-0 h-0 overflow-visible align-baseline">
                                                        <span className={`absolute left-0 bottom-[-0.1em] bg-current w-[4px] ${isBlinking ? 'animate-hard-blink' : ''}`} style={{ height: '0.85em' }} />
                                                    </span>
                                                )}
                                            </span>
                                        );
                                    })}
                                </span>
                            );
                        })}
                    </span>
                );
            })}
        </Component>
    );
}
