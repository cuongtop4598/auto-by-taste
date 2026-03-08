import React, { useState, useRef } from 'react';
import { chips } from './data/chips';
import { useInView } from './hooks/useInView';
import { useCountUp } from './hooks/useCountUp';
import { useReducedMotion } from './hooks/useReducedMotion';

const M4_CHIPS = chips.filter(c => c.generation === 'M4' && c.variant !== 'Ultra');

type M4Variant = 'base' | 'Pro' | 'Max';

const VARIANT_LABELS: Record<M4Variant, string> = {
  base: 'M4',
  Pro: 'M4 Pro',
  Max: 'M4 Max',
};

export const ChipDiagram: React.FC<{ className?: string }> = ({ className }) => {
  const [activeVariant, setActiveVariant] = useState<M4Variant>('base');
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef);
  const reducedMotion = useReducedMotion();

  const chip = M4_CHIPS.find(c => c.variant === activeVariant)!;
  const shouldAnimate = inView && !reducedMotion;

  // Count-up values
  const cpuCount = useCountUp(chip.cpuCores.total, 1200, inView);
  const gpuCount = useCountUp(chip.gpuCores, 1200, inView);
  const topsCount = useCountUp(chip.tops ?? 0, 1200, inView);
  const bwCount = useCountUp(chip.memoryBandwidth, 1200, inView);

  // Display values: final if reduced motion, else animated
  const cpu = reducedMotion ? chip.cpuCores.total : cpuCount;
  const gpu = reducedMotion ? chip.gpuCores : gpuCount;
  const tops = reducedMotion ? (chip.tops ?? 0) : topsCount;
  const bw = reducedMotion ? chip.memoryBandwidth : bwCount;

  return (
    <div ref={containerRef} className={`w-full max-w-2xl mx-auto px-4${className ? ` ${className}` : ''}`}>
      {/* Tab buttons */}
      <div role="tablist" aria-label="M4 chip variant selector" className="flex gap-2 mb-4 justify-center">
        {(['base', 'Pro', 'Max'] as M4Variant[]).map(variant => (
          <button
            key={variant}
            role="tab"
            aria-selected={activeVariant === variant}
            onClick={() => setActiveVariant(variant)}
            className={
              activeVariant === variant
                ? 'bg-blue-600 text-white rounded-lg px-4 py-2'
                : 'text-slate-400 hover:text-white px-4 py-2'
            }
          >
            {VARIANT_LABELS[variant]}
          </button>
        ))}
      </div>

      {/* SVG diagram */}
      <svg
        viewBox="0 0 400 300"
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={`${VARIANT_LABELS[activeVariant]} chip architecture diagram`}
      >
        <defs>
          <rect id="chip-block-lg" width="185" height="120" rx="8" />
          <rect id="chip-block-sm" width="185" height="90" rx="8" />
          <rect id="chip-block-bar" width="380" height="40" rx="8" />
        </defs>

        {/* CPU block */}
        <g>
          <use
            href="#chip-block-lg"
            x="10"
            y="10"
            fill="#1e3a5f"
            fillOpacity={0.3}
            stroke="currentColor"
            strokeOpacity={0.2}
            className={shouldAnimate ? 'animate-core-glow' : ''}
          />
          <text x="102" y="50" fill="white" fontSize="16" textAnchor="middle" fontWeight="bold">
            CPU
          </text>
          <text x="102" y="75" fill="white" fontSize="14" textAnchor="middle">
            {cpu}-core ({chip.cpuCores.performance}P+{chip.cpuCores.efficiency}E)
          </text>
        </g>

        {/* GPU block */}
        <g>
          <use
            href="#chip-block-lg"
            x="205"
            y="10"
            fill="#2d1f5e"
            fillOpacity={0.3}
            stroke="currentColor"
            strokeOpacity={0.2}
            className={shouldAnimate ? 'animate-core-glow' : ''}
          />
          <text x="297" y="50" fill="white" fontSize="16" textAnchor="middle" fontWeight="bold">
            GPU
          </text>
          <text x="297" y="75" fill="white" fontSize="14" textAnchor="middle">
            {gpu}-core
          </text>
        </g>

        {/* Neural Engine block */}
        <g>
          <use
            href="#chip-block-sm"
            x="10"
            y="145"
            fill="#064e3b"
            fillOpacity={0.3}
            stroke="currentColor"
            strokeOpacity={0.2}
          />
          <text x="102" y="180" fill="white" fontSize="16" textAnchor="middle" fontWeight="bold">
            Neural Engine
          </text>
          <text x="102" y="205" fill="white" fontSize="14" textAnchor="middle">
            {tops} TOPS
          </text>
        </g>

        {/* Unified Memory block */}
        <g>
          <use
            href="#chip-block-sm"
            x="205"
            y="145"
            fill="#164e63"
            fillOpacity={0.3}
            stroke="currentColor"
            strokeOpacity={0.2}
            className={shouldAnimate ? 'animate-memory-shimmer' : ''}
          />
          <text x="297" y="180" fill="white" fontSize="16" textAnchor="middle" fontWeight="bold">
            Memory
          </text>
          <text x="297" y="205" fill="white" fontSize="14" textAnchor="middle">
            {chip.maxMemory}GB Unified
          </text>
        </g>

        {/* Spec bar */}
        <g>
          <use
            href="#chip-block-bar"
            x="10"
            y="250"
            fill="#0f172a"
            fillOpacity={0.5}
            stroke="currentColor"
            strokeOpacity={0.2}
          />
          <text x="200" y="275" fill="white" fontSize="14" textAnchor="middle">
            {bw} GB/s bandwidth
          </text>
        </g>
      </svg>
    </div>
  );
};
