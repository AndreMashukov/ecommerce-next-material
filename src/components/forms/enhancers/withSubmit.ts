import { withHandlers } from 'recompose';
import { MakeOrderFormProps } from '../models';

const handleSubmitForm = ({
  emailError,
  email,
  phoneError,
  phone,
  region,
  city,
  address
}: Partial<MakeOrderFormProps>) => {
  if (emailError || phoneError) {
    return;
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
};

export const withSubmitHandler = withHandlers({
  handleSubmit: (props) => () => handleSubmitForm(props)
});
