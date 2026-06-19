"use client";

import { GlobalFooter } from "@/content/schema";
import { FooterAnimatedLogo } from "./FooterAnimatedLogo";
import { useMotionValue } from "framer-motion";

export function Footer({ data }: { data: GlobalFooter }) {
    const scrollToTop = () => {
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = (e.clientX - centerX) / (rect.width / 2);
        const y = (e.clientY - centerY) / (rect.height / 2);
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <footer 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full min-h-[100svh] bg-background pt-fluid-xl pb-fluid-m px-fluid-m flex flex-col mt-auto"
        >
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col justify-center py-fluid-l">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-fluid-xl items-center">
                {/* Brand / Logo Area */}
                <div className="flex flex-col justify-between lg:col-span-7">
                    <FooterAnimatedLogo mouseX={mouseX} mouseY={mouseY} />
                </div>

                {/* Contact Links */}
                <div className="flex flex-col items-start gap-fluid-m lg:col-span-5 lg:col-start-8 mt-fluid-xl lg:mt-0 relative z-10">
                    <a href={`mailto:${data.emailValue}`} className="group inline-flex flex-col">
                        <span className="text-step--2 uppercase tracking-widest text-foreground font-light mb-1">{data.emailLabel}</span>
                        <span className="text-step-2 font-bold group-hover:translate-x-4 transition-transform duration-500 text-foreground flex items-center gap-4">
                            {data.emailValue}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </span>
                    </a>
                    
                    <a href="https://linkedin.com/in/jeffdomingos" target="_blank" rel="noopener noreferrer" className="group inline-flex flex-col">
                        <span className="text-step--2 uppercase tracking-widest text-foreground font-light mb-1">{data.linkedinLabel}</span>
                        <span className="text-step-2 font-bold group-hover:translate-x-4 transition-transform duration-500 text-foreground flex items-center gap-4">
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
                        <span className="text-step-2 font-bold group-hover:translate-x-4 transition-transform duration-500 text-foreground flex items-center gap-4">
                            {data.whatsappValue}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </span>
                    </a>

                    <a href="https://www.instagram.com/jeffdomingos.design/" target="_blank" rel="noopener noreferrer" className="group inline-flex flex-col">
                        <span className="text-step--2 uppercase tracking-widest text-foreground font-light mb-1">Instagram</span>
                        <span className="text-step-2 font-bold group-hover:translate-x-4 transition-transform duration-500 text-foreground flex items-center gap-4">
                            @jeffdomingos.design
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
            <div className="pt-fluid-s mt-auto border-t border-foreground flex flex-col md:flex-row items-center justify-between text-step--1 font-light gap-4">
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
