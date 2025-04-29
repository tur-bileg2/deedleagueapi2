"use client";

import React from 'react';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export default function CopyButton({ text, className = '' }: CopyButtonProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <button 
      onClick={handleCopy}
      className={className}
    >
      Copy
    </button>
  );
}
