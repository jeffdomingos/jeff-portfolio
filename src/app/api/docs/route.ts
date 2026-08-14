import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Missing document ID' }, { status: 400 });
    }

    try {
        // Fetch the mobilebasic version which returns raw HTML
        const response = await fetch(`https://docs.google.com/document/d/${id}/mobilebasic`, {
            // Next.js caching - revalidate every hour or keep it cached
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            throw new Error(`Google Docs returned ${response.status}`);
        }

        const html = await response.text();

        // Load into cheerio to parse and clean
        const $ = cheerio.load(html);

        // The actual document content is usually inside a div (we can grab the body content)
        // We will remove scripts, styles, and other head elements
        $('script').remove();
        $('style').remove();
        $('meta').remove();
        $('link').remove();

        // The content is usually within the body. Let's just grab the body content.
        const body = $('body');

        // First remove classes, ids, and dirs
        body.find('*').removeAttr('class').removeAttr('id').removeAttr('dir');

        // Convert inline styles to semantic tags before removing styles
        body.find('[style]').each((_, el) => {
            const $el = $(el);
            const style = $el.attr('style') || '';
            const isBold = /font-weight:\s*(600|700|800|900|bold)/i.test(style);
            const isItalic = /font-style:\s*italic/i.test(style);
            const isNormalWeight = /font-weight:\s*(400|normal)/i.test(style);
            
            if (isBold && isItalic) {
                $el.wrapInner('<strong><em></em></strong>');
            } else if (isBold) {
                $el.wrapInner('<strong></strong>');
            } else if (isItalic) {
                $el.wrapInner('<em></em>');
            }
            
            // Remove the old chaotic style string
            $el.removeAttr('style');

            // If Google Docs explicitly set font-weight: 400, preserve it!
            // This is crucial because Tailwind Prose makes all <h3> elements bold by default.
            if (isNormalWeight) {
                $el.attr('style', 'font-weight: 400;');
            }
        });
        
        let contentHtml = body.html();

        if (!contentHtml) {
            throw new Error('Could not parse document content');
        }
        
        // Remove empty spans that Google sometimes generates
        contentHtml = contentHtml.replace(/<span><\/span>/g, '');
        contentHtml = contentHtml.replace(/<span>\s*<\/span>/g, '');
        contentHtml = contentHtml.replace(/<span>(.*?)<\/span>/g, '$1'); // Unwrap remaining spans

        return new NextResponse(contentHtml, {
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                // Allow caching on the client side
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            },
        });
    } catch (error) {
        console.error('Error fetching Google Doc proxy:', error);
        return NextResponse.json({ error: 'Failed to fetch document' }, { status: 500 });
    }
}
