import { ChangeEventType, TextField } from './GlobalModels';
import { ChangeEvent } from 'react';

export interface MakeOrderFormFields {
  email: TextField;
  phone: TextField;
  lastName: TextField;
  firstName: TextField;
  region: number;
  city: TextField;
  address: TextField;
  comment: TextField;
  deliveryId: number;
  deliveryPrice: number;
  paySystemId: number;
}

interface MakeOrderFormHandlers {
  onEmailChange: (event: ChangeEventType) => TextField;
  emailDirty: () => TextField;
  setEmail: (email: string) => TextField;
  onPhoneChange: (event: ChangeEventType) => TextField;
  phoneDirty: () => TextField;
  onLastNameChange: (event: ChangeEventType) => TextField;
  lastNameDirty: () => TextField;
  setLastName: (lastName: string) => TextField;
  onFirstNameChange: (event: ChangeEventType) => TextField;
  firstNameDirty: () => TextField;
  setFirstName: (firstName: string) => TextField;
  onCityChange: (event: ChangeEventType) => TextField;
  cityDirty: () => TextField;
  onRegionChange: (event: ChangeEvent<{name?: string}>) => number;
  onAddressChange: (event: ChangeEventType) => TextField;
  addressDirty: () => TextField;
  onCommentChange: (event: ChangeEventType) => TextField;
  onDeliveryChange: (event: ChangeEventType) => number;
  setDeliveryId: (deliveryId: number) => number;
  setDeliveryPrice: (deliveryPrice: number) => number;
  onPaySystemChange: (event: ChangeEventType) => number;
  setPaySystemId: (paySystemId: number) => number;
}

interface MakeOrderFormErrors {
  emailError: (email: TextField) => boolean;
  phoneError: (phone: TextField) => boolean;
  lastNameError: (lastName: TextField) => boolean;
  firstNameError: (firstName: TextField) => boolean;
  cityError: (address: TextField) => boolean;
  addressError: (address: TextField) => boolean;
  commentError: (comment: TextField) => boolean;
}

interface MakeOrderFormSubmit {
  makeOrderSubmit: (props: Partial<MakeOrderFormProps>) => boolean;
}

export type MakeOrderFormProps = MakeOrderFormFields
  & MakeOrderFormHandlers
  & MakeOrderFormErrors
  & MakeOrderFormSubmit;
