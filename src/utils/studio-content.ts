import fs from 'fs';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'src', 'content');

export interface StudioHero {
    headline: string;
    subheadline: string;
    ctaLabel: string;
    ctaHref: string;
    backgroundMedia: string;
}

export interface StudioServiceItem {
    title: string;
    description: string;
}

export interface StudioServices {
    title: string;
    subtitle: string;
    items: StudioServiceItem[];
}

export interface StudioTestimonialItem {
    author: string;
    role: string;
    quote: string;
    details: string;
    avatarUrl: string;
}

export interface StudioTestimonials {
    title: string;
    subtitle: string;
    items: StudioTestimonialItem[];
}

export interface StudioShowcaseItem {
    src: string;
    caption: string;
}

export interface StudioShowcase {
    title: string;
    items: StudioShowcaseItem[];
}

export interface StudioCTA {
    title: string;
    subtitle: string;
    ctaLabel: string;
    ctaHref: string;
    emailLabel: string;
    emailValue: string;
    whatsappLabel: string;
    whatsappValue: string;
    whatsappHref: string;
}

export interface StudioPageContent {
    hero: StudioHero;
    services: StudioServices;
    testimonials: StudioTestimonials;
    showcase: StudioShowcase;
    cta: StudioCTA;
}

export function getStudioPageContent(locale: string): StudioPageContent {
    const lang = locale === 'pt' ? 'pt' : 'en';

    // Main studio content
    const studioPath = path.join(contentDirectory, 'pages', 'studio.json');
    const studioData = JSON.parse(fs.readFileSync(studioPath, 'utf8'));

    // Studio testimonials
    const testimonialsPath = path.join(contentDirectory, 'pages', 'testimonials-studio.json');
    const testimonialsData = JSON.parse(fs.readFileSync(testimonialsPath, 'utf8'));

    // Studio projects/showcase
    const projectsPath = path.join(contentDirectory, 'pages', 'studio-projects.json');
    const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

    const hero = studioData.hero || {};
    const services = studioData.services || {};
    const cta = studioData.cta || {};

    return {
        hero: {
            headline: hero[`headline_${lang}`] ?? '',
            subheadline: hero[`subheadline_${lang}`] ?? '',
            ctaLabel: hero[`ctaLabel_${lang}`] ?? '',
            ctaHref: hero.ctaHref ?? '',
            backgroundMedia: hero.backgroundMedia ?? '',
        },
        services: {
            title: services[`title_${lang}`] ?? '',
            subtitle: services[`subtitle_${lang}`] ?? '',
            items: services[`items_${lang}`] ?? [],
        },
        testimonials: {
            title: testimonialsData[`title_${lang}`] ?? '',
            subtitle: testimonialsData[`subtitle_${lang}`] ?? '',
            items: testimonialsData[`items_${lang}`] ?? [],
        },
        showcase: {
            title: projectsData[`title_${lang}`] ?? '',
            items: projectsData.items ?? [],
        },
        cta: {
            title: cta[`title_${lang}`] ?? '',
            subtitle: cta[`subtitle_${lang}`] ?? '',
            ctaLabel: cta[`ctaLabel_${lang}`] ?? '',
            ctaHref: cta.ctaHref ?? '',
            emailLabel: cta[`emailLabel_${lang}`] ?? '',
            emailValue: cta.emailValue ?? '',
            whatsappLabel: cta[`whatsappLabel_${lang}`] ?? '',
            whatsappValue: cta.whatsappValue ?? '',
            whatsappHref: cta.whatsappHref ?? '',
        },
    };
}
