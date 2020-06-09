import { withStateHandlers } from 'recompose';
import { ChangeEventType } from '../../models';
import { retrieveUser } from '../../../../utils/User';

const user = retrieveUser();

const initialState = {
  email: { value: user ? user.email : '', isDirty: user ? true : false },
  phone: { value: '', isDirty: false },
  lastName: { value: user ? user.lastName : '', isDirty: user ? true : false  },
  firstName: { value: user ? user.firstName : '', isDirty: user ? true : false  },
  region: { value: '10', isDirty: false },
  city: { value: '', isDirty: false },
  address: { value: '', isDirty: false }
};

const onEmailChange = () => (event: ChangeEventType) => ({
  email: {
    value: user ? user.email : event.target.value,
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
    value: user ? user.lastName : event.target.value,
    isDirty: true
  }
});

const onFirstNameChange = () => (event: ChangeEventType) => ({
  firstName: {
    value: user ? user.firstName : event.target.value,
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
  onEmailChange,
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

