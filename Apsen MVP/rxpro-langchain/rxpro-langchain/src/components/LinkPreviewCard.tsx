type LinkPreviewCardProps = {
  title: string;
  description?: string;
  url: string;
  imageUrl?: string;
};

export function LinkPreviewCard({ 
  title, 
  description, 
  url, 
  imageUrl 
}: LinkPreviewCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block mt-2 overflow-hidden rounded-lg border border-gray-200 hover:border-[#ED2025] transition-colors bg-white"
      style={{ 
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
        animation: 'fadeInUp 0.3s ease-out'
      }}
    >
      <div className="flex">
        {/* Imagem (se disponível) */}
        {imageUrl && (
          <div className="flex-shrink-0 w-24 h-24 bg-gray-100">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Conteúdo */}
        <div className="flex-1 p-3">
          <h4 className="text-sm font-semibold text-gray-900 line-clamp-1 mb-1">
            {title}
          </h4>
          
          {description && (
            <p className="text-xs text-gray-600 line-clamp-2 mb-2">
              {description}
            </p>
          )}

          <div className="flex items-center gap-1 text-xs text-[#ED2025]">
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            <span className="truncate">{new URL(url).hostname}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
