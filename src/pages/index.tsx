import React from 'react';
import { Home } from '../components';
// import { Section } from '../services/Section';
import fetch from 'isomorphic-unfetch';

export default class extends React.Component {
  // tslint:disable-next-line: no-any
  static async getInitialProps() {
    const res = await fetch('http://localhost:3000/api/sections/block?blockId=4');
    const json = await res.json();
    // tslint:disable-next-line: no-console
    console.log(json);
    return { sections: json };
  }

  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}
