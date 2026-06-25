"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ReactLenis, useLenis } from 'lenis/react';

function ScrollResetter() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return null;
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  // Configuração recomendada para 2026: lerp baixo para inércia rápida e syncTouch
  return (
    <ReactLenis root options={{ lerp: 0.08, smoothTouch: false, syncTouch: false }}>
      <ScrollResetter />
      {children}
    </ReactLenis>
  );
}
