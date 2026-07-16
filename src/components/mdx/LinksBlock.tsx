import React from 'react';

interface LinkItem {
  label: string;
  url: string;
}

interface LinksBlockProps {
  title?: string;
  items?: LinkItem[];
}

export function LinksBlock({ title = "Referências", items }: LinksBlockProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="my-10 p-6 bg-foreground/5 border border-foreground/10 rounded-2xl">
      <h3 className="text-step-0 font-bold mb-4 flex items-center gap-2 text-foreground">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        {title}
      </h3>
      <ul className="flex flex-col gap-3 m-0 p-0 list-none">
        {items.map((item, index) => (
          <li key={index} className="m-0 p-0">
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-start sm:items-center gap-3 p-3 -mx-3 rounded-lg hover:bg-foreground/5 transition-colors no-underline text-foreground/80 hover:text-primary"
            >
              <div className="mt-1 sm:mt-0 p-2 bg-background rounded-full border border-foreground/10 group-hover:border-primary/30 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
              </div>
              <span className="font-medium type-body leading-tight text-step--1">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
