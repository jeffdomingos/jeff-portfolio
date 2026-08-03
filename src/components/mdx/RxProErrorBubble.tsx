"use client";

import React from 'react';

interface ErrorBubbleProps {
  message: string;
}

export function RxProErrorBubble({ message }: ErrorBubbleProps) {
  return (
    <div className="flex items-start mt-3 animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out fill-mode-both">
      <div className="max-w-[100%] sm:max-w-[90%] bg-white border border-red-500/50 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
        <div className="flex items-start gap-2">
          <span className="text-xl flex-shrink-0 leading-none">⚠️</span>
          <p className="text-sm text-neutral-800">{message}</p>
        </div>
      </div>
    </div>
  );
}
