import React from 'react';

const MiroFrame = ({ title, children, className = "" }: { title?: string, children: React.ReactNode, className?: string }) => (
  <div className={`relative border-2 border-foreground/10 bg-white p-4 md:p-6 mt-4 ${className}`}>
    {title && <div className="absolute -top-[10px] left-4 bg-neutral-100 px-2 text-[11px] font-bold text-foreground/60 uppercase tracking-wider">{title}</div>}
    {children}
  </div>
);

const SmallPostIt = ({ children, colorClass, className = "", stacked = false }: { children: React.ReactNode, colorClass: string, className?: string, stacked?: boolean }) => (
  <div className="relative mx-auto group">
    {stacked && (
      <>
        <div className={`absolute inset-0 ${colorClass} w-28 h-28 md:w-32 md:h-32 shadow-[1px_1px_2px_rgba(0,0,0,0.1)] transform rotate-6 opacity-70`}></div>
        <div className={`absolute inset-0 ${colorClass} w-28 h-28 md:w-32 md:h-32 shadow-[1px_1px_2px_rgba(0,0,0,0.1)] transform -rotate-3 opacity-90`}></div>
      </>
    )}
    <div className={`relative ${colorClass} w-28 h-28 md:w-32 md:h-32 p-2 shadow-md text-[10px] md:text-[11px] text-foreground/90 font-medium leading-tight flex items-center justify-center text-center transition-transform group-hover:-translate-y-1 z-10 ${className}`}>
      <div>{children}</div>
    </div>
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
        <MiroFrame>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Column 1: Personas & Premissas */}
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase mb-4 tracking-widest text-foreground/70 text-center md:text-left">Personas & Premissas</h4>
              <div className="flex flex-col gap-4">
                 <SmallPostIt colorClass="bg-[#FEF08A]"><strong>Reps:</strong> Têm pouco tempo, muitos apps e alta pressão. Solução leve e integrada.</SmallPostIt>
                 <SmallPostIt colorClass="bg-[#FEF08A]"><strong>Médicos:</strong> Agilidade, conteúdo técnico e autonomia.</SmallPostIt>
                 <SmallPostIt colorClass="bg-[#FEF08A]" stacked><strong>Contexto:</strong> A indústria já investe em CRM. Queremos potencializar.</SmallPostIt>
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
                 <SmallPostIt colorClass="bg-[#BFDBFE]" stacked>Micro-engajamento contextual</SmallPostIt>
              </div>
            </div>

            {/* Column 3: Pharma Partner (MVP) */}
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase mb-4 tracking-widest text-foreground/70 text-center md:text-left">Pharma Partner (MVP)</h4>
              <div className="flex flex-col gap-4">
                 <SmallPostIt colorClass="bg-[#BBF7D0]"><strong>Público:</strong> Médicos não-visitados c/ opt-in.</SmallPostIt>
                 <SmallPostIt colorClass="bg-[#BBF7D0]"><strong>Canal:</strong> Disparo via WhatsApp Meta + Webhook RX Pro.</SmallPostIt>
                 <SmallPostIt colorClass="bg-[#BBF7D0]" stacked className="relative">
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
        <MiroFrame>
          <div className="w-full overflow-x-auto py-6 hidden-scrollbar flex justify-center">
             <div className="flex flex-col lg:flex-row items-center justify-center w-full min-w-[700px] gap-2 lg:gap-3">
               
               {/* Step 1 */}
               <div className="px-4 py-3 bg-emerald-50 border-2 border-emerald-200 rounded-md shadow-sm text-[11px] font-bold text-foreground text-center min-w-[120px] z-10">
                 Ação Médico (WhatsApp)
               </div>
               
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground/30 hidden lg:block shrink-0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><polyline points="14 6 20 12 14 18"></polyline></svg>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground/30 block lg:hidden my-2 shrink-0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="4" x2="12" y2="20"></line><polyline points="6 14 12 20 18 14"></polyline></svg>
               
               {/* Step 2 */}
               <div className="px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-md shadow-sm text-[11px] font-bold text-foreground text-center min-w-[120px] z-10">
                 Gatilho (RX Pro)
               </div>

               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground/30 hidden lg:block shrink-0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><polyline points="14 6 20 12 14 18"></polyline></svg>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground/30 block lg:hidden my-2 shrink-0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="4" x2="12" y2="20"></line><polyline points="6 14 12 20 18 14"></polyline></svg>
               
               {/* Step 3 */}
               <div className="px-4 py-3 bg-indigo-50 border-2 border-indigo-200 rounded-md shadow-sm text-[11px] font-bold text-foreground text-center min-w-[120px] z-10">
                 NLU Router
               </div>
               
               {/* Fork Line Desktop */}
               <div className="hidden lg:flex items-center w-8 text-foreground/30 relative">
                 <div className="h-0.5 bg-foreground/30 w-full"></div>
                 <div className="absolute right-0 top-1/2 -translate-y-[26px] w-0.5 h-[52px] bg-foreground/30"></div>
                 <div className="absolute right-0 -translate-y-[26px] w-2 h-0.5 bg-foreground/30"></div>
                 <div className="absolute right-0 translate-y-[24px] w-2 h-0.5 bg-foreground/30"></div>
                 <div className="absolute -right-[6px] -translate-y-[29px] w-0 h-0 border-t-3 border-t-transparent border-b-3 border-b-transparent border-l-4 border-l-foreground/30"></div>
                 <div className="absolute -right-[6px] translate-y-[21px] w-0 h-0 border-t-3 border-t-transparent border-b-3 border-b-transparent border-l-4 border-l-foreground/30"></div>
               </div>
               {/* Fork Line Mobile */}
               <div className="flex lg:hidden flex-col items-center h-8 text-foreground/30 relative">
                 <div className="w-0.5 bg-foreground/30 h-full"></div>
                 <div className="absolute bottom-0 left-1/2 -translate-x-[70px] h-0.5 w-[140px] bg-foreground/30"></div>
                 <div className="absolute bottom-0 left-1/2 -translate-x-[70px] w-0.5 h-2 bg-foreground/30"></div>
                 <div className="absolute bottom-0 left-1/2 translate-x-[69px] w-0.5 h-2 bg-foreground/30"></div>
                 <div className="absolute bottom-[-6px] left-1/2 -translate-x-[73px] w-0 h-0 border-l-3 border-l-transparent border-r-3 border-r-transparent border-t-4 border-t-foreground/30"></div>
                 <div className="absolute bottom-[-6px] left-1/2 translate-x-[66px] w-0 h-0 border-l-3 border-l-transparent border-r-3 border-r-transparent border-t-4 border-t-foreground/30"></div>
               </div>
               
               {/* Step 4 Split */}
               <div className="flex flex-row lg:flex-col gap-4 justify-center z-10 relative">
                 <div className="px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-md shadow-sm text-[11px] font-bold text-foreground text-center min-w-[120px]">
                   RAG + LLM Resposta
                 </div>
                 <div className="px-4 py-3 bg-rose-50 border-2 border-rose-200 rounded-md shadow-sm text-[11px] font-bold text-foreground text-center min-w-[120px]">
                   Transbordo Humano
                 </div>
               </div>
               
               {/* Merge Line Desktop */}
               <div className="hidden lg:flex items-center w-8 text-foreground/30 relative">
                 <div className="absolute left-0 top-1/2 -translate-y-[26px] w-2 h-0.5 bg-foreground/30"></div>
                 <div className="absolute left-0 translate-y-[24px] w-2 h-0.5 bg-foreground/30"></div>
                 <div className="absolute left-2 top-1/2 -translate-y-[26px] w-0.5 h-[52px] bg-foreground/30"></div>
                 <div className="absolute left-2 top-1/2 -translate-y-[1px] w-6 h-0.5 bg-foreground/30"></div>
                 <div className="absolute right-[-6px] top-1/2 -translate-y-[5px] w-0 h-0 border-t-3 border-t-transparent border-b-3 border-b-transparent border-l-4 border-l-foreground/30"></div>
               </div>
               
               {/* Merge Line Mobile */}
               <div className="flex lg:hidden flex-col items-center h-8 text-foreground/30 relative">
                 <div className="absolute top-0 left-1/2 -translate-x-[70px] w-0.5 h-2 bg-foreground/30"></div>
                 <div className="absolute top-0 left-1/2 translate-x-[69px] w-0.5 h-2 bg-foreground/30"></div>
                 <div className="absolute top-2 left-1/2 -translate-x-[70px] h-0.5 w-[140px] bg-foreground/30"></div>
                 <div className="absolute top-2 left-1/2 -translate-x-[1px] w-0.5 h-6 bg-foreground/30"></div>
                 <div className="absolute bottom-[-6px] left-1/2 -translate-x-[4px] w-0 h-0 border-l-3 border-l-transparent border-r-3 border-r-transparent border-t-4 border-t-foreground/30"></div>
               </div>

               {/* Step 5 */}
               <div className="px-4 py-3 bg-neutral-100 border-2 border-foreground/20 rounded-md shadow-sm text-[11px] font-bold text-foreground text-center min-w-[120px] z-10">
                 CSAT & Logs
               </div>

             </div>
          </div>
        </MiroFrame>

      </div>
    </div>
  )
}
