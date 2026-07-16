export interface TOCItem {
    id: string;
    title: string;
    level: number;
}

export function generateTOC(blocks: any[]): TOCItem[] {
    const toc: TOCItem[] = [];

    // Extract headings from text blocks
    for (const block of blocks) {
        if (block.type === 'text' && block.content) {
            // Match markdown headings ## and ###
            const headingRegex = /^(#{2,3})\s+(.+)$/gm;
            let match;

            while ((match = headingRegex.exec(block.content)) !== null) {
                const level = match[1].length; // number of #
                const title = match[2].trim();
                
                // Create a slug for the ID
                const id = title
                    .toLowerCase()
                    .normalize("NFD") // Remove accents
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-")
                    .replace(/-+/g, "-");
                
                toc.push({ id, title, level });
            }
        }
    }

    return toc;
}
