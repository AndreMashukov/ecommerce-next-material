import { ChangeEventType, TextField } from './GlobalModels';

export interface Login {
  email: TextField;
  password: TextField;
}

interface LoginFormHandlers {
  onEmailChange: (event: ChangeEventType) => TextField;
  emailDirty: () => TextField;
  onPasswordChange: (event: ChangeEventType) => TextField;
  clearPassword: () => TextField;
  passwordDirty: () => TextField;
}

interface LoginFormErrors {
  emailError: (email: TextField) => boolean;
  passwordError: (password: TextField) => boolean;
}

interface LoginFormSubmit {
  loginSubmit: () => Login | Login;
}

export type LoginFormProps = Login
  & LoginFormHandlers
  & LoginFormErrors
  & LoginFormSubmit;
