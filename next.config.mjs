/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    experimental: {
        optimizePackageImports: ['lucide-react', 'framer-motion'],
    },
    async redirects() {
        return [
            {
                source: '/:locale/cases/hp-ai-initiatives',
                destination: '/:locale/cases/afya-ai-initiatives',
                permanent: true,
            },
            {
                source: '/cases/hp-ai-initiatives',
                destination: '/cases/afya-ai-initiatives',
                permanent: true,
            },
            {
                source: '/hp',
                destination: '/en/hp',
                permanent: false,
            }
        ];
    },
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
