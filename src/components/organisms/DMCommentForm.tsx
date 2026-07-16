"use client";

import { useState } from "react";

interface DMCommentFormProps {
    postTitle: string;
    locale: string;
}

export function DMCommentForm({ postTitle, locale }: DMCommentFormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        
        try {
            const response = await fetch("https://formsubmit.co/ajax/jeffsalb@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Nome: name,
                    Email: email,
                    Mensagem: message,
                    Post: postTitle,
                    _subject: `Comentário no Post: ${postTitle}`,
                    _template: "table"
                })
            });

            if (response.ok) {
                setStatus('success');
                setName("");
                setEmail("");
                setMessage("");
                // Reset success message after 5 seconds
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    const isPt = locale === 'pt';

    return (
        <div className="w-full mt-24 pt-12 border-t border-border/50">
            <h3 className="text-step-2 type-subheading mb-2">
                {isPt ? 'Comentário Privado (DM)' : 'Private Comment (DM)'}
            </h3>
            <p className="text-foreground/70 type-body text-step--1 mb-8 max-w-2xl">
                {isPt 
                    ? 'Quer me mandar um feedback, tirar uma dúvida ou conversar sobre este post? Essa mensagem será enviada diretamente para a minha caixa de entrada (somente eu terei acesso).' 
                    : 'Want to send me feedback, ask a question, or chat about this post? This message will be sent directly to my inbox (only I will have access to it).'}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xl relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="dm-name" className="text-step--2 type-label text-foreground/80 font-bold">
                            {isPt ? 'Seu Nome' : 'Your Name'}
                        </label>
                        <input 
                            id="dm-name"
                            type="text" 
                            required
                            disabled={status === 'loading'}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-transparent border border-foreground/20 rounded-lg px-4 py-3 text-step--1 focus:outline-none focus:border-foreground/50 transition-colors disabled:opacity-50"
                            placeholder={isPt ? 'Como devo te chamar?' : 'How should I call you?'}
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="dm-email" className="text-step--2 type-label text-foreground/80 font-bold">
                            {isPt ? 'Seu Email' : 'Your Email'}
                        </label>
                        <input 
                            id="dm-email"
                            type="email" 
                            required
                            disabled={status === 'loading'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-transparent border border-foreground/20 rounded-lg px-4 py-3 text-step--1 focus:outline-none focus:border-foreground/50 transition-colors disabled:opacity-50"
                            placeholder="email@exemplo.com"
                        />
                    </div>
                </div>
                
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="dm-message" className="text-step--2 type-label text-foreground/80 font-bold">
                        {isPt ? 'Mensagem' : 'Message'}
                    </label>
                    <textarea 
                        id="dm-message"
                        required
                        disabled={status === 'loading'}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        className="bg-transparent border border-foreground/20 rounded-lg px-4 py-3 text-step--1 focus:outline-none focus:border-foreground/50 transition-colors resize-y disabled:opacity-50"
                        placeholder={isPt ? 'O que achou do artigo?' : 'What did you think of the article?'}
                    />
                </div>

                <div className="flex items-center gap-4 mt-2">
                    <button 
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        className="bg-foreground text-background font-bold type-label text-step--1 px-8 py-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'loading' 
                            ? (isPt ? 'Enviando...' : 'Sending...') 
                            : (isPt ? 'Enviar Mensagem' : 'Send Message')}
                    </button>
                    
                    {status === 'success' && (
                        <span className="text-green-600 font-medium type-label text-step--2 flex items-center gap-1 animate-in fade-in slide-in-from-left-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10-9 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                            {isPt ? 'Mensagem enviada com sucesso!' : 'Message sent successfully!'}
                        </span>
                    )}
                    {status === 'error' && (
                        <span className="text-red-500 font-medium type-label text-step--2 flex items-center gap-1 animate-in fade-in slide-in-from-left-4">
                            {isPt ? 'Erro ao enviar. Tente novamente.' : 'Error sending. Try again.'}
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
}
