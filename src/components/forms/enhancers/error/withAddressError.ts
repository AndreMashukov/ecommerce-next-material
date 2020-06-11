import { withProps } from 'recompose';
import { MakeOrderFormProps, TextField } from '../../models';

const getAddressError = (
  address: TextField
): string => {
  if (!address.isDirty) {
    return '';
  }

  return (address.value.length > 5) ? '' : 'Должно содержать не менее 5 символов';
};

export const withAddressError = withProps((ownerProps: Partial<MakeOrderFormProps>) => ({
  addressError: getAddressError(
    ownerProps.address
  )
}));
