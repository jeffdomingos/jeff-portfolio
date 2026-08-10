type UserMessageBubbleProps = {
  message: string;
};

export function UserMessageBubble({ message }: UserMessageBubbleProps) {
  return (
    <div className="flex items-start justify-end mb-4" style={{ animation: 'fadeInUp 0.3s ease-out' }}>
      {/* Bolha de mensagem */}
      <div 
        className="max-w-[80%] bg-rx-user-bubble rounded-2xl rounded-tr-sm px-4 py-3"
        style={{ boxShadow: '0px 3px 3px 0px rgba(0,0,0,0.07)' }}
      >
        <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
          {message}
        </p>
      </div>
    </div>
  );
}
