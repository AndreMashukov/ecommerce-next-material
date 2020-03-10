import React from 'react';
import { Home } from '../components';
import fetch from 'isomorphic-unfetch';
import { API_BASE } from '../constants';

export default class extends React.Component {
  static async getInitialProps() {
    const res = await fetch(`${API_BASE}sections/block?blockId=4`);
    return { sections: res.json() };
  }

  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}
