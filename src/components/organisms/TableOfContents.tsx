"use client";

import React, { useEffect, useState } from 'react';
import type { TOCItem } from '@/utils/toc';

interface TableOfContentsProps {
  toc: TOCItem[];
  locale: string;
}

export function TableOfContents({ toc, locale }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0px -80% 0px' }
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      toc.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observer.unobserve(el);
      });
    };
  }, [toc]);

  if (!toc || toc.length === 0) return null;

  return (
    <nav className="sticky top-32 max-h-[calc(100vh-8rem)] overflow-y-auto hidden lg:block w-64 pr-4">
      <h4 className="text-step--2 type-label font-normal text-foreground mb-4 uppercase tracking-wider">
        {locale === 'pt' ? 'Nesta página' : 'On this page'}
      </h4>
      <ul className="flex flex-col gap-2 m-0 p-0 list-none border-l border-foreground">
        {toc.map((item) => {
          const indent = (item.level - 2) * 12;
          return (
            <li key={item.id} className="m-0 p-0">
              <a
                href={`#${item.id}`}
                style={{ paddingLeft: `${16 + indent}px` }}
                className={`relative block py-1 type-body text-step--2 no-underline transition-colors
                  before:content-[''] before:absolute before:top-0 before:bottom-0 before:w-[1px] before:-left-[1px] before:bg-foreground before:transition-all before:duration-200 before:origin-center
                  ${activeId === item.id 
                    ? 'text-foreground font-medium before:opacity-100 before:scale-x-[5]' 
                    : 'text-foreground font-light hover:font-medium before:opacity-0 hover:before:opacity-100 hover:before:scale-x-[3]'
                  }
                `}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                if (el) {
                  window.scrollTo({
                    top: el.offsetTop - 100,
                    behavior: 'smooth',
                  });
                }
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
