import { Section, AdminCatalogRow } from 'models';

export const filterSections = (
  sections: Section[],
  categoryId: number
): Section[] => {
  return sections.filter((item) => item.categoryId === categoryId);
};

export const getTopLevelSections = (sections: Section[]): Section[] => {
  return sections.filter((item) => item.parentCode === null);
};

export const getSubSections = (
  sections: Section[],
  curSection: number
): Section[] => {
  return sections.filter((item) => item.sectionId === curSection);
};

export const getParentSectionId = (
  sections: Section[],
  curSection: number
): number => {
  return sections.find((item) => item.id === curSection).sectionId;
};

export const getSectionRows = (
  sections: Section[],
  current: number
): AdminCatalogRow[] => {
  const filteredSections = current
    ? getSubSections(sections, current)
    : getTopLevelSections(sections);

  return filteredSections.map((section: Section) => {
    const row: AdminCatalogRow = {
      id: section.id,
      name: section.name,
      active: section.active === 'Y' ? 'Да' : 'Нет',
      isSection: true,
      rowItem: section
    };
    return row;
  });
};

export const getSectionById = (
  sections: Section[],
  id: number
): Section => {
  return sections.find((item) => item.id === id);
};

export const getParentSectionById = (
  sections: Section[],
  id: number
): Section => {
  return sections.find((item) => item.sectionId === id);
};