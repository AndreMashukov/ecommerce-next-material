import { withProps } from 'recompose';
import { CreatePasswordFormProps, TextField } from '../../models';

const getConfirmPasswordError = (
  password: TextField,
  confirmPassword: TextField
): string => {
  if (!confirmPassword.isDirty) {
    return '';
  }

  const passwordMatch = password.value === confirmPassword.value;

  return passwordMatch ? '' : 'Пароли не совпадают';
};

export const withConfirmPasswordError = withProps((ownerProps: Partial<CreatePasswordFormProps>) => ({
  confirmPasswordError: getConfirmPasswordError(
    ownerProps.password,
    ownerProps.confirmPassword
  )
}));
