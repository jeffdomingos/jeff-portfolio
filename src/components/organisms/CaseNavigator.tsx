import Link from "next/link";
import { getAllProjects } from "@/utils/content";
import { cn } from "@/lib/utils";

export function CaseNavigator({ locale, currentSlug }: { locale: string; currentSlug: string }) {
    const projects = getAllProjects(locale);

    return (
        <section className="border-t border-border mt-20 pt-16 pb-8 bg-muted/10">
            <div className="container mx-auto px-4">
                <h3 className="text-xl font-bold mb-8 text-center text-foreground">
                    {locale === "pt" ? "Navegue por outros cases" : "Explore other cases"}
                </h3>

                <div className="flex flex-wrap justify-center gap-4">
                    {projects.map((project, i) => {
                        const isCurrent = project.meta.slug === currentSlug;
                        const href = `/${locale}/projects/${project.meta.slug}`;

                        return (
                            <Link
                                href={href}
                                key={i}
                                className={cn(
                                    "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
                                    isCurrent
                                        ? "bg-primary text-primary-foreground shadow-md scale-105"
                                        : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
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
