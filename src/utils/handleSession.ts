import { Session } from '../models';
import { createNewSession } from '../services/SessionApi';
import { parseCookies, setCookie } from 'nookies';
import { NextPageContext } from 'next';

export const handleSession = async (ctx: NextPageContext) => {
  const { sessionId } = parseCookies(ctx);
  if (sessionId === undefined) {
    const session: Session = await createNewSession();
    setCookie(ctx, 'sessionId', session.id, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    });
    return { _sessionId: session.id };
  } else {
    return { _sessionId: sessionId };
  }
};