import { withHandlers } from 'recompose';
import { CreatePasswordFormProps } from '../../models';

const handleSubmitForm = ({
  password,
  passwordError,
  confirmPassword,
  confirmPasswordError
}: Partial<CreatePasswordFormProps>) => {
  if (passwordError || confirmPasswordError) {
    return false;
  } else if (!confirmPassword.isDirty) {
    return false;
  } else {
    return {
      password
    };
  }
};

export const withCreatePasswordSubmit = withHandlers({
  createPasswordSubmit: (props) => () => handleSubmitForm(props)
});
