"use client";

import { useState, useRef, useEffect } from "react";
import { RxHeader } from "@/components/RxHeader";
import { BotMessageBubble } from "@/components/BotMessageBubble";
import { UserMessageBubble } from "@/components/UserMessageBubble";
import { ThinkingIndicator } from "@/components/ThinkingIndicator";
import { ErrorBubble } from "@/components/ErrorBubble";
import { Citation } from "@/components/Citation";
import { LinkPreviewCard } from "@/components/LinkPreviewCard";

type Message = {
  id: string;
  role?: "user" | "assistant";
  type?: string;
  content: string;
  metadata?: {
    source?: string;
    linkPreview?: {
      title: string;
      description?: string;
      url: string;
      imageUrl?: string;
    };
  };
};

export function MockChat() {
  const chatViewRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '👋 **Bem-vindo ao RX PRO Assist - Protótipo de Teste**\n\nSou um assistente mockado para testar a interface. Experimente os comandos:\n\n* `formatacao` - Ver todo o Markdown\n* `richtext` - Ver formatação rica completa\n* `citacao` - Ver mensagem com fonte bibliográfica\n* `artigo` - Ver card de link preview (com imagem)\n* `documento` - Ver card de link preview (sem imagem)\n* `longo` - Ver resposta longa para testar scroll\n* `erro` - Ver bolha de erro\n* `completo` - Ver todos os recursos juntos\n\nDigite qualquer uma dessas palavras para testar!'
    }
  ]);
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setInput(textarea.value);
    
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleMockSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      role: "user",
      content: input,
    };

    const thinkingMessage: Message = {
      id: `thinking_${Date.now()}`,
      type: "thinking",
      content: "",
    };

    setMessages((prev) => [...prev, userMessage, thinkingMessage]);
    
    const userInput = input.toLowerCase();
    setInput("");
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    setTimeout(() => {
      const lowerInput = input.toLowerCase().trim();
      let botMessage: Message;

      switch (true) {
        case lowerInput.includes('formatacao'):
          botMessage = {
            id: `bot_${Date.now()}`,
            role: 'assistant',
            content: 'Aqui está todo o Markdown suportado:\n\n# Título H1\n## Título H2\n\n**Negrito**, *itálico*, e `código inline`.\n\n* Lista item 1\n* Lista item 2\n\n1. Lista numerada 1\n2. Lista numerada 2\n\n> Um bloco de citação.\n\nE, claro, [visite nosso portal](https://rxpro.com.br).'
          };
          break;

        case lowerInput.includes('richtext') || lowerInput.includes('rich-text'):
          botMessage = {
            id: `bot_${Date.now()}`,
            role: 'assistant',
            content: '# 📋 Demonstração de Rich Text\n\nEste é um exemplo de **formatação rica** com múltiplos elementos:\n\n## Estilos de Texto\n- **Negrito importante**\n- *Itálico para ênfase*\n- `código inline` para termos técnicos\n\n## Listas e Organização\n1. Primeiro item da lista numerada\n2. Segundo item com **destaque**\n3. Terceiro item com *ênfase*\n\n## Citações e Links\n> "A informação correta no momento certo salva vidas."\n\nAcesse nosso [Portal RX PRO](https://rxpro.com.br) para mais informações.\n\n### Conclusão\nRich text permite comunicação **clara**, *eficaz* e bem estruturada! ✨'
          };
          break;

        case lowerInput.includes('citacao'):
          botMessage = {
            id: `bot_${Date.now()}`,
            role: 'assistant',
            content: 'O simbiótico demonstrou redução significativa nos sintomas (p<0,001).',
            metadata: {
              source: 'Baştürk et al., 2016 - Journal of Medicine'
            }
          };
          break;

        case lowerInput.includes('artigo'):
          botMessage = {
            id: `bot_${Date.now()}`,
            role: 'assistant',
            content: 'Encontrei este artigo relevante sobre o tema:',
            metadata: {
              linkPreview: {
                title: 'Estudo Comparativo: Eficácia do B. lactis B94',
                description: 'Eficácia do B. lactis B94 vs. S. boulardii em gastroenterite por rotavírus.',
                url: 'https://rxpro.com.br/estudos',
                imageUrl: 'https://cardiologiahmt.com.br/wp-content/uploads/2019/09/estudo-clinico.jpg'
              }
            }
          };
          break;

        case lowerInput.includes('documento'):
          botMessage = {
            id: `bot_${Date.now()}`,
            role: 'assistant',
            content: 'Aqui está a bula oficial do produto (PDF):',
            metadata: {
              linkPreview: {
                title: 'Bula Oficial - Produto X (PDF)',
                description: 'Documento oficial da ANVISA com todas as informações.',
                url: 'https://rxpro.com.br/bula.pdf'
              }
            }
          };
          break;

        case lowerInput.includes('longo'):
          botMessage = {
            id: `bot_${Date.now()}`,
            role: 'assistant',
            content: 'Aqui está uma resposta longa para testar o scroll e a quebra de linha. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Repetindo: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          };
          break;

        case lowerInput.includes('erro'):
          botMessage = {
            id: `bot_${Date.now()}`,
            role: 'assistant',
            type: 'error',
            content: 'Não consegui processar a sua solicitação. Por favor, tente reformular a pergunta.'
          };
          break;

        case lowerInput.includes('completo'):
          botMessage = {
            id: `bot_${Date.now()}`,
            role: 'assistant',
            content: 'Aqui está um resumo completo sobre o produto, com fonte e o artigo principal:',
            metadata: {
              source: 'Estudo Clínico Apsen, 2024',
              linkPreview: {
                title: 'Artigo Principal do Produto',
                description: 'Veja como ele atua no organismo.',
                url: 'https://rxpro.com.br/artigo-completo',
                imageUrl: 'https://cardiologiahmt.com.br/wp-content/uploads/2019/09/estudo-clinico.jpg'
              }
            }
          };
          break;

        default:
          botMessage = {
            id: `bot_${Date.now()}`,
            role: 'assistant',
            content: '👋 Sou um assistente mockado! Digite um comando para testar a UI:\n\n* **formatacao** - Testa todo o Markdown\n* **richtext** - Testa formatação rica completa\n* **citacao** - Testa a fonte bibliográfica\n* **artigo** - Testa o preview de link (com imagem)\n* **documento** - Testa o preview de link (sem imagem)\n* **longo** - Testa uma resposta longa\n* **erro** - Testa a bolha de erro\n* **completo** - Testa uma resposta com tudo junto'
          };
      }

      setMessages((prev) =>
        prev.filter((msg) => msg.id !== thinkingMessage.id).concat(botMessage)
      );
    }, 1200);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (chatViewRef.current) {
        chatViewRef.current.scrollTo({
          top: chatViewRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <RxHeader />
      
      {/* Área de mensagens */}
      <div ref={chatViewRef} className="flex-1 overflow-y-auto px-4 py-6 bg-white">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">Bem-vindo ao RX PRO Assist</h2>
            <p className="max-w-md mx-auto">
              Sou o seu Agente Virtual. Posso ajudar com informações sobre produtos, bulas e estudos clínicos.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((message) => {
              if (message.type === "thinking") {
                return <ThinkingIndicator key={message.id} />;
              }
              
              if (message.type === "error") {
                return <ErrorBubble key={message.id} message={message.content} />;
              }
              
              if (message.role === "user") {
                return <UserMessageBubble key={message.id} message={message.content} />;
              }
              
              return (
                <div key={message.id} className="flex flex-col gap-2">
                  <BotMessageBubble message={message.content} />
                  {message.metadata?.source && (
                    <Citation source={message.metadata.source} />
                  )}
                  {message.metadata?.linkPreview && (
                    <LinkPreviewCard
                      title={message.metadata.linkPreview.title}
                      description={message.metadata.linkPreview.description}
                      url={message.metadata.linkPreview.url}
                      imageUrl={message.metadata.linkPreview.imageUrl}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Input de mensagem */}
      <div className="border-t border-gray-200 px-4 py-3 bg-white">
        <form onSubmit={handleMockSubmit} className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleMockSubmit(e);
              }
            }}
            placeholder="Digite sua mensagem..."
            rows={1}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg resize-none max-h-[94px] overflow-y-auto min-h-[42px] focus:outline-none focus:ring-2 focus:ring-rx-primary focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="min-h-[42px] w-[42px] bg-rx-primary text-white rounded-lg font-medium hover:bg-rx-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 flex items-center justify-center"
            aria-label="Enviar mensagem"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
