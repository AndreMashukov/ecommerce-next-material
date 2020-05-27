import { withProps } from 'recompose';
import { MakeOrderFormProps, TextField } from '../models';

const getPhoneError = (phone: TextField): string => {
  if (!phone.isDirty) {
    return '';
  }

  const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

  const isValidPhone = phoneRegex.test(phone.value);
  return !isValidPhone ? 'Неверный формат телефона.' : '';
};

export const  withPhoneError = withProps((ownerProps: Partial<MakeOrderFormProps>) => ({
  phoneError: getPhoneError(ownerProps.phone)
}));
