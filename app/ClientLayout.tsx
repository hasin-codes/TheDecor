'use client';

import { useState, useEffect } from 'react';
import { Preloader } from '@/components/Preloader';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Run loader only once per session
    const hasLoaded = sessionStorage.getItem('hasLoaded');
    if (hasLoaded) {
      setLoading(false);
    }
  }, []);

  const handleComplete = () => {
    setLoading(false);
    sessionStorage.setItem('hasLoaded', 'true');
    // Refresh GSAP after loader exits
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  return (
    <>
      {loading && (
        <Preloader onComplete={handleComplete} />
      )}

      {!loading && children}
    </>
  );
}
