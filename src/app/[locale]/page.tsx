import { getHomePageContent } from "@/utils/content";
import Link from "next/link";
import Image from "next/image";

import { HeroAnimatedContent } from "@/components/organisms/HeroAnimatedContent";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    return { title: `Jeff Domingos - ${locale.toUpperCase()}` };
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
    const content = getHomePageContent(locale);

    return (
        <div>
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 overflow-hidden dark:bg-zinc-900">
                <div className="absolute inset-0 -z-10 bg-fixed bg-center bg-no-repeat bg-cover opacity-100 dark:mix-blend-multiply dark:opacity-80 transition-all duration-300" style={{ backgroundImage: `url(${content.hero.backgroundMedia})` }}></div>
                <div className="absolute inset-0 -z-10 bg-background/50 dark:bg-gradient-to-b dark:from-transparent dark:to-background/90 transition-colors duration-300"></div>
                <HeroAnimatedContent headline={content.hero.headline} carouselItems={content.hero.carousel} />

                {/* Scroll Down Indicator */}
                <a href="#cases" className="absolute bottom-4 animate-bounce motion-reduce:animate-none text-muted-foreground hover:text-foreground transition-colors z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full" aria-label="Scroll down">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </a>
            </section>

            {/* Case Section Divider */}
            <section id="cases" className="py-20 text-center bg-muted/50 border-t border-b">
                <h2 className="text-3xl font-bold tracking-tight">{content.sectionDividerCases.title}</h2>
            </section>

            {/* Case List */}
            <section className="container mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-10">
                {content.caseList.items.map((item, i) => (
                    <Link href={item.href || "#"} key={i} className="group block">
                        <div className="relative h-64 bg-muted overflow-hidden mb-4 rounded-xl border">
                            <img src={item.thumbnailImage} alt={item.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.summary}</p>
                    </Link>
                ))}
            </section>

            {/* Visual Design */}
            <section className="py-32 text-center bg-zinc-900 text-white px-4">
                <h2 className="text-4xl font-bold mb-12">{content.visualDesignWork.title}</h2>

                <div className="max-w-4xl mx-auto mb-12 overflow-hidden rounded-xl">
                    <img
                        src={content.visualDesignWork.backgroundMedia}
                        alt={content.visualDesignWork.title}
                        className="w-full h-auto object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                    />
                </div>

                <p className="max-w-2xl mx-auto mb-8 text-zinc-300 text-lg leading-relaxed">{content.visualDesignWork.description}</p>
                <a href={content.visualDesignWork.ctaHref} target="_blank" className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition">
                    {content.visualDesignWork.ctaLabel}
                </a>
            </section>

            {/* About Summary */}
            <section className="container mx-auto px-4 py-32 max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                    <div className="w-full">
                        <h2 className="text-3xl font-bold text-left mb-4">{content.aboutSummary.heading1}</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">{content.aboutSummary.paragraph1}</p>
                    </div>

                    <div className="w-full">
                        <h2 className="text-3xl font-bold text-left mb-4">{content.aboutSummary.heading2}</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">{content.aboutSummary.paragraph2}</p>
                    </div>
                </div>
            </section>

        </div>
    );
}
