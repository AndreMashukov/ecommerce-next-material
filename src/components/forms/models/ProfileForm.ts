import { ChangeEventType, TextField } from './GlobalModels';

export interface ProfileFormFields {
  lastName: TextField;
  firstName: TextField;
  password: TextField;
  confirmPassword: TextField;
}

export interface ProfileFormHandlers {
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

export interface ProfileFormErrors {
  lastNameError: (lastName: TextField) => boolean;
  firstNameError: (firstName: TextField) => boolean;
  passwordError: (password: TextField) => boolean;
  confirmPasswordError: (confirmPassword: TextField) => boolean;
}

interface ProfileFormSubmit {
  profileSubmit: () => ProfileFormFields | undefined;
}

export type ProfileFormProps = ProfileFormFields
  & ProfileFormHandlers
  & ProfileFormErrors
  & ProfileFormSubmit;
