import { withHandlers } from 'recompose';
import { ProfileFormProps, ProfileFormFields } from '../../models';

const handleSubmitForm = ({
  lastName,
  firstName,
  password,
  confirmPassword,
  lastNameError,
  firstNameError,
  passwordError,
  confirmPasswordError
}: Partial<ProfileFormProps>): Partial<ProfileFormFields> | undefined => {
  if (
    lastNameError
    || firstNameError
    || passwordError
    || confirmPasswordError
    ) {
    return undefined;
  } else if (
    !lastName.isDirty
    || !firstName.isDirty
    || !password.isDirty
    || !confirmPassword.isDirty
    ) {
    return undefined;
  } else {
    return {
      lastName,
      firstName,
      password
    };
  }
};

export const withProfileSubmit = withHandlers({
  profileSubmit: (props) => () => handleSubmitForm(props)
});
