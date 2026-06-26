import React from "react";
import { TypewriterEffect } from "@/components/atoms/TypewriterEffect";

interface PageHeroProps {
    title: string;
    overline?: string;
    subtitle?: string;
    tags?: string[];
    children?: React.ReactNode;
}

export function PageHero({ title, overline, subtitle, tags, children }: PageHeroProps) {
    return (
        <>
            {/* Header Reading Protection Gradient */}
            <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-[75]"></div>

            {/* Page Hero Wrapper */}
            <div className="relative w-full bg-background border-b border-border transition-colors z-50">
                <header className="relative w-full px-fluid-xs md:px-fluid-m pt-32 pb-fluid-xl flex flex-col items-start">
                    <div className="w-full relative">
                        <div className="mb-6">
                            {overline && (
                                <span className="block text-step-0 md:text-step-1 font-medium tracking-widest uppercase opacity-60 mb-2">
                                    {overline}
                                </span>
                            )}
                            <h1 className="text-step-5 md:text-step-6 font-bold uppercase tracking-tighter text-foreground leading-[1.1]">
                                <TypewriterEffect text={title} />
                            </h1>
                            {subtitle && (
                                <h2 className="text-step-1 text-foreground font-light w-full text-left mt-4 md:mt-6">
                                    {subtitle}
                                </h2>
                            )}
                        </div>

                        {tags && tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-fluid-m">
                                {tags.map((tag: string, i: number) => (
                                    <span key={i} className="px-4 py-1.5 bg-transparent border border-foreground border-dashed rounded-full text-step--2 uppercase tracking-wider text-foreground">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {children && (
                            <div className="flex flex-wrap gap-x-12 gap-y-8 pt-8 border-t border-border/50">
                                {children}
                            </div>
                        )}
                    </div>
                </header>
            </div>
        </>
    );
}
