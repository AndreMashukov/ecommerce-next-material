import { ElementProperty } from './ElementProperty';

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