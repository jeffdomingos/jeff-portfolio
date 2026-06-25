import { getContactPageContent } from "@/utils/content";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    return { title: `Contact - ${locale.toUpperCase()}` };
}

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
    const content = getContactPageContent(locale);

    return (
        <div className="relative z-[60] w-full px-fluid-xs md:px-fluid-m pt-32 pb-fluid-2xl min-h-[80vh] flex flex-col">
            {/* Header Reading Protection Gradient */}
            <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-[75]"></div>
            <div className="relative z-10 w-full bg-background/80 backdrop-blur-md p-fluid-s md:p-fluid-m rounded-2xl md:rounded-3xl shadow-sm border border-border mb-12">
                <h1 className="text-step-4 md:text-step-5 font-bold uppercase tracking-tighter border-b border-foreground/10 pb-fluid-s w-full text-left mb-4">
                    {content.pageTitleHeader.title}
                </h1>
                {content.pageTitleHeader.subtitle && (
                    <h2 className="text-step-1 text-foreground font-light w-full text-left">
                        {content.pageTitleHeader.subtitle}
                    </h2>
                )}
            </div>

            {content.contactOptions.items.length > 0 && (
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fluid-m w-full">
                    {content.contactOptions.items.map((item, i) => (
                        <a
                            key={i}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col p-8 md:p-12 border border-border bg-background hover:bg-foreground hover:text-background transition-colors duration-500 rounded-2xl overflow-hidden shadow-sm"
                        >
                            <h3 className="text-step-2 md:text-step-3 font-bold uppercase tracking-tight mb-4">{item.platformName}</h3>
                            <p className="font-light text-current opacity-80 mb-12 text-step--1">{item.description}</p>
                            <div className="mt-auto flex items-center justify-between w-full font-medium uppercase tracking-widest text-step--1 border-t border-current/20 pt-6">
                                <span>{item.ctaLabel}</span>
                                <span className="transform group-hover:translate-x-4 transition-transform duration-500">&rarr;</span>
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
