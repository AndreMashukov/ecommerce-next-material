import { ChangeEventType, TextField } from './GlobalModels';

export interface CreatePasswordFormProps {
  password: TextField;
  passwordError: (password: TextField) => boolean;
  onPasswordChange: (event: ChangeEventType) => TextField;
  clearPassword: () => TextField;
  confirmPassword: TextField;
  confirmPasswordError: (confirmPassword: TextField) => boolean;
  onConfirmPasswordChange: (event: ChangeEventType) => TextField;
  clearConfirmPassword: () => TextField;
  createPasswordSubmit: (
    props: Partial<CreatePasswordFormProps>
  ) => boolean | Partial<CreatePasswordFormProps>;
  handlePasswordSuccess: (passw: string) => void;
}
