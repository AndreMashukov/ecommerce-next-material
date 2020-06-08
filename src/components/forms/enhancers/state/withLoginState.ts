import { withStateHandlers } from 'recompose';

import {
  onEmailChange,
  clearEmail,
  onPasswordChange,
  clearPassword,
  emailDirty,
  passwordDirty
} from './handlers';

const initialState = {
  email: { value: '', isDirty: false},
  password: { value: '', isDirty: false}
};

export const withLoginState = withStateHandlers(initialState, {
  onPasswordChange,
  onEmailChange,
  clearEmail,
  clearPassword,
  emailDirty,
  passwordDirty
});
