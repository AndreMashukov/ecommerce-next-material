import { withStateHandlers } from 'recompose';
import {
  onPasswordChange,
  onConfirmPasswordChange,
  clearPassword,
  clearConfirmPassword
} from './handlers';

const initialState = {
  password: { value: '', isDirty: false},
  confirmPassword: { value: '', isDirty: false}
};

export const withCreatePasswordState = withStateHandlers(initialState, {
  onPasswordChange,
  onConfirmPasswordChange,
  clearPassword,
  clearConfirmPassword
});
