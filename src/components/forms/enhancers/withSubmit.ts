import { withHandlers } from 'recompose';
import { MakeOrderFormProps } from '../models';

const handleSubmitForm = ({
  lastName,
  lastNameError,
  firstName,
  firstNameError,
  emailError,
  email,
  phoneError,
  phone,
  region,
  city,
  address
}: Partial<MakeOrderFormProps>) => {
  if (!lastName.isDirty
    || lastNameError
    || !firstName
    || firstNameError
    || !email.isDirty
    || emailError
    || !phone.isDirty
    || phoneError) {
    return false;
  }

  const data = {
    email,
    phone,
    region,
    city,
    address
  };

  // tslint:disable-next-line: no-console
  console.log(data);
  return true;
};

export const withSubmitHandler = withHandlers({
  handleSubmit: (props) => () => handleSubmitForm(props)
});
