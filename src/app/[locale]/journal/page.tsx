import { getAllJournalPosts } from "@/utils/content";
import { Link } from "next-view-transitions";
import Image from "next/image";

export default function JournalPage({ params: { locale } }: { params: { locale: string } }) {
    const posts = getAllJournalPosts(locale);

    return (
        <div className="relative z-40 w-full px-fluid-xs md:px-fluid-m pt-32 pb-fluid-2xl min-h-screen">
            {/* Header Reading Protection Gradient */}
            <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-[75]"></div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-fluid-xl border-b border-foreground/10 pb-fluid-s w-full">
                <h1 className="text-step-4 md:text-step-5 type-display text-left m-0 p-0">
                    Journal
                </h1>
                <p className="text-step-0 type-body text-foreground/70 mt-2 md:mt-0">
                    {locale === 'pt' ? 'Processos, updates e descobertas.' : 'Processes, updates and discoveries.'}
                </p>
            </div>

            {posts.length === 0 ? (
                <div className="w-full text-center py-20 text-foreground/50 italic bg-muted/30 rounded-xl border border-dashed">
                    {locale === 'pt' ? 'Nenhum post publicado ainda.' : 'No posts published yet.'}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fluid-m w-full">
                    {posts.map((post, i) => {
                        const href = `/${locale}/journal/${post.meta.slug}`;
                        
                        // Parse date for display
                        let displayDate = post.meta.date;
                        if (post.meta.date) {
                            try {
                                const d = (post.meta.date as any) instanceof Date ? (post.meta.date as any as Date) : new Date(post.meta.date + 'T00:00:00'); // Ensure it reads as local
                                displayDate = new Intl.DateTimeFormat(locale === 'pt' ? 'pt-BR' : 'en-US', {
                                    day: 'numeric', month: 'short', year: 'numeric'
                                }).format(d);
                            } catch (e) {}
                        }

                        return (
                            <Link href={href} key={i} className="group flex flex-col border border-foreground/20 bg-background hover:border-foreground transition-colors rounded-xl overflow-hidden">
                                {post.meta.thumbnail && (
                                    <div className="relative h-48 md:h-64 w-full overflow-hidden border-b border-border">
                                        <Image src={post.meta.thumbnail} fill={true} sizes="(max-width: 768px) 100vw, 33vw" alt={post.meta.title} className="object-cover transition-transform duration-700 ease-[0.21,0.47,0.32,0.98]" />
                                    </div>
                                )}
                                <div className="p-6 md:p-8 flex flex-col grow">
                                    <div className="mb-4">
                                        <span className="block text-step--1 type-label opacity-60 mb-2 font-mono">
                                            {displayDate}
                                        </span>
                                        <h3 className="text-step-1 md:text-step-2 type-subheading line-clamp-2 leading-tight">
                                            {post.meta.title}
                                        </h3>
                                    </div>
                                    <p className="text-foreground/80 type-body line-clamp-3 mb-6 leading-relaxed">
                                        {post.meta.summary}
                                    </p>
                                    
                                    {post.meta.tags && post.meta.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {post.meta.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                                                <span key={tagIndex} className="px-3 py-1 bg-transparent text-foreground text-step--2 type-label rounded-full border border-foreground border-dashed">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
