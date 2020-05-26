import { withStateHandlers } from 'recompose';
import { ChangeEventType } from '../models';

const initialState = {
  email: { value: '', isDirty: false }
};

const onEmailchange = () => (event: ChangeEventType) => ({
  email: {
    value: event.target.value,
    isDirty: true
  }
});

const withTextFieldState = withStateHandlers(initialState, {
  onEmailchange
});

export default withTextFieldState;
