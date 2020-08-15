import { Section } from './Section';
import { Product } from './Product';

export interface AdminCatalogRow {
  id: number;
  name: string;
  active: string;
  price?: number;
  isSpecialOffer?: boolean;
  isNew?: boolean;
  isTopSell?: boolean;
  rowItem: Section | Product;
}
