
"use client";

import type { SVGProps } from 'react';
import { cn } from '@/lib/utils'; 

interface ElectronShellDisplayProps {
  shells: number[]; 
  elementSymbol: string;
  className?: string;
}

const MAX_ELECTRONS_PER_SHELL_VISUAL = 18; 
// Use CSS variables for colors to adapt to dark/light mode
const SHELL_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--secondary))", // Changed from foreground to secondary for better visibility
];
const ELECTRON_COLOR = "hsl(var(--foreground))"; // Electron color
const NUCLEUS_COLOR = "hsl(var(--destructive))"; // Nucleus color

const ElectronShellDisplay: React.FC<ElectronShellDisplayProps> = ({ shells, elementSymbol, className }) => {
  const canvasSize = 200;
  const center = canvasSize / 2;
  const nucleusRadius = 12;
  const baseShellSpacing = (center - nucleusRadius - 20) / Math.max(1, shells.length);

  return (
    <svg 
      width={canvasSize} 
      height={canvasSize} 
      viewBox={`0 0 ${canvasSize} ${canvasSize}`} 
      className={cn(
        "mx-auto rounded-md shadow-inner overflow-visible border", // General border
        "border-border/50 dark:border-[hsl(var(--ee-element-border))]", // Theme-aware border
        className
      )}
      aria-label={`Electron shell diagram for ${elementSymbol}`}
    >
      {/* Nucleus */}
      <circle 
        cx={center} 
        cy={center} 
        r={nucleusRadius} 
        fill={NUCLEUS_COLOR} 
        stroke="hsl(var(--border))" // Use theme border for nucleus stroke
        strokeWidth="0.5" 
      />
      <text
        x={center}
        y={center}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="10"
        fill="hsl(var(--destructive-foreground))" // Contrast text for nucleus
        fontWeight="bold"
      >
        {elementSymbol}
      </text>

      {/* Shells and Electrons */}
      {shells.map((electronCount, shellIndex) => {
        if (electronCount === 0 && shells.length > 1) return null; 

        const shellRadius = nucleusRadius + (shellIndex + 1) * baseShellSpacing;
        const displayElectronCount = Math.min(electronCount, MAX_ELECTRONS_PER_SHELL_VISUAL);
        const safeDisplayElectronCount = displayElectronCount > 0 ? displayElectronCount : 1;
        const angleStep = 360 / safeDisplayElectronCount;
        
        const animationDuration = `${Math.max(5, 8 + shellIndex * 2.5)}s`; 
        const rotationDirection = shellIndex % 2 === 0 ? 1 : -1;

        return (
          <g key={`shell-${shellIndex}`}>
            <circle
              cx={center}
              cy={center}
              r={shellRadius}
              fill="none"
              stroke={SHELL_COLORS[shellIndex % SHELL_COLORS.length]}
              strokeWidth="1"
              strokeDasharray={electronCount > MAX_ELECTRONS_PER_SHELL_VISUAL ? "3,2" : ""}
              opacity="0.7"
            />
            {Array.from({ length: displayElectronCount }).map((_, electronIndex) => {
              const angle = angleStep * electronIndex;
              const initialX = center + shellRadius * Math.cos((angle * Math.PI) / 180);
              const initialY = center + shellRadius * Math.sin((angle * Math.PI) / 180);
              const beginDelay = `${((electronIndex * (parseFloat(animationDuration.replace('s','')) / safeDisplayElectronCount)) * 0.3).toFixed(1)}s`;

              return (
                <circle
                  key={`electron-${shellIndex}-${electronIndex}`}
                  cx={initialX} 
                  cy={initialY}
                  r="3" 
                  fill={ELECTRON_COLOR} // Use theme foreground for electrons
                  stroke="hsl(var(--background))" // Stroke with background color for contrast
                  strokeWidth="0.5"
                >
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    from={`0 ${center} ${center}`}
                    to={`${rotationDirection * 360} ${center} ${center}`}
                    dur={animationDuration}
                    begin={beginDelay} 
                    repeatCount="indefinite"
                    additive="sum" 
                  />
                </circle>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
};

export default ElectronShellDisplay;

    