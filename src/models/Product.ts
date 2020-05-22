import { ElementProperty } from './ElementProperty';

interface PropertyItem {
  id: number;
  name?: string;
}

export type ProductProperties = Record<
  'SPECIAL_OFFER' | 'NEW' | 'TOP_SELL' | 'RECOMMENDED' | 'PRICE',
  PropertyItem
>;

export interface Product {
  id: number;
  blockId: number;
  sectionId: number;
  name: string;
  code: string;
  active: string;
  preview: string;
  previewType: string;
  detail: string;
  detailType: string;
  properties: ElementProperty[];
}