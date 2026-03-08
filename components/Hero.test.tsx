import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { Hero } from './Hero';
import { en } from '../i18n/translations/en';

// --- Mocks ---

// Mock ChipDiagram at module level
vi.mock('./ChipDiagram', () => ({
  ChipDiagram: (props: any) => <div data-testid="chip-diagram" className={props.className} />,
}));

// Mock useI18n to return English translations
vi.mock('../i18n/I18nContext', () => ({
  useI18n: () => ({
    translations: en,
    language: 'en',
    setLanguage: () => {},
  }),
}));

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Hero', () => {
  // HERO-01: Headline with Apple Silicon power messaging
  it('renders headline with Apple Silicon power messaging', () => {
    const { container } = render(<Hero />);
    const h1 = container.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1!.textContent).toContain('Raw Silicon Power');
    expect(h1!.textContent).toContain('For Local AI.');
  });

  // HERO-02: Subtitle with unified memory architecture explanation
  it('renders subtitle about unified memory architecture', () => {
    const { getByText } = render(<Hero />);
    const subtitle = getByText(/unified memory architecture/i);
    expect(subtitle).toBeTruthy();
    expect(subtitle.tagName.toLowerCase()).toBe('p');
  });

  // HERO-03: Two CTA buttons with correct links
  it('renders two CTA buttons with correct hrefs', () => {
    const { container } = render(<Hero />);
    const pricingLink = container.querySelector('a[href="#pricing"]');
    expect(pricingLink).toBeTruthy();
    expect(pricingLink!.textContent).toContain('See configurations');

    const zaloLink = container.querySelector('a[href*="zalo.me"]');
    expect(zaloLink).toBeTruthy();
    expect(zaloLink!.textContent).toContain('Free consultation');
  });

  // HERO-04: Spec callout badges with chip data values
  it('renders spec callout badges with TOPS, bandwidth, memory, and GPU cores', () => {
    const { container } = render(<Hero />);
    const text = container.textContent || '';

    // M4 base TOPS = 38, M4 Max bandwidth = 546, M4 Max memory = 128GB, M4 Max GPU = 40
    expect(text).toContain('38');
    expect(text).toContain('546');
    expect(text).toContain('128');
    expect(text).toContain('40');

    // Also check labels
    expect(text).toContain('TOPS');
    expect(text).toContain('GB/s');
    expect(text).toContain('Unified Memory');
    expect(text).toContain('GPU Cores');
  });

  // HERO-05: ChipDiagram component renders
  it('renders ChipDiagram component', () => {
    const { getByTestId } = render(<Hero />);
    const chipDiagram = getByTestId('chip-diagram');
    expect(chipDiagram).toBeTruthy();
  });

  // Negative: Old elements removed
  it('does not render old Agent Layer or Sales Agent content', () => {
    const { container } = render(<Hero />);
    const text = container.textContent || '';
    expect(text).not.toContain('AI Agent Layer');
    expect(text).not.toContain('Sales Agent');
  });
});
