import { ChangeEventType, TextField } from './GlobalModels';

export interface ProfileNamesFormFields {
  lastName: TextField;
  firstName: TextField;
}

export interface ProfileNamesFormHandlers {
  onLastNameChange: (event: ChangeEventType) => TextField;
  lastNameDirty: () => TextField;
  onFirstNameChange: (event: ChangeEventType) => TextField;
  firstNameDirty: () => TextField;
  lastNameError: (lastName: TextField) => boolean;
  firstNameError: (firstName: TextField) => boolean;
}

interface ProfileNamesFormSubmit {
  profileNamesSubmit: () => ProfileNamesFormFields | undefined;
}

export type ProfileNamesFormProps = ProfileNamesFormFields
  & ProfileNamesFormHandlers
  & ProfileNamesFormSubmit;
