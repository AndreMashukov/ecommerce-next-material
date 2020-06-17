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
  address,
  addressError,
  comment,
  deliveryId
}: Partial<MakeOrderFormProps>) => {
  if (lastNameError
    || firstNameError
    || emailError
    || phoneError
    || addressError) {
    return false;
  } else if (!lastName.isDirty
    || !firstName.isDirty
    || !email.isDirty
    || !phone.isDirty
    || !address.isDirty) {
    return false;
  } else {
    const data = {
      email,
      phone,
      region,
      city,
      address,
      comment,
      deliveryId
    };

    return data;
  }
};

export const withMakeOrderSubmit = withHandlers({
  makeOrderSubmit: (props) => () => handleSubmitForm(props)
});
