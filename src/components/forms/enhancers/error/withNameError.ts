import { withProps } from 'recompose';
import { MakeOrderFormProps, TextField } from '../../models';

const getNameError = (name: TextField) => {
  if (!name.isDirty) {
    return '';
  }

  const nameRegex = /^[A-Za-z][-a-zA-Z]+/;

  const isValidName = nameRegex.test(name.value) && (name.value.length > 1 && name.value.length < 100);
  return !isValidName ? 'Неверный формат имя/фамилии.' : '';
};

export const withNameError = withProps((ownerProps: Partial<MakeOrderFormProps>) => ({
  lastNameError: getNameError(ownerProps.lastName),
  firstNameError: getNameError(ownerProps.firstName)
}));

