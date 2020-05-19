import React from 'react';
import { NextPageContext } from 'next';
import { handleSession } from '../utils/handleSession';
import Page404 from './404';

const GlobalSlugPage = () => {
  return (
    <Page404 />
  );
};

GlobalSlugPage.getInitialProps = async (ctx: NextPageContext) => {
  const session = await handleSession(ctx);
  return {
    _sessionId: session._sessionId
  };
};

export default GlobalSlugPage;
