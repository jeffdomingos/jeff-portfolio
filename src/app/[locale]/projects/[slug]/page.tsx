import { getProject, getAllProjects } from "@/utils/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXImage, Callout, Quote, Metric, VideoEmbed, FigmaEmbed, ProductTrioDiagram, Ref, Footnotes, FootnoteItem } from "@/components/mdx";
import { LinksBlock } from "@/components/mdx/LinksBlock";
import { TableOfContents } from "@/components/organisms/TableOfContents";
import { generateTOC } from "@/utils/toc";
import React from 'react';

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
import { CaseNavigator, PageHero } from "@/components/organisms";
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
    const toc = generateTOC(blocks);

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
            '<strong class="text-foreground/70 type-label text-step--1 block mb-3">$1</strong><div class="flex flex-wrap gap-x-8 gap-y-4">'
        );
        teamCalloutHtml = teamCalloutHtml.replace(
            /-\s*(.*?)\s*\((.*?)\)/g, 
            '<div class="flex flex-col"><span class="font-medium text-foreground text-step-0">$1</span><span class="text-step--2 text-foreground/60 type-label mt-0.5">$2</span></div>'
        );
        teamCalloutHtml += '</div>'; // close the flex container
    }

    return (
        <article className="pb-20 relative w-full z-40">
            <PageHero
                slug={slug}
                overline={meta.context}
                title={meta.title}
                tags={meta.tags}
                readingTimeLabel={meta.readingTime ? (requestedLocale === 'pt' ? `${meta.readingTime} min de leitura` : `${meta.readingTime} min read`) : undefined}
            >
                {meta.role && (
                    <div className="flex flex-col">
                        <strong className="text-foreground/70 type-label text-step--1 block mb-3">{requestedLocale === 'pt' ? 'Atuação' : 'Role'}</strong>
                        <span className="text-foreground text-step-1 md:text-step-2 type-subheading">{meta.role}</span>
                    </div>
                )}
                {meta.timeline && (
                    <div className="flex flex-col">
                        <strong className="text-foreground/70 type-label text-step--1 block mb-3">{requestedLocale === 'pt' ? 'Período' : 'Timeline'}</strong>
                        <span className="text-foreground text-step-1 md:text-step-2 type-subheading">{meta.timeline}</span>
                    </div>
                )}
                {teamCallout && (
                    <div 
                        className="flex flex-col"
                        dangerouslySetInnerHTML={{ __html: teamCalloutHtml }}
                    />
                )}
            </PageHero>

            {/* Main Content Layout with TOC */}
            <div className="relative z-50 w-full pt-fluid-xl px-fluid-xs md:px-fluid-m">
                
                {/* Sidebar TOC */}
                {toc.length > 0 && (
                    <div className="hidden xl:block absolute left-4 2xl:left-12 top-fluid-xl bottom-0 w-64">
                        <TableOfContents toc={toc} locale={locale} />
                    </div>
                )}

                {/* Content Blocks */}
                <div className="w-full max-w-3xl mx-auto prose prose-lg md:prose-xl prose-headings:font-bold prose-headings:tracking-normal prose-a:text-primary prose-p:my-fluid-s prose-p:leading-relaxed prose-h2:mt-fluid-xl prose-h2:mb-fluid-m prose-h3:mt-fluid-l prose-h3:mb-fluid-s prose-ul:my-fluid-m prose-li:my-2 prose-li:marker:text-foreground prose-li:leading-relaxed [&_li_p]:my-0 prose-figure:my-fluid-xl">
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
                        <p>Project details are under construction.</p>
                    </div>
                )}
                </div>
            </div>

            {/* Case Navigator */}
            <CaseNavigator locale={locale} currentSlug={slug} />
        </article>
    );
}

