import React from 'react';
import { Home } from '../components';
import { Section } from '../models';
import { useSections } from '../store/SectionProvider';
import ApiProvider from '../services/Provider';

interface Props {
  sections: Section[];
}

export default () => {
  const sectionContext = useSections();
  const sections: Props = sectionContext.getAll;

  return (
    <div>
      <ApiProvider>
        <Home {...sections} />
      </ApiProvider>
    </div>
  );
};
