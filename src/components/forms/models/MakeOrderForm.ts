import { ChangeEventType, Email } from './GlobalModels';

export interface MakeOrderFormProps {
  email: Email;
  emailError: (email: Email) => boolean;
  onEmailchange: (event: ChangeEventType) => Event;
  // tslint:disable-next-line: no-any
  handleSubmit: any;
}