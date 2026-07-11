import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, vi } from 'vitest';

class MockIntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: number[] = [];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}

beforeEach(() => {
  window.localStorage.clear();
  window.sessionStorage.clear();

  // framer-motion's useReducedMotion() and various responsive hooks read
  // matchMedia, which jsdom doesn't implement.
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // framer-motion's whileInView (Success Team, Learning Journey reveal
  // animations) needs IntersectionObserver, which jsdom doesn't implement.
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
});

afterEach(() => {
  vi.restoreAllMocks();
});
