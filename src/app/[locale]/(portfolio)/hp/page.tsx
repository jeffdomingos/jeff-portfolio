import ProjectDetail, { generateMetadata as generateProjectMetadata } from "../projects/[slug]/page";

export async function generateMetadata({ params }: { params: { locale: string } }) {
    return generateProjectMetadata({ params: { locale: params.locale, slug: "hp-ai-initiatives" } });
}

export default function HPPage({ params }: { params: { locale: string } }) {
    return <ProjectDetail params={{ locale: params.locale, slug: "hp-ai-initiatives" }} />;
}
