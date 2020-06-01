import { withStateHandlers } from 'recompose';
import { ChangeEventType } from '../models';

const initialState = {
  password: { value: '', isDirty: false},
  confirmPassword: { value: '', isDirty: false}
};

const onPasswordChange = () => (event: ChangeEventType) => ({
  password: {
    value: event.target.value,
    isDirty: true
  }
});

const onConfirmPasswordChange = () => (event: ChangeEventType) => ({
  confirmPassword: {
    value: event.target.value,
    isDirty: true
  }
});

const clearPassword = () => () => ({
  password: {
    value: '',
    isDirty: false
  }
});

const clearConfirmPassword = () => () => ({
  confirmPassword: {
    value: '',
    isDirty: false
  }
});

export const withCreatePasswordState = withStateHandlers(initialState, {
  onPasswordChange,
  onConfirmPasswordChange,
  clearPassword,
  clearConfirmPassword
});
