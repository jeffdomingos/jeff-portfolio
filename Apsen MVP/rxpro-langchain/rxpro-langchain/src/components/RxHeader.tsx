'use client';

import React from 'react';
import Image from 'next/image';

export function RxHeader() {
  return (
    <header className="bg-[#FAFAFA] border-b border-gray-200 px-4 py-3 flex items-center">
      <div className="flex items-center gap-3">
        {/* Avatar do assistente com logo Apsen */}
        <div 
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border border-gray-300"
        >
          <Image 
            src="/avatar.png?v=2" 
            alt="Apsen" 
            width={40} 
            height={40}
            className="object-contain"
            unoptimized
            priority
          />
        </div>
        
        {/* Título e status */}
        <div className="flex flex-col">
          <h2 className="text-sm font-semibold text-gray-900">Assistente Afya | Apsen</h2>
          <p className="text-xs text-gray-500">Online • Pronto para ajudar</p>
        </div>
      </div>
    </header>
  );
}
