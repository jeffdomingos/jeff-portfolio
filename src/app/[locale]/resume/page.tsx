import { getResumePageContent } from "@/utils/content";
import { FileText, Download, Share2, Printer } from "lucide-react";
import { PageHero } from "@/components/organisms";
import { NativeDocsResume } from "@/components/atoms/NativeDocsResume";
import { Button } from "@/components/ui/button";
import { BoldReserver } from "@/components/atoms/BoldReserver";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    return { title: `Resume - ${locale.toUpperCase()}` };
}

export default function ResumePage({ params: { locale } }: { params: { locale: string } }) {
    const content = getResumePageContent(locale);

    const docId = locale === 'pt'
        ? "1nmosn33YEeWo7b730QMff4QCOZm4qnv1iJ4TOB5eDO4" // Portuguese
        : "1kGc8Sig-uJDc2nt53Tk08jl_-UTzDgqM3v7YSAFq2EI"; // English

    return (
        <article className="pb-20 relative w-full z-40">
            <PageHero 
                title={content.pageTitleHeader.title}
                subtitle={content.pageTitleHeader.subtitle}
            >
                <div className="flex flex-wrap justify-start gap-4 w-full">
                    <Button asChild variant="outline" className="uppercase tracking-wider">
                        <a
                            href={`https://docs.google.com/document/d/${docId}/export?format=pdf`}
                            download
                        >
                            <Download className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-125" />
                            <BoldReserver text={locale === 'pt' ? 'Salvar PDF' : 'Save PDF'} />
                        </a>
                    </Button>
                    <Button asChild variant="outline" className="uppercase tracking-wider">
                        <a
                            href={`https://docs.google.com/document/d/${docId}/export?format=docx`}
                            download
                        >
                            <FileText className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-125" />
                            <BoldReserver text={locale === 'pt' ? 'Salvar DOCX' : 'Save DOCX'} />
                        </a>
                    </Button>
                    <Button asChild variant="secondary" className="uppercase tracking-wider">
                        <a
                            href={`https://docs.google.com/document/d/${docId}/edit`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Share2 className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-125" />
                            <BoldReserver text={locale === 'pt' ? 'Compartilhar' : 'Share'} />
                        </a>
                    </Button>
                    <Button asChild variant="secondary" className="uppercase tracking-wider">
                        <a
                            href={`https://docs.google.com/document/d/${docId}/preview`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Printer className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-125" />
                            <BoldReserver text={locale === 'pt' ? 'Imprimir / Preview' : 'Print / Preview'} />
                        </a>
                    </Button>
                </div>
            </PageHero>

            {/* Embedded Google Doc */}
            <NativeDocsResume
                docId={docId}
                className="bg-white text-black py-8 md:py-16 px-4 sm:px-12 md:px-[70px]"
                loadingText={locale === 'pt' ? 'Carregando do Google Docs...' : 'Loading from Google Docs...'}
            />
        </article>
    );
}
