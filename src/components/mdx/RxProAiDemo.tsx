"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, FileText, RotateCcw, Bot, User, CheckCircle2 } from "lucide-react";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  source?: string;
  thinking?: boolean;
}

const PRESET_PROMPTS = [
  {
    label: "B94 vs S. boulardii",
    query: "Como o B94 se compara ao Saccharomyces boulardii na gastroenterite?",
    response: "O *Bifidobacterium lactis* B94 demonstrou ser significativamente mais eficaz na redução da duração da diarreia em crianças com gastroenterite por rotavírus. Em estudo clínico comparativo, a duração média da diarreia foi de **4,1 ± 1,3 dias** no grupo B94 vs **6,6 ± 1,7 dias** no grupo *Saccharomyces boulardii* (p < 0,01).\n\nAlém disso, o grupo B94 apresentou melhora na consistência fecal 2 a 3 dias mais rápido que os grupos controle.",
    source: "Monografia Floracol_Formatada.pdf (Erdoğan et al., 2012)"
  },
  {
    label: "Posologia & Indicação",
    query: "Qual a posologia e a indicação etária do Floracol?",
    response: "O Floracol (simbiótico contendo *Bifidobacterium lactis* B94 + inulina) é indicado para crianças e adolescentes **a partir de 4 anos de idade**.\n\n**Posologia recomendada:** 1 sachê (5x10⁹ UFC) 2 vezes ao dia, administrado por até 4 semanas em condições como gastroenterite aguda ou Síndrome do Intestino Irritável (IBS).",
    source: "Monografia Floracol_Formatada.pdf (Baştürk et al., 2016)"
  },
  {
    label: "Uso com Antibióticos",
    query: "Posso indicar Floracol junto com tratamento antibiótico?",
    response: "Sim, doutora! O estudo clínico conduzido por İşlek et al. (2015) demonstrou que o uso adjuvante de *B. lactis* B94 durante a antibioticoterapia para *H. pylori* foi totalmente seguro e **reduziu a incidência de efeitos colaterais de 63% (grupo controle) para 17% (grupo simbiótico)** com significância estatística (p < 0,01).",
    source: "9. İşlek_Bifidobacterium_lactis_B94_inulin_H_pylori.pdf"
  }
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: "init-1",
    role: "assistant",
    content: "Olá! Sou Thiago, agente digital da RX Pro - Afya representando a Apsen. Falo com Dra. Laura Souza?\n\nVi aqui no sistema que você recebeu 1 box com amostras de **FLORACOL CX C2 SACHES AG**. Chegou certinho? Ficou com alguma dúvida clínica sobre a indicação ou evidências do Floracol?",
  }
];

export function RxProAiDemo() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const handleSend = (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || isThinking) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: queryText
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsThinking(true);

    // Find matching preset or default response
    const matchedPreset = PRESET_PROMPTS.find(
      (p) => p.query.toLowerCase() === queryText.toLowerCase() || p.label.toLowerCase() === queryText.toLowerCase()
    );

    setTimeout(() => {
      setIsThinking(false);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: matchedPreset
          ? matchedPreset.response
          : `Para a questão sobre **"${queryText}"**, os dados da monografia indicam eficácia clínica no manejo da microbiota intestinal e sintomas associados. Em estudos pediátricos, o simbiótico B94 demonstrou excelente tolerabilidade e redução de sintomas em até 31 horas em média.`,
        source: matchedPreset ? matchedPreset.source : "Monografia Floracol_Formatada.pdf (Estudos Clínicos)"
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1100);
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    setInput("");
    setIsThinking(false);
  };

  return (
    <div className="w-full my-10 not-prose rounded-xl border border-border bg-background shadow-2xl overflow-hidden font-sans">
      {/* Interactive Widget Bar Header */}
      <div className="bg-neutral-900 text-white px-4 md:px-6 py-3 flex items-center justify-between border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center font-bold text-xs tracking-wider text-white shadow-md">
            APSEN
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">Assistente Afya | Apsen</span>
              <span className="inline-flex items-center gap-1 text-[10px] bg-red-500/20 text-red-400 font-medium px-2 py-0.5 rounded-full border border-red-500/30">
                <Sparkles className="w-3 h-3" /> Live RAG Demo
              </span>
            </div>
            <span className="text-xs text-neutral-400 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Online • Respostas Fundamentadas em MLR
            </span>
          </div>
        </div>
        
        <button
          onClick={handleReset}
          className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-neutral-800 transition-colors"
          title="Reiniciar Protótipo"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Main Chat Body */}
      <div className="p-4 md:p-6 bg-neutral-950/40 min-h-[360px] max-h-[500px] overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs ${
                msg.role === "user"
                  ? "bg-foreground text-background font-bold"
                  : "bg-red-600 text-white"
              }`}
            >
              {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Content Bubble */}
            <div className="flex flex-col max-w-[85%] sm:max-w-[75%] space-y-2">
              <div
                className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-red-600 text-white rounded-tr-none"
                    : "bg-neutral-900 border border-neutral-800 text-neutral-100 rounded-tl-none shadow-sm"
                }`}
              >
                {msg.content.split("\n\n").map((paragraph, i) => (
                  <p key={i} className={i > 0 ? "mt-3" : ""}>
                    {paragraph.split("**").map((chunk, j) =>
                      j % 2 === 1 ? (
                        <strong key={j} className="font-semibold text-white">
                          {chunk}
                        </strong>
                      ) : (
                        chunk
                      )
                    )}
                  </p>
                ))}
              </div>

              {/* RAG Source Citation Badge */}
              {msg.source && (
                <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 bg-neutral-900/80 border border-neutral-800 px-3 py-1.5 rounded-md w-fit">
                  <FileText className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>Fonte: <strong className="text-neutral-300 font-medium">{msg.source}</strong></span>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Thinking Indicator */}
        {isThinking && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-neutral-400 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              Consultando vetores de evidências médicas (RAG)...
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Preset Action Chips */}
      <div className="px-4 py-3 bg-neutral-900/80 border-t border-neutral-800 flex flex-wrap items-center gap-2">
        <span className="text-xs text-neutral-400 font-medium mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-red-400" /> Prompts sugeridos:
        </span>
        {PRESET_PROMPTS.map((p, index) => (
          <button
            key={index}
            onClick={() => handleSend(p.query)}
            disabled={isThinking}
            className="text-xs bg-neutral-800 hover:bg-red-600/20 hover:border-red-500/50 text-neutral-200 border border-neutral-700 px-3 py-1.5 rounded-full transition-all text-left disabled:opacity-50"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-neutral-900 border-t border-neutral-800 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Faça uma pergunta sobre o Floracol ou digite uma dúvida clínica..."
          className="flex-1 bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder:text-neutral-500 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-red-500 transition-colors"
          disabled={isThinking}
        />
        <button
          type="submit"
          disabled={!input.trim() || isThinking}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-medium px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors text-sm"
        >
          <span>Enviar</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
