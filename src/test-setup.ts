// Stubs de APIs de navegador que jsdom no implementa, para que los componentes
// con IntersectionObserver / ResizeObserver no rompan al montarse en tests.
//
// `matchMedia` se deja SIN definir a propósito: así `prefersReducedMotion()`
// devuelve true y ninguna animación de anime.js corre durante los tests.
class ObserverStub {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): [] {
    return [];
  }
}

const g = globalThis as unknown as {
  IntersectionObserver?: unknown;
  ResizeObserver?: unknown;
};

g.IntersectionObserver ??= ObserverStub;
g.ResizeObserver ??= ObserverStub;
