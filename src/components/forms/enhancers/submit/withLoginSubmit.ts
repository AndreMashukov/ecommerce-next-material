import { withHandlers } from 'recompose';
import { LoginFormProps } from '../../models';

const handleSubmitForm = ({
  password,
  email,
  emailError
}: Partial<LoginFormProps>) => {
  if (emailError) {
    return false;
  } else if (!email.isDirty && !email.isDirty) {
    return false;
  } else {
    return {
      email,
      password
    };
  }
};

export const withLoginSubmit = withHandlers({
  loginSubmit: (props) => () => handleSubmitForm(props)
});
