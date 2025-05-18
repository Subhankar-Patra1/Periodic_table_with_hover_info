
"use client";

import type { ElementCategory } from '@/types';
import { elementCategoriesList, categoryStyleMapping } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tag } from 'lucide-react';

interface PeriodicTableFiltersProps {
  activeFilter: ElementCategory | 'all';
  onFilterChange: (filter: ElementCategory | 'all') => void;
}

const PeriodicTableFilters: React.FC<PeriodicTableFiltersProps> = ({ activeFilter, onFilterChange }) => {
  const activeCategoryStyle = activeFilter !== 'all' ? categoryStyleMapping[activeFilter] : null;

  return (
    <div className="mb-6 p-4 bg-card dark:bg-[hsl(var(--card))] rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <label htmlFor="category-filter" className="text-sm font-medium text-foreground dark:text-[hsl(var(--card-foreground))] shrink-0">
          Filter by Category:
        </label>
        <Select
          value={activeFilter}
          onValueChange={(value) => onFilterChange(value as ElementCategory | 'all')}
        >
          <SelectTrigger
            id="category-filter"
            className="w-full sm:w-[250px] bg-background dark:bg-[hsl(var(--input))] text-foreground dark:text-[hsl(var(--foreground))] dark:border-[hsl(var(--border))]"
          >
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="dark:bg-[hsl(var(--popover))] dark:text-[hsl(var(--popover-foreground))]">
            <SelectItem value="all" className="dark:focus:bg-neutral-700">
              <div className="flex items-center">All Categories</div>
            </SelectItem>
            {elementCategoriesList.map((category) => {
              const style = categoryStyleMapping[category];
              if (!style) return null;
              return (
                <SelectItem key={category} value={category} className="dark:focus:bg-neutral-700">
                  <div className="flex items-center">
                    <span
                      className="w-3 h-3 rounded-full mr-2 border border-black/20"
                      style={{ backgroundColor: style.backgroundColor }}
                      aria-hidden="true"
                    />
                    {style.name}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        {activeFilter !== 'all' && (
          <Button
            variant="ghost"
            onClick={() => onFilterChange('all')}
            className="text-primary dark:text-[hsl(var(--primary))] hover:text-primary/80 dark:hover:text-[hsl(var(--primary))]/80"
          >
            Clear Filter
          </Button>
        )}
      </div>
      {activeFilter !== 'all' && activeCategoryStyle && (
        <p className="mt-3 text-xs text-muted-foreground dark:text-[hsl(var(--muted-foreground))] flex items-center gap-1">
          <Tag size={14} /> Showing:
          <span
            className={cn("font-semibold px-1.5 py-0.5 rounded-sm border", activeCategoryStyle.textColorClass)}
            style={{ backgroundColor: activeCategoryStyle.backgroundColor, borderColor: activeCategoryStyle.borderColor }}
          >
            {activeCategoryStyle.name}
          </span>
        </p>
      )}
    </div>
  );
};

export default PeriodicTableFilters;
