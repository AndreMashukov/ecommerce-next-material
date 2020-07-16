import { Picture } from './Picture';

export interface Section {
  id: number;
  blockId: number;
  sectionId: number;
  name: string;
  description: string;
  code: string;
  active: string;
  sort: number;
  parentCode: string;
  depthLevel: number;
  categoryId: number;
  categoryName: string;
  descriptionType: string;
  pictureData: Picture;
}

export interface Category {
  categoryId: number;
  categoryName: string;
}