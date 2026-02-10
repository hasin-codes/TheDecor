import { useEffect, useLayoutEffect } from 'react';

/**
 * useIsomorphicLayoutEffect
 *
 * Resolves to useLayoutEffect on the client and useEffect on the server.
 * This prevents SSR warnings when using layout effects.
 *
 * Usage:
 * ```tsx
 * import { useIsomorphicLayoutEffect } from '@/lib/hooks/useIsomorphicLayoutEffect';
 *
 * useIsomorphicLayoutEffect(() => {
 *   // Your layout effect code here
 * }, [dependencies]);
 * ```
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
