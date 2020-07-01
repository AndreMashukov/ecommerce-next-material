import { withHandlers } from 'recompose';
import { ProfileNamesFormProps, ProfileNamesFormFields } from '../../models';

const handleSubmitForm = ({
  lastName,
  firstName,
  lastNameError,
  firstNameError
}: Partial<ProfileNamesFormProps>): Partial<ProfileNamesFormFields> | undefined => {
  if (
    lastNameError
    || firstNameError
    ) {
    return undefined;
  } else if (
    !lastName.isDirty
    || !firstName.isDirty
    ) {
    return undefined;
  } else {
    return {
      lastName,
      firstName
    };
  }
};

export const withProfileNamesSubmit = withHandlers({
  profileNamesSubmit: (props) => () => handleSubmitForm(props)
});
