import { withHandlers } from 'recompose';
import { LoginFormProps, Login } from '../../models';

const handleSubmitForm = ({
  password,
  email,
  emailError,
  passwordError
}: Partial<LoginFormProps>): Login | undefined => {
  if (emailError || passwordError) {
    return undefined;
  } else if (!email.isDirty && !password.isDirty) {
    return undefined;
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
