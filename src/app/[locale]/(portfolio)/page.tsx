import { getHomePageContent } from "@/utils/content";
import { Link } from "next-view-transitions";
import Image from "next/image";

import { HeroAnimatedContent } from "@/components/organisms/HeroAnimatedContent";
import { MouseTiltBackground } from "@/components/atoms/MouseTiltBackground";
import { CasesSection } from "@/components/organisms/CasesSection";
import { IntermissionSVGs } from "@/components/organisms/IntermissionSVGs";
import dynamic from 'next/dynamic';

const ApproachSection = dynamic(() => import('@/components/organisms/ApproachSection').then(mod => mod.ApproachSection));
const TestimonialsSection = dynamic(() => import('@/components/organisms/TestimonialsSection').then(mod => mod.TestimonialsSection));
const AvailabilitySection = dynamic(() => import('@/components/organisms/AvailabilitySection').then(mod => mod.AvailabilitySection));
import { TerminalTitle } from "@/components/atoms/TerminalTitle";
import { m } from "framer-motion";
import { BELOW_FOLD_IMAGE, IMAGE_SIZES } from "@/lib/performance/image-hints";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    return { title: `Jeff Domingos - ${locale.toUpperCase()}` };
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
    const content = getHomePageContent(locale);

    return (
        <div>
            {/* Hero Section Wrapper para permitir o sticky mask */}
            <div className="relative w-full hero-wrapper bg-background">
                <div className="absolute inset-0 pointer-events-none"><div className="fade-mask" /></div>
                <section className="relative w-full min-h-[100svh] h-auto flex flex-col items-center justify-start lg:justify-center text-center overflow-hidden pt-16 pb-12 lg:pt-14 lg:pb-0">
                    <MouseTiltBackground imageUrl={content.hero.backgroundMedia} />
                    <div className="absolute inset-0 -z-10 bg-background/50 transition-colors duration-300"></div>
                    <HeroAnimatedContent 
                        headline={content.hero.headline} 
                        subheadline={content.hero.subheadline}
                        carouselItems={content.hero.carousel} 
                        ctaLabel={content.hero.ctaLabel}
                        ctaHref={content.hero.ctaHref}
                    />
                </section>
            </div>

            {/* Cases Section */}
            <div id="cases" className="relative w-full bg-background pt-fluid-2xl">
                <div className="absolute inset-0 pointer-events-none"><div className="fade-mask" /></div>
                <div className="relative z-40 px-fluid-xs md:px-fluid-m mb-fluid-2xl w-full">
                    <TerminalTitle 
                        as="h2"
                        text={content.sectionDividerCases.title}
                        className="text-step-6 type-display mb-fluid-2xl"
                    />
                </div>
                <CasesSection items={content.caseList.items} locale={locale} />
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
