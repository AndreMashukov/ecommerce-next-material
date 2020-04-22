import React, {useContext, useEffect } from 'react';
import { Home } from '../components';
import { parseCookies, setCookie } from 'nookies';
import { NextPageContext } from 'next';
import { Session } from '../models';
import { createNewSession } from '../services/SessionApi';
import SessionContext from '../store/SessionContext/SessionContext';
import SessionContextManager from '../store/SessionContext/SessionContextManager';

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
  const { fuserId } = parseCookies(ctx);
  if (fuserId === undefined) {
    const session: Session = await createNewSession();
    setCookie(ctx, 'fuserId', session.id.toString(), {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    });
    return { _sessionId: session.id };
  } else {
    return { _sessionId: parseInt(fuserId, 0) };
  }
};
