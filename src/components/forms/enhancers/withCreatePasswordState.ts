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

export const withCreatePasswordState = withStateHandlers(initialState, {
  onPasswordChange,
  onConfirmPasswordChange
});
