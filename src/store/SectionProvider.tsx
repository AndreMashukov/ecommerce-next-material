import React, { useState } from 'react';
import { useAsync, UseAsyncReturn } from 'react-async-hook';

import { getSections } from '../services';
import { Section, AdminCatalogRow } from '../models';
import { getSubSections, getTopLevelSections } from '../utils/Section';
import { PRODUCT_CATALOG_ID } from '../constants';

interface SectionContext {
  sections: Section[];
  getSectionRows: (c: number) => AdminCatalogRow[];
  fetchSections: UseAsyncReturn<Section[], [number]>;
}

export const SectonContext = React.createContext<SectionContext>({
  sections: [],
  getSectionRows: null,
  fetchSections: null
});

interface SectionProviderProps {
  children?: React.ReactNode;
}

export const SectionProvider: React.FunctionComponent<{}> = (
  props: SectionProviderProps
) => {
  const [sections, setSections] = useState<Section[]>([]);

  const apiFetchSections = async (blockId: number) => {
    const s = await getSections(blockId);
    setSections(s);
    return s;
  };

  const getSectionRows = (current: number): AdminCatalogRow[] => {
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

  const fetchSections = useAsync(apiFetchSections, [PRODUCT_CATALOG_ID]);

  return (
    <SectonContext.Provider
      value={{
        sections,
        getSectionRows,
        fetchSections
      }}
    >
      {props.children}
    </SectonContext.Provider>
  );
};

export default SectionProvider;
