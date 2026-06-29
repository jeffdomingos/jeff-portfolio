"use client";

import { motion } from "framer-motion";

export function ProductTrioDiagram({ locale = "pt" }: { locale?: string }) {
    const isEn = locale === "en";

    const t = {
        title: isEn ? "The product trio" : "O trio de produto",
        pm: "Product Manager",
        pd: "Product Designer",
        eng: "Tech Lead",
        business: isEn ? "Business viability risk" : "Risco de negócio",
        value: isEn ? "Value risk" : "Risco de valor",
        usability: isEn ? "Usability risk" : "Risco de usabilidade",
        feasibility: isEn ? "Feasibility risk" : "Risco de viabilidade técnica"
    };

    return (
        <motion.figure 
            className="my-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="relative">
                <div className="absolute top-3 left-3 w-full h-full bg-halftone z-0"></div>
                <div className="relative z-10 w-full flex justify-center py-16 md:py-24 bg-background border-2 border-foreground overflow-hidden">
                    <div className="relative w-full max-w-[320px] md:max-w-[480px] aspect-square flex items-center justify-center mt-4">
                
                {/* SVG for Dashed Lines */}
                <svg className="absolute inset-0 w-full h-full z-0 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Top: 50, 25 | Left: 30, 75 | Right: 70, 75 */}
                    <line x1="50" y1="25" x2="30" y2="75" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
                    <line x1="50" y1="25" x2="70" y2="75" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
                    <line x1="30" y1="75" x2="70" y2="75" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1.5 1.5" />

                    {/* Outer pointing lines */}
                    {/* Top Left Label: Ends at X=20, Y=25 */}
                    <line x1="50" y1="25" x2="20" y2="25" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
                    <circle cx="20" cy="25" r="1.5" fill="currentColor" />

                    {/* Top Right Label: Ends at X=80, Y=25 */}
                    <line x1="50" y1="25" x2="80" y2="25" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
                    <circle cx="80" cy="25" r="1.5" fill="currentColor" />

                    {/* Bottom Left Label: Ends at X=10, Y=75 */}
                    <line x1="30" y1="75" x2="10" y2="75" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
                    <circle cx="10" cy="75" r="1.5" fill="currentColor" />

                    {/* Bottom Right Label: Ends at X=90, Y=75 */}
                    <line x1="70" y1="75" x2="90" y2="75" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
                    <circle cx="90" cy="75" r="1.5" fill="currentColor" />
                </svg>

                {/* Center Title */}
                <h3 className="relative z-10 text-center type-heading text-step-2 md:text-step-3 w-max leading-tight px-2 bg-background">
                    {t.title}
                </h3>

                {/* Nodes */}
                {/* PM - Top */}
                <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-20 h-20 md:w-32 md:h-32 rounded-full bg-background border-2 border-foreground flex items-center justify-center text-center p-2 md:p-4 shadow-[4px_4px_0_0_currentColor] md:shadow-[6px_6px_0_0_currentColor]">
                    <span className="type-label text-step--2 md:text-step-0 font-bold leading-tight">{t.pm}</span>
                </div>

                {/* PD - Bottom Left */}
                <div className="absolute top-[75%] left-[30%] -translate-x-1/2 -translate-y-1/2 z-10 w-20 h-20 md:w-32 md:h-32 rounded-full bg-background border-2 border-foreground flex items-center justify-center text-center p-2 md:p-4 shadow-[4px_4px_0_0_currentColor] md:shadow-[6px_6px_0_0_currentColor]">
                    <span className="type-label text-step--2 md:text-step-0 font-bold leading-tight">{t.pd}</span>
                </div>

                {/* Eng - Bottom Right */}
                <div className="absolute top-[75%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-10 w-20 h-20 md:w-32 md:h-32 rounded-full bg-background border-2 border-foreground flex items-center justify-center text-center p-2 md:p-4 shadow-[4px_4px_0_0_currentColor] md:shadow-[6px_6px_0_0_currentColor]">
                    <span className="type-label text-step--2 md:text-step-0 font-bold leading-tight">{t.eng}</span>
                </div>

                {/* Labels around nodes */}
                <div className="absolute top-[25%] right-[83%] -translate-y-1/2 text-right w-max max-w-[70px] md:max-w-[120px]">
                    <span className="block type-body text-[10px] md:text-sm lg:text-base font-semibold leading-tight text-foreground">{t.business}</span>
                </div>
                <div className="absolute top-[25%] left-[83%] -translate-y-1/2 text-left w-max max-w-[70px] md:max-w-[120px]">
                    <span className="block type-body text-[10px] md:text-sm lg:text-base font-semibold leading-tight text-foreground">{t.value}</span>
                </div>
                <div className="absolute top-[75%] right-[93%] -translate-y-1/2 text-right w-max max-w-[70px] md:max-w-[120px]">
                    <span className="block type-body text-[10px] md:text-sm lg:text-base font-semibold leading-tight text-foreground">{t.usability}</span>
                </div>
                <div className="absolute top-[75%] left-[93%] -translate-y-1/2 text-left w-max max-w-[70px] md:max-w-[120px]">
                    <span className="block type-body text-[10px] md:text-sm lg:text-base font-semibold leading-tight text-foreground">{t.feasibility}</span>
                </div>
            </div>
                </div>
            </div>
        </motion.figure>
    );
}
