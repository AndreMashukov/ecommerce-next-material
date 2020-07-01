import { ChangeEventType, TextField } from './GlobalModels';

export interface PasswordFormFields {
  password: TextField;
  confirmPassword: TextField;
}

export interface PasswordFormHandlers {
  onPasswordChange: (event: ChangeEventType) => TextField;
  clearPassword: () => TextField;
  confirmPasswordError: (confirmPassword: TextField) => boolean;
  onConfirmPasswordChange: (event: ChangeEventType) => TextField;
  clearConfirmPassword: () => TextField;
  passwordError: (password: TextField) => boolean;
}

export interface PasswordFormSubmit {
  createPasswordSubmit: (
    props: Partial<CreatePasswordFormProps>
  ) => boolean | Partial<CreatePasswordFormProps>;
  handlePasswordSuccess: (passw: string) => void;
}

export type CreatePasswordFormProps = PasswordFormFields
  & PasswordFormHandlers
  & PasswordFormSubmit;
