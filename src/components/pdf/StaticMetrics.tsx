"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function StaticNumber({ value, isFloat = false }: { value: number, isFloat?: boolean }) {
    return <span>{isFloat ? value.toFixed(1) : Math.round(value)}</span>;
}

export function StaticMetricsDashboard({ metrics, vertical = false }: { metrics: any[], vertical?: boolean }) {
    const containerClass = vertical
        ? "w-full flex flex-col divide-y divide-border py-2"
        : "w-full grid grid-cols-1 md:grid-cols-3 print:grid-cols-3 my-4 md:my-10 print:my-2 not-prose divide-y md:divide-y-0 print:divide-y-0 md:divide-x print:divide-x divide-border";

    const childClass = vertical
        ? "flex flex-col items-start text-left relative py-6 first:pt-2 last:pb-2"
        : "flex flex-col items-center text-center relative group py-2 md:py-0 md:px-4 print:py-0 print:px-2 first:pt-0 md:first:pl-0 print:first:pl-0 last:pb-0 md:last:pr-0 print:last:pr-0";

    return (
        <div className={containerClass}>
            {metrics.map((metric, i) => {
                const isPositive = metric.trend === 'up';
                const isNegative = metric.trend === 'down';
                
                return (
                    <div 
                        key={i}
                        className={childClass}
                    >
                        <span className="text-xs md:text-sm uppercase tracking-widest text-foreground font-semibold mb-3">{metric.label}</span>
                        
                        <div className={`flex flex-wrap items-baseline ${vertical ? 'justify-start' : 'justify-center'} font-display font-bold text-foreground mb-2 gap-x-2 gap-y-0`}>
                            {metric.prefix && <span className="text-xl lg:text-2xl tracking-tight opacity-90">{metric.prefix}</span>}
                            <span className="text-3xl lg:text-4xl tracking-tighter"><StaticNumber value={metric.end} isFloat={metric.end % 1 !== 0} /></span>
                            {metric.suffix && <span className="text-base lg:text-lg tracking-tight opacity-90">{metric.suffix}</span>}
                        </div>
                        
                        {metric.description && (
                            <span className="text-xs md:text-sm text-foreground/80 font-light mt-1">{metric.description}</span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
