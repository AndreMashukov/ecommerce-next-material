import { ChangeEventType, TextField } from './GlobalModels';

export interface CreatePasswordFormProps {
  password: TextField;
  passwordError: (password: TextField) => boolean;
  onPasswordChange: (event: ChangeEventType) => Event;
  confirmPassword: TextField;
  confirmPasswordError: (confirmPassword: TextField) => boolean;
  onConfirmPasswordChange: (event: ChangeEventType) => Event;
  createPasswordSubmit: (
    props: Partial<CreatePasswordFormProps>
  ) => boolean | Partial<CreatePasswordFormProps>;
}
