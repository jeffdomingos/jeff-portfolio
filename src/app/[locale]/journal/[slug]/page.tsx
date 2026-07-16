import { getJournalPost, getAllJournalPosts } from "@/utils/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXImage, Callout, Quote, Metric, VideoEmbed, FigmaEmbed, ProductTrioDiagram } from "@/components/mdx";
import { Link } from "next-view-transitions";
import { DMCommentForm } from "@/components/organisms/DMCommentForm";
import { Linkedin, Instagram } from "lucide-react";

const mdxComponents = {
    Image: MDXImage,
    Callout,
    Quote,
    Metric,
    VideoEmbed,
    FigmaEmbed,
    h2: (props: any) => <h2 className="text-3xl font-bold mt-12 mb-6 text-heading" {...props} />,
    p: (props: any) => <p className="text-lg text-foreground/90 leading-relaxed mb-6" {...props} />,
    a: (props: any) => <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
};

export async function generateStaticParams({ params }: { params: { locale?: string } }) {
    if (!params.locale) return [];

    const posts = getAllJournalPosts(params.locale);
    return posts.map((p) => ({
        slug: p.meta.slug,
    }));
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string, slug: string } }) {
    const { meta } = getJournalPost(locale, slug);
    return { title: `${meta.title} - Journal - Jeff Domingos` };
}

export default function JournalPostDetail({ params: { locale, slug } }: { params: { locale: string, slug: string } }) {
    const { meta, blocks } = getJournalPost(locale, slug);

    // Format date
    let displayDate = meta.date;
    if (meta.date) {
        try {
            const d = new Date(meta.date + 'T00:00:00');
            displayDate = new Intl.DateTimeFormat(locale === 'pt' ? 'pt-BR' : 'en-US', {
                day: 'numeric', month: 'long', year: 'numeric'
            }).format(d);
        } catch (e) {}
    }

    return (
        <article className="pb-20 relative w-full z-40">
            {/* Simple Hero for Journal Post */}
            <div className="w-full pt-40 pb-20 px-fluid-xs md:px-fluid-m bg-background relative border-b border-foreground/10">
                <div className="max-w-4xl mx-auto flex flex-col items-start">
                    <Link href={`/${locale}/journal`} className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground mb-8 transition-colors type-label text-step--1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6"/>
                        </svg>
                        {locale === 'pt' ? 'Voltar para o Journal' : 'Back to Journal'}
                    </Link>
                    
                    <span className="block text-step--1 type-label text-foreground/70 font-mono mb-4">{displayDate}</span>
                    <h1 className="text-step-4 md:text-step-5 type-display text-foreground leading-tight mb-6">
                        {meta.title}
                    </h1>
                    
                    {meta.tags && meta.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {meta.tags.map((tag: string, tagIndex: number) => (
                                <span key={tagIndex} className="px-3 py-1 bg-foreground/5 text-foreground text-step--2 type-label rounded-full border border-foreground/10">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Content Blocks */}
            <div className="relative z-50 w-full max-w-4xl mx-auto pt-fluid-xl px-fluid-xs md:px-fluid-m prose prose-lg md:prose-xl prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary">
                {blocks && blocks.length > 0 ? (
                    blocks.map((block: any, index: number) => {
                        switch (block.type) {
                            case 'text':
                                return <MDXRemote key={index} source={block.content || ''} components={mdxComponents} />;
                            case 'image':
                                return <MDXImage key={index} src={block.src} alt={block.alt} invertInDark={block.invertInDark} lightBgInDark={block.lightBgInDark} />;
                            case 'callout':
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
                            case 'product-trio':
                                return <ProductTrioDiagram key={index} locale={locale} />;
                            default:
                                return null;
                        }
                    })
                ) : (
                    <div className="text-center py-20 text-foreground font-light italic bg-muted/50 rounded-xl border">
                        <p>{locale === 'pt' ? 'O conteúdo deste post está em construção.' : 'Post details are under construction.'}</p>
                    </div>
                )}
            </div>

            {/* Discussion & DM Form Area */}
            <div className="relative z-50 w-full max-w-4xl mx-auto px-fluid-xs md:px-fluid-m pb-fluid-xl mt-12">
                {(meta.linkedinUrl || meta.instagramUrl) && (
                    <div className="mb-12 p-8 bg-foreground/5 rounded-2xl border border-foreground/10">
                        <h3 className="text-step-1 type-subheading mb-4">
                            {locale === 'pt' ? 'Participe da discussão pública' : 'Join the public discussion'}
                        </h3>
                        <p className="text-foreground/70 type-body mb-6">
                            {locale === 'pt' 
                                ? 'Este assunto também está sendo discutido nas minhas redes. Clique nos links abaixo para comentar e interagir por lá!' 
                                : 'This topic is also being discussed on my networks. Click the links below to comment and interact over there!'}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {meta.linkedinUrl && (
                                <a 
                                    href={meta.linkedinUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-[#0A66C2] text-white rounded-full font-medium hover:bg-[#004182] transition-colors"
                                >
                                    <Linkedin className="w-5 h-5" />
                                    LinkedIn
                                </a>
                            )}
                            {meta.instagramUrl && (
                                <a 
                                    href={meta.instagramUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white rounded-full font-medium hover:opacity-90 transition-opacity"
                                >
                                    <Instagram className="w-5 h-5" />
                                    Instagram
                                </a>
                            )}
                        </div>
                    </div>
                )}
                
                <DMCommentForm postTitle={meta.title} locale={locale} />
            </div>
        </article>
    );
}
