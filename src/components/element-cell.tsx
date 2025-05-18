
"use client";

import type { ElementData } from '@/types';
import { categoryStyleMapping } from '@/types';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ElementCellProps {
  element: ElementData;
  onClick: () => void;
  isFilteredOut?: boolean;
  animationDelay?: string;
}

const ElementCell: React.FC<ElementCellProps> = ({ element, onClick, isFilteredOut, animationDelay }) => {
  const styles = categoryStyleMapping[element.category] || categoryStyleMapping.unknown;

  // Determine text colors based on the category's defined textColorClass
  const mainTextColorClass = styles.textColorClass;
  let secondaryTextColorClass: string;

  if (styles.textColorClass === 'text-white') {
    secondaryTextColorClass = 'text-neutral-300'; // Lighter gray for light text on dark bg
  } else {
    secondaryTextColorClass = 'text-neutral-600'; // Darker gray for dark text on light bg
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card
            className={cn(
              'cursor-pointer select-none transition-all duration-200 ease-in-out focus:outline-none group',
              'w-full h-full aspect-square flex flex-col justify-between p-1 text-[0.5rem] sm:p-1.5 shadow-md',
              mainTextColorClass, // Apply base text color for the category for inherited text
              isFilteredOut ? 'opacity-30 hover:opacity-60 dark:opacity-40 dark:hover:opacity-70' : 'opacity-100',
              'rounded-md',
              // Dark mode specific styles are handled by the categoryStyleMapping's backgroundColor and textColorClass
              // and global dark theme settings.
              'dark:focus-visible:ring-2 dark:focus-visible:ring-offset-2 dark:ring-offset-[var(--page-bg-dark-edges)]',
              {'animate-element-entry': !isFilteredOut} // Only animate if not filtered out initially (or adjust logic as needed)
            )}
            style={{
              backgroundColor: styles.backgroundColor,
              borderColor: styles.borderColor,
              boxShadow: isFilteredOut ? 'none' : ``, // Base shadow, hover is handled by CSS/JS
              // @ts-ignore - CSS custom property
              '--element-hover-glow-color': styles.hoverGlowColor,
              animationDelay: animationDelay,
              gridColumnStart: element.xpos, 
              gridRowStart: element.ypos,
            }}
            onClick={onClick}
            onKeyDown={(e) => e.key === 'Enter' && onClick()}
            tabIndex={0}
            role="button"
            aria-label={`Element ${element.name}, number ${element.atomicNumber}`}
          >
            <style jsx>{`
              .group:hover:not(.is-filtered-out) {
                transform: scale(1.05);
                box-shadow: 0 0 15px 2px var(--element-hover-glow-color);
              }
              .group:focus-visible:not(.is-filtered-out) {
                transform: scale(1.05);
                box-shadow: 0 0 15px 2px var(--element-hover-glow-color);
                ring: 2px solid var(--element-hover-glow-color);
              }
              // Applying a subtle gradient for 3D effect in dark mode directly here
              .dark .group:not(.is-filtered-out) {
                background-image: linear-gradient(145deg, ${styles.backgroundColor}, color-mix(in srgb, ${styles.backgroundColor} 80%, black));
              }
            `}</style>
            <CardContent className={cn("p-0 flex flex-col justify-between h-full items-center text-center", mainTextColorClass /* Ensure content text color is also set */)}>
              <div className="w-full flex justify-between items-start text-[0.5rem] sm:text-[0.55rem] px-0.5 pt-0.5">
                <span className={cn("font-medium leading-none", secondaryTextColorClass)}>
                  {element.atomicNumber}
                </span>
                <span className={cn("font-light leading-none hidden sm:block", secondaryTextColorClass)}>
                  {typeof element.atomicMass === 'number' ? element.atomicMass.toFixed(2) : element.atomicMass.toString().replace(/[\[\]()]/g, '')}
                </span>
              </div>

              <div className="my-auto flex flex-col items-center justify-center w-full flex-grow">
                <div className={cn("font-bold text-sm sm:text-base lg:text-lg leading-none", mainTextColorClass)}>
                  {element.symbol}
                </div>
                <div
                  className={cn("w-full text-center font-normal text-[0.45rem] sm:text-[0.5rem] leading-tight mt-0.5 px-0.5", mainTextColorClass)} // Use main text color, ensure it wraps
                  style={{ wordBreak: 'break-word', hyphens: 'auto' }}
                >
                  {element.name}
                </div>
              </div>
              
              <div className="h-[0.2rem] sm:h-[0.3rem]"></div> {/* Spacer */}
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent
            side="top"
            className={cn(
              'bg-popover text-popover-foreground border-border shadow-xl p-3 text-xs rounded-md',
              'dark:bg-[hsl(var(--popover))] dark:text-[hsl(var(--popover-foreground))] dark:border-[hsl(var(--border))]'
            )}
        >
          <p className="font-bold text-base mb-1">{element.name} ({element.symbol})</p>
          <p><strong>Category:</strong> {styles.name} 
            <span className="inline-block w-2.5 h-2.5 rounded-full ml-1.5 border border-black/20" style={{ backgroundColor: styles.backgroundColor }}></span>
            <span className="ml-1">({styles.backgroundColor})</span>
          </p>
          <p><strong>Atomic Number:</strong> {element.atomicNumber}</p>
          <p><strong>Atomic Mass:</strong> {element.atomicMass.toString().replace(/[\[\]()]/g, '')}</p>
          <p><strong>Phase:</strong> {element.phase}</p>
          <p><strong>Electron Config.:</strong> {element.electronConfigurationSemantic}</p>
          {element.oxidationStates && <p><strong>Oxidation States:</strong> {element.oxidationStates}</p>}
          {element.electronegativityPauling !== undefined && <p><strong>Electronegativity:</strong> {element.electronegativityPauling}</p>}
          {element.melt !== undefined && <p><strong>Melting Point:</strong> {element.melt} K</p>}
          {element.boil !== undefined && <p><strong>Boiling Point:</strong> {element.boil} K</p>}
          {element.density !== undefined && <p><strong>Density:</strong> {element.density} g/cm³</p>}
          {element.yearDiscovered && <p><strong>Year Discovered:</strong> {element.yearDiscovered}</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ElementCell;

    