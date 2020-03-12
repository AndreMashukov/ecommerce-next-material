import React from 'react';
import { Home } from '../components';
import { Section } from '../models';
import { useSections } from '../store/SectionProvider';

interface Props {
  sections: Section[];
}

export default () => {
  const sectionContext = useSections();
  const sections: Props = sectionContext.getAll;

  return (
    <div>
      <Home {...sections} />
    </div>
  );
};
