export interface ProductType {
  id: string;
  name: string;
  unit: 'л.' | 'шт.' | 'мл.';
}

export const UNITS = ['л.', 'шт.', 'мл.'] as const;