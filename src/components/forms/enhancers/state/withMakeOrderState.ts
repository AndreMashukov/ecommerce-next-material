import { withStateHandlers } from 'recompose';
import { ChangeEventType } from '../../models';
import {
  onEmailChange,
  setEmail,
  setPhone,
  onLastNameChange,
  setLastName,
  onFirstNameChange,
  setFirstName,
  firstNameDirty,
  lastNameDirty,
  emailDirty,
  phoneDirty,
  onPhoneChange
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
  deliveryPrice: 0,
  paySystemId: 0
};

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

const setPaySystemId = () => (_paySystemId: number) => ({
  paySystemId: _paySystemId
});

const onPaySystemChange = () => (event: ChangeEventType) => ({
  paySystemId: parseInt(event.target.value, 0)
});

export const withMakeOrderdState = withStateHandlers(initialState, {
  onEmailChange,
  setEmail,
  onPhoneChange,
  setPhone,
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
  setPaySystemId,
  onPaySystemChange,
  firstNameDirty,
  lastNameDirty,
  emailDirty,
  phoneDirty,
  cityDirty,
  addressDirty
});
