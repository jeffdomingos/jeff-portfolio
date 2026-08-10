'use client';

import React from 'react';

interface ScrollToDemoButtonProps {
  label: string;
}

export const ScrollToDemoButton = ({ label }: ScrollToDemoButtonProps) => {
  return (
    <a
      href="#interactive-demo"
      onClick={(e) => {
        e.preventDefault();
        const el = document.getElementById('interactive-demo');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}
      className="w-full py-3.5 px-6 border-2 border-foreground bg-background hover:bg-foreground hover:text-background text-foreground font-semibold text-xs md:text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200 no-underline group cursor-pointer"
    >
      <span>{label}</span>
      <svg className="w-4 h-4 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </a>
  );
};
