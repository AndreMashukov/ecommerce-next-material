import React, {useContext, useEffect } from 'react';
import { Home } from '../components';
import SessionContext from '../store/SessionContext/SessionContext';
import SessionContextManager from '../store/SessionContext/SessionContextManager';
import { handleSession } from '../utils/handleSession';
import { NextPageContext } from 'next';

interface Props {
  _sessionId: number;
}

const Index = (props: Props) => {
  const { _sessionId } = props;
  const { sessionId, setSessionId } = useContext<SessionContextManager>(SessionContext);
  useEffect(() => {
    setSessionId(_sessionId);
  }, [sessionId]);

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
