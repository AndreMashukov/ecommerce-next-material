import { ChangeEventType, TextField, SubmitStateInterface } from './GlobalModels';

export interface RegisterFormFields {
  email: TextField;
  phone: TextField;
  lastName: TextField;
  firstName: TextField;
  password: TextField;
  confirmPassword: TextField;
}

interface RegisterFormHandlers extends SubmitStateInterface {
  onEmailChange: (event: ChangeEventType) => TextField;
  emailDirty: () => TextField;
  onPhoneChange: (event: ChangeEventType) => TextField;
  phoneDirty: () => TextField;
  onLastNameChange: (event: ChangeEventType) => TextField;
  lastNameDirty: () => TextField;
  onFirstNameChange: (event: ChangeEventType) => TextField;
  firstNameDirty: () => TextField;
  onPasswordChange: (event: ChangeEventType) => TextField;
  clearPassword: () => TextField;
  passwordDirty: () => TextField;
  onConfirmPasswordChange: (event: ChangeEventType) => TextField;
  clearConfirmPassword: () => TextField;
  confirmPasswordDirty: () => TextField;
}

interface RegisterFormErrors {
  emailError: (email: TextField) => boolean;
  phoneError: (phone: TextField) => boolean;
  lastNameError: (lastName: TextField) => boolean;
  firstNameError: (firstName: TextField) => boolean;
  passwordError: (password: TextField) => boolean;
  confirmPasswordError: (confirmPassword: TextField) => boolean;
}

interface RegisterFormSubmit {
  RegisterSubmit: () => RegisterFormFields | undefined;
}

export type RegisterFormProps = RegisterFormFields
  & RegisterFormHandlers
  & RegisterFormErrors
  & RegisterFormSubmit;
