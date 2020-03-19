import React from 'react';
import { Home } from '../components';
import { Section } from '../models';
import { getSections } from '../services/CatalogApi';
import { PRODUCT_CATALOG_ID } from '../constants';

interface Props {
  sections: Section[];
}

export default class extends React.Component<Props> {
  static async getInitialProps() {
    const sectionList: Section[] = await getSections(PRODUCT_CATALOG_ID);
    return { sections: sectionList };
  }

  render() {
    return (
      <div>
        <Home {...this.props} />
      </div>
    );
  }
}
