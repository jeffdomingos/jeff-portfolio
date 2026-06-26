import Link from "next/link";
import { getAllProjects } from "@/utils/content";
import { cn } from "@/lib/utils";
import { CaseGallery } from "./CaseGallery";

export function CaseNavigator({ locale, currentSlug }: { locale: string; currentSlug: string }) {
    const projects = getAllProjects(locale);

    return (
        <section className="relative z-50 border-t border-border mt-fluid-2xl pt-fluid-xl pb-fluid-2xl bg-background overflow-hidden w-full">
            <CaseGallery projects={projects} locale={locale} currentSlug={currentSlug} title={locale === "pt" ? "Navegue por outros projetos" : "Explore other projects"} />
        </section>
    );
}
