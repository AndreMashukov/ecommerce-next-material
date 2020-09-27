import React from 'react';
import { SectionProvider } from './SectionProvider';

interface EntityProviderProps {
  children?: React.ReactNode;
}

const EntityProvider: React.FunctionComponent<{}> = (
  props: EntityProviderProps
) => {
  return (
    <SectionProvider>
      {props.children}
    </SectionProvider>
  );
};

export default EntityProvider;
