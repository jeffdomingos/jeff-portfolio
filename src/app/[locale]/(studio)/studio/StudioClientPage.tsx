"use client";

import { m } from "framer-motion";
import { TerminalTitle } from "@/components/atoms/TerminalTitle";
import { Button } from "@/components/ui/button";

export function StudioClientPage({ content, locale }: { content: any, locale: string }) {
    return (
        <div>
            {/* ===== HERO SECTION ===== */}
            <section className="relative w-full min-h-[100svh] h-auto flex flex-col items-start justify-center overflow-hidden pt-16 pb-12 lg:pt-14 lg:pb-0 px-fluid-xs md:px-fluid-m">
                <div className="absolute inset-0 -z-10 bg-background/50 transition-colors duration-300"></div>
                
                <div className="w-full max-w-5xl relative z-40">
                    <m.h1 
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="text-step-6 type-display text-foreground w-full text-balance drop-shadow-sm mb-3 md:mb-fluid-m"
                    >
                        {content.hero.headline}
                    </m.h1>
                    
                    <m.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                        className="text-step-0 type-body text-foreground max-w-2xl text-left mb-4 md:mb-fluid-m"
                    >
                        {content.hero.subheadline}
                    </m.p>

                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
                        className="flex flex-row flex-wrap gap-2 md:gap-4 items-start"
                    >
                        <Button asChild variant="default" size="default" className="md:h-12 md:px-8 md:text-sm h-10 px-6 text-xs group">
                            <a href={content.hero.ctaHref} target="_blank" rel="noopener noreferrer">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {content.hero.ctaLabel}
                                </span>
                            </a>
                        </Button>
                        <Button asChild variant="secondary" size="default" className="md:h-12 md:px-8 md:text-sm h-10 px-6 text-xs">
                            <a href="mailto:jeffsalb@gmail.com">
                                {locale === 'en' ? 'Send Email' : 'Enviar Email'}
                            </a>
                        </Button>
                    </m.div>
                </div>
            </section>

            {/* ===== SERVICES SECTION ===== */}
            <div className="relative w-full bg-background pt-fluid-2xl">
                <div className="absolute inset-0 pointer-events-none"><div className="fade-mask" /></div>
                <section className="relative z-40 px-fluid-xs md:px-fluid-m pb-fluid-2xl">
                    <TerminalTitle 
                        as="h2"
                        text={content.services.title}
                        className="text-step-6 type-display mb-fluid-s"
                    />
                    <p className="text-step-0 type-body text-foreground max-w-2xl mb-fluid-2xl">
                        {content.services.subtitle}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-fluid-m">
                        {content.services.items.map((service: any, i: number) => (
                            <m.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                 style={{ willChange: "transform, opacity", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: "some", margin: "-10% 0px" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                                className="group relative p-fluid-m border border-foreground/10 hover:border-foreground/30 transition-colors duration-500"
                            >
                                <span className="text-step--2 type-label text-foreground/40 mb-fluid-xs block">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3 className="text-step-2 type-heading mb-fluid-xs">
                                    {service.title}
                                </h3>
                                <p className="text-step-0 type-body text-foreground/80">
                                    {service.description}
                                </p>
                            </m.div>
                        ))}
                    </div>
                </section>
            </div>

            {/* ===== SHOWCASE SECTION ===== */}
            <div className="relative w-full bg-background">
                <div className="absolute inset-0 pointer-events-none"><div className="fade-mask" /></div>
                <section className="relative z-40 px-fluid-xs md:px-fluid-m py-fluid-2xl">
                    <TerminalTitle 
                        as="h2"
                        text={content.showcase.title}
                        className="text-step-6 type-display mb-fluid-2xl"
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-fluid-m">
                        {content.showcase.items.map((item: any, i: number) => (
                            <m.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                 style={{ willChange: "transform, opacity", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: "some", margin: "-10% 0px" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                                className="group relative overflow-hidden"
                            >
                                <div className="relative aspect-[16/10] bg-foreground/5 border border-foreground/10 flex items-center justify-center">
                                    <span className="text-step--1 type-label text-foreground/20">{item.caption}</span>
                                </div>
                                <p className="text-step--2 type-label text-foreground/50 mt-fluid-xs">
                                    {item.caption}
                                </p>
                            </m.div>
                        ))}
                    </div>
                </section>
            </div>

            {/* ===== TESTIMONIALS SECTION ===== */}
            <div className="relative w-full bg-foreground">
                <div className="absolute inset-0 pointer-events-none"><div className="fade-mask" /></div>
                <section className="relative z-40 px-fluid-xs md:px-fluid-m py-fluid-2xl">
                    <TerminalTitle 
                        as="h2"
                        text={content.testimonials.title}
                        className="text-step-6 type-display mb-fluid-s text-background"
                    />
                    <p className="text-step-0 type-body text-background/70 max-w-2xl mb-fluid-2xl">
                        {content.testimonials.subtitle}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-fluid-m">
                        {content.testimonials.items.map((testimonial: any, i: number) => (
                            <m.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                 style={{ willChange: "transform, opacity", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: "some", margin: "-10% 0px" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
                                className="flex flex-col p-fluid-m border border-background/10"
                            >
                                <p className="text-step-0 type-body text-background/90 mb-fluid-m italic">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </p>
                                <div className="mt-auto">
                                    <p className="text-step--1 font-bold text-background">{testimonial.author}</p>
                                    <p className="text-step--2 type-label text-background/50">{testimonial.role}</p>
                                </div>
                            </m.div>
                        ))}
                    </div>
                </section>
            </div>

            {/* ===== CTA SECTION ===== */}
            <div className="relative w-full bg-background">
                <div className="absolute inset-0 pointer-events-none"><div className="fade-mask" /></div>
                <section className="relative z-40 px-fluid-xs md:px-fluid-m py-fluid-3xl">
                    <div className="max-w-3xl mx-auto text-center">
                        <m.h2
                            initial={{ opacity: 0, y: 30 }}
                             style={{ willChange: "transform, opacity", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: "some", margin: "-10% 0px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-step-4 type-display mb-fluid-s"
                        >
                            {content.cta.title}
                        </m.h2>
                        <m.p
                            initial={{ opacity: 0, y: 20 }}
                             style={{ willChange: "transform, opacity", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: "some", margin: "-10% 0px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            className="text-step-0 type-body text-foreground/70 mb-fluid-m"
                        >
                            {content.cta.subtitle}
                        </m.p>
                        
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                             style={{ willChange: "transform, opacity", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: "some", margin: "-10% 0px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-fluid-xl"
                        >
                            <Button asChild variant="default" size="default" className="md:h-12 md:px-8 md:text-sm h-10 px-6 text-xs">
                                <a href={content.cta.ctaHref} target="_blank" rel="noopener noreferrer">
                                    {content.cta.ctaLabel}
                                </a>
                            </Button>
                            <Button asChild variant="secondary" size="default" className="md:h-12 md:px-8 md:text-sm h-10 px-6 text-xs">
                                <a href={content.cta.whatsappHref} target="_blank" rel="noopener noreferrer">
                                    WhatsApp
                                </a>
                            </Button>
                        </m.div>

                        <m.div
                            initial={{ opacity: 0 }}
                             style={{ willChange: "transform, opacity", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: "some" }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-fluid-m justify-center text-step--2 type-label text-foreground/50"
                        >
                            <span>{content.cta.emailLabel} <a href={`mailto:${content.cta.emailValue}`} className="text-foreground hover:underline">{content.cta.emailValue}</a></span>
                            <span>{content.cta.whatsappLabel} <a href={content.cta.whatsappHref} target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline">{content.cta.whatsappValue}</a></span>
                        </m.div>
                    </div>
                </section>
            </div>
        </div>
    );
}
