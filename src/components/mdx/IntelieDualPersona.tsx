'use client';

import React from 'react';

export function IntelieDualPersona({ locale = 'pt' }: { locale?: string }) {
  const isPt = locale === 'pt';

  return (
    <div className="w-full my-12 relative flex justify-center items-center overflow-hidden rounded-2xl bg-[#0F1115] border border-white/10 py-16 md:py-24">
      
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-[80px]" />
      </div>

      {/* Scalable Container for Mobile */}
      <div className="relative w-[700px] h-[360px] transform origin-center scale-[0.45] sm:scale-[0.6] md:scale-[0.8] lg:scale-100 flex items-center justify-center">
        
        {/* Left Circle (Internal) */}
        <div className="absolute left-[50px] w-[360px] h-[360px] rounded-full border-[1.5px] border-blue-400/30 bg-gradient-to-br from-blue-500/10 to-transparent backdrop-blur-sm flex flex-col items-start justify-center pl-12 pr-24 z-10 transition-transform duration-500 hover:scale-105 hover:border-blue-400/60">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
            </div>
            <h4 className="text-xl font-bold text-white tracking-tight">
              {isPt ? "Usuários Internos" : "Internal Users"}
            </h4>
          </div>
          <ul className="space-y-2 text-sm text-blue-100/70 font-medium">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400/50" />
              {isPt ? "Acesso a Logs Brutos" : "Raw Log Access"}
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400/50" />
              {isPt ? "Troubleshooting Profundo" : "Deep Troubleshooting"}
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400/50" />
              {isPt ? "Análise de Causa Raiz" : "Root Cause Analysis"}
            </li>
          </ul>
        </div>

        {/* Right Circle (Client) */}
        <div className="absolute right-[50px] w-[360px] h-[360px] rounded-full border-[1.5px] border-fuchsia-400/30 bg-gradient-to-bl from-fuchsia-500/10 to-transparent backdrop-blur-sm flex flex-col items-end justify-center pr-12 pl-24 z-20 transition-transform duration-500 hover:scale-105 hover:border-fuchsia-400/60">
          <div className="flex items-center gap-3 mb-4 flex-row-reverse">
            <div className="p-2 bg-fuchsia-500/20 rounded-lg text-fuchsia-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            </div>
            <h4 className="text-xl font-bold text-white tracking-tight">
              {isPt ? "Clientes (Usuários)" : "Client Users"}
            </h4>
          </div>
          <ul className="space-y-2 text-sm text-fuchsia-100/70 font-medium text-right">
            <li className="flex items-center gap-2 justify-end">
              {isPt ? "Métricas de Negócio" : "Business Metrics"}
              <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-400/50" />
            </li>
            <li className="flex items-center gap-2 justify-end">
              {isPt ? "Monitoramento de Uptime" : "Uptime Monitoring"}
              <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-400/50" />
            </li>
            <li className="flex items-center gap-2 justify-end">
              {isPt ? "Alertas de SLA" : "SLA Alerts"}
              <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-400/50" />
            </li>
          </ul>
        </div>

        {/* Center Intersection Badge */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center min-w-[200px]">
            <div className="w-10 h-10 mb-2 rounded-full bg-gradient-to-r from-blue-500 to-fuchsia-500 flex items-center justify-center text-white shadow-inner">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <span className="text-xs uppercase tracking-widest text-white/70 font-semibold mb-1">
              {isPt ? "A Solução" : "The Solution"}
            </span>
            <span className="text-sm font-bold text-white text-center leading-tight">
              Performance<br/>Report
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
