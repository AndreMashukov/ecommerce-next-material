import { ElementProperty } from './ElementProperty';

export interface Product {
  id: number;
  blockId: number;
  sectionId: number;
  name: string;
  code: string;
  active: string;
  properties: ElementProperty[];
}