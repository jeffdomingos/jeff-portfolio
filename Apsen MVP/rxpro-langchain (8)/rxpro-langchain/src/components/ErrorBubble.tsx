'use client';

import React from 'react';

interface ErrorBubbleProps {
  message: string;
}

export function ErrorBubble({ message }: ErrorBubbleProps) {
  return (
    <div className="flex items-start mb-4" style={{ animation: 'fadeInUp 0.3s ease-out' }}>
      <div 
        className="max-w-[80%] bg-white border-2 border-red-500 rounded-2xl rounded-tl-sm px-4 py-3"
        style={{ boxShadow: '0px 3px 3px 0px rgba(0, 0, 0, 0.07)' }}
      >
        <div className="flex items-start gap-2">
          <span className="text-xl flex-shrink-0">⚠️</span>
          <p className="text-sm text-gray-800">{message}</p>
        </div>
      </div>
    </div>
  );
}
