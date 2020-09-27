import React, { useState } from 'react';
import { useAsync, UseAsyncReturn } from 'react-async-hook';

import { getSections } from '../../services';
import { Section } from '../../models';
import { PRODUCT_CATALOG_ID } from '../../constants';

interface SectionContext {
  sections: Section[];
  fetchSections: UseAsyncReturn<Section[], [number]>;
}

export const SectonContext = React.createContext<SectionContext>({
  sections: [],
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

  const fetchSections = useAsync(apiFetchSections, [PRODUCT_CATALOG_ID]);

  return (
    <SectonContext.Provider
      value={{
        sections,
        fetchSections
      }}
    >
      {props.children}
    </SectonContext.Provider>
  );
};

export default SectionProvider;
