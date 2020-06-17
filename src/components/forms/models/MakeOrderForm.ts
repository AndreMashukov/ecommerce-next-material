import { ChangeEventType, TextField } from './GlobalModels';

export interface MakeOrderFormProps {
  email: TextField;
  emailError: (email: TextField) => boolean;
  onEmailChange: (event: ChangeEventType) => TextField;
  emailDirty: () => TextField;
  phone: TextField;
  phoneError: (phone: TextField) => boolean;
  onPhoneChange: (event: ChangeEventType) => TextField;
  phoneDirty: () => TextField;
  lastName: TextField;
  lastNameError: (lastName: TextField) => boolean;
  lastNameDirty: () => TextField;
  firstName: TextField;
  firstNameError: (firstName: TextField) => boolean;
  firstNameDirty: () => TextField;
  region: TextField;
  onRegionChange: (event: ChangeEventType) => TextField;
  city: TextField;
  onCityChange: (event: ChangeEventType) => TextField;
  address: TextField;
  onAddressChange: (event: ChangeEventType) => TextField;
  addressDirty: () => TextField;
  addressError: (address: TextField) => boolean;
  comment: TextField;
  onCommentChange: (event: ChangeEventType) => TextField;
  deliveryId: number;
  onDeliveryChange: (event: ChangeEventType) => number;
  makeOrderSubmit: (props: Partial<MakeOrderFormProps>) => boolean;
}