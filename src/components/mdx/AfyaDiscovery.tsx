import React from 'react';

export function AfyaDiscovery({ locale = 'pt' }: { locale?: string }) {
  return (
    <div className="w-full bg-neutral-100 p-2 md:p-4 relative">
      
      {/* Title */}
      <div className="mt-6 mb-8 text-center max-w-2xl mx-auto">
         <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 uppercase tracking-tight">Assistente / Representante IA</h3>
         <p className="text-sm text-foreground/80 font-light">Revolucionar a relação da indústria farmacêutica com médicos, criando conexões ágeis e eficazes via WhatsApp, com ou sem a intermediação do representante.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        
        {/* Personas & Premissas */}
        <div className="bg-[#FEF08A] p-5 shadow-md flex flex-col gap-4">
           <div className="text-xs font-bold text-foreground uppercase border-b border-foreground/10 pb-2">Personas & Premissas</div>
           <div className="text-sm text-foreground/90 leading-relaxed font-medium space-y-3">
             <p><strong>Reps:</strong> Têm pouco tempo, muitos apps e alta pressão por performance. Qualquer solução precisa ser leve e integrada.</p>
             <p><strong>Médicos:</strong> Valorizam agilidade, conteúdo técnico e autonomia, mas exigem compliance.</p>
             <p><strong>Contexto:</strong> A indústria já investe em CRM. Não queremos competir, mas potencializar.</p>
           </div>
        </div>

        {/* Estratégia de Entrada */}
        <div className="bg-[#BFDBFE] p-5 shadow-md flex flex-col gap-4">
           <div className="text-xs font-bold text-foreground uppercase border-b border-foreground/10 pb-2">Desafios Explorados</div>
           <ul className="text-sm text-foreground/90 space-y-3 list-disc pl-4 font-medium">
             <li>Treinamento de reps via Role Play IA</li>
             <li>Avaliação de visitas reais transcritas</li>
             <li>Assistente Científico 24/7</li>
             <li>Atualização gamificada (Pílulas Diárias)</li>
             <li>Micro-engajamento contextual</li>
           </ul>
        </div>

        {/* Escolha do MVP */}
        <div className="bg-[#BBF7D0] p-5 shadow-md flex flex-col gap-4 relative">
           <div className="absolute -top-3 -right-3 bg-[#EF4444] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest z-10">
             {locale === 'pt' ? 'MVP Selecionado' : 'Selected MVP'}
           </div>
           <div className="text-xs font-bold text-foreground uppercase border-b border-foreground/10 pb-2">Pharma Partner (MVP)</div>
           <div className="text-sm text-foreground/90 leading-relaxed font-medium space-y-3">
             <p><strong>Público:</strong> Médicos não-visitados c/ opt-in.</p>
             <p><strong>Canal:</strong> Disparo via WhatsApp Meta + Webhook RX Pro.</p>
             <p><strong>Objetivo:</strong> Simular um representante farmacêutico real, tirando dúvidas científicas via RAG e contornando objeções de forma autônoma.</p>
           </div>
        </div>

      </div>

      {/* Arquitetura Conceitual */}
      <div className="mt-8 p-6">
        <div className="text-xs font-bold text-foreground/60 uppercase mb-8 text-center tracking-widest">Fluxo de Integração (WhatsApp / RX Pro)</div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6 text-xs font-bold text-foreground w-full">
           <div className="w-32 h-32 p-4 bg-[#FEF08A] shadow-md flex items-center justify-center text-center">Amostra Entregue</div>
           <div className="hidden lg:block text-foreground/40">→</div>
           <div className="block lg:hidden text-foreground/40">↓</div>
           
           <div className="w-32 h-32 p-4 bg-[#BFDBFE] shadow-md flex items-center justify-center text-center">Disparo WhatsApp</div>
           <div className="hidden lg:block text-foreground/40">→</div>
           <div className="block lg:hidden text-foreground/40">↓</div>
           
           <div className="w-32 h-32 p-4 bg-[#E0E7FF] shadow-md flex items-center justify-center text-center">NLU / LLM Intent</div>
           <div className="hidden lg:block text-foreground/40">→</div>
           <div className="block lg:hidden text-foreground/40">↓</div>
           
           <div className="flex flex-row lg:flex-col gap-4 lg:gap-6 w-full lg:w-auto justify-center">
             <div className="w-32 h-32 p-4 bg-[#D1FAE5] shadow-md flex items-center justify-center text-center mx-auto">Sucesso / Tracking</div>
             <div className="w-32 h-32 p-4 bg-[#FEF3C7] shadow-md flex items-center justify-center text-center mx-auto">Suporte (RAG)</div>
           </div>
        </div>
      </div>
    </div>
  )
}
