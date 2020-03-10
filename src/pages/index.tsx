import React from 'react';
import { Home } from '../components';
import fetch from 'isomorphic-unfetch';
import { API_BASE } from '../constants';
import { Section } from '../models';

interface Props {
  sections: Section[];
}

export default class extends React.Component<Props> {
  static async getInitialProps() {
    const res = await fetch(`${API_BASE}sections/block?blockId=4`);
    const resp: Section[] = await res.json();
    return { sections: resp };
  }

  render() {
    return (
      <div>
        <Home {...this.props}/>
      </div>
    );
  }
}
