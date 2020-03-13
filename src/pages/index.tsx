import React from 'react';
import { Home } from '../components';
import { Section } from '../models';
import Api from '../services/Api';

interface Props {
  sections: Section[];
}

export default class extends React.Component<Props> {
  static async getInitialProps() {
    const api = Api();
    const resp: Section[] = await api();
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
