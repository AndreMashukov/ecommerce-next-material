import React from 'react';
import { SectionProvider } from './SectionProvider';
import { ProductProvider } from './ProductProvider';

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
