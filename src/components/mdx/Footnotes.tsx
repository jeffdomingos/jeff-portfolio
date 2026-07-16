import React from 'react';
import { ExternalLink } from "lucide-react";

export function Ref({ id }: { id: string }) {
    return (
        <sup className="ml-[2px] -top-[0.4em] relative">
            <a 
                href={`#footnote-${id}`} 
                id={`ref-${id}`}
                className="text-primary hover:text-primary/80 transition-colors no-underline font-bold text-[0.75em]"
            >
                {id}
            </a>
        </sup>
    );
}

export function Footnotes({ children }: { children: React.ReactNode }) {
    return (
        <div className="mt-16 pt-8 border-t border-border">
            <h4 className="text-step--2 type-label font-bold text-foreground/50 uppercase tracking-wider mb-6">
                Notas de Rodapé
            </h4>
            <div className="flex flex-col gap-4">
                {children}
            </div>
        </div>
    );
}

export function FootnoteItem({ id, href, children }: { id: string; href?: string; children: React.ReactNode }) {
    return (
        <div id={`footnote-${id}`} className="text-sm text-foreground/90 type-body flex gap-3 items-start scroll-mt-32 leading-relaxed">
            <a 
                href={`#ref-${id}`} 
                className="text-primary hover:text-primary/80 no-underline font-bold shrink-0 mt-[2px]"
                aria-label={`Voltar para a referência ${id}`}
            >
                {id}.
            </a>
            <div className="flex-1 [&>p]:inline [&>p]:!text-sm [&>p]:!m-0 [&>p]:!text-foreground/90">
                {children}
                {href && (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center ml-1.5 align-baseline text-primary/70 hover:text-primary transition-colors">
                        <ExternalLink size={12} className="relative -top-[1px] ml-0.5" />
                    </a>
                )}
            </div>
        </div>
    );
}
