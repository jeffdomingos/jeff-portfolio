import { getProject, getAllProjects } from "@/utils/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents, MDXImage, Callout, Quote, Metric, VideoEmbed, FigmaEmbed } from "@/components/mdx";
import { CaseNavigator } from "@/components/organisms";
import { LanguageFallbackToast } from "@/components/atoms/LanguageFallbackToast";

export async function generateStaticParams({ params }: { params: { locale?: string } }) {
    if (!params.locale) return [];

    const projects = getAllProjects(params.locale);
    return projects.map((p) => ({
        slug: p.meta.slug,
    }));
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string, slug: string } }) {
    const { meta } = getProject(locale, slug);
    return { title: `${meta.title} - Jeff Domingos` };
}

export default function ProjectDetail({ params: { locale, slug } }: { params: { locale: string, slug: string } }) {
    const { meta, blocks, effectiveLang } = getProject(locale, slug);
    const requestedLocale = locale === "pt" ? "pt" : "en";

    let teamCallout: any = null;
    let blocksToRender = blocks;
    let teamCalloutHtml = '';

    if (blocks && blocks.length > 0 && blocks[0].type === 'callout') {
        teamCallout = blocks[0];
        blocksToRender = blocks.slice(1);
        
        // Format the callout HTML
        teamCalloutHtml = teamCallout.content || '';
        teamCalloutHtml = teamCalloutHtml.replace(/<br\s*\/?>/gi, '');
        teamCalloutHtml = teamCalloutHtml.replace(
            /<strong>(.*?)<\/strong>/i, 
            '<strong class="text-foreground/70 uppercase tracking-widest text-step--1 font-light block mb-3">$1</strong><div class="flex flex-wrap gap-x-8 gap-y-4">'
        );
        teamCalloutHtml = teamCalloutHtml.replace(
            /-\s*(.*?)\s*\((.*?)\)/g, 
            '<div class="flex flex-col"><span class="font-medium text-foreground text-step-0">$1</span><span class="text-step--2 text-foreground/60 tracking-widest uppercase mt-0.5">$2</span></div>'
        );
        teamCalloutHtml += '</div>'; // close the flex container
    }

    return (
        <article className="pb-20 relative w-full z-40">
            {/* Header Reading Protection Gradient */}
            <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-[75]"></div>
            
            {/* Language fallback toast (client-side, invisible) */}
            <LanguageFallbackToast requestedLocale={requestedLocale} effectiveLang={effectiveLang} />

            {/* Project Hero Wrapper */}
            <div className="relative w-full bg-background border-b border-border mb-fluid-xl transition-colors z-50">
                <header className="relative w-full px-fluid-xs md:px-fluid-m pt-32 pb-fluid-xl flex flex-col items-start">
                    <div className="w-full relative">
                        <div className="mb-6">
                            {meta.title.includes(' - ') ? (
                                <>
                                    <span className="block text-step-0 md:text-step-1 font-medium tracking-widest uppercase opacity-60 mb-2">
                                        {meta.title.split(' - ')[0]}
                                    </span>
                                    <h1 className="text-step-5 md:text-step-6 font-bold uppercase tracking-tighter text-foreground leading-[1.1]">
                                        {meta.title.split(' - ').slice(1).join(' - ')}
                                    </h1>
                                </>
                            ) : (
                                <h1 className="text-step-5 md:text-step-6 font-bold uppercase tracking-tighter text-foreground leading-[1.1]">
                                    {meta.title}
                                </h1>
                            )}
                        </div>
                        {meta.tags && meta.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-fluid-m">
                                {meta.tags.map((tag: string, i: number) => (
                                    <span key={i} className="px-4 py-1.5 bg-transparent border border-foreground border-dashed rounded-full text-step--2 uppercase tracking-wider text-foreground">{tag}</span>
                                ))}
                            </div>
                        )}
                        <div className="flex flex-wrap gap-x-12 gap-y-8 pt-8 border-t border-border/50">
                            {meta.role && (
                                <div className="flex flex-col">
                                    <strong className="text-foreground/70 uppercase tracking-widest text-step--1 font-light block mb-3">{requestedLocale === 'pt' ? 'Atuação' : 'Role'}</strong>
                                    <span className="font-bold text-foreground text-step-1 md:text-step-2 tracking-tight leading-none">{meta.role}</span>
                                </div>
                            )}
                            {meta.timeline && (
                                <div className="flex flex-col">
                                    <strong className="text-foreground/70 uppercase tracking-widest text-step--1 font-light block mb-3">Timeline</strong>
                                    <span className="font-medium text-foreground text-step-0">{meta.timeline}</span>
                                </div>
                            )}
                            {teamCallout && (
                                <div 
                                    className="flex flex-col"
                                    dangerouslySetInnerHTML={{ __html: teamCalloutHtml }}
                                />
                            )}
                        </div>
                    </div>
                </header>
            </div>

            {/* Polymorphic Blocks Content */}
            <div className="relative z-50 w-full max-w-4xl mx-auto px-fluid-xs md:px-fluid-m prose prose-lg md:prose-xl prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary">
                {blocksToRender && blocksToRender.length > 0 ? (
                    blocksToRender.map((block: any, index: number) => {
                        switch (block.type) {
                            case 'text':
                                return <MDXRemote key={index} source={block.content || ''} components={mdxComponents} />;
                            case 'image':
                                return <MDXImage key={index} src={block.src} alt={block.alt} invertInDark={block.invertInDark} lightBgInDark={block.lightBgInDark} />;
                            case 'callout':
                                // Callout content might have simple HTML/markdown, we can render via dangerouslySetInnerHTML or just pass string.
                                // We'll just pass it as children since the react compiler deals with text node.
                                // If it contains HTML:
                                return (
                                    <Callout key={index} type={block.type}>
                                        <div dangerouslySetInnerHTML={{ __html: block.content || '' }} />
                                    </Callout>
                                );
                            case 'quote':
                                return <Quote key={index} author={block.author}>{block.content}</Quote>;
                            case 'metric':
                                return <Metric key={index} label={block.label} value={block.value} />;
                            case 'video':
                                return <VideoEmbed key={index} src={block.src} title={block.title} />;
                            case 'figma':
                                return <FigmaEmbed key={index} src={block.src} title={block.title} />;
                            default:
                                return null;
                        }
                    })
                ) : (
                    <div className="text-center py-20 text-foreground font-light italic bg-muted/50 rounded-xl border">
                        <p>Project details are under construction.</p>
                    </div>
                )}
            </div>

            {/* Case Navigator */}
            <CaseNavigator locale={locale} currentSlug={slug} />
        </article>
    );
}

