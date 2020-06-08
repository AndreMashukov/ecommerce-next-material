import { withStateHandlers } from 'recompose';
import { ChangeEventType } from '../../models';

const initialState = {
  email: { value: '', isDirty: false},
  password: { value: '', isDirty: false}
};

const onEmailChange = () => (event: ChangeEventType) => ({
  email: {
    value: event.target.value,
    isDirty: true
  }
});

const onPasswordChange = () => (event: ChangeEventType) => ({
  password: {
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


export const withLoginState = withStateHandlers(initialState, {
  onPasswordChange,
  onEmailChange,
  clearPassword
});
