import { getJournalPost, getAllJournalPosts } from "@/utils/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXImage, Callout, Quote, Metric, VideoEmbed, FigmaEmbed, ProductTrioDiagram, Ref, Footnotes, FootnoteItem } from "@/components/mdx";
import { LinksBlock } from "@/components/mdx/LinksBlock";
import { Link } from "next-view-transitions";
import { DMCommentForm } from "@/components/organisms/DMCommentForm";
import { Linkedin, Instagram } from "lucide-react";
import { AuthorBio } from "@/components/organisms/AuthorBio";
import { TableOfContents } from "@/components/organisms/TableOfContents";
import { PageHero } from "@/components/organisms";
import { generateTOC } from "@/utils/toc";
import React from "react";

const slugify = (text: string) => {
    if (typeof text !== 'string') return '';
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
};

const mdxComponents = {
    Image: MDXImage,
    Callout,
    Quote,
    Metric,
    VideoEmbed,
    FigmaEmbed,
    Ref,
    Footnotes,
    FootnoteItem,
    h2: (props: any) => {
        const textContent = React.Children.toArray(props.children).join('');
        return <h2 id={slugify(textContent)} className="text-3xl font-bold mt-12 mb-6 text-heading scroll-mt-32" {...props} />;
    },
    h3: (props: any) => {
        const textContent = React.Children.toArray(props.children).join('');
        return <h3 id={slugify(textContent)} className="text-xl md:text-2xl font-medium mt-8 mb-4 text-foreground/80 scroll-mt-32" {...props} />;
    },
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
    const toc = generateTOC(blocks);

    // Variável para amarrar a largura de todas as colunas de conteúdo da página
    const CONTENT_MAX_WIDTH = "max-w-3xl";

    // Format date
    let displayDate = meta.date;
    if (meta.date) {
        try {
            const d = (meta.date as any) instanceof Date ? (meta.date as any as Date) : new Date(meta.date + 'T00:00:00');
            displayDate = new Intl.DateTimeFormat(locale === 'pt' ? 'pt-BR' : 'en-US', {
                day: 'numeric', month: 'long', year: 'numeric'
            }).format(d);
        } catch (e) {}
    }

    return (
        <article className="pb-20 relative w-full z-40">
            <PageHero
                slug={`journal-${slug}`}
                overline={displayDate}
                title={meta.title}
                tags={meta.tags}
                readingTimeLabel={meta.readingTime ? (locale === 'pt' ? `${meta.readingTime} min de leitura` : `${meta.readingTime} min read`) : undefined}
            />

            {/* Main Content Layout with TOC */}
            <div className="relative z-50 w-full pt-fluid-xl px-fluid-xs md:px-fluid-m">
                
                {/* Sidebar TOC */}
                {toc.length > 0 && (
                    <div className="hidden xl:block absolute left-4 2xl:left-12 top-fluid-xl bottom-0 w-64">
                        <TableOfContents toc={toc} locale={locale} />
                    </div>
                )}

                {/* Content Blocks */}
                <div className={`w-full ${CONTENT_MAX_WIDTH} mx-auto prose prose-lg md:prose-xl prose-headings:font-bold prose-headings:tracking-normal prose-a:text-primary prose-p:my-fluid-s prose-p:leading-relaxed prose-h2:mt-fluid-xl prose-h2:mb-fluid-m prose-h3:mt-fluid-l prose-h3:mb-fluid-s prose-ul:my-fluid-m prose-li:my-2 prose-li:marker:text-foreground prose-li:leading-relaxed [&_li_p]:my-0 prose-figure:my-fluid-xl`}>
                {blocks && blocks.length > 0 ? (
                    blocks.map((block: any, index: number) => {
                        switch (block.type) {
                            case 'text':
                                return <MDXRemote key={index} source={block.content || ''} components={mdxComponents} />;
                            case 'image':
                                return <MDXImage key={index} src={block.src} alt={block.alt} invertInDark={block.invertInDark} lightBgInDark={block.lightBgInDark} cleanLayout={block.cleanLayout} scrollingMockup={block.scrollingMockup} />;
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
                            case 'links':
                                return <LinksBlock key={index} title={block.title} items={block.items} />;
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
            </div>

            {/* Author Bio */}
            <div className={`relative z-50 w-full ${CONTENT_MAX_WIDTH} mx-auto px-fluid-xs md:px-fluid-m`}>
                <AuthorBio locale={locale} />
            </div>

            {/* Discussion & DM Form Area */}
            <div className={`relative z-50 w-full ${CONTENT_MAX_WIDTH} mx-auto px-fluid-xs md:px-fluid-m pb-fluid-xl mt-12`}>
                {(meta.linkedinUrl || meta.instagramUrl) && (
                    <div className="mb-10 pt-4">
                        <h3 className="text-step-0 font-bold mb-2">
                            {locale === 'pt' ? 'Participe da discussão pública' : 'Join the public discussion'}
                        </h3>
                        <p className="text-foreground/70 text-step--1 type-body mb-4">
                            {locale === 'pt' 
                                ? 'Este assunto também está sendo discutido nas minhas redes. Clique nos links abaixo para comentar e interagir por lá!' 
                                : 'This topic is also being discussed on my networks. Click the links below to comment and interact over there!'}
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {meta.linkedinUrl && (
                                <a 
                                    href={meta.linkedinUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full text-step--1 font-medium hover:bg-foreground/90 transition-colors"
                                >
                                    <Linkedin className="w-4 h-4" />
                                    LinkedIn
                                </a>
                            )}
                            {meta.instagramUrl && (
                                <a 
                                    href={meta.instagramUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full text-step--1 font-medium hover:bg-foreground/90 transition-colors"
                                >
                                    <Instagram className="w-4 h-4" />
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
