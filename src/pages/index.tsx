import React from 'react';
import { Home } from '../components';
import './Layout.scss';
import { NextPage } from 'next';

const Index: NextPage<{}> = () => {
  return (
    <div className="page-root-layout">
      <Home />
    </div>
  );
};

export default Index;
