/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    async rewrites() {
        return [
            // Tracking URLs (English - Default)
            {
                source: '/cv',
                destination: '/en',
            },
            {
                source: '/linkedin',
                destination: '/en',
            },
            {
                source: '/to/:empresa',
                destination: '/en',
            },
            
            // Tracking URLs (Portuguese)
            {
                source: '/pt/cv',
                destination: '/pt',
            },
            {
                source: '/pt/linkedin',
                destination: '/pt',
            },
            {
                source: '/para/:empresa',
                destination: '/pt',
            },

            // PostHog Proxy
            {
                source: '/ingest/static/:path*',
                destination: 'https://us-assets.i.posthog.com/static/:path*',
            },
            {
                source: '/ingest/:path*',
                destination: 'https://us.i.posthog.com/:path*',
            },
        ];
    },
};

export default nextConfig;
