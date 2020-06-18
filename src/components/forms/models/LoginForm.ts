import { TextField } from './GlobalModels';

export interface Login {
  email: TextField;
  password: TextField;
}

export interface LoginFormProps extends Login {
  emailError: (email: TextField) => boolean;
  passwordError: (password: TextField) => boolean;
  loginSubmit: () => Login | undefined;
}
