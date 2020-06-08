import { ChangeEventType, TextField } from './GlobalModels';

export interface LoginFormProps {
  email: TextField;
  emailError: (email: TextField) => boolean;
  onEmailChange: (event: ChangeEventType) => TextField;
  password: TextField;
  passwordError: (password: TextField) => boolean;
  onPasswordChange: (event: ChangeEventType) => TextField;
  clearPassword: () => TextField;
  loginSubmit: (
    props: Partial<LoginFormProps>
  ) => boolean | Partial<LoginFormProps>;
  // handleLoginSuccess: (passw: string) => void;
}
