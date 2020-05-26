import { withStateHandlers } from 'recompose';
import { ChangeEventType } from '../models';

const initialState = {
  email: { value: '', isDirty: false },
  phone: { value: '', isDirty: false }
};

const onEmailchange = () => (event: ChangeEventType) => ({
  email: {
    value: event.target.value,
    isDirty: true
  }
});

const onPhoneChange = () => (event: ChangeEventType) => ({
  phone: {
    value: event.target.value,
    isDirty: true
  }
});

const withTextFieldState = withStateHandlers(initialState, {
  onEmailchange,
  onPhoneChange
});

export default withTextFieldState;
