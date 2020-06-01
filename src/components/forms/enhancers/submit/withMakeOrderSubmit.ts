import { withHandlers } from 'recompose';
import { MakeOrderFormProps } from '../../models';

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
  if (lastNameError
    || firstNameError
    || emailError
    || phoneError) {
    return false;
  } else if (!lastName.isDirty
    || !firstName.isDirty
    || !email.isDirty
    || !phone.isDirty) {
    return false;
  } else {
    const data = {
      email,
      phone,
      region,
      city,
      address
    };

    return data;
  }
};

export const withMakeOrderSubmit = withHandlers({
  makeOrderSubmit: (props) => () => handleSubmitForm(props)
});
