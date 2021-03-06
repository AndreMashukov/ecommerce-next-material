import { ChangeEventType, TextField } from './GlobalModels';
import {
  ProfileFormFields,
  ProfileFormHandlers
} from './ProfileForm';

export interface RegisterFormFields extends ProfileFormFields {
  email: TextField;
  phone: TextField;
}

interface RegisterFormHandlers extends ProfileFormHandlers {
  onEmailChange: (event: ChangeEventType) => TextField;
  emailDirty: () => TextField;
  onPhoneChange: (event: ChangeEventType) => TextField;
  phoneDirty: () => TextField;
  emailError: (email: TextField) => boolean;
  phoneError: (phone: TextField) => boolean;
}

interface RegisterFormSubmit {
  registerSubmit: () => RegisterFormFields | undefined;
}

export type RegisterFormProps = RegisterFormFields
  & RegisterFormHandlers
  & RegisterFormSubmit;
