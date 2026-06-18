export const LCP_IMAGE = {
  priority: true,
  loading: 'eager' as const,
  fetchPriority: 'high' as const
};

export const BELOW_FOLD_IMAGE = {
  priority: false,
  loading: 'lazy' as const,
  fetchPriority: 'auto' as const
};

export const IMAGE_SIZES = {
  heroFull: '(max-width: 768px) 100vw, 90vw',
  card: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  avatar: '(max-width: 768px) 120px, 160px'
};
