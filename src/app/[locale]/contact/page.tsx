import { getContactPageContent } from "@/utils/content";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    return { title: `Contact - ${locale.toUpperCase()}` };
}

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
    const content = getContactPageContent(locale);

    return (
        <div className="container mx-auto px-4 py-20 max-w-xl text-center">
            <h1 className="text-4xl font-bold mb-2">{content.pageTitleHeader.title}</h1>
            {content.pageTitleHeader.subtitle && (
                <h2 className="text-xl text-gray-500 mb-12">{content.pageTitleHeader.subtitle}</h2>
            )}

            {content.contactOptions.items.length > 0 && (
                <div className="space-y-6">
                    {content.contactOptions.items.map((item, i) => (
                        <a
                            key={i}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-6 border rounded-xl hover:shadow-md transition bg-background border-border"
                        >
                            <h3 className="text-xl font-bold mb-2 text-foreground">{item.platformName}</h3>
                            <p className="text-muted-foreground mb-4">{item.description}</p>
                            <span className="text-primary font-medium">{item.ctaLabel} &rarr;</span>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
