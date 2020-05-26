import { ChangeEventType, TextField } from './GlobalModels';

export interface MakeOrderFormProps {
  email: TextField;
  emailError: (email: TextField) => boolean;
  onEmailchange: (event: ChangeEventType) => Event;
  phone: TextField;
  phoneError: (phone: TextField) => boolean;
  onPhoneChange: (event: ChangeEventType) => Event;
  // tslint:disable-next-line: no-any
  handleSubmit: any;
}