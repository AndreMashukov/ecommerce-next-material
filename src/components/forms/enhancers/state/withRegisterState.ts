import { withStateHandlers } from 'recompose';

import {
  onEmailChange,
  clearEmail,
  onPhoneChange,
  phoneDirty,
  onLastNameChange,
  onFirstNameChange,
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
  lastName: { value: '', isDirty: false},
  firstName: { value: '', isDirty: false},
  password: { value: '', isDirty: false},
  confirmPassword: { value: '', isDirty: false}
};

export const withRegisterState = withStateHandlers(initialState, {
  onPasswordChange,
  onEmailChange,
  clearEmail,
  onPhoneChange,
  phoneDirty,
  onLastNameChange,
  onFirstNameChange,
  clearPassword,
  emailDirty,
  passwordDirty,
  onConfirmPasswordChange,
  confirmPasswordDirty
});
