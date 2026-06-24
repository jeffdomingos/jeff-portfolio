"use client";

import { AvailabilitySection as AvailabilitySectionData } from "@/content/schema";
import { TerminalTitle } from "@/components/atoms/TerminalTitle";
import { InteractiveDeskSVG } from "@/components/atoms/InteractiveDeskSVG";

interface AvailabilitySectionProps {
    data: AvailabilitySectionData;
    locale: string;
}

import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, useSpring, useMotionValue, useInView } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function AvailabilityBlock({ 
    block, 
    index, 
    locale, 
    isActive, 
    onActivate 
}: { 
    block: any, 
    index: number, 
    locale: string,
    isActive: boolean,
    onActivate: () => void
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 95%", "start 40%"]
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <motion.div 
            ref={ref}
            style={{ opacity }}
            className={`w-full group transition-all duration-500 py-fluid-2xl flex flex-col justify-center relative cursor-pointer ${index === 1 ? 'pl-8 md:pl-16 lg:pl-32 xl:pl-48' : 'pr-8 md:pr-16 lg:pr-32 xl:pr-48'} ${isActive ? 'bg-transparent' : 'bg-transparent'}`}
            onClick={onActivate}
        >
            <div className={`z-10 w-full ${index === 1 ? 'text-right pr-fluid-m' : 'text-left pl-fluid-m'}`}>
                <h3 className={`inline-block text-step-4 font-heading font-semibold tracking-normal mt-2 leading-none whitespace-nowrap transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${!isActive ? (index === 1 ? 'translate-x-[75%] opacity-40' : '-translate-x-[75%] opacity-40') : 'translate-x-0 opacity-100'}`}>
                    {block.subtitle}
                </h3>
            </div>
            
            <div className={`overflow-hidden grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] w-full z-10 ${isActive ? 'grid-rows-[1fr] pointer-events-auto' : 'grid-rows-[0fr] pointer-events-none'}`}>
                <motion.div 
                    className={`flex flex-col w-full max-w-sm lg:max-w-md xl:max-w-lg ${index === 1 ? 'ml-auto items-end text-right pr-fluid-m' : 'mr-auto items-start text-left pl-fluid-m'}`}
                    variants={{
                        hidden: { opacity: 0, transition: { staggerChildren: 0.1, staggerDirection: -1 } },
                        show: { opacity: 1, transition: { staggerChildren: 0.35, delayChildren: 0.45 } }
                    }}
                    initial="hidden"
                    animate={isActive ? "show" : "hidden"}
                >
                    <motion.p 
                        variants={{
                            hidden: { opacity: 0, x: index === 1 ? '100%' : '-100%' },
                            show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
                        }}
                        className="text-step-0 text-foreground font-normal leading-relaxed pt-fluid-m"
                    >
                        {block.description}
                    </motion.p>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: index === 1 ? '100%' : '-100%' },
                            show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
                        }}
                    >
                        <Button asChild className="mt-fluid-m pointer-events-auto">
                            <Link href={`/${locale}/contact`}>
                                {locale === 'en' ? "Let's talk" : 'Vamos conversar'}
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export function AvailabilitySection({ data, locale }: AvailabilitySectionProps) {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    
    // Mouse scrubbing logic
    const rawMouseX = useMotionValue(0.5); // Starts in the middle
    const mouseXProgress = useSpring(rawMouseX, { stiffness: 100, damping: 20 });
    
    const leftOpacity = useTransform(mouseXProgress, [0, 0.25, 0.75, 1], [1, 1, 0, 0]);
    const rightOpacity = useTransform(mouseXProgress, [0, 0.25, 0.75, 1], [0, 0, 1, 1]);
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Scroll Hijack Tracking
    const hijackRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: hijackProgress } = useScroll({
        target: hijackRef,
        offset: ["start start", "end end"]
    });
    // Suavizador de Scroll (evita os "saltos" do mouse wheel)
    const smoothHijackProgress = useSpring(hijackProgress, { stiffness: 60, damping: 20, restDelta: 0.0001 });
    // Easing for dot scale so it shrinks nicely
    const dotScale = useTransform(smoothHijackProgress, [0, 0.8], [1, 0]);

    // Parallax da cabeça em pixels.
    // Usamos 5 estágios [0, 0.25, 0.5, 0.75, 1] para criar uma desaceleração.
    // Até 0.5, a cabeça tem muito parallax em relação ao corpo (começa +100px para baixo).
    // A partir de 0.5, ela praticamente imita a velocidade do corpo, tornando o parallax quase imperceptível.
    const yHead = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [100, 45, 0, -22, -45]);

    if (!data || !data.blocks || data.blocks.length === 0) return null;

    return (
        <>
        <section 
            ref={sectionRef}
            className="py-fluid-4xl border-t border-foreground w-full mb-[60vh] md:mb-[80vh] relative overflow-x-clip overflow-y-visible z-20"
            onMouseMove={(e) => {
                if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    let progress = (e.clientX - rect.left) / rect.width;
                    progress = Math.max(0, Math.min(1, progress));
                    
                    rawMouseX.set(progress);
                    setActiveIndex(progress < 0.5 ? 0 : 1);
                }
            }}
        >
            <TerminalTitle 
                as="h2"
                text={data.title}
                className="relative z-30 text-step-6 font-heading font-semibold tracking-normal mb-fluid-2xl uppercase px-fluid-m"
            />

            <div className="relative w-full">
                {/* Rosto Dinâmico Centralizado */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full max-w-[700px] lg:max-w-[900px] h-[115%] lg:h-[135%] z-0 pointer-events-none flex justify-center items-end">
                    {/* SVG Interativo - CAMADA DE TRÁS (Corpo) renderizado atrás do rosto */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <InteractiveDeskSVG layer="back" scrollYProgress={scrollYProgress} />
                    </div>

                    {/* GRUPO DA CABEÇA (Silhueta + Fotos) 
                        - style={{ y: yHead }} aplica o parallax e o offset inicial (mais para baixo)
                        - z-10 garante que fique entre o corpo (z-0) e a mesa (z-30) */}
                    <motion.div 
                        className="absolute inset-0 z-10 pointer-events-none"
                        style={{ y: yHead }}
                    >
                        {/* Silhueta Sólida (Renderizada ATRÁS dos rostos) */}
                        <div 
                            className="absolute inset-0 bg-black pointer-events-none z-10"
                            style={{
                                maskImage: `url(/images/RostoEsqu.png), url(/images/RostoDir.png)`,
                                WebkitMaskImage: `url(/images/RostoEsqu.png), url(/images/RostoDir.png)`,
                                maskSize: 'contain, contain',
                                WebkitMaskSize: 'contain, contain',
                                maskPosition: 'bottom center, bottom center',
                                WebkitMaskPosition: 'bottom center, bottom center',
                                maskRepeat: 'no-repeat, no-repeat',
                                WebkitMaskRepeat: 'no-repeat, no-repeat',
                            }}
                        />

                        {/* Left Face (Scrubbing) */}
                        <motion.img 
                            src="/images/RostoEsqu.png"
                            alt="Jefferson"
                            style={{ opacity: leftOpacity }}
                            className="absolute inset-0 w-full h-full object-contain object-bottom z-20"
                        />

                        {/* Right Face (Scrubbing) */}
                        <motion.img 
                            src="/images/RostoDir.png"
                            alt="Jefferson"
                            style={{ opacity: rightOpacity }}
                            className="absolute inset-0 w-full h-full object-contain object-bottom z-20"
                        />
                    </motion.div>

                    {/* SVG Interativo - CAMADA DA FRENTE (Mesa e Notebook) renderizados na frente do rosto */}
                    <div className="absolute inset-0 z-30 pointer-events-none">
                        <InteractiveDeskSVG layer="front" scrollYProgress={scrollYProgress} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 relative z-30 w-full min-h-[500px] lg:min-h-[600px]">
                    {data.blocks.map((block, i) => (
                        <AvailabilityBlock 
                            key={i} 
                            block={block} 
                            index={i} 
                            locale={locale} 
                            isActive={activeIndex === i}
                            onActivate={() => setActiveIndex(i)}
                        />
                    ))}
                </div>
            </div>

            {/* Overlay de Retícula ESTÁTICO GERAL cobrindo todo o espaço até o final do bloco preto */}
            <motion.div 
                className="absolute top-0 left-0 right-0 bg-halftone-mask pointer-events-none z-20" 
                style={{ bottom: '-400vh', '--dot-scale': dotScale } as any}
            />
        </section>

        {/* Scroll Hijack: Espaço de 300vh para permitir 200vh de scroll enquanto o preto está travado na tela */}
        <div ref={hijackRef} className="w-full h-[300vh] relative z-10">
            <div className="w-full h-[100vh] bg-foreground sticky top-0 flex items-center justify-center overflow-hidden">
                {/* Aqui a tela está preta, e a retícula por cima vai encolhendo os pontos transparentes até ficar sólida branca! */}
            </div>
        </div>
        </>
    );
}
