"use client";

import { useEffect, useRef } from "react";
import { m, useInView, animate } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function AnimatedNumber({ value, start = 0, isFloat = false }: { value: number, start?: number, isFloat?: boolean }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    useEffect(() => {
        if (isInView && ref.current) {
            const controls = animate(start, value, {
                duration: 2,
                ease: "easeOut",
                onUpdate(v) {
                    if (ref.current) {
                        ref.current.textContent = isFloat ? v.toFixed(1) : Math.round(v).toString();
                    }
                }
            });
            return () => controls.stop();
        }
    }, [isInView, value, start, isFloat]);

    return <span ref={ref}>{isFloat ? start.toFixed(1) : Math.round(start)}</span>;
}

export function AnimatedMetricsDashboard({ metrics }: { metrics: any[] }) {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 my-10 not-prose">
            {metrics.map((metric, i) => {
                const isPositive = metric.trend === 'up';
                const isNegative = metric.trend === 'down';
                
                return (
                    <m.div 
                        key={i}
                        className="flex flex-col items-start text-left relative group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                        <span className="text-xs md:text-sm uppercase tracking-widest text-foreground font-semibold mb-3">{metric.label}</span>
                        
                        <div className="flex flex-col items-center justify-center w-full py-6 px-4 bg-foreground rounded-xl shadow-sm mb-3 relative overflow-hidden">
                            <div className="relative z-10 flex flex-col items-center justify-center font-display font-bold text-3xl lg:text-4xl tracking-tight text-background">
                                {isPositive && <ArrowUpRight className="w-6 h-6 lg:w-8 lg:h-8 mb-1 opacity-70 stroke-[3px]" />}
                                {isNegative && <ArrowDownRight className="w-6 h-6 lg:w-8 lg:h-8 mb-1 opacity-70 stroke-[3px]" />}
                                <div className="flex items-baseline gap-1">
                                    {metric.prefix && <span className="text-xl lg:text-2xl font-medium">{metric.prefix}</span>}
                                    <AnimatedNumber value={metric.end} start={metric.start} isFloat={metric.end % 1 !== 0} />
                                    {metric.suffix && <span className="text-base lg:text-lg font-medium">{metric.suffix}</span>}
                                </div>
                            </div>
                        </div>
                        
                        {metric.description && (
                            <span className="text-xs md:text-sm text-foreground/80 font-light mt-1">{metric.description}</span>
                        )}
                    </m.div>
                );
            })}
        </div>
    );
}
