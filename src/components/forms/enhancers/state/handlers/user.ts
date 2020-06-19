import { ChangeEventType } from '../../../models';

export const onLastNameChange = () => (event: ChangeEventType) => ({
  lastName: {
    value: event.target.value,
    isDirty: true
  }
});

export const setLastName = () => (_lastName: string) => ({
  lastName: {
    value: _lastName,
    isDirty: true
  }
});

export const setFirstName = () => (_firstName: string) => ({
  firstName: {
    value: _firstName,
    isDirty: true
  }
});

export const onFirstNameChange = () => (event: ChangeEventType) => ({
  firstName: {
    value: event.target.value,
    isDirty: true
  }
});

export const onEmailChange = () => (event: ChangeEventType) => ({
  email: {
    value: event.target.value,
    isDirty: true
  }
});

export const setEmail = () => (_email: string) => ({
  email: {
    value: _email,
    isDirty: true
  }
});

export const onPasswordChange = () => (event: ChangeEventType) => ({
  password: {
    value: event.target.value,
    isDirty: true
  }
});

export const onConfirmPasswordChange = () => (event: ChangeEventType) => ({
  confirmPassword: {
    value: event.target.value,
    isDirty: true
  }
});

export const clearPassword = () => () => ({
  password: {
    value: '',
    isDirty: false
  }
});

export const clearConfirmPassword = () => () => ({
  confirmPassword: {
    value: '',
    isDirty: false
  }
});

export const clearEmail = () => () => ({
  email: {
    value: '',
    isDirty: false
  }
});

export const emailDirty = () => () => ({
  email: {
    value: '',
    isDirty: true
  }
});

export const passwordDirty = () => () => ({
  password: {
    value: '',
    isDirty: true
  }
});

export const confirmPasswordDirty = () => () => ({
  confirmPassword: {
    value: '',
    isDirty: true
  }
});

export const onPhoneChange = () => (event: ChangeEventType) => ({
  phone: {
    value: event.target.value,
    isDirty: true
  }
});

export const firstNameDirty = () => () => ({
  firstName: {
    value: '',
    isDirty: true
  }
});

export const lastNameDirty = () => () => ({
  lastName: {
    value: '',
    isDirty: true
  }
});

export const phoneDirty = () => () => ({
  phone: {
    value: '',
    isDirty: true
  }
});