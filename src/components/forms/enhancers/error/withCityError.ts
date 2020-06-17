import { withProps } from 'recompose';
import { MakeOrderFormProps, TextField } from '../../models';

const getCityError = (city: TextField, region: number): string => {
  if (!city.isDirty || region === 10) {
    return '';
  }

  return city.value.length > 1 && city.value.length < 50 ? '' : 'Должно содержать от 1 до 50 символов';
};

export const withCityError = withProps(
  (ownerProps: Partial<MakeOrderFormProps>) => ({
    cityError: getCityError(ownerProps.city, ownerProps.region)
  })
);
