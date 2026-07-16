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
      { rootMargin: '-80px 0px -40% 0px' }
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
      <ul className="flex flex-col gap-2 m-0 p-0 list-none border-l border-foreground ml-[4px]">
        {toc.map((item) => {
          const indent = (item.level - 2) * 12;
          const isActive = activeId === item.id;
          return (
            <li key={item.id} className="m-0 p-0">
              <a
                href={`#${item.id}`}
                className={`relative block py-1 type-body text-step--2 no-underline transition-colors group
                  ${isActive ? 'text-foreground font-medium' : 'text-foreground font-light hover:font-medium'}
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
                {/* 3 Physical Integer Pixel Lines */}
                <div className="absolute left-[-2px] top-0 bottom-0 flex">
                  {/* -1 (Active) */}
                  <div className={`w-[1px] transition-opacity duration-200 ${isActive ? 'bg-foreground opacity-100' : 'opacity-0'}`} />
                  {/* 0 (Base line from UL border) */}
                  <div className="w-[1px]" />
                  {/* +1 (Active) */}
                  <div className={`w-[1px] transition-opacity duration-200 ${isActive ? 'bg-foreground opacity-100' : 'opacity-0'}`} />
                </div>

                <span className="block" style={{ paddingLeft: `${16 + indent}px` }}>
                  {item.title}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
