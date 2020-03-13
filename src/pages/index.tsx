import React from 'react';
import { Home } from '../components';
import { Section } from '../models';
import { SectionApi } from '../services/CatalogApi';
import { PRODUCT_CATALOG } from '../constants';

interface Props {
  sections: Section[];
}

const sectionApi = SectionApi();

export default class extends React.Component<Props> {
  static async getInitialProps() {
    const sectionList: Section[] = await sectionApi(PRODUCT_CATALOG);
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
