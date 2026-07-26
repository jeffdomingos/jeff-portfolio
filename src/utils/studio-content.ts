import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { CaseItem } from '@/content/schema';

const contentDirectory = path.join(process.cwd(), 'src', 'content');

export function getStudioPageContent(locale: string) {
    const lang = locale === 'pt' ? 'pt' : 'en';

    const studioPath = path.join(contentDirectory, 'pages', 'studio.json');
    const data = JSON.parse(fs.readFileSync(studioPath, 'utf8'));

    const hero = data.hero || {};
    const cases = data.cases || {};
    const approach = data.approach || {};
    const testimonials = data.testimonials || {};
    const availability = data.availability || {};
    const sectionDividerCases = data.sectionDividerCases || {};

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

    const finalCaseItems = caseItems.map(({ slug, ...rest }) => rest);

    return {
        hero: {
            headline: hero[`headline_${lang}`] ?? '',
            subheadline: hero[`subheadline_${lang}`] ?? '',
            backgroundMedia: hero.backgroundMedia ?? '',
            ctaLabel: hero[`ctaLabel_${lang}`] ?? '',
            ctaHref: hero.ctaHref ?? '',
            carousel: hero.carousel ?? []
        },
        sectionDividerCases: {
            title: sectionDividerCases[`title_${lang}`] ?? ''
        },
        caseList: {
            items: finalCaseItems
        },
        approach: {
            title: approach[`title_${lang}`] ?? '',
            subtitle: approach[`subtitle_${lang}`] ?? '',
            columns: (approach[`columns_${lang}`] || []).map((col: any) => ({
                title: col.title ?? '',
                description: col.description ?? ''
            }))
        },
        testimonials: {
            title: testimonials[`title_${lang}`] ?? '',
            subtitle: testimonials[`subtitle_${lang}`] ?? '',
            items: (testimonials[`items_${lang}`] || []).map((t: any) => ({
                author: t.author ?? '',
                role: t.role ?? '',
                quote: t.quote ?? '',
                details: t.details ?? '',
                avatarUrl: t.avatarUrl ?? ''
            }))
        },
        availability: {
            title: availability[`title_${lang}`] ?? '',
            blocks: (availability[`blocks_${lang}`] || []).map((b: any) => ({
                title: b.title ?? '',
                subtitle: b.subtitle ?? '',
                description: b.description ?? ''
            }))
        }
    };
}
