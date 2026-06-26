"use client";

import { Mail, Linkedin, MessageCircle, Calendar } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

import { TracingGrid, TracingItem } from "@/components/atoms/TracingBorders";

function ContactCard({ item, index }: { item: any, index: number }) {
    const [isMobile, setIsMobile] = useState(false);
    
    // Strict margin to trigger only when the card is exactly in the middle of the screen
    const ref = useRef<HTMLAnchorElement>(null);
    const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const forceActive = isMobile && isInView;

    return (
        <TracingItem 
            id={`contact-${index}`} 
            forceActive={forceActive}
            className={`group flex flex-col p-8 md:p-12 transition-colors duration-500 relative min-h-[300px] z-10 hover:z-50 ${isMobile && isInView ? '!z-50' : ''}`}
        >
            <a
                ref={ref}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-20"
                aria-label={item.platformName}
            />
            {/* Content Container */}
            <div className="relative z-10 flex flex-col h-full text-foreground pointer-events-none">
                <div className="flex items-center gap-4 mb-4">
                    {item.platformName.toLowerCase().includes('mail') && <Mail className="w-8 h-8 md:w-10 md:h-10 shrink-0 stroke-1" />}
                    {item.platformName.toLowerCase().includes('linkedin') && <Linkedin className="w-8 h-8 md:w-10 md:h-10 shrink-0 stroke-1" />}
                    {item.platformName.toLowerCase().includes('whatsapp') && <MessageCircle className="w-8 h-8 md:w-10 md:h-10 shrink-0 stroke-1" />}
                    {item.icon === 'calendar' && <Calendar className="w-8 h-8 md:w-10 md:h-10 shrink-0 stroke-1" />}
                    <h3 className="text-step-2 md:text-step-3 font-bold uppercase tracking-tight">{item.platformName}</h3>
                </div>
                <p className="font-light opacity-80 mb-12 text-step--1">{item.description}</p>
                
                {/* CTA Line */}
                <div className="mt-auto flex items-center justify-between w-full font-medium uppercase tracking-widest text-step--1 border-t border-foreground/20 pt-6">
                    <span>{item.ctaLabel}</span>
                    <span className="font-bold transition-transform duration-300 transform group-hover:translate-x-2">&rarr;</span>
                </div>
            </div>
        </TracingItem>
    );
}

export function ContactCards({ items }: { items: any[] }) {
    if (!items || items.length === 0) return null;

    return (
        <TracingGrid className="relative z-10 w-full px-fluid-xs md:px-fluid-m pt-fluid-l">
            {/* Contiguous Strip Layout (gap-0) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 w-full border-y border-foreground/10 lg:border-none">
                {items.map((item, i) => (
                    <ContactCard key={i} item={item} index={i} />
                ))}
            </div>
        </TracingGrid>
    );
}
