import React from 'react';
import Image from 'next/image';
import { Link } from 'next-view-transitions';

interface AuthorBioProps {
  locale: string;
}

export function AuthorBio({ locale }: AuthorBioProps) {
  const isPt = locale === 'pt';
  
  return (
    <div className="w-full mt-20 pt-10 border-t border-border/50 flex flex-col md:flex-row gap-6 items-start md:items-center">
      <div className="shrink-0 pt-2">
        <Image 
          src="/images/RostoDir.png" 
          alt="Jeff Domingos"
          width={80}
          height={80}
          className="object-contain"
        />
      </div>
      
      <div className="flex-1">
        <h4 className="text-step-0 font-bold text-foreground mb-1">
          Jeff Domingos
        </h4>
        <p className="text-foreground/70 text-step--1 type-body mb-3">
          {isPt 
            ? "Explorando o equilíbrio entre a consistência de sistemas SaaS/B2B e a expressividade de interfaces e websites de alto padrão."
            : "Exploring the balance between the consistency of SaaS/B2B systems and the expressiveness of high-end interfaces and websites."}
        </p>
        <div className="flex items-center gap-4">
          <Link 
            href={`/${locale}`}
            className="text-primary type-label text-step--2 font-medium hover:underline flex items-center gap-1"
          >
            {isPt ? "Ver Portfólio" : "View Portfolio"}
          </Link>
          <span className="text-foreground/20">•</span>
          <Link 
            href={`/${locale}/contact`}
            className="text-foreground/60 hover:text-foreground type-label text-step--2 font-medium transition-colors"
          >
            {isPt ? "Entrar em contato" : "Get in touch"}
          </Link>
        </div>
      </div>
    </div>
  );
}
