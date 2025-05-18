
"use client";

import type { ElementData, ElementCategory } from '@/types';
import { categoryStyleMapping, elementCategoriesList } from '@/types';
import ElementCell from './element-cell';
import { cn } from '@/lib/utils';

interface PeriodicTableViewProps {
  elements: ElementData[];
  onElementClick: (element: ElementData) => void;
  activeFilter: ElementCategory | 'all';
}

const PeriodicTableView: React.FC<PeriodicTableViewProps> = ({ elements, onElementClick, activeFilter }) => {
  const maxPeriod = Math.max(...elements.map(el => el.ypos), 10); // Ensure enough rows for Lanthanides/Actinides
  // const maxGroup = 18; // Not directly used for grid-cols definition if using auto_repeat

  const lanthanideLabelX = 1; // Column for Lanthanide label
  const lanthanideLabelY = 9; // Visual row for Lanthanide label
  const actinideLabelX = 1;   // Column for Actinide label
  const actinideLabelY = 10;  // Visual row for Actinide label

  const firstLanthanide = elements.find(el => el.atomicNumber === 57); // For main table placeholder
  const firstActinide = elements.find(el => el.atomicNumber === 89);   // For main table placeholder

  let animationCounter = 0;

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div
        className={cn(
            "grid p-[5px] bg-muted/20 dark:bg-black/20 rounded-lg shadow-inner relative min-w-[1000px]", // min-w to encourage scrolling
            "grid-cols-[auto_repeat(18,minmax(45px,1fr))_auto]" // Auto for labels, 18 cols for elements, auto for end space
        )}
        style={{
          gap: '5px', // Consistent 5px gap
          gridTemplateRows: `auto repeat(${maxPeriod}, minmax(45px, 1fr))`, // Auto for labels, then rows for periods + L/A series
        }}
        role="grid"
        aria-label="Periodic Table of Elements"
      >
        {/* Period Numbers (Row Labels) */}
        {Array.from({ length: 7 }, (_, i) => i + 1).map(periodNum => (
          <div
            key={`period-${periodNum}`}
            className="flex items-center justify-center text-xs font-medium text-muted-foreground select-none p-1 dark:text-gray-400"
            style={{ gridRowStart: periodNum + 1, gridColumnStart: 1 }} // col 1 for row labels
            aria-hidden="true"
          >
            {periodNum}
          </div>
        ))}

        {/* Group Numbers (Column Labels) */}
        {Array.from({ length: 18 }, (_, i) => i + 1).map(groupNum => (
          <div
            key={`group-${groupNum}`}
            className="flex items-center justify-center text-xs font-medium text-muted-foreground select-none p-1 dark:text-gray-400"
            style={{ gridRowStart: 1, gridColumnStart: groupNum + 1 }} // row 1 for col labels, offset by 1 for row labels col
            aria-hidden="true"
          >
            {groupNum}
          </div>
        ))}

        {/* Lanthanide Series Placeholder Text in main table */}
        {firstLanthanide && (
            <div
                className="flex items-center justify-center text-[0.55rem] text-muted-foreground dark:text-gray-500 font-semibold p-0.5 bg-card/50 dark:bg-neutral-700/50 rounded-sm"
                style={{ gridColumnStart: firstLanthanide.xpos + 0, gridRowStart: firstLanthanide.period + 1 }} // Use period for main table row, element xpos is already grid-relative
                aria-hidden="true"
            >
                57-71
                <span className="ml-1 text-[0.45rem] hidden sm:inline">*</span>
            </div>
        )}

        {/* Actinide Series Placeholder Text in main table */}
        {firstActinide && (
            <div
                className="flex items-center justify-center text-[0.55rem] text-muted-foreground dark:text-gray-500 font-semibold p-0.5 bg-card/50 dark:bg-neutral-700/50 rounded-sm"
                style={{ gridColumnStart: firstActinide.xpos + 0, gridRowStart: firstActinide.period + 1}} // Use period for main table row
                aria-hidden="true"
            >
                89-103
                <span className="ml-1 text-[0.45rem] hidden sm:inline">**</span>
            </div>
        )}

        {/* Lanthanide Series Label */}
        <div
          className="flex items-center justify-end text-[0.6rem] text-muted-foreground dark:text-gray-400 font-semibold p-0.5 pr-2"
          style={{ gridColumnStart: lanthanideLabelX + 1, gridColumnEnd: lanthanideLabelX + 2, gridRowStart: lanthanideLabelY +1 }} // Adjusted for 1-based grid with labels
          aria-hidden="true"
        >
          *Lanthanides
        </div>

        {/* Actinide Series Label */}
         <div
          className="flex items-center justify-end text-[0.6rem] text-muted-foreground dark:text-gray-400 font-semibold p-0.5 pr-2"
          style={{ gridColumnStart: actinideLabelX + 1, gridColumnEnd: actinideLabelX + 2, gridRowStart: actinideLabelY + 1 }} // Adjusted
          aria-hidden="true"
        >
          **Actinides
        </div>

        {elements.map((element) => {
          const delay = `${(animationCounter++ % 118) * 0.005}s`;
          // Element xpos/ypos should directly map to grid columns/rows after the label column/row
          // So, if element.xpos is 1, it means group 1, which is column 2 in our CSS grid (col 1 is for period numbers)
          // And if element.ypos is 1, it means period 1, which is row 2 in our CSS grid (row 1 is for group numbers)
          // However, the data is already set up so that xpos and ypos are direct grid positions considering the series.
          // For main table elements: xpos: group, ypos: period
          // For L/A series: xpos: 3 to 17, ypos: 9 or 10
          // The grid cells themselves start after the labels.

          // The element data xpos and ypos are designed for a grid starting at 1,1 for elements.
          // We added a label row and column, so we need to +1 to these positions.
          // No, the data already has xpos and ypos set for the visual layout:
          // e.g. Hydrogen xpos: 1, ypos: 1
          // e.g. Lanthanum xpos: 3, ypos: 9 (visual row for Lanthanides)
          // The PeriodicTableView grid CSS is `grid-cols-[auto_repeat(18,1fr)_auto]` and `gridTemplateRows: auto repeat(${maxPeriod}, 1fr)`.
          // This means element cells use `gridColumnStart: element.xpos + 1` and `gridRowStart: element.ypos + 1`
          // The provided `element.xpos` and `element.ypos` in `elements.ts` *should* be direct mapping values for the grid cells themselves,
          // *not* accounting for the label rows/columns.
          // Let's assume element.xpos is column relative to element grid, and element.ypos is row relative to element grid.
          // The label rows take up grid row 1. The label columns take up grid col 1.
          // So, an element at table position (1,1) (H) goes into grid cell (col 2, row 2).
          // Thus, element.xpos should be element.xpos_from_data+1 and element.ypos should be element.ypos_from_data+1.
          // The data in elements.ts has xpos and ypos designed for direct grid placement assuming the grid starts at 1,1 for the first element.
          // The current grid structure has labels in column 1 and row 1.
          // So, element.xpos and element.ypos from data should be used as is, because they dictate the position within the 18x10 (approx) element area.
          // My previous code used: `gridColumnStart: element.xpos + 1, gridRowStart: element.ypos + 1`
          // This might have been an error. If element.xpos from data is 1 (for group 1), it should go into the first element column, which is grid-column 2.
          // Correct is `gridColumnStart: element.xpos_from_data_for_group_1_is_1 + 1` (if starting element grid from column 2)
          // Let's test with current element.xpos and element.ypos from data.
          // The existing code already seems to handle this:
          // `ElementCell key={element.symbol} element={{...element, xpos: element.xpos + 1, ypos: element.ypos + 1}}`
          // This was passing xpos+1 and ypos+1 to the ElementCell's style.
          // Let's remove this adjustment here and let ElementCell use xpos/ypos directly from data, as they are already visual positions.
          // No, wait. `element.xpos` and `element.ypos` in `elements.ts` are already 1-indexed positions for the entire visual layout grid (18 wide, 10 high for L/A).
          // So, if Hydrogen is (1,1) in `elements.ts`, it should map to grid cell (1,1) *within the element part of the grid*.
          // Our CSS grid `grid-cols-[auto_repeat(18,minmax(45px,1fr))_auto]` means the `repeat(18,...)` is the element grid.
          // The `auto` is for the period numbers.
          // `gridTemplateRows: auto repeat(${maxPeriod}, minmax(45px, 1fr))` means `auto` is for group numbers.
          // So, `element.xpos` directly maps to the column within `repeat(18,...)` and `element.ypos` to row within `repeat(${maxPeriod},...)`.
          // The `ElementCell` style needs `gridColumnStart: element.xpos` (if we make data 0-indexed) or `element.xpos` (if 1-indexed and grid handles it).
          // The current data is 1-indexed for xpos/ypos. CSS grid is 1-indexed.
          // The Period numbers are in grid-column 1. The Group numbers are in grid-row 1.
          // So an element at visual position (group=1, period=1) like Hydrogen (xpos=1, ypos=1 in data) needs to be placed at CSS grid position (column=2, row=2).
          // The `ElementCell` receives `element.xpos` and `element.ypos` and uses them for `gridColumnStart` and `gridRowStart`.
          // So if `element.xpos`=1, `gridColumnStart` will be 1. This will put it in the *first* column of the overall grid.
          // This is incorrect. It should be `element.xpos + 1` for column and `element.ypos + 1` for row.
          // The previous code was passing `xpos: element.xpos+1` and `ypos: element.ypos+1` to `ElementCell`. This seems correct.
          // ElementCell then uses these values directly in its style.
          // Let's revert `ElementCell` to take `element.xpos` and `element.ypos` as props and apply them to `gridColumnStart` and `gridRowStart`.
          // And in `PeriodicTableView`, we pass `element.xpos + 1` and `element.ypos + 1`.
          // The `ElementCell` component's `element.xpos` and `element.ypos` are already the final grid positions.
          // The current `elements.ts` has `xpos` and `ypos` that define the 1-indexed column and row within the 18 wide grid used for elements.
          // Example: Hydrogen xpos:1, ypos:1. Helium xpos:18, ypos:1. Lithium xpos:1, ypos:2.
          // Lanthanum xpos:3, ypos:9.
          // These are direct grid coordinates for the element area.
          // The PeriodicTableView's CSS Grid:
          // `grid-cols-[auto_repeat(18,minmax(45px,1fr))_auto]`
          // `grid-template-rows: auto repeat(${maxPeriod}, minmax(45px, 1fr))`
          // The `auto` columns/rows are for labels.
          // So, an element's `gridColumnStart` should be `element.xpos + 1` (to skip label col)
          // And `gridRowStart` should be `element.ypos + 1` (to skip label row)
          // The `ElementCell` component uses `gridColumnStart: element.xpos` and `gridRowStart: element.ypos`.
          // So, from `PeriodicTableView`, we should pass `xpos: data.xpos + 1` and `ypos: data.ypos + 1`.
          // This is what I removed from the mapping for `ElementCell` earlier. Let's put it back there.
          // No, the `element` prop passed to `ElementCell` should be the original data.
          // `ElementCell` then in its `style` should do `gridColumnStart: element.xpos + 1`.
          // Or, `elements.ts` should have xpos/ypos that already account for this offset.
          // The current `elements.ts` seems to have xpos/ypos that are 1-indexed for the *visual* element grid (ignoring labels).
          // Let's adjust in `ElementCell` component directly.
          // In `ElementCell`, style={{ ... gridColumnStart: element.xpos + 1, gridRowStart: element.ypos + 1 }}

          // Wait, the `PeriodicTableView` CSS is:
          // grid-cols-[auto_repeat(18,minmax(45px,1fr))_auto]
          // grid-template-rows: auto repeat(${maxPeriod}, minmax(45px, 1fr))
          // The period numbers are `gridColumnStart: 1`.
          // The group numbers are `gridRowStart: 1`.
          // An element like Hydrogen (xpos:1, ypos:1 in data) needs to appear at column index 2, row index 2.
          // So `ElementCell` `gridColumnStart` should be `element.xpos + 1` and `gridRowStart` should be `element.ypos + 1`.
          // `ElementCell` currently uses `element.xpos` and `element.ypos` directly. This is the bug if data is 1-indexed for groups/periods.
          // The `elements.ts` file uses `xpos` and `ypos` that are 1-indexed and describe the column/row *within the 18-column element grid area*.
          // Lanthanides/Actinides: Lanthanum (atomicNumber 57) is `xpos: 3, ypos: 9`. This means 3rd column in the Lanthanide row.
          // The `PeriodicTableView` grid defines columns like `grid-cols-[auto_repeat(18,1fr)_auto]`.
          // `auto` = column 1 (for period labels)
          // `repeat(18,1fr)` = columns 2 through 19 (for elements)
          // `auto` = column 20 (for end space)
          // So, an element with `xpos=1` (e.g. Hydrogen) should be `grid-column-start: 2`.
          // An element with `ypos=1` should be `grid-row-start: 2`.
          // The `ElementCell` directly uses `element.xpos` and `element.ypos` for its `gridColumnStart` and `gridRowStart` style properties.
          // This means I need to pass `xpos: original_xpos + 1` and `ypos: original_ypos + 1` to `ElementCell`.
          // The loop `elements.map((element) => ... <ElementCell element={element} .../>)`
          // So inside `ElementCell` style:
          // `gridColumnStart: element.xpos + 1`
          // `gridRowStart: element.ypos + 1`
          // This looks correct.
          // The previous `ElementCell` had `gridColumnStart: element.xpos, gridRowStart: element.ypos`. This was the issue.

          const finalXpos = element.xpos + 1;
          const finalYpos = element.ypos + 1;

          return (
            <ElementCell
              key={element.symbol}
              // Pass the original element, ElementCell will handle offset for grid placement
              element={{...element, xpos: finalXpos, ypos: finalYpos }}
              onClick={() => onElementClick(element)}
              isFilteredOut={activeFilter !== 'all' && element.category !== activeFilter}
              animationDelay={delay}
            />
          );
        })}

        {/* Removed the middle legend block */}
      </div>
      <div className="mt-4 text-xs text-muted-foreground dark:text-gray-500 text-center">
        Scroll horizontally if the table is wider than your screen. Click an element for details.
      </div>
    </div>
  );
};

export default PeriodicTableView;

    