'use client';

import React from 'react';

export const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="w-full relative">
            {children}
        </div>
    );
};
