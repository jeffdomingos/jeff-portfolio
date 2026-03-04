const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDir = path.join(__dirname, 'src', 'content', 'projects');

// Utility to parse attributes from a JSX/HTML tag string
function parseAttributes(tagContent) {
    const attrs = {};
    const regex = /([a-zA-Z0-9_-]+)(?:=(?:"([^"]*)"|'([^']*)'|{([^}]*)}))?/g;
    let match;
    while ((match = regex.exec(tagContent)) !== null) {
        const [, key, valDouble, valSingle, valBracket] = match;
        let value = valDouble ?? valSingle ?? valBracket;
        if (value === 'true') value = true;
        if (value === 'false') value = false;
        attrs[key] = value !== undefined ? value : true; // boolean flags
    }
    return attrs;
}

// Convert a markdown body string to an array of block objects
function markdownToBlocks(markdownObj) {
    if (!markdownObj) return [];
    const markdown = typeof markdownObj === 'string' ? markdownObj : String(markdownObj);
    const blocks = [];

    // Master Regex to match predefined components and their self-closing or nested content forms
    // Matches: <Image .../>, <Callout>...</Callout>, <Metric .../>, <Quote>...</Quote>, <VideoEmbed .../>, <FigmaEmbed .../>
    const blockRegex = /<(Image|Metric|VideoEmbed|FigmaEmbed)\s+([^>]*?)\/?>|<(Callout|Quote)(?:\s+([^>]*?))?>([\s\S]*?)<\/\3>/g;

    let lastIndex = 0;

    let match;
    while ((match = blockRegex.exec(markdown)) !== null) {
        // Find text before this component
        const startIndex = match.index;
        const precedingText = markdown.slice(lastIndex, startIndex).trim();

        if (precedingText) {
            blocks.push({ type: 'text', content: precedingText });
        }

        const fullMatch = match[0];
        const singleTagType = match[1]; // Image, Metric, VideoEmbed, FigmaEmbed
        const singleTagAttrsStr = match[2];

        const wrapperTagType = match[3]; // Callout, Quote
        const wrapperTagAttrsStr = match[4];
        const wrapperContent = match[5];

        if (singleTagType) {
            const attrs = parseAttributes(singleTagAttrsStr || '');
            let type = singleTagType.toLowerCase();
            if (type === 'videoembed') type = 'video';
            if (type === 'figmaembed') type = 'figma';

            blocks.push({ type, ...attrs });
        }
        else if (wrapperTagType) {
            const attrs = parseAttributes(wrapperTagAttrsStr || '');
            let type = wrapperTagType.toLowerCase();

            const block = { type, ...attrs };

            // For Callout and Quote, save the inner content
            if (type === 'callout') {
                block.content = wrapperContent.trim();
                // Strip inner <strong> or <em> tags if simple, or we just leave them as raw HTML strings
            } else if (type === 'quote') {
                block.content = wrapperContent.trim();
            }

            blocks.push(block);
        }

        lastIndex = blockRegex.lastIndex;
    }

    // Add remaining text
    const remainingText = markdown.slice(lastIndex).trim();
    if (remainingText) {
        blocks.push({ type: 'text', content: remainingText });
    }

    return blocks;
}

// 1. Process MDX files
const mdxFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'));
for (const file of mdxFiles) {
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(fileContent);
    const d = parsed.data;

    // Parse blocks
    const blocksPt = d.pt && d.pt.body ? markdownToBlocks(d.pt.body) : [];
    const blocksEn = d.en && d.en.body ? markdownToBlocks(d.en.body) : [];

    // Reconstruct data, replacing body with blocks
    const newData = {
        ...d,
        pt: {
            ...d.pt,
            blocks: blocksPt
        },
        en: {
            ...d.en,
            blocks: blocksEn
        }
    };

    delete newData.pt.body;
    delete newData.en.body;

    const newFileContent = matter.stringify('', newData);
    fs.writeFileSync(filePath, newFileContent, 'utf8');
    console.log(`Migrated ${file}`);
}

console.log('Blocks Migration complete.');
