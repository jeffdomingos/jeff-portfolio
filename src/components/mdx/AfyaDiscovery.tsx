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
              <h4 className="text-xs font-bold text-foreground uppercase mb-4 tracking-widest text-foreground/70 text-center md:text-left">
                {isPt ? "Personas & Premissas" : "Personas & Premises"}
              </h4>
              <div className="flex flex-col gap-4">
                 <SmallPostIt colorClass="bg-[#FEF08A]" stacked><strong>{isPt ? "Reps:" : "Reps:"}</strong> {isPt ? "Têm pouco tempo, muitos apps e alta pressão. Solução leve e integrada." : "Short on time, many apps, high pressure. Need a light & integrated solution."}</SmallPostIt>
                 <SmallPostIt colorClass="bg-[#FEF08A]" stacked><strong>{isPt ? "Médicos:" : "HCPs:"}</strong> {isPt ? "Agilidade, conteúdo técnico e autonomia." : "Agility, technical content, and autonomy."}</SmallPostIt>
                 <SmallPostIt colorClass="bg-[#FEF08A]" stacked><strong>{isPt ? "Contexto:" : "Context:"}</strong> {isPt ? "A indústria já investe em CRM. Queremos potencializar." : "Industry already invests in CRM. We want to empower it."}</SmallPostIt>
              </div>
            </div>

            {/* Column 2: Desafios Explorados */}
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase mb-4 tracking-widest text-foreground/70 text-center md:text-left">
                {isPt ? "Desafios Explorados" : "Explored Challenges"}
              </h4>
              <div className="flex flex-col gap-4">
                 <SmallPostIt colorClass="bg-[#BFDBFE]" stacked>{isPt ? "Treinamento via Role Play IA" : "AI Role Play Training"}</SmallPostIt>
                 <SmallPostIt colorClass="bg-[#BFDBFE]" stacked>{isPt ? "Assistente Científico 24/7" : "24/7 Scientific Assistant"}</SmallPostIt>
                 <SmallPostIt colorClass="bg-[#BFDBFE]" stacked>{isPt ? "Micro-engajamento contextual" : "Contextual Micro-engagement"}</SmallPostIt>
              </div>
            </div>

            {/* Column 3: Pharma Partner (MVP) */}
            <div>
              <div className="relative inline-block w-full text-center md:text-left">
                <h4 className="text-xs font-bold text-foreground uppercase mb-4 tracking-widest text-foreground/70 inline-block relative">
                  Pharma Partner (MVP)
                  {/* FigJam Style Checkmark Sticker */}
                  <div className="absolute -top-4 -right-8 w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md border-[3px] border-white z-10 rotate-12 hover:-rotate-3 transition-transform cursor-pointer" title="Selected MVP">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </h4>
              </div>
              <div className="flex flex-col gap-4">
                 <SmallPostIt colorClass="bg-[#BBF7D0]" stacked><strong>{isPt ? "Público:" : "Target:"}</strong> {isPt ? "Médicos não-visitados c/ opt-in." : "Unvisited HCPs with opt-in."}</SmallPostIt>
                 <SmallPostIt colorClass="bg-[#BBF7D0]" stacked><strong>{isPt ? "Canal:" : "Channel:"}</strong> {isPt ? "Disparo via WhatsApp Meta + Webhook RX Pro." : "WhatsApp Meta triggers + RX Pro Webhook."}</SmallPostIt>
                 <SmallPostIt colorClass="bg-[#BBF7D0]" stacked><strong>{isPt ? "Objetivo:" : "Goal:"}</strong> {isPt ? "Simular representante, tirando dúvidas via RAG." : "Simulate reps, answering questions via RAG."}</SmallPostIt>
              </div>
            </div>

          </div>
        </MiroFrame>

        {/* Flow Architecture (No Canvas) */}
        <div className="w-full relative h-[160px] md:h-[200px]">
             {/* Absolute centering trick to prevent flexbox cropping on overflow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row items-center justify-center w-[740px] gap-2 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.75] lg:scale-[0.85] xl:scale-100">
               
               {/* Step 1 */}
               <div className="px-4 py-3 bg-emerald-50 border-2 border-emerald-200 rounded-md shadow-sm text-[11px] font-bold text-foreground text-center min-w-[120px] z-10">
                 {isPt ? "Ação Médico (WhatsApp)" : "HCP Action (WhatsApp)"}
               </div>
               
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground/30 shrink-0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><polyline points="14 6 20 12 14 18"></polyline></svg>
               
               {/* Step 2 */}
               <div className="px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-md shadow-sm text-[11px] font-bold text-foreground text-center min-w-[120px] z-10">
                 {isPt ? "Gatilho (RX Pro)" : "Trigger (RX Pro)"}
               </div>

               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground/30 shrink-0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><polyline points="14 6 20 12 14 18"></polyline></svg>
               
               {/* Step 3 */}
               <div className="px-4 py-3 bg-indigo-50 border-2 border-indigo-200 rounded-md shadow-sm text-[11px] font-bold text-foreground text-center min-w-[120px] z-10">
                 NLU Router
               </div>
               
               {/* Fork Line Desktop */}
               <div className="flex items-center w-8 text-foreground/30 relative">
                 <div className="h-0.5 bg-foreground/30 w-full"></div>
                 <div className="absolute right-0 top-1/2 -translate-y-[26px] w-0.5 h-[52px] bg-foreground/30"></div>
                 <div className="absolute right-0 -translate-y-[26px] w-2 h-0.5 bg-foreground/30"></div>
                 <div className="absolute right-0 translate-y-[24px] w-2 h-0.5 bg-foreground/30"></div>
                 <div className="absolute -right-[6px] -translate-y-[29px] w-0 h-0 border-t-3 border-t-transparent border-b-3 border-b-transparent border-l-4 border-l-foreground/30"></div>
                 <div className="absolute -right-[6px] translate-y-[21px] w-0 h-0 border-t-3 border-t-transparent border-b-3 border-b-transparent border-l-4 border-l-foreground/30"></div>
               </div>
               
               {/* Step 4 Split */}
               <div className="flex flex-col gap-4 justify-center z-10 relative">
                 <div className="px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-md shadow-sm text-[11px] font-bold text-foreground text-center min-w-[120px]">
                   {isPt ? "RAG + LLM Resposta" : "RAG + LLM Response"}
                 </div>
                 <div className="px-4 py-3 bg-rose-50 border-2 border-rose-200 rounded-md shadow-sm text-[11px] font-bold text-foreground text-center min-w-[120px]">
                   {isPt ? "Transbordo Humano" : "Human Handoff"}
                 </div>
               </div>
               
               {/* Merge Line Desktop */}
               <div className="flex items-center w-8 text-foreground/30 relative">
                 <div className="absolute left-0 top-1/2 -translate-y-[26px] w-2 h-0.5 bg-foreground/30"></div>
                 <div className="absolute left-0 translate-y-[24px] w-2 h-0.5 bg-foreground/30"></div>
                 <div className="absolute left-2 top-1/2 -translate-y-[26px] w-0.5 h-[52px] bg-foreground/30"></div>
                 <div className="absolute left-2 top-1/2 -translate-y-[1px] w-6 h-0.5 bg-foreground/30"></div>
                 <div className="absolute right-[-6px] top-1/2 -translate-y-[5px] w-0 h-0 border-t-3 border-t-transparent border-b-3 border-b-transparent border-l-4 border-l-foreground/30"></div>
               </div>
               
               {/* Step 5 */}
               <div className="px-4 py-3 bg-neutral-100 border-2 border-foreground/20 rounded-md shadow-sm text-[11px] font-bold text-foreground text-center min-w-[120px] z-10">
                 CSAT & Logs
               </div>

             </div>
          </div>

      </div>
    </div>
  )
}
