"use client";

import { ReactLenis } from 'lenis/react';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  // Configuração recomendada para 2026: lerp baixo para inércia rápida e syncTouch
  return (
    <ReactLenis root options={{ lerp: 0.08, syncTouch: true }}>
      {children}
    </ReactLenis>
  );
}
