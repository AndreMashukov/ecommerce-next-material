import { User } from '../../../models';

const USER_RECORD_NAME = 'userState';

export const deserializeUser = (): (User | undefined) => {
  if (process.browser) {
    try {
      const record = localStorage.getItem(USER_RECORD_NAME);
      if (record !== 'null') {
        return JSON.parse(localStorage.getItem(USER_RECORD_NAME));
      } else {
        return null;
      }
    } catch (err) {
      return null;
    }
  }
};

export const serializeUser = (user: User): void => {
  if (process.browser) {
    localStorage.setItem(USER_RECORD_NAME, JSON.stringify(user));
  }
};