import { withHandlers } from 'recompose';
import { LoginFormProps } from '../../models';

const handleSubmitForm = ({
  password,
  email,
  emailError,
  passwordError
}: Partial<LoginFormProps>) => {
  if (emailError || passwordError) {
    return false;
  } else if (!email.isDirty && !password.isDirty) {
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
