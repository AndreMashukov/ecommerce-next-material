import { ChangeEventType, TextField } from './GlobalModels';

export interface Login {
  email: TextField;
  password: TextField;
}

export interface LoginFormProps extends Login {
  emailError: (email: TextField) => boolean;
  onEmailChange: (event: ChangeEventType) => TextField;
  passwordError: (password: TextField) => boolean;
  onPasswordChange: (event: ChangeEventType) => TextField;
  clearPassword: () => TextField;
  loginSubmit: () => Login | undefined;
}
