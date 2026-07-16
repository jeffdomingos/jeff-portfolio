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
        {toc.map((item) => (
          <li 
            key={item.id} 
            className="m-0 p-0"
            style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
          >
            <a
              href={`#${item.id}`}
              className={`block py-1 transition-all type-body text-step--2 no-underline
                ${activeId === item.id 
                  ? 'border-l-[5px] border-foreground text-foreground font-medium pl-[14px] -ml-[3px]' 
                  : 'border-l-[1px] border-transparent text-foreground font-light pl-[16px] -ml-[1px] hover:font-medium hover:border-l-[3px] hover:border-foreground hover:-ml-[2px] hover:pl-[15px]'
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
