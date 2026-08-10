import React from 'react';

const MiroFrame = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
  <div className={`relative border-2 border-foreground/10 bg-white/40 p-4 md:p-6 pt-8 mt-4 ${className}`}>
    <div className="absolute -top-[10px] left-4 bg-neutral-100 px-2 text-[11px] font-bold text-foreground/60 uppercase tracking-wider">{title}</div>
    {children}
  </div>
);

const SmallPostIt = ({ children, colorClass, className = "" }: { children: React.ReactNode, colorClass: string, className?: string }) => (
  <div className={`${colorClass} w-28 h-28 md:w-32 md:h-32 p-2 shadow-md text-[10px] md:text-[11px] text-foreground/90 font-medium leading-tight flex items-center justify-center text-center mx-auto ${className}`}>
    <div>{children}</div>
  </div>
);



export function AfyaDiscovery({ locale = 'pt' }: { locale?: string }) {
  const isPt = locale === 'pt';

  return (
    <div 
      className="w-full bg-neutral-100 p-6 md:p-10 relative overflow-hidden" 
      style={{ backgroundImage: 'radial-gradient(#d4d4d8 1px, transparent 1px)', backgroundSize: '20px 20px' }}
    >
      
      <div className="flex flex-col gap-8">
        
        {/* Frame 1: Discovery Phase */}
        <MiroFrame title={isPt ? "Fase de Discovery" : "Discovery Phase"}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Column 1: Personas & Premissas */}
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase mb-4 tracking-widest text-foreground/70 text-center md:text-left">Personas & Premissas</h4>
              <div className="flex flex-col gap-4">
                 <SmallPostIt colorClass="bg-[#FEF08A]"><strong>Reps:</strong> Têm pouco tempo, muitos apps e alta pressão. Solução leve e integrada.</SmallPostIt>
                 <SmallPostIt colorClass="bg-[#FEF08A]"><strong>Médicos:</strong> Agilidade, conteúdo técnico e autonomia.</SmallPostIt>
                 <SmallPostIt colorClass="bg-[#FEF08A]"><strong>Contexto:</strong> A indústria já investe em CRM. Queremos potencializar.</SmallPostIt>
              </div>
            </div>

            {/* Column 2: Desafios Explorados */}
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase mb-4 tracking-widest text-foreground/70 text-center md:text-left">Desafios Explorados</h4>
              <div className="flex flex-col gap-4">
                 <SmallPostIt colorClass="bg-[#BFDBFE]">Treinamento via Role Play IA</SmallPostIt>
                 <SmallPostIt colorClass="bg-[#BFDBFE]">Avaliação de transcrições reais</SmallPostIt>
                 <SmallPostIt colorClass="bg-[#BFDBFE]">Assistente Científico 24/7</SmallPostIt>
                 <SmallPostIt colorClass="bg-[#BFDBFE]">Pílulas diárias gamificadas</SmallPostIt>
                 <SmallPostIt colorClass="bg-[#BFDBFE]">Micro-engajamento contextual</SmallPostIt>
              </div>
            </div>

            {/* Column 3: Pharma Partner (MVP) */}
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase mb-4 tracking-widest text-foreground/70 text-center md:text-left">Pharma Partner (MVP)</h4>
              <div className="flex flex-col gap-4">
                 <SmallPostIt colorClass="bg-[#BBF7D0]"><strong>Público:</strong> Médicos não-visitados c/ opt-in.</SmallPostIt>
                 <SmallPostIt colorClass="bg-[#BBF7D0]"><strong>Canal:</strong> Disparo via WhatsApp Meta + Webhook RX Pro.</SmallPostIt>
                 <SmallPostIt colorClass="bg-[#BBF7D0]" className="relative">
                    {/* FigJam Style Checkmark Sticker */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-[2px_2px_0_0_rgba(0,0,0,0.1)] border border-emerald-600 z-10 rotate-12 hover:rotate-0 transition-transform cursor-pointer" title="Selected MVP">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <strong>Objetivo:</strong> Simular representante, tirando dúvidas via RAG.
                 </SmallPostIt>
              </div>
            </div>

          </div>
        </MiroFrame>

        {/* Frame 2: Flow Architecture */}
        <MiroFrame title={isPt ? "Arquitetura do Fluxo" : "Flow Architecture"}>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-4 w-full py-6 relative z-10">
             
             {/* Node 1 */}
             <div className="px-5 py-3 bg-white border-2 border-foreground/20 rounded-md shadow-sm text-xs font-bold text-foreground text-center min-w-[140px] z-10 relative">
               {isPt ? "Amostra Entregue" : "Sample Delivered"}
             </div>
             
             {/* Arrow */}
             <div className="hidden lg:flex items-center w-8 text-foreground/40"><div className="h-0.5 bg-foreground/40 w-full"></div><div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-foreground/40 -ml-1"></div></div>
             <div className="flex lg:hidden flex-col items-center h-8 text-foreground/40"><div className="w-0.5 bg-foreground/40 h-full"></div><div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-foreground/40 -mt-1"></div></div>
             
             {/* Node 2 */}
             <div className="px-5 py-3 bg-[#BFDBFE] border-2 border-blue-300 rounded-md shadow-sm text-xs font-bold text-foreground text-center min-w-[140px] z-10 relative">
               {isPt ? "Disparo WhatsApp" : "WhatsApp Trigger"}
             </div>
             
             {/* Arrow */}
             <div className="hidden lg:flex items-center w-8 text-foreground/40"><div className="h-0.5 bg-foreground/40 w-full"></div><div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-foreground/40 -ml-1"></div></div>
             <div className="flex lg:hidden flex-col items-center h-8 text-foreground/40"><div className="w-0.5 bg-foreground/40 h-full"></div><div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-foreground/40 -mt-1"></div></div>
             
             {/* Node 3 */}
             <div className="px-5 py-3 bg-[#E0E7FF] border-2 border-indigo-300 rounded-md shadow-sm text-xs font-bold text-foreground text-center min-w-[140px] z-10 relative">
               NLU / LLM Intent
             </div>
             
             {/* Arrow to Split */}
             <div className="hidden lg:flex items-center w-8 text-foreground/40 relative">
               <div className="h-0.5 bg-foreground/40 w-full"></div>
               {/* Fork lines */}
               <div className="absolute right-0 top-1/2 -translate-y-[26px] w-0.5 h-[52px] bg-foreground/40"></div>
               <div className="absolute right-0 -translate-y-[26px] w-2 h-0.5 bg-foreground/40"></div>
               <div className="absolute right-0 translate-y-[24px] w-2 h-0.5 bg-foreground/40"></div>
               <div className="absolute -right-[6px] -translate-y-[29px] w-0 h-0 border-t-3 border-t-transparent border-b-3 border-b-transparent border-l-4 border-l-foreground/40"></div>
               <div className="absolute -right-[6px] translate-y-[21px] w-0 h-0 border-t-3 border-t-transparent border-b-3 border-b-transparent border-l-4 border-l-foreground/40"></div>
             </div>
             <div className="flex lg:hidden flex-col items-center h-8 text-foreground/40 relative">
               <div className="w-0.5 bg-foreground/40 h-full"></div>
               <div className="absolute bottom-0 left-1/2 -translate-x-[75px] h-0.5 w-[150px] bg-foreground/40"></div>
               <div className="absolute bottom-0 left-1/2 -translate-x-[75px] w-0.5 h-2 bg-foreground/40"></div>
               <div className="absolute bottom-0 left-1/2 translate-x-[74px] w-0.5 h-2 bg-foreground/40"></div>
               <div className="absolute bottom-[-6px] left-1/2 -translate-x-[78px] w-0 h-0 border-l-3 border-l-transparent border-r-3 border-r-transparent border-t-4 border-t-foreground/40"></div>
               <div className="absolute bottom-[-6px] left-1/2 translate-x-[71px] w-0 h-0 border-l-3 border-l-transparent border-r-3 border-r-transparent border-t-4 border-t-foreground/40"></div>
             </div>
             
             {/* Node 4 Split */}
             <div className="flex flex-row lg:flex-col gap-3 justify-center z-10 relative">
               <div className="px-5 py-2.5 bg-[#D1FAE5] border-2 border-emerald-300 rounded-md shadow-sm text-[11px] font-bold text-foreground text-center min-w-[140px]">
                 {isPt ? "Sucesso / Tracking" : "Success / Tracking"}
               </div>
               <div className="px-5 py-2.5 bg-[#FEF3C7] border-2 border-amber-300 rounded-md shadow-sm text-[11px] font-bold text-foreground text-center min-w-[140px]">
                 {isPt ? "Suporte (RAG)" : "Support (RAG)"}
               </div>
             </div>

          </div>
        </MiroFrame>

      </div>
    </div>
  )
}
