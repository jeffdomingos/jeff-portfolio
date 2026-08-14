'use client';

import { useEffect, useRef, useState } from 'react';

export default function PagedJsPreview({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [isRendered, setIsRendered] = useState(false);
  const renderInProgress = useRef(false);

  useEffect(() => {
    let paged: any;
    
    // Prevent Paged.js from automatically paginating the entire body
    if (typeof window !== 'undefined') {
        (window as any).PagedConfig = { auto: false };
    }

    async function loadPagedJs() {
      if (renderInProgress.current) return;
      renderInProgress.current = true;

      try {
        // Dynamically import pagedjs since it requires window/document
        const { Previewer } = await import('pagedjs');
        paged = new Previewer();
        
        if (contentRef.current && previewRef.current) {
          previewRef.current.innerHTML = '';
          
          // We can define base page styles directly or let it read from our globals.css
          // We'll pass a custom style block to ensure A4 Landscape is forced.
          const styleContent = `
            @page {
              size: 297mm 210mm;
              margin: 15mm 20mm;
            }
            .columns-2-layout {
              column-count: 2;
              column-gap: 15mm;
            }
            .column-span-all {
              column-span: all;
              -webkit-column-span: all;
            }
            .page-break {
              break-before: page;
              page-break-before: always;
            }
            .page-break-after {
              break-after: page;
              page-break-after: always;
            }
          `;
          const htmlContent = contentRef.current.innerHTML;
          
          // Create a Blob URL for the CSS so Paged.js loads it properly as a stylesheet
          const blob = new Blob([styleContent], { type: 'text/css' });
          const cssUrl = URL.createObjectURL(blob);
          
          await paged.preview(htmlContent, [cssUrl], previewRef.current);
          URL.revokeObjectURL(cssUrl); // Clean up
          
          setIsRendered(true);
        }
      } catch (error) {
        console.error("Error loading Paged.js:", error);
        setIsRendered(true); // Fallback to avoid infinite loading
      }
    }
    
    loadPagedJs();
    
    return () => {
      // Paged.js doesn't have a clean destroy method, but we can clear the DOM
      if (previewRef.current) {
        previewRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <>
      <div ref={contentRef} style={{ display: 'none' }}>
        {children}
      </div>
      
      <div ref={previewRef} className="pagedjs-preview-container" />
      
      {!isRendered && (
        <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
          <p className="text-foreground/60 font-mono uppercase tracking-widest text-sm animate-pulse">
            Gerando paginação inteligente...
          </p>
        </div>
      )}

      {isRendered && (
        <button 
          onClick={() => window.print()}
          className="print-button fixed bottom-8 right-8 bg-foreground text-background px-6 py-3 rounded-full font-bold shadow-xl hover:scale-105 transition-transform z-50 flex items-center gap-2 type-label"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Salvar PDF
        </button>
      )}
    </>
  );
}
