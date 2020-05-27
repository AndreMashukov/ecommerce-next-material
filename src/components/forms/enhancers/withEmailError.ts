import { withProps } from 'recompose';
import { MakeOrderFormProps, TextField } from '../models';

const getEmailError = (email: TextField) => {
  if (!email.isDirty) {
    return '';
  }

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const isValidEmail = emailRegex.test(email.value);
  return !isValidEmail ? 'Неверный E-Mail.' : '';
};

export const withEmailError = withProps((ownerProps: Partial<MakeOrderFormProps>) => ({
  emailError: getEmailError(ownerProps.email)
}));

