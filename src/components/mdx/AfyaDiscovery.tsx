import React from 'react';

const MiroFrame = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
  <div className={`relative border-2 border-foreground/10 bg-white/40 p-6 pt-8 mt-4 ${className}`}>
    <div className="absolute -top-[10px] left-4 bg-neutral-100 px-2 text-[11px] font-bold text-foreground/60 uppercase tracking-wider">{title}</div>
    {children}
  </div>
);

const PostIt = ({ children, colorClass, className = "" }: { children: React.ReactNode, colorClass: string, className?: string }) => (
  <div className={`${colorClass} p-4 md:p-5 shadow-md flex flex-col gap-3 text-sm text-foreground/90 font-medium leading-relaxed ${className}`}>
    {children}
  </div>
);

const SquarePostIt = ({ text, colorClass }: { text: string, colorClass: string }) => (
  <div className={`w-28 h-28 p-3 ${colorClass} shadow-md flex items-center justify-center text-center text-xs font-bold text-foreground leading-snug mx-auto`}>
    {text}
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
            
            <PostIt colorClass="bg-[#FEF08A]">
              <div className="text-xs font-bold text-foreground uppercase border-b border-foreground/10 pb-1 mb-1">Personas & Premissas</div>
              <p><strong>Reps:</strong> Têm pouco tempo, muitos apps e alta pressão. Solução precisa ser leve e integrada.</p>
              <p><strong>Médicos:</strong> Agilidade, conteúdo técnico e autonomia.</p>
              <p><strong>Contexto:</strong> A indústria já investe em CRM. Não queremos competir, mas potencializar.</p>
            </PostIt>

            <PostIt colorClass="bg-[#BFDBFE]">
              <div className="text-xs font-bold text-foreground uppercase border-b border-foreground/10 pb-1 mb-1">Desafios Explorados</div>
              <ul className="list-disc pl-4 space-y-2">
                <li>Treinamento via Role Play IA</li>
                <li>Avaliação de transcrições reais</li>
                <li>Assistente Científico 24/7</li>
                <li>Pílulas diárias gamificadas</li>
                <li>Micro-engajamento contextual</li>
              </ul>
            </PostIt>

            <PostIt colorClass="bg-[#BBF7D0]" className="relative">
              <div className="absolute -top-3 -right-3 bg-[#EF4444] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest shadow-sm">
                {isPt ? 'MVP Selecionado' : 'Selected MVP'}
              </div>
              <div className="text-xs font-bold text-foreground uppercase border-b border-foreground/10 pb-1 mb-1">Pharma Partner (MVP)</div>
              <p><strong>Público:</strong> Médicos não-visitados c/ opt-in.</p>
              <p><strong>Canal:</strong> Disparo via WhatsApp Meta + Webhook RX Pro.</p>
              <p><strong>Objetivo:</strong> Simular um representante real, tirando dúvidas científicas via RAG de forma autônoma.</p>
            </PostIt>

          </div>
        </MiroFrame>

        {/* Frame 2: Flow Architecture */}
        <MiroFrame title={isPt ? "Arquitetura do Fluxo" : "Flow Architecture"}>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6 w-full pt-2">
             
             <SquarePostIt text={isPt ? "Amostra Entregue" : "Sample Delivered"} colorClass="bg-[#FEF08A]" />
             
             <div className="hidden lg:block text-foreground/40 font-light text-xl">→</div>
             <div className="block lg:hidden text-foreground/40 font-light text-xl">↓</div>
             
             <SquarePostIt text={isPt ? "Disparo WhatsApp" : "WhatsApp Trigger"} colorClass="bg-[#BFDBFE]" />
             
             <div className="hidden lg:block text-foreground/40 font-light text-xl">→</div>
             <div className="block lg:hidden text-foreground/40 font-light text-xl">↓</div>
             
             <SquarePostIt text="NLU / LLM Intent" colorClass="bg-[#E0E7FF]" />
             
             <div className="hidden lg:block text-foreground/40 font-light text-xl">→</div>
             <div className="block lg:hidden text-foreground/40 font-light text-xl">↓</div>
             
             <div className="flex flex-row lg:flex-col gap-4 lg:gap-6 justify-center">
               <SquarePostIt text={isPt ? "Sucesso / Tracking" : "Success / Tracking"} colorClass="bg-[#D1FAE5]" />
               <SquarePostIt text={isPt ? "Suporte (RAG)" : "Support (RAG)"} colorClass="bg-[#FEF3C7]" />
             </div>

          </div>
        </MiroFrame>

      </div>
    </div>
  )
}
