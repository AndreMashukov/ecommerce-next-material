export interface Section {
  id: number;
  blockId: number;
  sectionId: number;
  name: string;
  description: string;
  code: string;
  sort: number;
  parentCode: string;
  depthLevel: number;
}