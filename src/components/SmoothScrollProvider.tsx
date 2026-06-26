"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ReactLenis, useLenis } from 'lenis/react';

function ScrollResetter() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    // Disable browser's default scroll restoration to prevent conflicts
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Immediate forced scroll
    window.scrollTo(0, 0);
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }

    // Fallback delayed scroll (to ensure it catches after DOM updates)
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
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
