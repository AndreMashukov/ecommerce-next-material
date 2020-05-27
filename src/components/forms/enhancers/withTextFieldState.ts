import { withStateHandlers } from 'recompose';
import { ChangeEventType } from '../models';

const initialState = {
  email: { value: '', isDirty: false },
  phone: { value: '', isDirty: false },
  lastName: { value: '', isDirty: false },
  firstName: { value: '', isDirty: false }
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

const onLastNameChange = () => (event: ChangeEventType) => ({
  lastName: {
    value: event.target.value,
    isDirty: true
  }
});

const onFirstNameChange = () => (event: ChangeEventType) => ({
  firstName: {
    value: event.target.value,
    isDirty: true
  }
});

const withTextFieldState = withStateHandlers(initialState, {
  onEmailchange,
  onPhoneChange,
  onLastNameChange,
  onFirstNameChange
});

export default withTextFieldState;
