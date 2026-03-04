import { getAllProjects } from "@/utils/content";
import Link from "next/link";

export default function ProjectsPage({ params: { locale } }: { params: { locale: string } }) {
    const projects = getAllProjects(locale);

    return (
        <div className="container mx-auto px-4 py-20">
            <h1 className="text-4xl font-bold mb-12 text-center">{locale === 'pt' ? 'Cases' : 'Cases'}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                {projects.map((project, i) => {
                    const href = `/${locale}/projects/${project.meta.slug}`;
                    return (
                        <Link href={href} key={i} className="group block">
                            <div className="relative h-64 bg-gray-200 overflow-hidden mb-4 rounded-lg">
                                <img src={project.meta.thumbnail} alt={project.meta.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{project.meta.title}</h3>
                            <p className="text-gray-600">{project.meta.summary}</p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
