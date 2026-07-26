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
    
    // Para modo selection, mantemos o React State, pois é mais simples e menos usado em scroll intenso
    const [selectionCount, setSelectionCount] = useState(0);

    // Refs para a mutação Vanilla JS
    const countRef = useRef(0);
    const charsRef = useRef<HTMLElement[]>([]);
    const cursorsRef = useRef<HTMLElement[]>([]);
    const blinkTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const onFinishedRef = useRef(onFinished);
    useEffect(() => {
        onFinishedRef.current = onFinished;
    }, [onFinished]);

    // Coleta as referências dos nós DOM após a montagem
    useEffect(() => {
        if (!ref.current || animationType === 'selection') return;
        charsRef.current = Array.from(ref.current.querySelectorAll('.type-char'));
        cursorsRef.current = Array.from(ref.current.querySelectorAll('.type-cursor'));
        
        // Garante que o estado inicial do DOM reflete count=0
        renderFrame(0, true);
    }, [text, animationType]);

    // Função de mutação direta no DOM (O(delta))
    const renderFrame = (newCount: number, force = false) => {
        const current = countRef.current;
        if (newCount === current && !force) return;
        
        const chars = charsRef.current;
        const cursors = cursorsRef.current;

        // Helper para achar a posição correta do cursor (ignora espaços)
        const getCursorIndex = (c: number) => {
            if (c === 0) return 0;
            let lastVisible = -1;
            for (let i = c - 1; i >= 0; i--) {
                if (text[i] !== ' ') { lastVisible = i; break; }
            }
            return lastVisible + 1;
        };

        const oldCursorIndex = getCursorIndex(current);
        const newCursorIndex = getCursorIndex(newCount);

        // Atualiza a visibilidade do cursor
        if (oldCursorIndex !== newCursorIndex || force) {
            if (cursors[oldCursorIndex]) cursors[oldCursorIndex].style.opacity = '0';
            if (cursors[newCursorIndex]) cursors[newCursorIndex].style.opacity = '1';
        }

        // Lógica de piscar (pausa enquanto digita)
        if (cursors[newCursorIndex]) {
            const cursorLine = cursors[newCursorIndex].querySelector('.cursor-line');
            if (cursorLine) cursorLine.classList.remove('animate-hard-blink');
        }

        if (blinkTimeoutRef.current) clearTimeout(blinkTimeoutRef.current);
        blinkTimeoutRef.current = setTimeout(() => {
            const activeIndex = getCursorIndex(countRef.current);
            if (cursors[activeIndex]) {
                const cursorLine = cursors[activeIndex].querySelector('.cursor-line');
                if (cursorLine) cursorLine.classList.add('animate-hard-blink');
            }
        }, 150);

        // Atualiza os caracteres individualmente (apenas os que mudaram)
        if (force) {
            for (let i = 0; i < chars.length; i++) {
                if (chars[i]) chars[i].style.opacity = i < newCount ? '1' : '0';
            }
        } else if (newCount > current) {
            for (let i = current; i < newCount; i++) {
                if (chars[i]) chars[i].style.opacity = '1';
            }
        } else {
            for (let i = current - 1; i >= newCount; i--) {
                if (chars[i]) chars[i].style.opacity = '0';
            }
        }
        
        countRef.current = newCount;
    };

    // MODO AUTO
    useEffect(() => {
        if (mode !== 'auto') return;
        if (isLoadingPhase) return;

        if (animationType === 'selection') setSelectionCount(0);
        else renderFrame(0, true);

        let i = 0;
        let intervalId: NodeJS.Timeout;

        const startTyping = () => {
            intervalId = setInterval(() => {
                i++;
                if (animationType === 'selection') {
                    setSelectionCount(i);
                } else {
                    renderFrame(i);
                }
                
                if (i >= text.length) {
                    clearInterval(intervalId);
                    if (onFinishedRef.current) onFinishedRef.current();
                }
            }, speed);
        };

        const timeoutId = setTimeout(startTyping, 0);

        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, [text, mode, speed, delay, isLoadingPhase, animationType]);

    // MODO SCROLL
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: scrollOffset
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (mode !== 'scroll') return;
        const newCount = Math.floor(latest * text.length);
        
        if (animationType === 'selection') {
            setSelectionCount(newCount);
        } else {
            renderFrame(newCount);
        }
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
            
            {animationType === 'typing' && (
                <span 
                    className="type-cursor relative inline-block w-0 h-0 overflow-visible align-baseline"
                    style={{ opacity: 1 }}
                >
                    <span className="cursor-line absolute left-0 bottom-[-0.1em] bg-current w-[4px] animate-hard-blink" style={{ height: '0.85em' }} />
                    {isLoadingPhase && loadingProgress !== undefined && (
                        <span className="absolute left-[12px] bottom-[-0.1em] h-[0.85em] flex items-center whitespace-nowrap text-step--2 md:text-step--1 opacity-100 text-black font-normal tracking-widest">
                            {loadingProgress.toString().padStart(2, '0')}%
                        </span>
                    )}
                </span>
            )}
            
            {tokens.map((token, tokenIdx) => {
                const words = token.text.split(/(\s+)/);
                
                return (
                    <span key={tokenIdx} className={token.className}>
                        {words.map((word, wordIdx) => {
                            if (!word) return null;

                            const wordStartIndex = globalIndex;
                            globalIndex += word.length;
                            const wrapperClass = word.trim() === '' ? '' : 'whitespace-nowrap';

                            // --- MODO SELEÇÃO (Usa React State) ---
                            if (animationType === 'selection') {
                                const typedLength = Math.max(0, Math.min(word.length, selectionCount - wordStartIndex));
                                const typedStr = word.substring(0, typedLength);
                                const untypedStr = word.substring(typedLength);

                                return (
                                    <span key={wordIdx} className={wrapperClass}>
                                        {typedStr && <span className={selectionClassName}>{typedStr}</span>}
                                        {untypedStr && <span>{untypedStr}</span>}
                                    </span>
                                );
                            }

                            // --- MODO TYPING (Usa Vanilla JS DOM Mutations) ---
                            return (
                                <span key={wordIdx} className={wrapperClass}>
                                    {word.split('').map((char, charIdx) => {
                                        return (
                                            <span key={charIdx}>
                                                <span 
                                                    className="type-char"
                                                    style={{ opacity: 0, willChange: "opacity, transform", transform: "translateZ(0)" }}
                                                >
                                                    {char}
                                                </span>
                                                <span 
                                                    className="type-cursor relative inline-block w-0 h-0 overflow-visible align-baseline"
                                                    style={{ opacity: 0 }}
                                                >
                                                    <span className="cursor-line absolute left-0 bottom-[-0.1em] bg-current w-[4px] animate-hard-blink" style={{ height: '0.85em' }} />
                                                </span>
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
