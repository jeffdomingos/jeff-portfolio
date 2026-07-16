import React from "react";
// TypewriterEffect removed for view transitions

interface PageHeroProps {
    title: string;
    slug?: string;
    overline?: string;
    subtitle?: string;
    tags?: string[];
    readingTimeLabel?: string;
    children?: React.ReactNode;
}

export function PageHero({ title, slug, overline, subtitle, tags, readingTimeLabel, children }: PageHeroProps) {
    return (
        <>
            {/* Header Reading Protection Gradient */}
            <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-[75]"></div>

            {/* Page Hero Wrapper */}
            <div className="relative w-full bg-background border-b border-border transition-colors z-50">
                <header className="relative w-full px-fluid-xs md:px-fluid-m pt-32 pb-fluid-xl flex flex-col items-start">
                    <div className="w-full relative">
                        <div className="mb-fluid-m">
                            <div 
                                style={slug ? { viewTransitionName: `project-header-${slug}`, width: 'fit-content' } : undefined}
                                className="flex flex-col items-start"
                            >
                                <div className="mb-6">
                                    {overline && (
                                        <span className="block text-step--1 md:text-step-0 font-heading type-label font-normal text-foreground tracking-widest uppercase mb-2">
                                            {overline}
                                        </span>
                                    )}
                                    <h1 className="text-step-5 md:text-step-6 type-display text-foreground leading-none m-0 p-0">
                                        {title}
                                    </h1>
                                </div>
                                {tags && tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map((tag: string, i: number) => (
                                            <span 
                                                key={i} 
                                                className="px-4 py-1.5 bg-transparent border border-foreground border-dashed rounded-full text-step--2 type-label text-foreground font-light"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {readingTimeLabel && (
                                    <div className="mt-6 flex items-center gap-2 text-foreground type-body text-step--1 font-light">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                        <span>{readingTimeLabel}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        {subtitle && (
                            <h2 className="text-step-1 text-foreground type-body w-full text-left mt-4 md:mt-6 mb-fluid-m">
                                {subtitle}
                            </h2>
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
