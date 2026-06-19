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

function TestimonialRow({ item, index }: { item: any, index: number }) {
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
            className="group transition-all duration-500 py-fluid-xl flex flex-col cursor-crosshair border-b border-background last:border-b-0 relative overflow-hidden"
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
                        "{item.quote}"
                    </p>
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]">
                        <div className="overflow-hidden">
                            <p className="text-step-0 font-light text-background leading-relaxed pt-fluid-m max-w-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                                {item.details}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function TestimonialsSection({ data }: TestimonialsSectionProps) {
    if (!data || !data.items || data.items.length === 0) return null;

    const headerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: headerScroll } = useScroll({
        target: headerRef,
        offset: ["start 95%", "start 40%"]
    });
    const headerOpacity = useTransform(headerScroll, [0, 1], [0, 1]);
    const headerY = useTransform(headerScroll, [0, 1], [30, 0]);

    return (
        <section className="px-fluid-m py-fluid-4xl border-t border-foreground bg-foreground text-background w-full">
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
                    <TestimonialRow key={i} item={item} index={i} />
                ))}
            </div>
        </section>
    );
}
