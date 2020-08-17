import { Section } from '../models';

export const filterSections = (
  sections: Section[],
  categoryId: number
): Section[] => {
  return sections.filter((item) => item.categoryId === categoryId);
};

export const getTopLevelSections = (
  sections: Section[]
): Section[] => {
  return sections.filter((item) => item.parentCode === null);
};

export const getSubSections = (
  sections: Section[],
  curSection: number
): Section[] => {
  return sections.filter((item) => item.sectionId === curSection);
};

export const getParentSection = (
  sections: Section[],
  curSection: number
): number => {
  return sections.find((item) => item.id === curSection).sectionId;
};
