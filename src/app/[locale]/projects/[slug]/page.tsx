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

    return (
        <article className="pb-20">
            {/* Language fallback toast (client-side, invisible) */}
            <LanguageFallbackToast requestedLocale={requestedLocale} effectiveLang={effectiveLang} />

            {/* Project Hero */}
            <header className="bg-muted/30 border-b py-24 mb-16 px-4 transition-colors">
                <div className="container mx-auto max-w-4xl">
                    <h1 className="text-5xl font-extrabold mb-6 tracking-tight text-foreground">{meta.title}</h1>
                    <div className="flex flex-wrap gap-4 text-muted-foreground mb-8 text-lg">
                        {meta.role && <span><strong className="text-foreground">Role:</strong> {meta.role}</span>}
                        {meta.timeline && <span><strong className="text-foreground">Timeline:</strong> {meta.timeline}</span>}
                    </div>
                    {meta.tags && meta.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {meta.tags.map((tag: string, i: number) => (
                                <span key={i} className="px-3 py-1 bg-background border rounded-full text-sm font-medium text-foreground shadow-sm">{tag}</span>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            {/* Polymorphic Blocks Content */}
            <div className="container mx-auto max-w-3xl px-4 prose prose-lg dark:prose-invert">
                {blocks && blocks.length > 0 ? (
                    blocks.map((block: any, index: number) => {
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
                    <div className="text-center py-20 text-muted-foreground italic bg-muted/50 rounded-xl border">
                        <p>Project details are under construction.</p>
                    </div>
                )}
            </div>

            {/* Case Navigator */}
            <CaseNavigator locale={locale} currentSlug={slug} />
        </article>
    );
}

