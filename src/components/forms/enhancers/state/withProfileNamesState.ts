import { withStateHandlers } from 'recompose';

import {
  onLastNameChange,
  lastNameDirty,
  setLastName,
  onFirstNameChange,
  firstNameDirty,
  setFirstName
} from './handlers';

const initialState = {
  lastName: { value: '', isDirty: false},
  firstName: { value: '', isDirty: false}
};

export const withProfileNamesState = withStateHandlers(initialState, {
  onLastNameChange,
  lastNameDirty,
  setLastName,
  onFirstNameChange,
  firstNameDirty,
  setFirstName
});
