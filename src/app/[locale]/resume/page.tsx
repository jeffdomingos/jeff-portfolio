import { getResumePageContent } from "@/utils/content";
import { FileText, Download, Share2, Printer } from "lucide-react";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    return { title: `Resume - ${locale.toUpperCase()}` };
}

export default function ResumePage({ params: { locale } }: { params: { locale: string } }) {
    const content = getResumePageContent(locale);

    const docId = "1kGc8Sig-uJDc2nt53Tk08jl_-UTzDgqM3v7YSAFq2EI";

    return (
        <div className="container mx-auto px-4 py-20 max-w-5xl flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-2 text-center w-full">{content.pageTitleHeader.title}</h1>
            {content.pageTitleHeader.subtitle && (
                <h2 className="text-xl text-muted-foreground mb-8 text-center w-full">{content.pageTitleHeader.subtitle}</h2>
            )}

            <div className="flex flex-wrap justify-center gap-3 mb-8 w-full">
                <a
                    href={`https://docs.google.com/document/d/${docId}/export?format=pdf`}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                    download
                >
                    <Download className="w-4 h-4" />
                    {locale === 'pt' ? 'Salvar PDF' : 'Save PDF'}
                </a>
                <a
                    href={`https://docs.google.com/document/d/${docId}/export?format=docx`}
                    className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/80 transition-colors"
                    download
                >
                    <FileText className="w-4 h-4" />
                    {locale === 'pt' ? 'Salvar DOCX' : 'Save DOCX'}
                </a>
                <a
                    href={`https://docs.google.com/document/d/${docId}/edit`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors"
                >
                    <Share2 className="w-4 h-4" />
                    {locale === 'pt' ? 'Compartilhar' : 'Share'}
                </a>
                <a
                    href={`https://docs.google.com/document/d/${docId}/preview`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors"
                >
                    <Printer className="w-4 h-4" />
                    {locale === 'pt' ? 'Imprimir' : 'Print'}
                </a>
            </div>

            <div className="w-full min-h-[1200px] md:min-h-[1500px] lg:min-h-[1800px] border border-border shadow-sm rounded-xl overflow-hidden bg-white">
                <iframe
                    id="resume-pdf-iframe"
                    src={`https://docs.google.com/document/d/${docId}/preview`}
                    className="w-full h-[1200px] md:h-[1500px] lg:h-[1800px] border-0 bg-white"
                    title="Resume"
                ></iframe>
            </div>
        </div>
    );
}
