'use client';

import React from 'react';

export function IntelieBottleneck({ locale = 'pt' }: { locale?: string }) {
  const isPt = locale === 'pt';

  return (
    <div className="w-full my-12 relative flex justify-center items-center overflow-hidden rounded-2xl bg-[#0F1115] border border-white/10 py-16 md:py-24">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-500/20 rounded-full blur-[120px]" />
      </div>

      {/* Scalable Container for Mobile */}
      <div className="relative w-full max-w-[500px] transform origin-top scale-[0.75] sm:scale-[0.85] md:scale-100 flex flex-col items-center gap-6 z-10 px-6">
        
        {/* Connection Line */}
        <div className="absolute top-0 bottom-0 left-[39px] sm:left-1/2 sm:-translate-x-1/2 w-0.5 bg-gradient-to-b from-green-500/20 via-yellow-500/20 to-red-500/50 z-0" />

        {/* Top Layer - UI */}
        <div className="relative z-10 flex w-full flex-col sm:flex-row items-start sm:items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md shadow-lg transition-transform hover:scale-[1.02] duration-300">
          <div className="flex-shrink-0 w-14 h-14 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center justify-center text-green-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
          </div>
          <div className="flex-1">
            <h4 className="text-white font-bold text-lg mb-1">
              {isPt ? "Interface (Renderização)" : "UI (Rendering)"}
            </h4>
            <div className="flex items-center gap-2 text-sm text-green-400/80 font-mono">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              {isPt ? "Tempo: 45ms" : "Time: 45ms"}
            </div>
          </div>
        </div>

        {/* Middle Layer - Network */}
        <div className="relative z-10 flex w-full flex-col sm:flex-row items-start sm:items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md shadow-lg transition-transform hover:scale-[1.02] duration-300">
          <div className="flex-shrink-0 w-14 h-14 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-center justify-center text-yellow-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          </div>
          <div className="flex-1">
            <h4 className="text-white font-bold text-lg mb-1">
              {isPt ? "Transferência de Rede" : "Network Transfer"}
            </h4>
            <div className="flex items-center gap-2 text-sm text-yellow-400/80 font-mono">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              {isPt ? "Tempo: 120ms" : "Time: 120ms"}
            </div>
          </div>
        </div>

        {/* Bottom Layer - Database Query (The Bottleneck) */}
        <div className="relative z-10 flex w-full flex-col sm:flex-row items-start sm:items-center gap-4 bg-red-500/10 border-2 border-red-500/50 p-6 rounded-2xl backdrop-blur-md shadow-[0_0_40px_rgba(239,68,68,0.2)] animate-pulse transition-transform hover:scale-[1.02] duration-300">
          <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
            {isPt ? "Gargalo Crítico" : "Critical Bottleneck"}
          </div>
          <div className="flex-shrink-0 w-14 h-14 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center justify-center text-red-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
          </div>
          <div className="flex-1">
            <h4 className="text-white font-bold text-lg mb-1">
              {isPt ? "Execução da Query (DB)" : "Query Execution (DB)"}
            </h4>
            <div className="flex items-center gap-2 text-sm text-red-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              {isPt ? "Tempo: 8.4s (Timeout)" : "Time: 8.4s (Timeout)"}
            </div>
            <p className="mt-2 text-sm text-red-200/70 leading-relaxed">
              {isPt 
                ? "Dificuldade técnica invisível para o usuário final que derruba a performance do painel." 
                : "Invisible technical difficulty to the end user that crashes the dashboard performance."}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
