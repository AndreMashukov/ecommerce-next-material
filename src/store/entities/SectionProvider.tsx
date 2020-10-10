import React, { useState, useEffect } from 'react';
import { Subscription, from } from 'rxjs';

import { getSections } from '../../services';
import { Section } from '../../models';
import { PRODUCT_CATALOG_ID } from '../../constants';

interface SectionContext {
  sections: Section[];
  loading: boolean;
  fetchSections: () => void;
}

export const SectonContext = React.createContext<SectionContext>({
  sections: [],
  loading: false,
  fetchSections: null
});

interface SectionProviderProps {
  children?: React.ReactNode;
}

export const SectionProvider: React.FunctionComponent<{}> = (
  props: SectionProviderProps
) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);
  const subscriptions = new Subscription();

  const apiFetchSections = async (blockId: number) => {
    const s = await getSections(blockId);
    setSections(s);
    return s;
  };

  const fetchSections = () => {
      setLoading(true);
      subscriptions.add(
        from(
          apiFetchSections(PRODUCT_CATALOG_ID)
        )
        .subscribe(() => {
          setLoading(false);
        })
      );
  };

  useEffect(() => {
    return () => {
      subscriptions.unsubscribe();
    };
  }, []);

  return (
    <SectonContext.Provider
      value={{
        sections,
        loading,
        fetchSections
      }}
    >
      {props.children}
    </SectonContext.Provider>
  );
};

export default SectionProvider;
