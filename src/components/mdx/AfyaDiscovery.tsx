import React from 'react';

export function AfyaDiscovery() {
  return (
    <div className="w-full my-fluid-2xl bg-neutral-100 p-6 md:p-10 rounded-none border-2 border-foreground overflow-hidden relative shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
      <div className="absolute top-4 left-4 text-[10px] md:text-xs font-mono text-foreground/50 tracking-widest uppercase">Discovery Canvas / Estratégia</div>
      
      {/* Title */}
      <div className="mt-8 mb-12 text-center max-w-2xl mx-auto">
         <h3 className="text-xl md:text-3xl font-bold text-foreground mb-4 uppercase tracking-tight">WB Assist / Representante IA</h3>
         <p className="text-sm md:text-base text-foreground/80 font-light">Revolucionar a relação da indústria farmacêutica com médicos, criando conexões ágeis e eficazes via WhatsApp, com ou sem a intermediação do representante.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        
        {/* Personas & Premissas */}
        <div className="bg-[#FEF08A] p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] transform -rotate-1 border-2 border-foreground flex flex-col gap-4 hover:rotate-0 transition-transform cursor-default">
           <div className="text-xs font-bold text-foreground uppercase border-b-2 border-foreground/20 pb-2">Personas & Premissas</div>
           <div className="text-sm text-foreground/90 leading-relaxed font-medium space-y-3">
             <p><strong>Reps:</strong> Têm pouco tempo, muitos apps e alta pressão por performance. Qualquer solução precisa ser leve e integrada.</p>
             <p><strong>Médicos:</strong> Valorizam agilidade, conteúdo técnico e autonomia, mas exigem compliance.</p>
             <p><strong>Contexto:</strong> A indústria já investe em CRM (oceano vermelho). Não queremos competir, mas potencializar.</p>
           </div>
        </div>

        {/* Estratégia de Entrada */}
        <div className="bg-[#BFDBFE] p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] transform rotate-1 border-2 border-foreground flex flex-col gap-4 hover:rotate-0 transition-transform cursor-default">
           <div className="text-xs font-bold text-foreground uppercase border-b-2 border-foreground/20 pb-2">Desafios Explorados</div>
           <ul className="text-sm text-foreground/90 space-y-3 list-disc pl-4 font-medium">
             <li>Treinamento de reps via Role Play IA</li>
             <li>Avaliação de visitas reais transcritas</li>
             <li>Assistente Científico 24/7 (Farma Assist)</li>
             <li>Atualização gamificada (Pílulas Diárias)</li>
             <li>Micro-engajamento contextual via Afya Cards</li>
           </ul>
        </div>

        {/* Escolha do MVP */}
        <div className="bg-[#BBF7D0] p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] transform -rotate-2 border-2 border-foreground flex flex-col gap-4 relative hover:rotate-0 transition-transform cursor-default">
           <div className="absolute -top-4 -right-4 bg-[#EF4444] text-white text-[11px] font-bold px-3 py-1.5 rotate-12 shadow-[2px_2px_0_0_rgba(0,0,0,1)] border-2 border-foreground uppercase tracking-widest z-10">Selected MVP</div>
           <div className="text-xs font-bold text-foreground uppercase border-b-2 border-foreground/20 pb-2">Apsen AI Rep (MVP)</div>
           <div className="text-sm text-foreground/90 leading-relaxed font-medium space-y-3">
             <p><strong>Público:</strong> Médicos não-visitados c/ opt-in.</p>
             <p><strong>Canal:</strong> Disparo via WhatsApp Meta + Webhook RX Pro.</p>
             <p><strong>Objetivo:</strong> Simular um representante farmacêutico real, tirando dúvidas científicas via RAG e contornando objeções de forma autônoma.</p>
           </div>
        </div>

      </div>

      {/* Arquitetura Conceitual */}
      <div className="mt-16 bg-white p-6 md:p-8 border-2 border-foreground shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
        <div className="text-xs font-bold text-foreground/60 uppercase mb-8 text-center tracking-widest">Fluxo de Integração (WhatsApp / RX Pro)</div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 text-xs md:text-sm font-bold text-foreground w-full">
           <div className="px-5 py-3 bg-white border-2 border-foreground shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-center w-full lg:w-auto">Amostra Entregue</div>
           <div className="hidden lg:block text-foreground/40">→</div>
           <div className="px-5 py-3 bg-white border-2 border-foreground shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-center w-full lg:w-auto">Disparo WhatsApp</div>
           <div className="hidden lg:block text-foreground/40">→</div>
           <div className="px-5 py-3 bg-[#E0E7FF] border-2 border-foreground shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-center w-full lg:w-auto">NLU / LLM Intent</div>
           <div className="hidden lg:block text-foreground/40">→</div>
           <div className="flex flex-col gap-3 w-full lg:w-auto">
             <div className="px-4 py-2.5 bg-[#D1FAE5] border-2 border-foreground shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-center">Sucesso / Tracking</div>
             <div className="px-4 py-2.5 bg-[#FEF3C7] border-2 border-foreground shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-center">Suporte (RAG)</div>
           </div>
        </div>
      </div>
    </div>
  )
}
