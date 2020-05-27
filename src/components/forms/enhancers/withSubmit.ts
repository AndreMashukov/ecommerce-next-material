import { withHandlers } from 'recompose';
import { MakeOrderFormProps } from '../models';

const handleSubmitForm = ({ emailError, email, phoneError, phone } : Partial<MakeOrderFormProps>) => {
  if (emailError || phoneError) {
    return;
  }

  const data = {
    email,
    phone
  };

  // tslint:disable-next-line: no-console
  console.log(data);
};

export default withHandlers({
  handleSubmit: (props) => () => handleSubmitForm(props)
});
