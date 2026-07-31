"use client";

import { useEffect, useRef } from "react";
import { m, useInView, animate } from "framer-motion";

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
                const trendColor = isPositive ? "text-green-600 dark:text-green-400" : isNegative ? "text-red-600 dark:text-red-400" : "text-foreground";
                
                return (
                    <m.div 
                        key={i}
                        className="flex flex-col items-center justify-center p-6 bg-muted rounded-xl border border-border text-center shadow-sm relative overflow-hidden group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                        {/* Background Halftone subtle effect */}
                        <div className="absolute inset-0 z-0 bg-halftone opacity-5" />
                        
                        <div className="relative z-10 w-full flex flex-col items-center">
                            <span className="text-sm uppercase tracking-widest text-subtle font-semibold mb-3">{metric.label}</span>
                            
                            <div className={`flex items-baseline justify-center font-display font-bold text-4xl lg:text-5xl tracking-tight mb-2 ${trendColor}`}>
                                {metric.prefix && <span className="text-2xl lg:text-3xl mr-1 font-medium">{metric.prefix}</span>}
                                <AnimatedNumber value={metric.end} start={metric.start} isFloat={metric.end % 1 !== 0} />
                                {metric.suffix && <span className="text-xl lg:text-2xl ml-1 font-medium">{metric.suffix}</span>}
                            </div>
                            
                            {metric.description && (
                                <span className="text-sm text-foreground/80 font-light mt-1">{metric.description}</span>
                            )}
                        </div>
                    </m.div>
                );
            })}
        </div>
    );
}
