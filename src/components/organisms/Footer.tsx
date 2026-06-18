"use client";

import { GlobalFooter } from "@/content/schema";

export function Footer({ data }: { data: GlobalFooter }) {
    const scrollToTop = () => {
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <footer className="w-full min-h-screen bg-background border-t border-foreground pt-fluid-3xl pb-fluid-m px-fluid-m flex flex-col mt-auto">
            <div className="flex-1 flex flex-col justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-fluid-2xl mb-fluid-3xl">
                {/* Brand / Logo Area */}
                <div className="flex flex-col justify-between">
                    <div 
                        className="bg-halftone w-full max-w-[90%] aspect-[704/317]"
                        style={{
                            maskImage: 'url(/images/logo-full.svg)',
                            maskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            maskPosition: 'left center',
                            WebkitMaskImage: 'url(/images/logo-full.svg)',
                            WebkitMaskSize: 'contain',
                            WebkitMaskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'left center'
                        }}
                        aria-label={data.brandName.split(" | ")[0] || data.brandName}
                        role="img"
                    />
                </div>

                {/* Contact Links */}
                <div className="flex flex-col items-start gap-fluid-l">
                    <a href={`mailto:${data.emailValue}`} className="group inline-flex flex-col">
                        <span className="text-step--2 uppercase tracking-widest text-foreground font-light mb-1">{data.emailLabel}</span>
                        <span className="text-step-3 font-bold group-hover:translate-x-4 transition-transform duration-500 text-foreground flex items-center gap-4">
                            {data.emailValue}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </span>
                    </a>
                    
                    <a href="https://linkedin.com/in/jeffdomingos" target="_blank" rel="noopener noreferrer" className="group inline-flex flex-col">
                        <span className="text-step--2 uppercase tracking-widest text-foreground font-light mb-1">{data.linkedinLabel}</span>
                        <span className="text-step-3 font-bold group-hover:translate-x-4 transition-transform duration-500 text-foreground flex items-center gap-4">
                            {data.linkedinValue}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </span>
                    </a>

                    <a href="https://api.whatsapp.com/send/?phone=5521999374516" target="_blank" rel="noopener noreferrer" className="group inline-flex flex-col">
                        <span className="text-step--2 uppercase tracking-widest text-foreground font-light mb-1">{data.whatsappLabel}</span>
                        <span className="text-step-3 font-bold group-hover:translate-x-4 transition-transform duration-500 text-foreground flex items-center gap-4">
                            {data.whatsappValue}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </span>
                    </a>
                </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="pt-fluid-m border-t border-foreground flex flex-col md:flex-row items-center justify-between text-step--1 font-light gap-4">
                <p>{data.copyrightText}</p>
                <button 
                    onClick={scrollToTop} 
                    className="hover:text-foreground transition-colors uppercase tracking-widest text-step--2 font-medium flex items-center gap-2 group focus:outline-none"
                >
                    Voltar ao topo
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:-translate-y-1 transition-transform">
                        <line x1="12" y1="19" x2="12" y2="5"></line>
                        <polyline points="5 12 12 5 19 12"></polyline>
                    </svg>
                </button>
            </div>
        </footer>
    );
}
