import { withProps } from 'recompose';
import { CreatePasswordFormProps, TextField } from '../models';

const getPasswordError = (password: TextField): string => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const isValidPassword =
    password.value === '' || passwordRegex.test(password.value);
  return !isValidPassword
    ? 'Пароль должен содержать не менее 6 символов, как минимум одну букву и одну цифру.'
    : '';
};

export const withPasswordError = withProps(
  (ownerProps: Partial<CreatePasswordFormProps>) => ({
    passwordError: getPasswordError(ownerProps.password)
  })
);
