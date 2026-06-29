"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ReactLenis, useLenis } from 'lenis/react';

function ScrollResetter() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    // Immediate forced scroll
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    if (lenis) {
      lenis.stop();
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true, force: true });
      requestAnimationFrame(() => {
        if (!document.documentElement.classList.contains('is-loading')) {
          lenis.start();
        }
      });
    }

    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      if (lenis) {
        lenis.stop();
        window.scrollTo(0, 0);
        lenis.scrollTo(0, { immediate: true, force: true });
        requestAnimationFrame(() => {
          if (!document.documentElement.classList.contains('is-loading')) {
            lenis.start();
          }
        });
      }
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [pathname, lenis]);

  return null;
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  // Configuração recomendada para 2026: lerp baixo para inércia rápida e syncTouch
  return (
    <ReactLenis root options={{ lerp: 0.08, syncTouch: false }}>
      <ScrollResetter />
      {children}
    </ReactLenis>
  );
}
