import { getAllJournalPosts } from "@/utils/content";
import { InteractiveListSection, ListItem } from "@/components/organisms/InteractiveListSection";

export default function JournalPage({ params: { locale } }: { params: { locale: string } }) {
    const posts = getAllJournalPosts(locale);

    const items: ListItem[] = posts.map((post) => {
        let displayDate = post.meta.date;
        if (post.meta.date) {
            try {
                const d = (post.meta.date as any) instanceof Date ? (post.meta.date as any as Date) : new Date(post.meta.date + 'T00:00:00');
                displayDate = new Intl.DateTimeFormat(locale === 'pt' ? 'pt-BR' : 'en-US', {
                    day: 'numeric', month: 'short', year: 'numeric'
                }).format(d);
            } catch (e) {}
        }

        return {
            id: post.meta.slug,
            context: displayDate as string,
            title: post.meta.title,
            summary: post.meta.summary || "",
            href: `/${locale}/journal/${post.meta.slug}`,
            thumbnailImage: post.meta.thumbnail,
            tags: post.meta.tags,
        };
    });

    return (
        <div className="relative z-40 w-full px-0 pt-32 pb-fluid-2xl min-h-screen">
            {/* Header Reading Protection Gradient */}
            <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-[75]"></div>
            
            <div className="px-fluid-xs md:px-fluid-m flex flex-col md:flex-row md:items-end justify-between mb-fluid-xl pb-fluid-s w-full">
                <h1 className="text-step-4 md:text-step-5 type-display text-left m-0 p-0">
                    Journal
                </h1>
                <p className="text-step-0 type-body text-foreground/70 mt-2 md:mt-0 max-w-md text-left md:text-right">
                    {locale === 'pt' ? 'Processos, updates e descobertas.' : 'Processes, updates and discoveries.'}
                </p>
            </div>

            <InteractiveListSection items={items} locale={locale} />
        </div>
    );
}
