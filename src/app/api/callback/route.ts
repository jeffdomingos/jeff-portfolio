import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
        return new NextResponse('Missing authorization code', { status: 400 });
    }

    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        return new NextResponse('Missing OAuth credentials in environment', { status: 500 });
    }

    try {
        // Exchange code for access token
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                code,
            }),
        });

        const tokenData = await tokenResponse.json();

        if (tokenData.error) {
            return new NextResponse(`GitHub OAuth Error: ${tokenData.error_description}`, { status: 400 });
        }

        const accessToken = tokenData.access_token;

        // Decap CMS expects a specific response format injected into a popup window
        const script = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Authentication Success</title>
                <script>
                    const receiveMessage = (message) => {
                        const origin = message.origin;
                        if (!origin.includes('localhost') && !origin.includes('vercel.app')) {
                            console.error('Unauthorized origin:', origin);
                            return;
                        }

                        window.opener.postMessage(
                            'authorization:github:success:${JSON.stringify({ token: accessToken, provider: 'github' })}',
                            origin
                        );
                        
                        window.removeEventListener('message', receiveMessage, false);
                    }
                    
                    window.addEventListener('message', receiveMessage, false);
                    
                    // Signal to opener that we are ready
                    window.opener.postMessage('authorizing:github', '*');
                </script>
            </head>
            <body>
                <p>Authentication successful! You can close this window if it doesn't close automatically.</p>
            </body>
            </html>
        `;

        return new NextResponse(script, {
            headers: { 'Content-Type': 'text/html' },
        });

    } catch (error) {
        console.error('OAuth Exchange Error:', error);
        return new NextResponse('Internal Server Error during token exchange', { status: 500 });
    }
}
