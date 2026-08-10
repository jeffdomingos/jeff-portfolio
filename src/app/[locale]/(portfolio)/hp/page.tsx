import ProjectDetail, { generateMetadata as generateProjectMetadata } from "../projects/[slug]/page";

type Props = { params: { locale: string } };

export async function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'pt' }];
}

export async function generateMetadata({ params }: Props) {
    return generateProjectMetadata({ params: { locale: params.locale, slug: "afya-ai-initiatives" } });
}

export default function HPProjectPage({ params }: Props) {
    return <ProjectDetail params={{ locale: params.locale, slug: "afya-ai-initiatives" }} />;
}
