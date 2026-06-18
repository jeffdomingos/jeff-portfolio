"use client";

import { ApproachSection as ApproachSectionData } from "@/content/schema";
import * as motion from "framer-motion/client";
import { TerminalTitle } from "@/components/atoms/TerminalTitle";

interface ApproachSectionProps {
    data: ApproachSectionData;
}

export function ApproachSection({ data }: ApproachSectionProps) {
    if (!data) return null;

    return (
        <section className="px-fluid-m py-fluid-4xl border-t border-foreground overflow-hidden w-full">
            <div className="w-full mb-fluid-2xl">
                <TerminalTitle 
                    as="h2"
                    text={data.title}
                    className="text-step-6 font-heading font-semibold tracking-normal mb-fluid-s uppercase"
                />
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "10000px 0px 0px 0px" }}
                    transition={{ delay: 0.5 }}
                    className="text-step-1 text-foreground font-light leading-relaxed max-w-4xl"
                >
                    {data.subtitle}
                </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-fluid-xl w-full">
                {data.columns?.map((col, i) => {
                    const images = [
                        "/images/strat-busin.png",
                        "/images/desin-cod.png",
                        "/images/aest-emo.png"
                    ];
                    const imgSrc = images[i];
                    return (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "10000px 0px -150px 0px" }}
                            transition={{ delay: 0.4 + (0.1 * i) }}
                            className="flex flex-col border-t border-foreground pt-fluid-m"
                        >
                            {imgSrc && (
                                <div className="relative w-full aspect-video mb-fluid-m bg-background overflow-hidden">
                                    <img 
                                        src={imgSrc} 
                                        alt={col.title}
                                        className="object-cover w-full h-full grayscale contrast-125"
                                    />
                                    <div className="absolute inset-0 bg-halftone-mask pointer-events-none"></div>
                                </div>
                            )}
                            <h3 className="text-step-2 font-bold mb-fluid-s tracking-tight">{col.title}</h3>
                            <p className="text-step-0 text-foreground font-light leading-relaxed">{col.description}</p>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
