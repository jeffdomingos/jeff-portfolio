"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, FileText, RotateCcw, Bot, User, FlaskConical } from "lucide-react";
import { RxProLinkPreview } from "./RxProLinkPreview";
import { RxProErrorBubble } from "./RxProErrorBubble";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

interface Message {
  id: string;
  role: "assistant" | "user";
  type?: "error";
  content: string;
  source?: string;
  linkPreview?: {
    title: string;
    description?: string;
    url: string;
    imageUrl?: string;
  };
}

const PRESET_PROMPTS = [
  {
    label: "B94 vs S. boulardii",
    query: "How does B94 compare to Saccharomyces boulardii in gastroenteritis?",
    response: "*Bifidobacterium lactis* B94 proved to be significantly more effective in reducing the duration of diarrhea in children with rotavirus gastroenteritis. In a comparative clinical study, the mean duration of diarrhea was **4.1 ± 1.3 days** in the B94 group vs **6.6 ± 1.7 days** in the *Saccharomyces boulardii* group (p < 0.01).\n\nAdditionally, the B94 group showed an improvement in stool consistency 2 to 3 days faster than the control groups.",
    source: "Floracol_Monograph_Formatted.pdf (Erdoğan et al., 2012)",
    linkPreview: {
      title: "Comparative Efficacy of B. lactis B94",
      description: "Clinical evaluation in pediatric patients with acute gastroenteritis.",
      url: "https://rxpro.com.br/estudos/erdogan-2012",
      imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=200&auto=format&fit=crop"
    }
  },
  {
    label: "Dosage & Indication",
    query: "What is the dosage and age indication for Floracol?",
    response: "Floracol (symbiotic containing *Bifidobacterium lactis* B94 + inulin) is indicated for children and adolescents **from 4 years of age**.\n\n**Recommended dosage:** 1 sachet (5x10⁹ CFU) twice a day, administered for up to 4 weeks in conditions such as acute gastroenteritis or Irritable Bowel Syndrome (IBS).",
    source: "Floracol_Monograph_Formatted.pdf (Baştürk et al., 2016)",
    linkPreview: {
      title: "Official Monograph - Floracol",
      description: "Complete dosage guidelines, age indications, and safety profile.",
      url: "https://rxpro.com.br/bula/floracol.pdf"
    }
  },
  {
    label: "Use with Antibiotics",
    query: "Can I prescribe Floracol along with antibiotic treatment?",
    response: "Yes, doctor! The clinical study conducted by İşlek et al. (2015) demonstrated that the adjuvant use of *B. lactis* B94 during antibiotic therapy for *H. pylori* was completely safe and **reduced the incidence of side effects from 63% (control group) to 17% (symbiotic group)** with statistical significance (p < 0.01).",
    source: "9. İşlek_Bifidobacterium_lactis_B94_inulin_H_pylori.pdf",
    linkPreview: {
      title: "Bifidobacterium lactis B94 plus inulin for Treatment of H. pylori...",
      description: "Clinical study regarding the reduction of antibiotic-related side effects using B94.",
      url: "https://rxpro.com.br/estudos/islek-2015.pdf",
    }
  }
];

const TEST_COMMANDS = [
  "formatting", "richtext", "citation", "article", "document", "long", "error", "complete"
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: "init-1",
    role: "assistant",
    content: "Hello! I'm Thiago, a digital agent from RX Pro - Afya representing Apsen. Am I speaking with Dr. Laura Souza?\n\nI see in the system that you received 1 box with samples of **FLORACOL CX C2 SACHETS AG**. Did it arrive safely?\n\nYou can ask me any clinical questions about Floracol, or test my UI components using commands like `article`, `error`, `citation`, `document`, `formatting`.",
  }
];

export function RxProAiDemo() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleSend = (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || isThinking) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: queryText
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsThinking(true);

    const lowerInput = queryText.toLowerCase();

    // Find matching preset
    const matchedPreset = PRESET_PROMPTS.find(
      (p) => p.query.toLowerCase() === lowerInput || p.label.toLowerCase() === lowerInput
    );

    setTimeout(() => {
      setIsThinking(false);
      let botMsg: Message;

      if (matchedPreset) {
        botMsg = {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: matchedPreset.response,
          source: matchedPreset.source,
          linkPreview: matchedPreset.linkPreview
        };
      } else {
        // Test Commands
        switch (true) {
          case lowerInput.includes('formatting'):
            botMsg = {
              id: `bot_${Date.now()}`,
              role: 'assistant',
              content: 'Here is all the supported Markdown:\n\n# H1 Title\n## H2 Title\n\n**Bold**, *italic*, and `inline code`.\n\n* Bullet item 1\n* Bullet item 2\n\n1. Numbered item 1\n2. Numbered item 2\n\n> A blockquote example.\n\nAnd, of course, [visit our portal](https://rxpro.com.br).'
            };
            break;
          case lowerInput.includes('richtext') || lowerInput.includes('rich-text'):
            botMsg = {
              id: `bot_${Date.now()}`,
              role: 'assistant',
              content: '# 📋 Rich Text Demo\n\nThis is an example of **rich formatting** with multiple elements:\n\n## Text Styles\n- **Important bold**\n- *Italics for emphasis*\n- `inline code` for technical terms\n\n## Lists\n1. First numbered item\n2. Second item with **highlight**\n3. Third item with *emphasis*\n\n## Quotes\n> "The right information at the right time saves lives."\n\nVisit our [RX PRO Portal](https://rxpro.com.br) for more info.'
            };
            break;
          case lowerInput.includes('citation'):
            botMsg = {
              id: `bot_${Date.now()}`,
              role: 'assistant',
              content: 'The symbiotic demonstrated significant reduction in symptoms (p<0.001).',
              source: 'Baştürk et al., 2016 - Journal of Medicine'
            };
            break;
          case lowerInput.includes('article'):
            botMsg = {
              id: `bot_${Date.now()}`,
              role: 'assistant',
              content: 'I found this relevant article on the topic:',
              linkPreview: {
                title: 'Comparative Study: Efficacy of B. lactis B94',
                description: 'Efficacy of B. lactis B94 vs. S. boulardii in rotavirus gastroenteritis.',
                url: 'https://rxpro.com.br/estudos',
                imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=200&auto=format&fit=crop'
              }
            };
            break;
          case lowerInput.includes('document'):
            botMsg = {
              id: `bot_${Date.now()}`,
              role: 'assistant',
              content: 'Here is the official product leaflet (PDF):',
              linkPreview: {
                title: 'Official Leaflet - Product X (PDF)',
                description: 'Official document with all safety and dosage information.',
                url: 'https://rxpro.com.br/bula.pdf'
              }
            };
            break;
          case lowerInput.includes('long'):
            botMsg = {
              id: `bot_${Date.now()}`,
              role: 'assistant',
              content: 'Here is a long response to test scrolling and line breaks. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Repeating: Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            };
            break;
          case lowerInput.includes('error'):
            botMsg = {
              id: `bot_${Date.now()}`,
              role: 'assistant',
              type: 'error',
              content: 'Sorry, I encountered an internal error while consulting the medical database. Please try again later.'
            };
            break;
          case lowerInput.includes('complete'):
            botMsg = {
              id: `bot_${Date.now()}`,
              role: 'assistant',
              content: 'Here is a complete summary. The treatment is effective and recommended by recent guidelines.\n\n* Reduces diarrhea duration.\n* Excellent safety profile.',
              source: 'Clinical Guidelines 2024',
              linkPreview: {
                title: 'Complete Study Guide',
                description: 'A comprehensive review of recent findings.',
                url: 'https://rxpro.com.br/guia',
                imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=200&auto=format&fit=crop'
              }
            };
            break;
          default:
            botMsg = {
              id: `bot-${Date.now()}`,
              role: "assistant",
              content: `For the question regarding **"${queryText}"**, the monograph data indicates clinical efficacy in managing intestinal microbiota and associated symptoms. In pediatric studies, the B94 symbiotic demonstrated excellent tolerability and reduction of symptoms within 31 hours on average.`,
              source: "Floracol_Monograph_Formatted.pdf (Clinical Studies)"
            };
            break;
        }
      }

      setMessages((prev) => [...prev, botMsg]);
    }, 1100);
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    setInput("");
    setIsThinking(false);
  };

  return (
    <div className={`w-full not-prose rounded-xl border border-neutral-200 bg-white shadow-xl overflow-hidden ${inter.className}`}>
      {/* Interactive Widget Bar Header */}
      <div className="bg-neutral-50 text-neutral-800 px-4 md:px-6 py-3 flex items-center justify-between border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm p-1">
            <Image 
              src="/images/apsen-avatar.png" 
              alt="Apsen Logo" 
              width={40} 
              height={40} 
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-neutral-900">Afya | Apsen Assistant</span>
              <span className="inline-flex items-center gap-1 text-[10px] bg-red-50 text-red-600 font-medium px-2 py-0.5 rounded-full border border-red-200">
                <Sparkles className="w-3 h-3" /> Live Demo
              </span>
            </div>
            <span className="text-xs text-neutral-500 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Online • Medical Assistant
            </span>
          </div>
        </div>
        
        <button
          onClick={handleReset}
          className="text-xs text-neutral-500 hover:text-neutral-800 flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-neutral-200 transition-colors"
          title="Reset Prototype"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Main Chat Body */}
      <div ref={chatContainerRef} className="p-4 md:p-6 bg-neutral-50/50 min-h-[400px] max-h-[500px] overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out fill-mode-both ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Content Bubble */}
            <div className="flex flex-col max-w-[85%] sm:max-w-[75%]">
              {msg.type === "error" ? (
                <RxProErrorBubble message={msg.content} />
              ) : (
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-red-600 text-white rounded-tr-none"
                      : "bg-white border border-neutral-200 text-neutral-800 rounded-tl-none shadow-sm"
                  }`}
                >
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => <h1 className={`text-lg font-bold mb-3 ${inter.className} ${msg.role === 'user' ? 'text-white' : 'text-neutral-900'}`} {...props} />,
                      h2: ({ node, ...props }) => <h2 className={`text-base font-semibold mb-2 mt-3 ${inter.className} ${msg.role === 'user' ? 'text-white' : 'text-neutral-900'}`} {...props} />,
                      p: ({ node, ...props }) => <p className="mb-3 last:mb-0" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc ml-5 mb-3 space-y-1" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal ml-5 mb-3 space-y-1" {...props} />,
                      li: ({ node, ...props }) => <li {...props} />,
                      strong: ({ node, ...props }) => <strong className={`font-semibold ${msg.role === 'user' ? 'text-white' : 'text-neutral-900'}`} {...props} />,
                      em: ({ node, ...props }) => <em className="italic" {...props} />,
                      a: ({ node, ...props }) => (
                        <a 
                          className="font-medium underline hover:opacity-80 transition-colors" 
                          style={{ color: msg.role === 'user' ? 'white' : '#ED2025' }}
                          target="_blank"
                          rel="noopener noreferrer"
                          {...props} 
                        />
                      ),
                      blockquote: ({ node, ...props }) => (
                        <blockquote 
                          className={`pl-3 border-l-4 italic mb-3 ${msg.role === 'user' ? 'border-red-300 text-red-100' : 'border-neutral-300 text-neutral-600'}`} 
                          {...props} 
                        />
                      ),
                      code: ({ node, ...props }) => (
                        <code 
                          className={`px-1.5 py-0.5 rounded text-[13px] font-mono ${msg.role === 'user' ? 'bg-red-700/50 text-white' : 'bg-neutral-100 text-red-600'}`} 
                          {...props} 
                        />
                      ),
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              )}

              {/* Reference Citation Badge */}
              {msg.source && (
                <div className="flex items-center gap-1.5 text-[11px] mt-2 text-neutral-500 w-fit animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <FileText className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span>Reference: <strong className="text-neutral-600 font-medium">{msg.source}</strong></span>
                </div>
              )}

              {/* Link Preview Card */}
              {msg.linkPreview && (
                <RxProLinkPreview {...msg.linkPreview} />
              )}
            </div>
          </div>
        ))}

        {/* Thinking Indicator */}
        {isThinking && (
          <div className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out fill-mode-both">
            <div className="bg-white border border-neutral-200 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-neutral-500 flex items-center gap-2 shadow-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              Consulting clinical studies...
            </div>
          </div>
        )}
      </div>

      {/* Preset Action Chips */}
      <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200">
        <div className="flex items-center gap-1 mb-2">
          <Sparkles className="w-3 h-3 text-red-500" />
          <span className="text-xs text-neutral-500 font-medium">Medical Scenarios:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {PRESET_PROMPTS.map((p, index) => (
            <button
              key={`preset-${index}`}
              onClick={() => handleSend(p.query)}
              disabled={isThinking}
              className="text-xs bg-white hover:bg-red-50 hover:border-red-300 text-neutral-700 border border-neutral-300 px-3 py-1.5 rounded-full transition-all text-left disabled:opacity-50"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white border-t border-neutral-200 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about Floracol or try a test command..."
          className="flex-1 bg-neutral-50 border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-red-500 transition-colors"
          disabled={isThinking}
        />
        <button
          type="submit"
          disabled={!input.trim() || isThinking}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-medium px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors text-sm shadow-sm"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
