import { getContactPageContent } from "@/utils/content";
import { PageHero, ContactCards } from "@/components/organisms";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    return { title: `Contact - ${locale.toUpperCase()}` };
}

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
    const content = getContactPageContent(locale);

    return (
        <article className="pb-20 relative w-full z-40 min-h-[80svh]">
            <PageHero 
                title={content.pageTitleHeader.title}
                subtitle={content.pageTitleHeader.subtitle}
            />

            {content.contactOptions.items.length > 0 && (
                <ContactCards items={content.contactOptions.items} />
            )}
        </article>
    );
}
