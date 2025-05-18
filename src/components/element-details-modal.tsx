
"use client";

import type { ElementData } from '@/types';
import { categoryStyleMapping }  from '@/types'; // Changed from categoryColors
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import ElectronShellDisplay from './electron-shell-display';
import { cn } from '@/lib/utils';

interface ElementDetailsModalProps {
  element: ElementData | null;
  isOpen: boolean;
  onClose: () => void;
}

const DetailItem: React.FC<{ label: string; value?: string | number | null }> = ({ label, value }) => {
  if (value === undefined || value === null || value === '') return null;
  return (
    <div className="grid grid-cols-2 gap-2 py-1.5 px-1 even:bg-muted/30 dark:even:bg-white/5 rounded-sm">
      <span className="font-medium text-sm text-foreground/80 dark:text-foreground/70">{label}:</span>
      <span className="text-sm text-foreground dark:text-foreground/90">{String(value)}</span>
    </div>
  );
};

const ElementDetailsModal: React.FC<ElementDetailsModalProps> = ({ element, isOpen, onClose }) => {
  if (!element) return null;

  // Use the new categoryStyleMapping for colors
  const style = categoryStyleMapping[element.category] || categoryStyleMapping.unknown;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "sm:max-w-2xl max-h-[90vh] flex flex-col p-0 border-4", 
          "dark:bg-card" // Ensure dark mode dialog background
        )} 
        style={{ borderColor: style.borderColor }}
      >
        <DialogHeader 
          className={cn("p-6 pb-2", style.textColorClass)} 
          style={{ backgroundColor: style.backgroundColor }}
        >
          <DialogTitle className="text-3xl font-bold flex items-center">
            <span className={cn("text-5xl font-black mr-4", style.textColorClass)}>{element.symbol}</span>
            <div>
                {element.name}
                <span className={cn("block text-sm font-normal opacity-80", style.textColorClass)}>{element.category} - Atomic #: {element.atomicNumber}</span>
            </div>
          </DialogTitle>
          <DialogDescription className={cn("text-sm pt-1 opacity-90", style.textColorClass)}>
             {element.phase} at STP. Discovered: {element.yearDiscovered || 'N/A'}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-grow overflow-y-auto px-6 py-4 bg-background dark:bg-card">
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-primary dark:text-[hsl(var(--primary))]">Properties</h3>
              <DetailItem label="Atomic Mass" value={element.atomicMass.toString().replace(/[\[\]()]/g, '')} />
              <DetailItem label="Density" value={element.density ? `${element.density} g/cm³` : undefined} />
              <DetailItem label="Melting Point" value={element.melt ? `${element.melt} K` : undefined} />
              <DetailItem label="Boiling Point" value={element.boil ? `${element.boil} K` : undefined} />
              <DetailItem label="Oxidation States" value={element.oxidationStates} />
              <DetailItem label="Electronegativity" value={element.electronegativityPauling} />
              <DetailItem label="Discovered By" value={element.discoveredBy} />
              <Separator className="my-3 bg-border dark:bg-[hsl(var(--border))]"/>
              <p className="text-xs text-muted-foreground dark:text-[hsl(var(--muted-foreground))] leading-relaxed">{element.summary}</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary dark:text-[hsl(var(--primary))]">Electron Configuration</h3>
              <ElectronShellDisplay 
                shells={element.shells} 
                elementSymbol={element.symbol} 
                className="border-2 dark:border-[hsl(var(--border))]" // General border for shell display
                style={{ borderColor: style.borderColor }} // Can use category color for border too
              />
              <p className="text-xs text-center font-mono bg-muted dark:bg-white/10 p-2 rounded-md text-foreground dark:text-foreground/80">{element.electronConfigurationSemantic}</p>
              <p className="text-xs text-center text-muted-foreground dark:text-[hsl(var(--muted-foreground))]">{element.electronConfiguration}</p>
            </div>
          </div>
        </ScrollArea>
        <div 
          className={cn("p-3 text-xs text-center border-t opacity-80", style.textColorClass)}
          style={{ backgroundColor: style.backgroundColor, borderColor: style.borderColor }}
        >
            Data simplified for display. Full data in production.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ElementDetailsModal;
