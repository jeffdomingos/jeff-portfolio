type CitationProps = {
  source: string;
};

export function Citation({ source }: CitationProps) {
  return (
    <p 
      className="text-xs text-gray-500 italic mt-1"
      style={{ animation: 'fadeInUp 0.3s ease-out' }}
    >
      Fonte: {source}
    </p>
  );
}
