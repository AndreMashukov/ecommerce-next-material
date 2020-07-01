import {
  ProfileNamesFormFields,
  ProfileNamesFormHandlers
} from './ProfileNamesForm';
import { PasswordFormFields, PasswordFormHandlers } from './CreatePassword';

export type ProfileFormFields = ProfileNamesFormFields & PasswordFormFields;
export type ProfileFormHandlers = ProfileNamesFormHandlers &
  PasswordFormHandlers;

interface ProfileFormSubmit {
  profileSubmit: () => ProfileFormFields | undefined;
}

export type ProfileFormProps = ProfileFormFields &
  ProfileFormHandlers &
  ProfileFormSubmit;
