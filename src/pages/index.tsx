import React from 'react';
import { Home } from '../components';
import { Section } from '../models';
import SectionApi from '../services/Api';
import { PRODUCT_CATALOG } from '../constants';

interface Props {
  sections: Section[];
}

export default class extends React.Component<Props> {
  static async getInitialProps() {
    const sectionApi = SectionApi();
    const resp: Section[] = await sectionApi(PRODUCT_CATALOG);
    return { sections: resp };
  }

  render() {
    return (
      <div>
        <Home {...this.props} />
      </div>
    );
  }
}
