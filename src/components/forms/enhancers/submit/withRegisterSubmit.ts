import { withHandlers } from 'recompose';
import { RegisterFormProps, RegisterFormFields } from '../../models';

const handleSubmitForm = ({
  email,
  phone,
  lastName,
  firstName,
  password,
  confirmPassword,
  emailError,
  phoneError,
  lastNameError,
  firstNameError,
  passwordError,
  confirmPasswordError,
}: Partial<RegisterFormProps>): Partial<RegisterFormFields> | undefined => {
  if (
    emailError
    || phoneError
    || lastNameError
    || firstNameError
    || passwordError
    || confirmPasswordError
    ) {
    return undefined;
  } else if (
    !email.isDirty
    || !phone.isDirty
    || !lastName.isDirty
    || !firstName.isDirty
    || !password.isDirty
    || !confirmPassword.isDirty
    ) {
    return undefined;
  } else {
    return {
      email,
      phone,
      lastName,
      firstName,
      password
    };
  }
};

export const withRegisterSubmit = withHandlers({
  registerSubmit: (props) => () => handleSubmitForm(props)
});
