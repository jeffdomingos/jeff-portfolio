import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const provider = searchParams.get('provider');

    if (provider !== 'github') {
        return NextResponse.json({ error: 'Unsupported provider' }, { status: 400 });
    }

    const clientId = process.env.GITHUB_CLIENT_ID;

    if (!clientId) {
        return NextResponse.json({ error: 'Missing GITHUB_CLIENT_ID environment variable' }, { status: 500 });
    }

    // Determine the base URL dynamically or fallback to the Vercel provided one
    // We use the host to know where to return to
    const host = request.headers.get('host');
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    const redirectUri = `${protocol}://${host}/api/callback`;

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user&redirect_uri=${encodeURIComponent(redirectUri)}`;

    return NextResponse.redirect(githubAuthUrl);
}
