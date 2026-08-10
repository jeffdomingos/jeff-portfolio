import { BotMessageBubble } from "./BotMessageBubble";
import { UserMessageBubble } from "./UserMessageBubble";
import { ThinkingIndicator } from "./ThinkingIndicator";
import { Citation } from "./Citation";
import { LinkPreviewCard } from "./LinkPreviewCard";
import { ErrorBubble } from "./ErrorBubble";

type MessageMetadata = {
  source?: string;
  linkPreview?: {
    title: string;
    description?: string;
    url: string;
    imageUrl?: string;
  };
};

type Message = {
  type?: string;
  role?: "user" | "assistant";
  content: string;
  metadata?: MessageMetadata;
};

type MyCustomMessageProps = {
  message: Message;
};

export function MyCustomMessage({ message }: MyCustomMessageProps) {
  // Indicador de "pensando"
  if (message.type === "thinking") {
    return <ThinkingIndicator />;
  }

  // Mensagem de erro
  if (message.type === "error") {
    return <ErrorBubble message={message.content} />;
  }

  // Mensagem do usuário
  if (message.role === "user") {
    return <UserMessageBubble message={message.content} />;
  }

  // Mensagem do assistente
  if (message.role === "assistant") {
    return (
      <div className="mb-4">
        {/* Bolha do bot com Markdown */}
        <BotMessageBubble message={message.content} />

        {/* Metadados: Citação */}
        {message.metadata?.source && (
          <div>
            <Citation source={message.metadata.source} />
          </div>
        )}

        {/* Metadados: Preview de Link */}
        {message.metadata?.linkPreview && (
          <div>
            <LinkPreviewCard {...message.metadata.linkPreview} />
          </div>
        )}
      </div>
    );
  }

  // Fallback para mensagens desconhecidas
  return null;
}
