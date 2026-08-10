"use client";

import { Thread } from "@/components/thread";
import { StreamProvider } from "@/providers/Stream";
import { ThreadProvider } from "@/providers/Thread";
import { ArtifactProvider } from "@/components/thread/artifact";
import { Toaster } from "@/components/ui/sonner";
import { GlobalHeader } from "@/components/GlobalHeader";
import { GlobalFooter } from "@/components/GlobalFooter";
import { MockChat } from "@/components/MockChat";
import React from "react";

export default function DemoPage(): React.ReactNode {
  return (
    <React.Suspense fallback={<div>Loading (layout)...</div>}>
      <Toaster />
      <div className="h-screen flex flex-col bg-[#F5F5F5] overflow-hidden">
        {/* Header Fixo - RX PRO */}
        <GlobalHeader />

        {/* Main Content - Container do Chat */}
        <main className="flex-1 min-h-0 overflow-hidden">
          <div className="h-full container mx-auto max-w-5xl px-6 py-8 flex items-stretch">
            <div className="flex-1 bg-white rounded-xl overflow-hidden" style={{ boxShadow: '0px 3px 3px 0px rgba(0,0,0,0.07)' }}>
              
              {/* --- MOCK VISUAL (Para Testes de UI) --- */}
              <MockChat />

              {/* --- CHAT REAL (LangChain) - Comentado para testes --- */}
              {/* 
              <ThreadProvider>
                <StreamProvider>
                  <ArtifactProvider>
                    <Thread />
                  </ArtifactProvider>
                </StreamProvider>
              </ThreadProvider>
              */}
            </div>
          </div>
        </main>

        {/* Footer Fixo */}
        <GlobalFooter />
      </div>
    </React.Suspense>
  );
}
