"use client";

import { useEffect, useRef, useState } from "react";
import { RxHeader } from "@/app/components/RxHeader";
import { ErrorBubble } from "@/app/components/ErrorBubble";
import { CREATE_SESSION_ENDPOINT, WORKFLOW_ID, PLACEHOLDER_INPUT } from "@/lib/config";

type ChatKitPanelRealProps = {
  theme?: "light" | "dark";
};

export function ChatKitPanelReal({ theme = "light" }: ChatKitPanelRealProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para criar sessão com o Agent Builder
  const createSession = async () => {
    if (!WORKFLOW_ID) {
      setError("WORKFLOW_ID não configurado. Configure o .env.local com NEXT_PUBLIC_CHATKIT_WORKFLOW_ID");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(CREATE_SESSION_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workflowId: WORKFLOW_ID,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao criar sessão: ${response.statusText}`);
      }

      const data = await response.json();
      setSessionId(data.sessionId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido ao criar sessão");
      console.error("Erro ao criar sessão:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Inicializa a sessão quando o componente é montado
  useEffect(() => {
    if (!sessionId && !isLoading && !error) {
      createSession();
    }
  }, []);

  // Renderiza o ChatKit Web Component quando temos sessionId
  useEffect(() => {
    if (sessionId && chatContainerRef.current && typeof window !== 'undefined') {
      // Limpa o container antes de renderizar
      chatContainerRef.current.innerHTML = '';
      
      // Cria o elemento chatkit-thread
      const thread = document.createElement('chatkit-thread');
      thread.setAttribute('session-id', sessionId);
      thread.setAttribute('color-scheme', theme);
      
      // Adiciona ao container
      chatContainerRef.current.appendChild(thread);
    }
  }, [sessionId, theme]);

  // Estados de carregamento e erro
  if (error) {
    return (
      <div className="flex flex-col h-full">
        <RxHeader />
        <div className="flex-1 overflow-y-auto px-4 py-6 bg-white flex items-center justify-center">
          <div className="max-w-md">
            <ErrorBubble message={error} />
            <div className="mt-4 text-center">
              <button
                onClick={createSession}
                className="px-4 py-2 bg-rx-primary text-white rounded-lg hover:bg-rx-primary-dark transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading || !sessionId) {
    return (
      <div className="flex flex-col h-full">
        <RxHeader />
        <div className="flex-1 overflow-y-auto px-4 py-6 bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-[#ED2025]"></div>
            <p className="mt-4 text-sm text-gray-600">Conectando ao assistente...</p>
          </div>
        </div>
      </div>
    );
  }

  // Renderiza o chat real usando o Web Component do ChatKit
  return (
    <div className="flex flex-col h-full">
      <RxHeader />
      
      {/* Container para o ChatKit Web Component */}
      <div className="flex-1 overflow-hidden">
        <div ref={chatContainerRef} className="h-full" />
      </div>
    </div>
  );
}
