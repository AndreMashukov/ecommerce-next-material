import { withProps } from 'recompose';
import { MakeOrderFormProps, TextField } from '../../models';

const getAddressError = (
  address: TextField
): string => {
  if (!address.isDirty) {
    return '';
  }

  return (address.value.length > 5 && address.value.length < 255) ? '' : 'Должно содержать от 5 до 255 символов';
};

export const withAddressError = withProps((ownerProps: Partial<MakeOrderFormProps>) => ({
  addressError: getAddressError(
    ownerProps.address
  )
}));
