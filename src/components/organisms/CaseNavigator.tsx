import Link from "next/link";
import { getAllProjects } from "@/utils/content";
import { cn } from "@/lib/utils";

export function CaseNavigator({ locale, currentSlug }: { locale: string; currentSlug: string }) {
    const projects = getAllProjects(locale);

    return (
        <section className="border-t border-foreground mt-20 pt-16 pb-8 bg-halftone">
            <div className="container mx-auto px-4">
                <div className="flex justify-center mb-8">
                    <h3 className="text-xl font-bold text-center text-foreground px-6 py-2 bg-background/95 backdrop-blur-md rounded-full border border-foreground/10 shadow-sm">
                        {locale === "pt" ? "Navegue por outros cases" : "Explore other cases"}
                    </h3>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    {projects.map((project, i) => {
                        const isCurrent = project.meta.slug === currentSlug;
                        const href = `/${locale}/projects/${project.meta.slug}`;

                        return (
                            <Link
                                href={href}
                                key={i}
                                className={cn(
                                    "px-6 py-3 rounded-full text-sm transition-all duration-300 shadow-sm",
                                    isCurrent
                                        ? "bg-foreground text-background font-bold scale-105"
                                        : "bg-background/95 backdrop-blur-md border border-foreground/20 text-foreground font-semibold hover:bg-background hover:scale-105"
                                )}
                            >
                                {project.meta.title}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
