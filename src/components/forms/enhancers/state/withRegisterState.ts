import { withStateHandlers } from 'recompose';

import {
  onEmailChange,
  clearEmail,
  onPhoneChange,
  phoneDirty,
  onPasswordChange,
  clearPassword,
  emailDirty,
  passwordDirty,
  onConfirmPasswordChange,
  confirmPasswordDirty
} from './handlers';

const initialState = {
  email: { value: '', isDirty: false},
  phone: { value: '', isDirty: false},
  password: { value: '', isDirty: false},
  confirmPassword: { value: '', isDirty: false}
};

export const withRegisterState = withStateHandlers(initialState, {
  onPasswordChange,
  onEmailChange,
  clearEmail,
  onPhoneChange,
  phoneDirty,
  clearPassword,
  emailDirty,
  passwordDirty,
  onConfirmPasswordChange,
  confirmPasswordDirty
});
