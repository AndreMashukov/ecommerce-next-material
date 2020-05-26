import { withProps } from 'recompose';
import { MakeOrderFormProps, TextField } from '../models';

const getPhoneError = (phone: TextField) => {
  if (!phone.isDirty) {
    return '';
  }

  const isValidPhone = phone.value.trim().length > 7;
  return !isValidPhone ? 'Invalid phone number.' : '';
};

const withPhoneError = withProps((ownerProps: Partial<MakeOrderFormProps>) => ({
  phoneError: getPhoneError(ownerProps.phone)
}));

export default withPhoneError;
