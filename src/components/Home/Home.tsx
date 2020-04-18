import React from 'react';
import './Home.scss';
import { Section } from '../../models';

interface HomeProps {
  sections: Section[];
}

export const Home = (props: HomeProps) => {
  return (
    React.useMemo(() => HomeMemo(props), [])
  );
};

const HomeMemo = (props: HomeProps) => {
  // tslint:disable-next-line: no-console
  console.log(props);
  return (
      <div className="home-root">
      </div>
  );
}