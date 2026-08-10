import React from 'react';

const MiroFrame = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
  <div className={`relative border-2 border-foreground/10 bg-white/40 p-4 md:p-6 pt-8 mt-4 ${className}`}>
    <div className="absolute -top-[10px] left-4 bg-neutral-100 px-2 text-[11px] font-bold text-foreground/60 uppercase tracking-wider">{title}</div>
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
        <MiroFrame title={isPt ? "Fase de Discovery" : "Discovery Phase"}>
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
        <MiroFrame title={isPt ? "Arquitetura do Fluxo" : "Flow Architecture"}>
          <div className="w-full overflow-x-auto py-4 hidden-scrollbar flex justify-center">
            <div className="w-[620px] h-[280px] min-w-[620px] relative bg-white/30 border border-foreground/10 rounded-md overflow-hidden">
              
              {/* Complex SVG Connectors */}
              <svg className="absolute inset-0 w-full h-full" stroke="currentColor" fill="none" strokeWidth="1.5">
                 {/* Entry */}
                 <path d="M 60 52 L 170 102" className="text-foreground/20" />
                 <path d="M 60 152 L 170 102" className="text-foreground/20" />
                 <path d="M 170 102 L 270 102" className="text-foreground/40" />
                 
                 {/* Router Splits */}
                 <path d="M 270 102 L 350 62" className="text-foreground/30" />
                 <path d="M 270 102 L 350 142" className="text-foreground/30" />
                 <path d="M 270 102 L 350 222" className="text-foreground/30" />
                 
                 {/* Processing */}
                 <path d="M 350 62 L 450 62" className="text-blue-300" />
                 <path d="M 350 142 L 450 142" className="text-indigo-300" />
                 <path d="M 350 222 L 450 222" className="text-amber-300" />
                 
                 {/* DB connect */}
                 <path d="M 350 142 L 350 182" className="text-foreground/20 border-dashed" strokeDasharray="3 3" />
                 
                 {/* Merging to Response */}
                 <path d="M 450 62 L 540 102" className="text-blue-300" />
                 <path d="M 450 142 L 540 102" className="text-indigo-300" />
                 
                 {/* Logging / Escalate */}
                 <path d="M 540 102 L 540 222" className="text-foreground/20 border-dashed" strokeDasharray="2 2" />
                 <path d="M 450 222 L 540 222" className="text-foreground/20 border-dashed" strokeDasharray="2 2" />
                 
                 {/* External feedback loop noise */}
                 <path d="M 540 222 L 540 260 L 170 260 L 170 102" className="text-foreground/10" strokeDasharray="4 4" />
              </svg>

              {/* Helper for Nodes */}
              {(() => {
                const MiniNode = ({ text, color = "bg-white", border = "border-foreground/20", textColor = "text-foreground", top, left }: any) => (
                  <div className={`absolute px-2 py-1.5 ${color} border ${border} rounded-[4px] shadow-sm text-[8px] font-bold ${textColor} text-center w-20 leading-tight z-10 flex items-center justify-center`} style={{ top: `${top}px`, left: `${left}px`, minHeight: "24px" }}>
                    {text}
                  </div>
                );
                return (
                  <>
                    <MiniNode text="Ação Médico (WhatsApp)" color="bg-emerald-50" border="border-emerald-200" top={40} left={20} />
                    <MiniNode text="Ação Rep (RX Pro / Web)" color="bg-amber-50" border="border-amber-200" top={140} left={20} />
                    
                    <MiniNode text="API Gateway" color="bg-neutral-800" border="border-neutral-900" textColor="text-white" top={90} left={130} />
                    
                    <MiniNode text="NLU Router" color="bg-indigo-50" border="border-indigo-200" top={90} left={230} />
                    
                    <MiniNode text="FAQ Cache" top={50} left={310} />
                    <MiniNode text="Vector DB" color="bg-neutral-100" top={170} left={310} />
                    <MiniNode text="RAG Search" color="bg-blue-50" border="border-blue-200" top={130} left={310} />
                    <MiniNode text="Handoff p/ Rep" color="bg-rose-50" border="border-rose-200" top={210} left={310} />
                    
                    <MiniNode text="Match Found" top={50} left={410} />
                    <MiniNode text="LLM Generator" color="bg-purple-50" border="border-purple-200" top={130} left={410} />
                    <MiniNode text="Análise Humana" color="bg-rose-50" border="border-rose-200" top={210} left={410} />
                    
                    <MiniNode text="Resposta Médico" color="bg-emerald-50" border="border-emerald-200" top={90} left={500} />
                    <MiniNode text="Follow-up Rep" color="bg-amber-50" border="border-amber-200" top={210} left={500} />
                  </>
                )
              })()}

            </div>
          </div>
        </MiroFrame>

      </div>
    </div>
  )
}
