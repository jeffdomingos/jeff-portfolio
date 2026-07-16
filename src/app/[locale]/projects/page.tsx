import { getAllProjects } from "@/utils/content";
import { CasesSection } from "@/components/organisms/CasesSection";
import type { CaseItem } from "@/content/schema";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const title = locale === 'pt' ? 'Projetos - Jeff Domingos' : 'Projects - Jeff Domingos';
    return { title };
}

export default function ProjectsPage({ params: { locale } }: { params: { locale: string } }) {
    const allProjects = getAllProjects(locale);

    const items: CaseItem[] = allProjects.map((proj) => ({
        context: proj.meta.context,
        title: proj.meta.title,
        summary: proj.meta.summary,
        href: `/${locale}/projects/${proj.meta.slug}`,
        thumbnailImage: proj.meta.thumbnail,
        tags: proj.meta.tags,
    }));

    return (
        <div className="relative z-40 w-full px-0 pt-32 pb-fluid-2xl min-h-screen">
            {/* Header Reading Protection Gradient */}
            <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-[75]"></div>
            
            <div className="px-fluid-xs md:px-fluid-m flex flex-col md:flex-row md:items-end justify-between mb-fluid-xl pb-fluid-s w-full">
                <h1 className="text-step-4 md:text-step-5 type-display text-left m-0 p-0">
                    {locale === 'pt' ? 'Projetos' : 'Projects'}
                </h1>
                <p className="text-step-0 type-body text-foreground/70 mt-2 md:mt-0 max-w-md text-left md:text-right">
                    {locale === 'pt' 
                        ? 'Uma coleção de cases explorando UX, UI e estratégia de produto.' 
                        : 'A collection of cases exploring UX, UI, and product strategy.'}
                </p>
            </div>

            <CasesSection items={items} locale={locale} />
        </div>
    );
}
