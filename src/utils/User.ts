import { User, Session } from '../models';
import { parseCookies, setCookie } from 'nookies';
import { createNewSession } from '../services/SessionApi';
import { COOKIE_EXPIRY_PERIOD, USER_RECORD_NAME } from '../constants';

export const retrieveUser = (): (User | undefined) => {
  if (process.browser) {
    try {
      const record = localStorage.getItem(USER_RECORD_NAME);
      if (record !== 'null') {
        return JSON.parse(record);
      } else {
        return null;
      }
    } catch (err) {
      return null;
    }
  }
};

export const removeUser = (): void => {
  if (process.browser) {
    localStorage.removeItem(USER_RECORD_NAME);
  }
};

export const storeUser = (user: User): void => {
  if (process.browser) {
    localStorage.setItem(USER_RECORD_NAME, JSON.stringify(user));
  }
};

export const handleSession = async () => {
  if (process.browser) {
    const { sessionId } = parseCookies();
    if (sessionId === undefined) {
      const session: Session = await createNewSession();
      setCookie(null, 'sessionId', session.id, {
        // maxAge: 30 * 24 * 60 * 60,
        maxAge: COOKIE_EXPIRY_PERIOD,
        path: '/'
      });
      return session;
    } else {
      return { id: sessionId };
    }
  }
};