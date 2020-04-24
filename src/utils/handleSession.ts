import { Session } from '../models';
import { createNewSession } from '../services/SessionApi';
import { parseCookies, setCookie } from 'nookies';
import { NextPageContext } from 'next';

export const handleSession = async (ctx: NextPageContext) => {
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