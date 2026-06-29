"use client";

import { GlobalFooter } from "@/content/schema";
import { FooterAnimatedLogo } from "./FooterAnimatedLogo";
import { useMotionValue, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { ChevronUp } from "lucide-react";

export function Footer({ data }: { data: GlobalFooter }) {
    const params = useParams();
    const locale = params?.locale === 'en' ? 'en' : 'pt';
    
    const scrollToTop = () => {
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const [frozenHeight, setFrozenHeight] = useState<string | undefined>(undefined);
    const [isIdle, setIsIdle] = useState(true);
    const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

    const resetIdleTimer = () => {
        setIsIdle(false);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => {
            setIsIdle(true);
        }, 2500); // 2.5s sem mexer = volta a animar
    };

    useEffect(() => {
        // Congela a altura no mobile em pixels físicos absolutos (+ folga de segurança)
        // Isso força o motor do Safari a tratar o Footer como um bloco estático imutável, IGNORANDO 100% a barra de endereços!
        if (window.innerWidth < 1024) {
            setFrozenHeight(`${window.innerHeight + 120}px`);
        }
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        resetIdleTimer();
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = (e.clientX - centerX) / (rect.width / 2);
        const y = (e.clientY - centerY) / (rect.height / 2);
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        // Quando o mouse sai do footer, ele volta ao centro imediatamente e consideramos inativo para a animação assumir
        mouseX.set(0);
        mouseY.set(0);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        setIsIdle(true);
    };

    return (
        <footer 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={frozenHeight ? { minHeight: frozenHeight } : undefined}
            className="w-full text-foreground mt-auto relative overflow-clip min-h-[100svh] flex flex-col"
        >
            {/* Máscara absoluta (não-sticky) para evitar pulos no Safari iOS */}
            <div 
                className="absolute top-0 left-0 w-full h-[8rem] pointer-events-none z-40 bg-background"
                style={{ 
                    WebkitMaskImage: 'linear-gradient(to bottom, black 10%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, black 10%, transparent 100%)'
                }}
            />
            
            <div className="pt-12 lg:pt-fluid-xl pb-6 lg:pb-fluid-m px-fluid-xs md:px-fluid-m flex flex-col flex-1">
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col justify-center py-6 lg:py-fluid-l">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-fluid-xl items-center">
                    {/* Brand / Logo Area - Mantido em z-0 para ficar ATRÁS da malha z-10 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col justify-between lg:col-span-7 w-full lg:w-full mx-auto relative z-0 mt-12 lg:mt-0"
                    >
                        <FooterAnimatedLogo mouseX={mouseX} mouseY={mouseY} isIdle={isIdle} />
                    </motion.div>

                {/* Contact Links */}
                <motion.div 
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-10% 0px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
                    }}
                    className="flex flex-col items-start gap-6 lg:gap-fluid-m lg:col-span-5 lg:col-start-8 mt-8 lg:mt-0 relative z-50"
                >
                    <motion.a 
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                        }}
                        href={`mailto:${data.emailValue}`} 
                        className="group inline-flex flex-col relative"
                    >
                        <span className="text-step--2 type-label text-foreground/70 mb-1">{data.emailLabel}</span>
                        <span className="text-step-1 md:text-step-2 font-bold text-foreground flex items-center gap-4 relative">
                            <span className="relative">
                                {data.emailValue}
                                <span className="absolute -bottom-1 left-0 w-full h-px bg-current scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left"></span>
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </span>
                    </motion.a>
                    
                    <motion.a 
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                        }}
                        href="https://linkedin.com/in/jeffdomingos" target="_blank" rel="noopener noreferrer" className="group inline-flex flex-col relative"
                    >
                        <span className="text-step--2 type-label text-foreground/70 mb-1">{data.linkedinLabel}</span>
                        <span className="text-step-1 md:text-step-2 font-bold text-foreground flex items-center gap-4 relative">
                            <span className="relative">
                                {data.linkedinValue}
                                <span className="absolute -bottom-1 left-0 w-full h-px bg-current scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left"></span>
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </span>
                    </motion.a>

                    <motion.a 
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                        }}
                        href="https://api.whatsapp.com/send/?phone=5521999374516" target="_blank" rel="noopener noreferrer" className="group inline-flex flex-col relative"
                    >
                        <span className="text-step--2 type-label text-foreground/70 mb-1">{data.whatsappLabel}</span>
                        <span className="text-step-1 md:text-step-2 font-bold text-foreground flex items-center gap-4 relative">
                            <span className="relative">
                                {data.whatsappValue}
                                <span className="absolute -bottom-1 left-0 w-full h-px bg-current scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left"></span>
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                        </span>
                    </motion.a>

                    <motion.a 
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                        }}
                        href="https://www.instagram.com/jeffdomingos.design/" target="_blank" rel="noopener noreferrer" className="group inline-flex flex-col relative"
                    >
                        <span className="text-step--2 type-label text-foreground/70 mb-1">Instagram</span>
                        <span className="text-step-1 md:text-step-2 font-bold text-foreground flex items-center gap-4 relative">
                            <span className="relative">
                                @jeffdomingos.design
                                <span className="absolute -bottom-1 left-0 w-full h-px bg-current scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left"></span>
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </span>
                    </motion.a>
                </motion.div>
                </div>
            </div>

                {/* Bottom Row */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                    className="pt-4 lg:pt-fluid-s mt-auto border-t border-foreground/10 flex flex-row items-center justify-between text-step--2 md:text-step--1 font-light relative z-50 w-full"
                >
                    <p className="shrink-0">{data.copyrightText}</p>
                    <button 
                        onClick={scrollToTop} 
                        className="transition-all type-label text-step--2 hover:font-bold flex items-center gap-2 group focus:outline-none"
                    >
                        {locale === 'en' ? 'Back to top' : 'Voltar ao topo'}
                        <ChevronUp className="w-4 h-4 transition-transform ml-2" strokeWidth={2} />
                    </button>
                </motion.div>
            </div>
        </footer>
    );
}
