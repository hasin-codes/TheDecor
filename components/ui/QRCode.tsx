'use client';

import React from 'react';

export const QRCode: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`bg-white p-1 ${className}`}>
      <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-zinc-900">
        <rect x="0" y="0" width="40" height="40" />
        <rect x="10" y="10" width="20" height="20" fill="white" />
        <rect x="15" y="15" width="10" height="10" />

        <rect x="60" y="0" width="40" height="40" />
        <rect x="70" y="10" width="20" height="20" fill="white" />
        <rect x="75" y="15" width="10" height="10" />

        <rect x="0" y="60" width="40" height="40" />
        <rect x="10" y="70" width="20" height="20" fill="white" />
        <rect x="15" y="75" width="10" height="10" />

        <rect x="50" y="50" width="10" height="10" />
        <rect x="70" y="50" width="10" height="10" />
        <rect x="90" y="50" width="10" height="10" />

        <rect x="60" y="60" width="10" height="10" />
        <rect x="80" y="60" width="10" height="10" />
        <rect x="50" y="70" width="10" height="10" />
        <rect x="70" y="70" width="10" height="10" />
        <rect x="90" y="70" width="10" height="10" />

        <rect x="60" y="80" width="10" height="10" />
        <rect x="80" y="80" width="10" height="10" />
        <rect x="50" y="90" width="10" height="10" />
        <rect x="70" y="90" width="10" height="10" />
        <rect x="90" y="90" width="10" height="10" />
      </svg>
    </div>
  );
};
