import { getResumePageContent } from "@/utils/content";
import { FileText, Download, Share2, Printer } from "lucide-react";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    return { title: `Resume - ${locale.toUpperCase()}` };
}

export default function ResumePage({ params: { locale } }: { params: { locale: string } }) {
    const content = getResumePageContent(locale);

    const docId = locale === 'pt'
        ? "1nmosn33YEeWo7b730QMff4QCOZm4qnv1iJ4TOB5eDO4" // Portuguese
        : "1kGc8Sig-uJDc2nt53Tk08jl_-UTzDgqM3v7YSAFq2EI"; // English

    return (
        <div className="relative z-[60] w-full px-fluid-xs md:px-fluid-m pt-32 pb-fluid-2xl min-h-screen flex flex-col">
            {/* Header Reading Protection Gradient */}
            <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-[75]"></div>
            <div className="relative z-10 w-full bg-background/80 backdrop-blur-md p-fluid-s md:p-fluid-m rounded-2xl md:rounded-3xl shadow-sm border border-border mb-8">
                <h1 className="text-step-4 md:text-step-5 font-bold uppercase tracking-tighter border-b border-foreground/10 pb-fluid-s w-full text-left mb-4">
                    {content.pageTitleHeader.title}
                </h1>
                {content.pageTitleHeader.subtitle && (
                    <h2 className="text-step-1 text-foreground font-light w-full text-left">
                        {content.pageTitleHeader.subtitle}
                    </h2>
                )}
            </div>

            <div className="relative z-10 flex flex-wrap justify-start gap-4 mb-fluid-xl w-full">
                <a
                    href={`https://docs.google.com/document/d/${docId}/export?format=pdf`}
                    className="flex items-center gap-3 px-6 py-3 bg-foreground text-background border border-foreground rounded-full text-step--1 font-medium hover:bg-background hover:text-foreground transition-colors uppercase tracking-wider"
                    download
                >
                    <Download className="w-4 h-4" />
                    {locale === 'pt' ? 'Salvar PDF' : 'Save PDF'}
                </a>
                <a
                    href={`https://docs.google.com/document/d/${docId}/export?format=docx`}
                    className="flex items-center gap-3 px-6 py-3 bg-background text-foreground border border-foreground border-dashed rounded-full text-step--1 font-medium hover:bg-halftone transition-colors uppercase tracking-wider"
                    download
                >
                    <FileText className="w-4 h-4" />
                    {locale === 'pt' ? 'Salvar DOCX' : 'Save DOCX'}
                </a>
                <a
                    href={`https://docs.google.com/document/d/${docId}/edit`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 bg-background text-foreground border border-foreground/20 rounded-full text-step--1 font-medium hover:bg-halftone transition-colors uppercase tracking-wider"
                >
                    <Share2 className="w-4 h-4" />
                    {locale === 'pt' ? 'Compartilhar' : 'Share'}
                </a>
                <a
                    href={`https://docs.google.com/document/d/${docId}/preview`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 bg-background text-foreground border border-foreground/20 rounded-full text-step--1 font-medium hover:bg-halftone transition-colors uppercase tracking-wider"
                >
                    <Printer className="w-4 h-4" />
                    {locale === 'pt' ? 'Imprimir' : 'Print'}
                </a>
            </div>

            <div className="relative z-10 w-full min-h-[1200px] md:min-h-[1500px] lg:min-h-[1800px] border border-border bg-halftone rounded-3xl overflow-hidden shadow-sm p-2 md:p-4">
                <iframe
                    id="resume-pdf-iframe"
                    src={`https://docs.google.com/document/d/${docId}/preview`}
                    className="w-full h-[1200px] md:h-[1500px] lg:h-[1800px] border border-border bg-white rounded-xl md:rounded-2xl"
                    title="Resume"
                ></iframe>
            </div>
        </div>
    );
}
