import { getHomePageContent, getProject } from "@/utils/content";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXImage, Callout, Quote, Metric, VideoEmbed, FigmaEmbed, ProductTrioDiagram, Ref, Footnotes, FootnoteItem, BeforeAfter, MediaFrame, RxProAiDemo, IntelieBottleneck } from "@/components/mdx";
import { StaticAfyaDiscovery } from "@/components/pdf/StaticAfyaDiscovery";
import { StaticMetricsDashboard } from "@/components/pdf/StaticMetrics";
import PagedJsPreview from "@/components/pdf/PagedJsPreview";
import { Globe } from "lucide-react";
import React from "react";
import "./pdf.css";

const slugify = (text: string) => {
    if (typeof text !== 'string') return '';
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
};

const StaticMDXImage = ({ src, alt, invertInDark, lightBgInDark }: { src: string; alt: string; invertInDark?: boolean; lightBgInDark?: boolean }) => {
    return (
        <figure className="my-6">
            <MediaFrame className="block w-full overflow-hidden border-2 border-foreground bg-background">
                <Image priority unoptimized src={src} alt={alt || "Image"} width={1200} height={800} className={`w-full h-auto object-cover ${invertInDark ? 'dark:invert' : ''} ${lightBgInDark ? 'dark:bg-white dark:p-4' : ''}`} />
            </MediaFrame>
            {alt && <figcaption className="text-center !text-[11px] text-foreground type-label !mt-4">{alt}</figcaption>}
        </figure>
    );
};

const mdxComponents = {
    Image: StaticMDXImage,
    Callout,
    Quote,
    Metric,
    VideoEmbed,
    FigmaEmbed,
    Ref,
    Footnotes,
    FootnoteItem,
    BeforeAfter,
    AfyaDiscovery: StaticAfyaDiscovery,
    h2: (props: any) => {
        const textContent = React.Children.toArray(props.children).join('');
        return <h2 id={slugify(textContent)} className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-foreground" {...props} />;
    },
    h3: (props: any) => {
        const textContent = React.Children.toArray(props.children).join('');
        return <h3 id={slugify(textContent)} className="text-lg md:text-xl font-medium mt-6 mb-3 text-foreground" {...props} />;
    },
    code: (props: any) => <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props} />,
    pre: (props: any) => <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm my-4" {...props} />,
    table: (props: any) => (
        <div className="w-full my-8 overflow-hidden break-inside-avoid column-span-all">
            <table className="w-full text-sm text-left border-collapse" {...props} />
        </div>
    ),
    th: (props: any) => <th className="border-b-2 border-foreground/20 p-3 font-bold bg-muted/30" {...props} />,
    td: (props: any) => <td className="border-b border-border p-3" {...props} />,
    p: (props: any) => <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-4" {...props} />,
    a: (props: any) => <a className="text-blue-600 font-medium" target="_blank" rel="noopener noreferrer" {...props} /> 
};

function renderBlocks(blocks: any[], locale: string) {
    if (!blocks || blocks.length === 0) return null;

    const grouped: any[] = [];
    let currentTextGroup: any[] = [];

    blocks.forEach((block: any, index: number) => {
        if (['text', 'callout', 'quote', 'metric', 'image', 'before-after'].includes(block.type)) {
            currentTextGroup.push({ ...block, originalIndex: index });
        } else {
            if (currentTextGroup.length > 0) {
                grouped.push({ type: 'text-group', items: currentTextGroup, index: `group-${index}` });
                currentTextGroup = [];
            }
            if (!['video', 'figma', 'rxpro-demo', 'pdf-page-break', 'full-width-text'].includes(block.type)) {
                grouped.push({ ...block, originalIndex: index });
            }
            if (block.type === 'pdf-page-break') {
                grouped.push({ type: 'manual-break', index: `break-${index}` });
            }
            if (block.type === 'full-width-text') {
                grouped.push({ ...block, originalIndex: index });
            }
        }
    });

    if (currentTextGroup.length > 0) {
        grouped.push({ type: 'text-group', items: currentTextGroup, index: `group-end` });
    }

    return grouped.map((group: any) => {
        if (group.type === 'manual-break') {
            return <div key={group.index} style={{ breakAfter: 'page', breakBefore: 'page' }}></div>;
        }
        if (group.type === 'full-width-text') {
            return <div key={group.originalIndex} className="w-full my-8 break-inside-avoid"><MDXRemote source={group.content || ''} components={mdxComponents} /></div>;
        }
        if (group.type === 'text-group') {
            return (
                <div key={group.index} className="columns-2-layout prose prose-lg prose-headings:font-bold prose-headings:mt-4 prose-p:my-4 w-full max-w-none text-left mb-10">
                    {group.items.map((block: any) => {
                        const idx = block.originalIndex;
                        switch (block.type) {
                            case 'text':
                                return <div key={idx} className="mb-6"><MDXRemote source={block.content || ''} components={mdxComponents} /></div>;
                            case 'callout':
                                return (
                                    <div key={idx} className="my-6">
                                        <Callout type={block.type}>
                                            <div dangerouslySetInnerHTML={{ __html: block.content || '' }} />
                                        </Callout>
                                    </div>
                                );
                            case 'metric':
                                return <div key={idx} className="my-6"><Metric label={block.label} value={block.value} /></div>;
                            case 'quote':
                                return <div key={idx} className="my-6"><Quote author={block.author}>{block.content}</Quote></div>;
                            case 'image':
                                return (
                                    <div key={idx} className="my-6 w-full relative">
                                        <StaticMDXImage src={block.src} alt={block.alt} invertInDark={block.invertInDark} lightBgInDark={block.lightBgInDark} />
                                    </div>
                                );
                            case 'before-after':
                                return (
                                    <div key={idx} className="my-8 w-full break-inside-avoid column-span-all flex gap-4">
                                        <div className="flex-1 flex flex-col">
                                            <p className="font-bold text-center text-sm mb-2 uppercase tracking-widest opacity-80">{block.before.label}</p>
                                            <MediaFrame className="block w-full border border-border bg-background flex-1">
                                                <Image priority unoptimized src={block.before.src} alt={block.before.label || "Antes"} width={600} height={400} className="w-full h-auto object-cover" />
                                            </MediaFrame>
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <p className="font-bold text-center text-sm mb-2 uppercase tracking-widest opacity-80">{block.after.label}</p>
                                            <MediaFrame className="block w-full border border-border bg-background flex-1">
                                                <Image priority unoptimized src={block.after.src} alt={block.after.label || "Depois"} width={600} height={400} className="w-full h-auto object-cover" />
                                            </MediaFrame>
                                        </div>
                                    </div>
                                );
                            default:
                                return null;
                        }
                    })}
                </div>
            );
        } else {
            const idx = group.originalIndex;
            switch (group.type) {
                case 'metrics-dashboard':
                    return <div key={idx} className="my-8"><StaticMetricsDashboard metrics={group.metrics} /></div>;
                case 'summary-card':
                    return (
                        <div key={idx} className="mt-2 mb-12 w-full break-inside-avoid">
                            <MediaFrame className="block w-full p-8 bg-background border-2 border-foreground/10 relative shadow-sm">
                                <div className="flex gap-12">
                                    <div className="flex-1 prose prose-base prose-headings:font-bold prose-headings:text-2xl prose-headings:mb-4 prose-headings:mt-0 max-w-none text-left">
                                        <MDXRemote source={group.content || ''} components={mdxComponents} />
                                    </div>
                                    {group.metrics && (
                                        <div className="w-[200px] shrink-0 flex flex-col justify-center border-l border-border pl-8">
                                            <StaticMetricsDashboard metrics={group.metrics} vertical={true} />
                                        </div>
                                    )}
                                </div>
                            </MediaFrame>
                        </div>
                    );
                case 'afya-discovery':
                    return (
                        <div key={idx} className="my-10 w-full">
                            <MediaFrame className="block w-full bg-background border-2 border-foreground relative p-4">
                                <StaticAfyaDiscovery locale={locale} />
                            </MediaFrame>
                            {group.alt && <figcaption className="text-center !text-[11px] text-foreground type-label !mt-4 max-w-xl mx-auto">{group.alt}</figcaption>}
                        </div>
                    );
                default:
                    return null;
            }
        }
    });
}

function renderProject(project: any, locale: string, index: number) {
    if (!project || !project.blocks) return null;

    const blocks = project.blocks[0]?.type === 'callout' ? project.blocks.slice(1) : project.blocks;
    
    // Extract summary-card if it's the next block
    const summaryCardBlock = blocks[0]?.type === 'summary-card' ? blocks[0] : null;
    const remainingBlocks = summaryCardBlock ? blocks.slice(1) : blocks;

    return (
        <React.Fragment>
            {/* Case Separator / Cover Page */}
            <div className="page-break page-break-after">
                <div className="flex flex-col min-h-[160mm] pt-24 pb-12 max-w-4xl mx-auto">
                    <span className="text-[7rem] font-black tracking-tighter opacity-[0.03] leading-none block mb-6 -ml-1">
                    CASE 0{index}
                </span>
                <span className="type-label text-sm uppercase tracking-widest text-muted-foreground block mb-4">{project.meta.context}</span>
                <h2 className="text-[3.5rem] font-bold type-display leading-tight text-balance mb-8">
                    {project.meta.title}
                </h2>
                
                <div className="flex gap-16 border-t border-border pt-8 mt-4">
                    {project.meta.role && (
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest opacity-50 block mb-2">{locale === 'pt' ? 'Atuação' : 'Role'}</span>
                            <p className="text-lg font-medium">{project.meta.role}</p>
                        </div>
                    )}
                    {project.blocks[0]?.type === 'callout' && (
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest opacity-50 block mb-2">{locale === 'pt' ? 'Equipe' : 'Team'}</span>
                            <div className="text-sm opacity-80 leading-relaxed" dangerouslySetInnerHTML={{ __html: project.blocks[0].content.replace('<strong>Em colaboração com:</strong><br/>', '').replace('<strong>In collaboration with:</strong><br/>', '') || '' }} />
                        </div>
                    )}
                </div>
            </div>
            </div>

            <div className="project-section page-break-after">
                {summaryCardBlock && (
                    <div className="w-full mb-10 page-break-after">
                        {renderBlocks([summaryCardBlock], locale)}
                    </div>
                )}
                
                <div className="w-full">
                    {renderBlocks(remainingBlocks, locale)}
                </div>
            </div>
        </React.Fragment>
    );
}

export default function PdfPortfolio({ params: { locale } }: { params: { locale: string } }) {
    const homeContent = getHomePageContent(locale);
    const afyaProject = getProject(locale, 'afya-ai-initiatives');
    const voltzProject = getProject(locale, 'voltz-motors');
    
    return (
        <PagedJsPreview>
            <div className="pdf-document bg-background text-foreground">
                <style dangerouslySetInnerHTML={{__html: `
                    @page {
                        size: A4 landscape;
                        margin: 15mm 20mm;
                    }
                    /* Lock fluid typography to print-friendly sizes (16px base) for consistent pdf rendering */
                    .pdf-document {
                        --step--2: 0.7rem;
                        --step--1: 0.875rem;
                        --step-0: 1rem;       /* 16px */
                        --step-1: 1.15rem;
                        --step-2: 1.35rem;
                        --step-3: 1.6rem;
                        --step-4: 2rem;
                        --step-5: 2.5rem;
                        --step-6: 3rem;
                        background: white !important;
                        color: black !important;
                    }
                `}} />

                {/* Cover Page */}
                <div className="flex flex-col h-[170mm] mb-10" style={{ breakAfter: 'page', pageBreakAfter: 'always' }}>
                    <header className="flex items-start mb-auto">
                        <Image 
                            priority
                            unoptimized
                            src="/images/logo-header-horiz.svg" 
                            alt="Jeff Domingos" 
                            width={160}
                            height={32}
                            className="h-10 w-auto" 
                        />
                    </header>
                    <main className="flex-1 flex flex-col justify-center max-w-5xl mt-12 mb-12">
                        <h1 className="text-[3.5rem] font-bold leading-[1.1] text-balance mb-8 type-display">
                            {homeContent.hero.headline}
                        </h1>
                        {homeContent.hero.subheadline && (
                            <p className="text-[1.75rem] leading-[1.6] max-w-4xl type-body font-light">
                                {homeContent.hero.subheadline}
                            </p>
                        )}
                    </main>
                    <footer className="mt-auto pt-8 border-t border-foreground/10 max-w-2xl flex items-start gap-4">
                        <Globe className="w-6 h-6 shrink-0 mt-0.5 opacity-80" />
                        <p className="text-lg text-foreground/80 font-medium leading-relaxed">
                            {locale === 'pt' 
                                ? <>Acesse <a href="https://jeffdomingos.com" target="_blank" rel="noopener noreferrer" className="font-bold text-foreground hover:underline">jeffdomingos.com</a> para ver a versão completa deste portfólio com mais cases e protótipos interativos.</>
                                : <>Visit <a href="https://jeffdomingos.com" target="_blank" rel="noopener noreferrer" className="font-bold text-foreground hover:underline">jeffdomingos.com</a> to see the full version of this portfolio with more cases and interactive prototypes.</>}
                        </p>
                    </footer>
                </div>

                {/* Project: Afya */}
                {renderProject(afyaProject, locale, 1)}

                {/* Project: Voltz */}
                {renderProject(voltzProject, locale, 2)}

                {/* Final Page: Contacts */}
                <div style={{ breakBefore: 'page', pageBreakBefore: 'always', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <div className="mb-4 mt-auto">
                        <Image 
                            priority
                            unoptimized
                            src="/images/logo-full.svg" 
                            alt="Jeff Domingos Logo" 
                            width={320}
                            height={320}
                            className="w-64 h-64 md:w-80 md:h-80 mx-auto opacity-90" 
                        />
                    </div>
                    
                    <div className="flex flex-col gap-4 text-2xl type-label mb-10 mt-2">
                        <a href={`mailto:${homeContent.quickContacts.emailValue}`} className="hover:underline text-foreground">{homeContent.quickContacts.emailValue}</a>
                        <a href={`https://wa.me/${homeContent.quickContacts.whatsappValue.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-foreground">{homeContent.quickContacts.whatsappValue}</a>
                        <a href={`https://linkedin.com/${homeContent.quickContacts.linkedinValue}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-foreground">{homeContent.quickContacts.linkedinValue}</a>
                    </div>

                    <div className="mt-auto border-t border-border pt-8 w-full max-w-2xl pb-4">
                        <span className="block text-foreground/70 uppercase tracking-widest text-xs font-semibold mb-3">
                            {locale === 'pt' ? 'Portfólio completo e muito mais em:' : 'Full portfolio and more at:'}
                        </span>
                        <a href="https://jeffdomingos.com" target="_blank" rel="noopener noreferrer" className="text-3xl font-bold font-mono hover:underline text-foreground">jeffdomingos.com</a>
                    </div>
                </div>

            </div>
        </PagedJsPreview>
    );
}
