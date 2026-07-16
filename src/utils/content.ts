import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type {
    GlobalContent,
    HomePageContent,
    ResumePageContent,
    ContactPageContent,
    ProjectIndex,
    ProjectMeta,
    JournalMeta
} from '@/content/schema';

const contentDirectory = path.join(process.cwd(), 'src', 'content');

export function calculateReadingTime(blocks: any[]): number {
    let text = '';
    let visualBlocksCount = 0;
    
    // Extract text from all relevant blocks
    for (const block of blocks) {
        if (block.type === 'text' && block.content) {
            text += block.content + ' ';
        } else if (block.type === 'callout' && block.content) {
            text += block.content + ' ';
        } else if (block.type === 'quote' && block.content) {
            text += block.content + ' ';
        } else if (['image', 'figma', 'video', 'gallery', 'carousel'].includes(block.type)) {
            // Count visual elements to add absorption time
            visualBlocksCount++;
        }
    }
    
    // Remove markdown formatting to get rough word count
    const cleanText = text.replace(/[#*`_\[\]()]/g, '');
    const wordCount = cleanText.trim().split(/\s+/).filter(Boolean).length;
    
    // Average reading speed: 200 words per minute
    // Plus 15 seconds (0.25 minutes) per visual block
    const baseTime = wordCount / 200;
    const visualTime = visualBlocksCount * 0.25;
    
    const time = Math.ceil(baseTime + visualTime);
    return Math.max(1, time); // Minimum 1 minute
}

export function getGlobalContent(locale: string): GlobalContent {
    const filePath = path.join(contentDirectory, locale, 'global.json');
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function getHomePageContent(locale: string): HomePageContent {
    const unifiedPath = path.join(contentDirectory, 'pages', 'home.json');
    const data = JSON.parse(fs.readFileSync(unifiedPath, 'utf8'));
    const lang = locale === 'pt' ? 'pt' : 'en';

    const hero = data.hero || {};
    const cases = data.cases || {};
    const approach = data.approach || {};
    const testimonials = data.testimonials || {};
    const availability = data.availability || {};
    const visual = data.visual_design || {};
    const about = data.about || {};
    const contacts = data.contacts || {};

    const orderList: string[] = cases.case_order || [];

    // Build case list dynamically from project MDX files (single source of truth)
    const projectsDir = path.join(contentDirectory, 'projects');
    const projectFiles = fs.readdirSync(projectsDir).filter(f => f.endsWith('.mdx'));
    let caseItems = projectFiles
        .map(file => {
            const slug = file.replace(/\.mdx$/, '');
            const { data: pd } = matter(fs.readFileSync(path.join(projectsDir, file), 'utf8'));
            if (!pd.featured) return null;

            const homeCard = pd.home_card || {};
            const langData = pd[lang] || {};

            const homeContext = homeCard[`context_${lang}`] || langData.context || undefined;
            const homeTitle = homeCard[`title_${lang}`] || langData.title || slug;
            const homeSummary = homeCard[`summary_${lang}`] || langData.summary || '';
            const homeThumbnail = homeCard.thumbnail || pd.thumbnail || '';
            const homeTags = homeCard[`tags_${lang}`] || homeCard.tags || pd[`tags_${lang}`] || pd.tags || [];
            const customNumber = homeCard.custom_number;
            const customCtaLabel = homeCard[`cta_${lang}`] || homeCard.ctaLabel;

            return { slug, context: homeContext, title: homeTitle, summary: homeSummary, href: `/${locale}/projects/${slug}`, thumbnailImage: homeThumbnail, tags: homeTags, customNumber, customCtaLabel };
        })
        .filter(Boolean) as { slug: string; context?: string; title: string; summary: string; href: string; thumbnailImage: string; tags: string[]; customNumber?: string; customCtaLabel?: string }[];

    // Sort by cases.case_order
    caseItems.sort((a, b) => {
        const indexA = orderList.indexOf(a.slug);
        const indexB = orderList.indexOf(b.slug);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return a.title.localeCompare(b.title);
    });

    // Remove the temporary 'slug' property to match the strict type
    const finalCaseItems = caseItems.map(({ slug, ...rest }) => rest);

    return {
        hero: {
            headline: hero[`headline_${lang}`] ?? '',
            subheadline: hero[`subheadline_${lang}`] ?? '',
            backgroundMedia: hero.backgroundMedia ?? '',
            ctaLabel: hero[`ctaLabel_${lang}`] ?? '',
            ctaHref: hero.ctaHref ?? '',
            carousel: hero.carousel ?? [],
        },
        sectionDividerCases: {
            title: cases[`title_${lang}`] ?? 'Cases',
        },
        caseList: { items: finalCaseItems },
        approach: {
            title: approach[`title_${lang}`] ?? '',
            subtitle: approach[`subtitle_${lang}`] ?? '',
            columns: approach[`columns_${lang}`] ?? [],
        },
        testimonials: {
            title: testimonials[`title_${lang}`] ?? '',
            subtitle: testimonials[`subtitle_${lang}`] ?? '',
            items: testimonials[`items_${lang}`] ?? [],
        },
        availability: {
            title: availability[`title_${lang}`] ?? '',
            blocks: availability[`blocks_${lang}`] ?? [],
        },
        visualBreak1: {
            backgroundMedia: data.visualBreak1_backgroundMedia ?? '/images/placeholder.png', // Fallback
        },
        visualDesignWork: {
            title: visual[`title_${lang}`] ?? '',
            description: visual[`description_${lang}`] ?? '',
            ctaLabel: visual[`ctaLabel_${lang}`] ?? '',
            ctaHref: visual.ctaHref ?? '',
            backgroundMedia: visual.backgroundMedia ?? '',
        },
        aboutSummary: {
            heading1: about[`heading1_${lang}`] ?? '',
            paragraph1: about[`paragraph1_${lang}`] ?? '',
            heading2: about[`heading2_${lang}`] ?? '',
            paragraph2: about[`paragraph2_${lang}`] ?? '',
            backgroundMedia: about.backgroundMedia ?? '',
        },
        visualBreak2: {
            backgroundMedia: data.visualBreak2_backgroundMedia ?? '/images/placeholder.png', // Fallback
        },
        quickContacts: {
            title: contacts.title ?? '',
            emailLabel: lang === 'pt' ? 'Email:' : 'Email:',
            emailValue: contacts.emailValue ?? '',
            linkedinLabel: lang === 'pt' ? 'LinkedIn:' : 'LinkedIn:',
            linkedinValue: contacts.linkedinValue ?? '',
            whatsappLabel: lang === 'pt' ? 'Cel / Whatsapp:' : 'Cel / Whatsapp:',
            whatsappValue: contacts.whatsappValue ?? '',
        },
    };
}


export function getResumePageContent(locale: string): ResumePageContent {
    const filePath = path.join(contentDirectory, locale, 'pages', 'resume.json');
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function getContactPageContent(locale: string): ContactPageContent {
    const filePath = path.join(contentDirectory, locale, 'pages', 'contact.json');
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function getProjectIndex(locale: string): ProjectIndex {
    // Falls back to locale-specific index.json if it exists, useful for ordering
    const filePath = path.join(contentDirectory, locale, 'projects', 'index.json');
    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    return { order: [] };
}

export function getProject(locale: string, slug: string) {
    const filePath = path.join(contentDirectory, 'projects', `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    const availableLocales: string[] = [];
    if (data.pt && data.pt.blocks && data.pt.blocks.length > 0) availableLocales.push('pt');
    if (data.en && data.en.blocks && data.en.blocks.length > 0) availableLocales.push('en');

    const requestedLang = locale === 'pt' ? 'pt' : 'en';
    const effectiveLang = availableLocales.includes(requestedLang)
        ? requestedLang
        : (availableLocales[0] ?? requestedLang);

    const langData = data[effectiveLang] || {};
    const blocks: any[] = langData.blocks ?? [];
    const readingTime = calculateReadingTime(blocks);

    const meta: ProjectMeta = {
        slug,
        context: data.home_card?.[`context_${effectiveLang}`] ?? langData.context ?? undefined,
        featured: data.featured ?? false,
        thumbnail: data.thumbnail ?? data.home_card?.thumbnail ?? '',
        tags: data.home_card?.[`tags_${effectiveLang}`] ?? data[`tags_${effectiveLang}`] ?? langData.tags ?? data.tags ?? [],
        title: langData.title ?? data.home_card?.[`title_${effectiveLang}`] ?? slug,
        role: langData.role ?? '',
        timeline: langData.timeline ?? '',
        summary: langData.summary ?? '',
        readingTime,
    };

    return { meta, blocks, availableLocales, effectiveLang };
}

export function getAllProjects(locale: string) {
    const projectsDir = path.join(contentDirectory, 'projects');
    const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.mdx'));

    // Fetch order from home.json
    const unifiedPath = path.join(contentDirectory, 'pages', 'home.json');
    let orderList: string[] = [];
    if (fs.existsSync(unifiedPath)) {
        const homeData = JSON.parse(fs.readFileSync(unifiedPath, 'utf8'));
        orderList = homeData.cases?.case_order || [];
    }

    const projects = files.map(file => {
        const slug = file.replace(/\.mdx$/, '');
        return getProject(locale, slug);
    });

    projects.sort((a, b) => {
        const indexA = orderList.indexOf(a.meta.slug);
        const indexB = orderList.indexOf(b.meta.slug);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return a.meta.title.localeCompare(b.meta.title);
    });

    return projects;
}

export function getJournalPost(locale: string, slug: string) {
    const filePath = path.join(contentDirectory, 'journal', `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    const availableLocales: string[] = [];
    if (data.pt && data.pt.blocks && data.pt.blocks.length > 0) availableLocales.push('pt');
    if (data.en && data.en.blocks && data.en.blocks.length > 0) availableLocales.push('en');

    const requestedLang = locale === 'pt' ? 'pt' : 'en';
    const effectiveLang = availableLocales.includes(requestedLang)
        ? requestedLang
        : (availableLocales[0] ?? requestedLang);

    const langData = data[effectiveLang] || {};
    const blocks: any[] = langData.blocks ?? [];
    const readingTime = calculateReadingTime(blocks);

    const meta: JournalMeta = {
        slug,
        date: data.date ?? '',
        thumbnail: data.thumbnail ?? '',
        tags: data[`tags_${effectiveLang}`] ?? langData.tags ?? data.tags ?? [],
        title: langData.title ?? slug,
        summary: langData.summary ?? '',
        linkedinUrl: data.linkedinUrl ?? undefined,
        instagramUrl: data.instagramUrl ?? undefined,
        readingTime,
    };

    return { meta, blocks, availableLocales, effectiveLang };
}

export function getAllJournalPosts(locale: string) {
    const journalDir = path.join(contentDirectory, 'journal');
    if (!fs.existsSync(journalDir)) return [];
    
    const files = fs.readdirSync(journalDir).filter(f => f.endsWith('.mdx'));

    const posts = files.map(file => {
        const slug = file.replace(/\.mdx$/, '');
        return getJournalPost(locale, slug);
    });

    posts.sort((a, b) => {
        return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
    });

    return posts;
}
