import React from 'react';
import { Home } from '../components';
import { Section } from '../models';
import { getSections } from '../services/CatalogApi';
import { PRODUCT_CATALOG_ID } from '../constants';

interface Props {
  sections: Section[];
}

const Index = (props: Props) => {
  return (
    <div>
      <Home {...props} />
    </div>
  );
};

export default Index;

Index.getInitialProps = async () => {
  const sectionList: Section[] = await getSections(PRODUCT_CATALOG_ID);
  return { sections: sectionList };
};
