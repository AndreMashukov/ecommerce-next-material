import { withStateHandlers } from 'recompose';

import {
  onEmailChange,
  clearEmail,
  onPhoneChange,
  phoneDirty,
  onLastNameChange,
  lastNameDirty,
  onFirstNameChange,
  firstNameDirty,
  onPasswordChange,
  clearPassword,
  emailDirty,
  passwordDirty,
  onConfirmPasswordChange,
  confirmPasswordDirty
} from './handlers';
import { SubmitState } from '../../models';

const initialState = {
  email: { value: '', isDirty: false},
  phone: { value: '', isDirty: false},
  lastName: { value: '', isDirty: false},
  firstName: { value: '', isDirty: false},
  password: { value: '', isDirty: false},
  confirmPassword: { value: '', isDirty: false},
  submitState: new SubmitState()
};

export const withRegisterState = withStateHandlers(initialState, {
  onPasswordChange,
  onEmailChange,
  clearEmail,
  onPhoneChange,
  phoneDirty,
  onLastNameChange,
  lastNameDirty,
  onFirstNameChange,
  firstNameDirty,
  clearPassword,
  emailDirty,
  passwordDirty,
  onConfirmPasswordChange,
  confirmPasswordDirty
});
