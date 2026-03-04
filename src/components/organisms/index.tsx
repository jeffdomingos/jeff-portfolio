import Link from "next/link";
import { GlobalHeader, GlobalFooter } from "@/content/schema";
import { LanguageSwitch } from "@/components/atoms/LanguageSwitch";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
export { CaseNavigator } from "./CaseNavigator";

export { Header } from "./Header";

export function Footer({ data }: { data: GlobalFooter }) {
    return (
        <footer className="bg-muted py-8 mt-20 border-t">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground gap-4">
                <div className="flex flex-wrap items-center justify-center gap-6">
                    <a href={`mailto:${data.emailValue}`} className="hover:text-foreground transition-colors">
                        <strong className="font-medium mr-1">{data.emailLabel}</strong>
                        {data.emailValue}
                    </a>
                    <a href="https://linkedin.com/in/jeffdomingos" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                        <strong className="font-medium mr-1">{data.linkedinLabel}</strong>
                        {data.linkedinValue}
                    </a>
                    <a href="https://api.whatsapp.com/send/?phone=5521999374516" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                        <strong className="font-medium mr-1">{data.whatsappLabel}</strong>
                        {data.whatsappValue}
                    </a>
                </div>
                <p>{data.copyrightText}</p>
            </div>
        </footer>
    );
}
