import { getStudioPageContent } from "@/utils/studio-content";
import { StudioClientPage } from "./StudioClientPage";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    return {
        title: locale === 'pt'
            ? 'Jeff Domingos Studio — Web Design Premium'
            : 'Jeff Domingos Studio — Premium Web Design',
        description: locale === 'pt'
            ? 'Experiências digitais premium focadas em performance, SEO e conversão.'
            : 'Premium digital experiences focused on performance, SEO, and conversion.',
    };
}

export default function StudioPage({ params: { locale } }: { params: { locale: string } }) {
    const content = getStudioPageContent(locale);
    return <StudioClientPage content={content} locale={locale} />;
}
