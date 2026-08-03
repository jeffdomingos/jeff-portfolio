"use client";

import React from 'react';

export type RxProLinkPreviewProps = {
  title: string;
  description?: string;
  url: string;
  imageUrl?: string;
};

export function RxProLinkPreview({ 
  title, 
  description, 
  url, 
  imageUrl 
}: RxProLinkPreviewProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block mt-3 overflow-hidden rounded-lg border border-neutral-200 hover:border-red-500 transition-colors bg-white shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out fill-mode-both"
    >
      <div className="flex">
        {imageUrl && (
          <div className="flex-shrink-0 w-24 h-24 bg-neutral-100">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 p-3">
          <div className="text-sm font-semibold text-neutral-900 line-clamp-1 mb-1">
            {title}
          </div>
          {description && (
            <p className="text-xs text-neutral-500 line-clamp-2 mb-2">
              {description}
            </p>
          )}
          <div className="flex items-center gap-1 text-xs text-red-600">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="truncate">{new URL(url).hostname}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
