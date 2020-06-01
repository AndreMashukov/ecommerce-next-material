import { ChangeEventType, TextField } from './GlobalModels';

export interface MakeOrderFormProps {
  email: TextField;
  emailError: (email: TextField) => boolean;
  onEmailchange: (event: ChangeEventType) => TextField;
  phone: TextField;
  phoneError: (phone: TextField) => boolean;
  onPhoneChange: (event: ChangeEventType) => TextField;
  lastName: TextField;
  firstName: TextField;
  lastNameError: (lastName: TextField) => boolean;
  firstNameError: (firstName: TextField) => boolean;
  region: TextField;
  onRegionChange: (event: ChangeEventType) => TextField;
  city: TextField;
  onCityChange: (event: ChangeEventType) => TextField;
  address: TextField;
  onAddressChange: (event: ChangeEventType) => TextField;
  makeOrderSubmit: (props: Partial<MakeOrderFormProps>) => boolean;
}