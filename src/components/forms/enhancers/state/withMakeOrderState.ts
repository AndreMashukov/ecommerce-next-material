import { withStateHandlers } from 'recompose';
import { ChangeEventType } from '../../models';
import {
  onEmailChange,
  setEmail,
  onLastNameChange,
  setLastName,
  onFirstNameChange,
  setFirstName
} from './handlers';

const initialState = {
  email: { value: '', isDirty: false },
  phone: { value: '', isDirty: false },
  lastName: { value: '', isDirty: false },
  firstName: { value: '', isDirty: false },
  region: 10,
  city: { value: '', isDirty: false },
  address: { value: '', isDirty: false },
  comment: { value: '', isDirty: false },
  deliveryId: 0,
  deliveryPrice: 0
};

const onPhoneChange = () => (event: ChangeEventType) => ({
  phone: {
    value: event.target.value,
    isDirty: true
  }
});

const onRegionChange = () => (event: ChangeEventType) => ({
  region: parseInt(event.target.value, 0)
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

const onCommentChange = () => (event: ChangeEventType) => ({
  comment: {
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

const addressDirty = () => () => ({
  address: {
    value: '',
    isDirty: true
  }
});

const cityDirty = () => () => ({
  city: {
    value: '',
    isDirty: true
  }
});

const setDeliveryId = () => (_deliveryId: number) => ({
  deliveryId: _deliveryId
});

const onDeliveryChange = () => (event: ChangeEventType) => ({
  deliveryId: parseInt(event.target.value, 0)
});

const setDeliveryPrice = () => (_deliveryPrice: number) => ({
  deliveryPrice: _deliveryPrice
});

export const withMakeOrderdState = withStateHandlers(initialState, {
  onEmailChange,
  setEmail,
  onPhoneChange,
  onLastNameChange,
  setLastName,
  onFirstNameChange,
  setFirstName,
  onRegionChange,
  onCityChange,
  onAddressChange,
  onCommentChange,
  onDeliveryChange,
  setDeliveryId,
  setDeliveryPrice,
  firstNameDirty,
  lastNameDirty,
  emailDirty,
  phoneDirty,
  cityDirty,
  addressDirty
});
