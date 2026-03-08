import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { ChipDiagram } from './ChipDiagram';

// --- Mocks ---

let observerCallback: IntersectionObserverCallback;
let mockObserverInstance: {
  observe: ReturnType<typeof vi.fn>;
  unobserve: ReturnType<typeof vi.fn>;
  disconnect: ReturnType<typeof vi.fn>;
};

beforeEach(() => {
  mockObserverInstance = {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  };

  vi.stubGlobal(
    'IntersectionObserver',
    vi.fn(function (this: unknown, callback: IntersectionObserverCallback) {
      observerCallback = callback;
      return mockObserverInstance;
    })
  );

  // requestAnimationFrame: execute callback immediately with a high timestamp
  // so useCountUp completes instantly
  vi.stubGlobal('requestAnimationFrame', vi.fn((cb: FrameRequestCallback) => {
    cb(2000);
    return 1;
  }));
  vi.stubGlobal('cancelAnimationFrame', vi.fn());
});

afterEach(() => {
  vi.restoreAllMocks();
});

function triggerIntersection(isIntersecting: boolean) {
  observerCallback(
    [{ isIntersecting } as IntersectionObserverEntry],
    {} as IntersectionObserver
  );
}

describe('ChipDiagram', () => {
  it('renders four distinct chip blocks with labels', () => {
    const { container } = render(<ChipDiagram />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();

    const textContent = svg!.textContent || '';
    expect(textContent).toContain('CPU');
    expect(textContent).toContain('GPU');
    expect(textContent).toContain('Neural Engine');
    expect(textContent).toContain('Memory');
  });

  it('renders spec values from chip data (M4 base defaults)', () => {
    const { container } = render(<ChipDiagram />);

    // Trigger viewport entry so useCountUp completes
    triggerIntersection(true);

    const svgText = container.querySelector('svg')!.textContent || '';
    // M4 base: 10 CPU, 10 GPU, 38 TOPS, 120 GB/s, 32GB
    expect(svgText).toContain('10');  // CPU or GPU cores
    expect(svgText).toContain('32');  // maxMemory GB
  });

  it('updates specs when variant tab is clicked', () => {
    const { container, getByRole } = render(<ChipDiagram />);

    // Trigger viewport so counts complete
    triggerIntersection(true);

    // Click M4 Max tab
    const maxTab = getByRole('tab', { name: /M4 Max/i });
    fireEvent.click(maxTab);

    const svgText = container.querySelector('svg')!.textContent || '';
    // M4 Max: 40 GPU cores
    expect(svgText).toContain('40');
  });

  it('tab buttons have correct ARIA attributes', () => {
    const { getByRole, getAllByRole } = render(<ChipDiagram />);

    // tablist container
    const tablist = getByRole('tablist');
    expect(tablist).toBeTruthy();

    // 3 tab buttons
    const tabs = getAllByRole('tab');
    expect(tabs).toHaveLength(3);

    // First tab (M4 base) is selected by default
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[2]).toHaveAttribute('aria-selected', 'false');
  });

  it('SVG has viewBox and responsive width', () => {
    const { container } = render(<ChipDiagram />);
    const svg = container.querySelector('svg');

    expect(svg).toBeTruthy();
    expect(svg!.getAttribute('viewBox')).toBe('0 0 400 300');
    expect(svg!.getAttribute('width')).toBe('100%');
  });

  it('SVG has accessible role and label', () => {
    const { container } = render(<ChipDiagram />);
    const svg = container.querySelector('svg');

    expect(svg!.getAttribute('role')).toBe('img');
    expect(svg!.getAttribute('aria-label')).toContain('M4');

    // Label updates when variant changes
    const { getByRole } = render(<ChipDiagram />);
    const maxTab = getByRole('tab', { name: /M4 Max/i });
    fireEvent.click(maxTab);

    const svg2 = maxTab.closest('div')?.querySelector('svg');
    if (svg2) {
      expect(svg2.getAttribute('aria-label')).toContain('M4 Max');
    }
  });

  it('total DOM elements under 100', () => {
    const { container } = render(<ChipDiagram />);
    const allElements = container.querySelectorAll('*');
    expect(allElements.length).toBeLessThan(100);
  });
});
