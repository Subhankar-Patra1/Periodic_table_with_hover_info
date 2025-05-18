
export type ElementCategory =
  | 'diatomic nonmetal'
  | 'noble gas'
  | 'alkali metal'
  | 'alkaline earth metal'
  | 'metalloid'
  | 'polyatomic nonmetal'
  | 'lanthanide'
  | 'actinide'
  | 'transition metal'
  | 'post-transition metal'
  | 'hydrogen' // Added for unique styling
  | 'unknown';

export interface ElementData {
  name: string;
  appearance?: string;
  atomicMass: number | string; // Can be like [258] for unstable elements
  boil?: number; // Kelvin
  category: ElementCategory;
  density?: number; // g/cm^3
  discoveredBy?: string;
  melt?: number; // Kelvin
  molarHeat?: number;
  namedBy?: string;
  atomicNumber: number;
  period: number;
  group: number;
  phase: 'Gas' | 'Liquid' | 'Solid' | 'Unknown';
  source?: string; // Link to Wikipedia or other source
  spectralImg?: string;
  summary: string;
  symbol: string;
  xpos: number; // Grid column position (1-18)
  ypos: number; // Grid row position (1-10, includes Lanthanides/Actinides rows)
  shells: number[]; // Electron shells, e.g. [2, 8, 1] for Sodium
  electronConfiguration: string;
  electronConfigurationSemantic: string;
  electronAffinity?: number;
  electronegativityPauling?: number;
  ionizationEnergies: number[];
  cpkHex?: string; // Color in CPK convention (hex)
  block: 's' | 'p' | 'd' | 'f';

  // Added fields from original request for consistency
  oxidationStates?: string;
  yearDiscovered?: number | string;
}

export const elementCategoriesList: ElementCategory[] = [
  'hydrogen',
  'alkali metal',
  'alkaline earth metal',
  'lanthanide',
  'actinide',
  'transition metal',
  'post-transition metal',
  'metalloid',
  'polyatomic nonmetal', // For elements like Carbon, Phosphorus, Sulfur
  'diatomic nonmetal',   // For elements like Nitrogen, Oxygen, Halogens (excluding Hydrogen)
  'noble gas',
  'unknown',
];

// New color mapping using HEX values and ensuring text contrast
export const categoryStyleMapping: Record<ElementCategory, { backgroundColor: string; textColorClass: string; borderColor: string; hoverGlowColor: string; name: string; }> = {
  'hydrogen':               { name: 'Hydrogen',               backgroundColor: '#E63946', textColorClass: 'text-white', borderColor: '#E63946', hoverGlowColor: '#F25A68' },
  'alkali metal':           { name: 'Alkali Metal',           backgroundColor: '#FF6F61', textColorClass: 'text-white', borderColor: '#FF6F61', hoverGlowColor: '#FF8C82' },
  'alkaline earth metal':   { name: 'Alkaline Earth Metal',   backgroundColor: '#FFD166', textColorClass: 'text-black', borderColor: '#FFD166', hoverGlowColor: '#FFDC87' },
  'lanthanide':             { name: 'Lanthanide',             backgroundColor: '#FF9F1C', textColorClass: 'text-black', borderColor: '#FF9F1C', hoverGlowColor: '#FFB247' },
  'actinide':               { name: 'Actinide',               backgroundColor: '#7209B7', textColorClass: 'text-white', borderColor: '#7209B7', hoverGlowColor: '#8C0BD3' },
  'transition metal':       { name: 'Transition Metal',       backgroundColor: '#06D6A0', textColorClass: 'text-black', borderColor: '#06D6A0', hoverGlowColor: '#07F7B5' },
  'post-transition metal':  { name: 'Post-Transition Metal',  backgroundColor: '#118AB2', textColorClass: 'text-white', borderColor: '#118AB2', hoverGlowColor: '#14A6D8' },
  'metalloid':              { name: 'Metalloid',              backgroundColor: '#EF476F', textColorClass: 'text-white', borderColor: '#EF476F', hoverGlowColor: '#F36A8C' },
  'polyatomic nonmetal':    { name: 'Nonmetal (Polyatomic)',  backgroundColor: '#F4A261', textColorClass: 'text-black', borderColor: '#F4A261', hoverGlowColor: '#F6B57E' }, // Covers C,N,O,S previously
  'diatomic nonmetal':      { name: 'Nonmetal (Diatomic)',    backgroundColor: '#F4A261', textColorClass: 'text-black', borderColor: '#F4A261', hoverGlowColor: '#F6B57E' }, // For halogens, N, O etc.
  'noble gas':              { name: 'Noble Gas',              backgroundColor: '#073B4C', textColorClass: 'text-white', borderColor: '#073B4C', hoverGlowColor: '#0A536D' },
  'unknown':                { name: 'Unknown',                backgroundColor: '#6c757d', textColorClass: 'text-white', borderColor: '#6c757d', hoverGlowColor: '#868e96' }, // Darker gray
};

// Deprecated, use categoryStyleMapping instead
export const categoryColors: Record<ElementCategory, { bg: string; text: string; border: string }> = {
  'hydrogen': { bg: 'bg-red-600', text: 'text-white', border: 'border-red-700' }, // Example, will be overridden
  'alkali metal': { bg: 'bg-red-500', text: 'text-white', border: 'border-red-700' },
  'alkaline earth metal': { bg: 'bg-orange-500', text: 'text-white', border: 'border-orange-700' },
  'lanthanide': { bg: 'bg-yellow-300', text: 'text-yellow-800', border: 'border-yellow-500' },
  'actinide': { bg: 'bg-pink-400', text: 'text-white', border: 'border-pink-600' },
  'transition metal': { bg: 'bg-rose-400', text: 'text-white', border: 'border-rose-600' },
  'post-transition metal': { bg: 'bg-sky-400', text: 'text-white', border: 'border-sky-600' },
  'metalloid': { bg: 'bg-teal-400', text: 'text-white', border: 'border-teal-600' },
  'polyatomic nonmetal': { bg: 'bg-green-500', text: 'text-white', border: 'border-green-700' },
  'diatomic nonmetal': { bg: 'bg-lime-500', text: 'text-lime-800', border: 'border-lime-700' },
  'noble gas': { bg: 'bg-purple-500', text: 'text-white', border: 'border-purple-700' },
  'unknown': { bg: 'bg-gray-400', text: 'text-white', border: 'border-gray-600' },
};
