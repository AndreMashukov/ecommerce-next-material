import { Section } from '../models';

export const filterSections = (
  sections: Section[],
  categoryId: number
): Section[] => {
  return sections.filter((item) => item.categoryId === categoryId);
};
