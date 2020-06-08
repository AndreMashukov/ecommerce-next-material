import { ChangeEventType } from '../../../models';

export const onEmailChange = () => (event: ChangeEventType) => ({
  email: {
    value: event.target.value,
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