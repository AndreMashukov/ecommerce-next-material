import React from 'react';
import { SectionProvider } from './entities/SectionProvider';
import { ProductProvider } from './entities/ProductProvider';

interface EntityProviderProps {
  children?: React.ReactNode;
}

const EntityProvider: React.FunctionComponent<{}> = (
  props: EntityProviderProps
) => {
  return (
    <SectionProvider>
      <ProductProvider>{props.children}</ProductProvider>
    </SectionProvider>
  );
};

export default EntityProvider;
