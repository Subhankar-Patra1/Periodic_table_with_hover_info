
"use client"; 

import type { ElementData, ElementCategory } from '@/types';
import { useState, useMemo, Suspense, useEffect } from 'react';
import { elements as allElementsData } from '@/data/elements';
import PeriodicTableFilters from '@/components/periodic-table-filters';
import PeriodicTableView from '@/components/periodic-table-view';
import ElementDetailsModal from '@/components/element-details-modal';
import { Toaster } from "@/components/ui/toaster";
import { Flame } from 'lucide-react'; 
import { cn } from '@/lib/utils';

export default function ElementExplorerPage() {
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  const [activeFilter, setActiveFilter] = useState<ElementCategory | 'all'>('all');
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);


  const handleElementClick = (element: ElementData) => {
    setSelectedElement(element);
  };

  const handleCloseModal = () => {
    setSelectedElement(null);
  };

  const handleFilterChange = (filter: ElementCategory | 'all') => {
    setActiveFilter(filter);
  };
  
  const displayedElements = useMemo(() => {
    // Ensure elements are always sorted by atomic number for consistent display
    return allElementsData.sort((a,b) => a.atomicNumber - b.atomicNumber);
  }, []);

  return (
    // The main div will inherit the gradient background from the body styles in globals.css
    <div className={cn(
        "min-h-screen text-foreground p-4 md:p-8",
        // The bg-background utility will now use --ee-page-bg-start for its color
        // The gradient is applied globally to body in globals.css
      )}
    >
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary flex items-center justify-center gap-3">
          <Flame size={48} className="text-accent" />
          Element Explorer
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">An Interactive Periodic Table</p>
      </header>

      <main className="max-w-full mx-auto px-2">
        <PeriodicTableFilters
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
        
        <Suspense fallback={<div className="text-center p-10">Loading Periodic Table...</div>}>
          <PeriodicTableView
            elements={displayedElements}
            onElementClick={handleElementClick}
            activeFilter={activeFilter}
          />
        </Suspense>

        {selectedElement && (
          <ElementDetailsModal
            element={selectedElement}
            isOpen={!!selectedElement}
            onClose={handleCloseModal}
          />
        )}
      </main>
      
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>&copy; {currentYear ?? '...'} Element Explorer. All rights reserved (conceptually).</p>
         <p>Built with Next.js, Tailwind CSS, and ShadCN UI.</p>
      </footer>
      <Toaster />
    </div>
  );
}

    