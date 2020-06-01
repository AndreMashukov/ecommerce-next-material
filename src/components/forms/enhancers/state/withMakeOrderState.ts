import { withStateHandlers } from 'recompose';
import { ChangeEventType } from '../../models';

const initialState = {
  email: { value: '', isDirty: false },
  phone: { value: '', isDirty: false },
  lastName: { value: '', isDirty: false },
  firstName: { value: '', isDirty: false },
  region: { value: '10', isDirty: false },
  city: { value: '', isDirty: false },
  address: { value: '', isDirty: false }
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

const onRegionChange = () => (event: ChangeEventType) => ({
  region: {
    value: event.target.value,
    isDirty: true
  }
});

const onCityChange = () => (event: ChangeEventType) => ({
  city: {
    value: event.target.value,
    isDirty: true
  }
});

const onAddressChange = () => (event: ChangeEventType) => ({
  address: {
    value: event.target.value,
    isDirty: true
  }
});

const firstNameDirty = () => () => ({
  firstName: {
    value: '',
    isDirty: true
  }
});

const lastNameDirty = () => () => ({
  lastName: {
    value: '',
    isDirty: true
  }
});

const emailDirty = () => () => ({
  email: {
    value: '',
    isDirty: true
  }
});

const phoneDirty = () => () => ({
  phone: {
    value: '',
    isDirty: true
  }
});

export const withMakeOrderdState = withStateHandlers(initialState, {
  onEmailchange,
  onPhoneChange,
  onLastNameChange,
  onFirstNameChange,
  onRegionChange,
  onCityChange,
  onAddressChange,
  firstNameDirty,
  lastNameDirty,
  emailDirty,
  phoneDirty
});

