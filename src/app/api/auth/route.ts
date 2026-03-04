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

    const host = request.headers.get('host');

    // We force the exact domain configured in GitHub OAuth Apps
    // to prevent mismatch errors if the user accesses via www.
    const redirectUri = host?.includes('localhost')
        ? 'http://localhost:3000/api/callback'
        : 'https://jeffdomingos.com/api/callback';

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user&redirect_uri=${encodeURIComponent(redirectUri)}`;

    return NextResponse.redirect(githubAuthUrl);
}
