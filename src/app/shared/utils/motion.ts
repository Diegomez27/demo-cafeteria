/**
 * True cuando no hay que animar: entorno sin `window` (SSR / tests jsdom)
 * o el usuario pidió `prefers-reduced-motion: reduce`.
 */
export function prefersReducedMotion(): boolean {
  return (
    typeof window === 'undefined' ||
    typeof window.matchMedia !== 'function' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}
