import { ElementProperty } from './ElementProperty';
import { Picture } from './Picture';

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
  picture: Picture;
}