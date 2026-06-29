import { getAllProjects } from "@/utils/content";
import Link from "next/link";
import Image from "next/image";

export default function ProjectsPage({ params: { locale } }: { params: { locale: string } }) {
    const projects = getAllProjects(locale);

    return (
        <div className="relative z-40 w-full px-fluid-xs md:px-fluid-m pt-32 pb-fluid-2xl min-h-screen">
            {/* Header Reading Protection Gradient */}
            <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-[75]"></div>
            <h1 className="text-step-4 md:text-step-5 type-display mb-fluid-xl border-b border-foreground/10 pb-fluid-s w-full text-left">
                {locale === 'pt' ? 'Cases' : 'Cases'}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fluid-m w-full">
                {projects.map((project, i) => {
                    const href = `/${locale}/projects/${project.meta.slug}`;
                    return (
                        <Link href={href} key={i} className="group flex flex-col border border-foreground/20 bg-background hover:border-foreground transition-colors rounded-xl overflow-hidden">
                            <div className="relative h-64 md:h-80 w-full overflow-hidden border-b border-border">
                                <Image src={project.meta.thumbnail} fill={true} sizes="(max-width: 768px) 100vw, 33vw" alt={project.meta.title} className="object-cover transition-transform duration-700 ease-[0.21,0.47,0.32,0.98]" />
                            </div>
                            <div className="p-6 md:p-8 flex flex-col grow">
                                <div className="mb-3">
                                    {project.meta.title.includes(' - ') ? (
                                        <>
                                            <span className="block text-step--1 type-label opacity-60 mb-1">
                                                {project.meta.title.split(' - ')[0]}
                                            </span>
                                            <h3 className="text-step-1 md:text-step-2 type-subheading line-clamp-2">
                                                {project.meta.title.split(' - ').slice(1).join(' - ')}
                                            </h3>
                                        </>
                                    ) : (
                                        <h3 className="text-step-1 md:text-step-2 type-subheading line-clamp-2">
                                            {project.meta.title}
                                        </h3>
                                    )}
                                </div>
                                <p className="text-foreground/80 type-body line-clamp-3 mb-6">{project.meta.summary}</p>
                                
                                {project.meta.tags && project.meta.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.meta.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
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
        </div>
    );
}
