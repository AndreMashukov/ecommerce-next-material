import { withStateHandlers } from 'recompose';

import {
  onLastNameChange,
  lastNameDirty,
  setLastName,
  onFirstNameChange,
  firstNameDirty,
  setFirstName,
  onPasswordChange,
  clearPassword,
  passwordDirty,
  onConfirmPasswordChange,
  confirmPasswordDirty,
  clearConfirmPassword
} from './handlers';

const initialState = {
  lastName: { value: '', isDirty: false},
  firstName: { value: '', isDirty: false},
  password: { value: '', isDirty: false},
  confirmPassword: { value: '', isDirty: false}
};

export const withProfileState = withStateHandlers(initialState, {
  onPasswordChange,
  onLastNameChange,
  lastNameDirty,
  setLastName,
  onFirstNameChange,
  firstNameDirty,
  setFirstName,
  clearPassword,
  passwordDirty,
  onConfirmPasswordChange,
  confirmPasswordDirty,
  clearConfirmPassword
});
