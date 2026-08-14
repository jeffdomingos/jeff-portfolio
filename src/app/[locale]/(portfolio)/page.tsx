import { getHomePageContent, getAllProjects } from "@/utils/content";
import { CompactHeroContent } from "@/components/organisms/CompactHeroContent";
import { InteractiveListSection, ListItem } from "@/components/organisms/InteractiveListSection";
import { IntermissionSVGs } from "@/components/organisms/IntermissionSVGs";
import dynamic from 'next/dynamic';

const ApproachSection = dynamic(() => import('@/components/organisms/ApproachSection').then(mod => mod.ApproachSection));
const TestimonialsSection = dynamic(() => import('@/components/organisms/TestimonialsSection').then(mod => mod.TestimonialsSection));
const AvailabilitySection = dynamic(() => import('@/components/organisms/AvailabilitySection').then(mod => mod.AvailabilitySection));

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    return { title: `Jeff Domingos - ${locale.toUpperCase()}` };
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
    const content = getHomePageContent(locale);
    const allProjects = getAllProjects(locale);
    
    const items: ListItem[] = content.caseList.items.map((item: any, index: number) => {
        const projectSlug = item.href.split('/').pop();
        const fullProject = allProjects.find(p => p.meta.slug === projectSlug);

        return {
            id: `home-case-${index}`,
            title: item.title,
            context: item.context,
            summary: item.summary || "",
            href: item.href,
            thumbnailImage: item.thumbnailImage,
            tags: fullProject?.meta.tags || [],
        };
    });

    return (
        <div>
            {/* Combined Hero and Cases Section to share the same background and fade mask */}
            <div className="relative w-full bg-background hero-wrapper">
                <div className="absolute inset-0 pointer-events-none"><div className="fade-mask" /></div>
                
                <section className="w-full h-auto flex flex-col items-start justify-start text-left pt-20 pb-6 md:pt-24 md:pb-8">
                    <CompactHeroContent 
                        headline={content.hero.headline} 
                        subheadline={content.hero.subheadline}
                        ctaLabel={content.hero.ctaLabel}
                        ctaHref={content.hero.ctaHref}
                    />
                </section>

                {/* Cases Section - Logo abaixo do Hero na primeira dobra */}
                <div id="cases" className="relative w-full pt-2 md:pt-4">
                    {/* The projects list immediately below hero */}
                    <div className="relative z-40">
                        <InteractiveListSection items={items} locale={locale} hideFilters={true} />
                    </div>
                </div>
            </div>

            <IntermissionSVGs />

            <div className="relative w-full bg-background">
                <div className="absolute inset-0 pointer-events-none"><div className="fade-mask" /></div>
                <ApproachSection data={content.approach} />
            </div>
            
            <div className="relative w-full bg-foreground">
                <div className="absolute inset-0 pointer-events-none"><div className="fade-mask" /></div>
                <TestimonialsSection data={content.testimonials} />
            </div>
            
            <div className="relative w-full bg-background">
                <div className="absolute inset-0 pointer-events-none"><div className="fade-mask" /></div>
                <AvailabilitySection data={content.availability} locale={locale} />
            </div>

        </div>
    );
}
