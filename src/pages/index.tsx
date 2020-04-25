import React from 'react';
import { Home } from '../components';
import { handleSession } from '../utils/handleSession';
import { NextPageContext } from 'next';

const Index = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default Index;

Index.getInitialProps = async (ctx: NextPageContext) => {
  return handleSession(ctx);
};
