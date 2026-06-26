"use client";

import { TestimonialsSection as TestimonialsSectionData } from "@/content/schema";
import * as motion from "framer-motion/client";
import Image from "next/image";
import { TerminalTitle } from "@/components/atoms/TerminalTitle";

interface TestimonialsSectionProps {
    data: TestimonialsSectionData;
}

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

function TestimonialRow({ item, index, isLast }: { item: any, index: number, isLast: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    // 1. Acende quando o TOPO cruza a linha de 55% a 45% da tela
    const { scrollYProgress: brightenProgress } = useScroll({
        target: ref,
        offset: ["start 55%", "start 45%"]
    });

    // 2. Apaga quando a BASE cruza a mesma linha de 55% a 45% da tela.
    // Como a BASE do atual é o TOPO do próximo, o atual apaga EXATAMENTE 
    // na mesma proporção geométrica que o próximo acende! Um crossfade matematicamente perfeito.
    const { scrollYProgress: darkenProgress } = useScroll({
        target: ref,
        offset: ["end 55%", "end 45%"]
    });

    // 3. Expande quando o TOPO cruza a linha de 45% a 35%. 
    // Usamos o TOPO (start) para ancorar, porque o elemento cresce para baixo.
    // Mudamos para 75% -> 60% para que no mobile a expansão ocorra enquanto o card inteiro ainda está visível.
    const { scrollYProgress: expandProgress } = useScroll({
        target: ref,
        offset: ["start 75%", "start 60%"]
    });

    // Combinamos a luz e a sombra
    const rowOpacity = useTransform(
        [brightenProgress, darkenProgress],
        ([b, d]: any[]) => {
            if (isLast) return 0.3 + (0.7 * b);
            return 0.3 + (0.7 * b) - (0.7 * d);
        }
    );
    
    // Expansão atrelada estritamente ao progresso de expansão ancorado no topo
    const gridRows = useTransform(expandProgress, [0, 1], ["0fr", "1fr"]);
    const detailsOpacity = useTransform(expandProgress, [0, 1], [0, 1]);

    return (
        <motion.div 
            ref={ref}
            style={{ opacity: rowOpacity }}
            className="py-fluid-xl flex flex-col border-b border-background last:border-b-0 relative overflow-hidden transition-colors"
        >
            <div className="flex flex-col lg:flex-row gap-fluid-xl lg:items-start justify-between w-full relative z-10 px-fluid-m">
                {/* Avatar and Info */}
                <div className="flex items-center gap-fluid-m w-full lg:w-1/4 shrink-0">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-background/10 relative shrink-0">
                        {item.avatarUrl && (
                            <Image src={item.avatarUrl} alt={item.author} fill sizes="64px" className="object-cover grayscale contrast-125" />
                        )}
                    </div>
                    <div>
                        <p className="font-bold text-step-0 text-background">{item.author}</p>
                        <p className="text-step--1 font-light">{item.role}</p>
                    </div>
                </div>
                
                {/* Text Content */}
                <div className="w-full flex flex-col gap-fluid-s">
                    <p className="text-step-3 md:text-step-4 text-background leading-tight italic tracking-tight font-light transition-all duration-500">
                        &quot;{item.quote}&quot;
                    </p>
                    <motion.div 
                        style={{ gridTemplateRows: gridRows }}
                        className="grid"
                    >
                        <div className="overflow-hidden">
                            <motion.p 
                                style={{ opacity: detailsOpacity }}
                                className="text-step-0 font-light text-background leading-relaxed pt-fluid-m max-w-4xl"
                            >
                                {item.details}
                            </motion.p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

export function TestimonialsSection({ data }: TestimonialsSectionProps) {
    const headerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: headerScroll } = useScroll({
        target: headerRef,
        offset: ["start 95%", "start 40%"]
    });
    const headerOpacity = useTransform(headerScroll, [0, 1], [0, 1]);
    const headerY = useTransform(headerScroll, [0, 1], [30, 0]);

    if (!data || !data.items || data.items.length === 0) return null;

    return (
        <section className="px-fluid-m py-fluid-4xl border-t border-foreground bg-foreground text-background w-full relative z-40">
            <div ref={headerRef} className="w-full mb-fluid-3xl">
                <TerminalTitle 
                    as="h2"
                    text={data.title}
                    className="text-step-6 font-heading font-semibold tracking-normal mb-fluid-s uppercase"
                />
                <motion.p 
                    style={{ opacity: headerOpacity, y: headerY }}
                    className="text-step-1 font-light max-w-4xl"
                >
                    {data.subtitle}
                </motion.p>
            </div>

            <div className="flex flex-col border-y border-background w-full">
                {data.items.map((item, i) => (
                    <TestimonialRow key={i} item={item} index={i} isLast={i === data.items.length - 1} />
                ))}
            </div>
        </section>
    );
}
