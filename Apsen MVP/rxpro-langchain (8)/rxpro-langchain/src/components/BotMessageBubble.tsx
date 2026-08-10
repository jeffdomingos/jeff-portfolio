import ReactMarkdown from 'react-markdown';

type BotMessageBubbleProps = {
  message: string;
};

export function BotMessageBubble({ message }: BotMessageBubbleProps) {
  return (
    <div className="flex items-start mb-4" style={{ animation: 'fadeInUp 0.3s ease-out' }}>
      {/* Bolha de mensagem */}
      <div 
        className="max-w-[80%] bg-[#F5F5F5] rounded-2xl rounded-tl-sm px-4 py-3"
        style={{ boxShadow: '0px 3px 3px 0px rgba(0,0,0,0.07)' }}
      >
        <div className="text-gray-800 text-sm leading-relaxed">
          <ReactMarkdown
            components={{
              // Links com cor primária RX PRO
              a: ({ node, ...props }) => (
                <a 
                  className="font-medium underline hover:opacity-80 transition-colors" 
                  style={{ color: '#ED2025' }}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props} 
                />
              ),
              // Listas não ordenadas
              ul: ({ node, ...props }) => (
                <ul className="list-disc ml-4 my-2 space-y-1" {...props} />
              ),
              // Listas ordenadas
              ol: ({ node, ...props }) => (
                <ol className="list-decimal ml-4 my-2 space-y-1" {...props} />
              ),
              // Itens de lista
              li: ({ node, ...props }) => (
                <li {...props} />
              ),
              // Parágrafos
              p: ({ node, ...props }) => (
                <p className="mb-2 last:mb-0" {...props} />
              ),
              // Negrito
              strong: ({ node, ...props }) => (
                <strong className="font-semibold" {...props} />
              ),
              // Itálico
              em: ({ node, ...props }) => (
                <em className="italic" {...props} />
              ),
              // Código inline
              code: ({ node, ...props }) => (
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono" {...props} />
              ),
            }}
          >
            {message}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
