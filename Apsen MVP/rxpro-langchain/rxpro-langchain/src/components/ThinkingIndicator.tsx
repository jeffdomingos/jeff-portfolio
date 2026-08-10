export function ThinkingIndicator() {
  return (
    <div className="flex items-start mb-4" style={{ animation: 'fadeInUp 0.3s ease-out' }}>
      {/* Bolha com animação de "pensando" */}
      <div 
        className="max-w-[80%] bg-[#F5F5F5] rounded-2xl rounded-tl-sm px-4 py-3"
        style={{ boxShadow: '0px 3px 3px 0px rgba(0, 0, 0, 0.07)' }}
      >
        <div className="flex items-center gap-1">
          <div 
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: '0ms' }}
          />
          <div 
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: '150ms' }}
          />
          <div 
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  );
}
