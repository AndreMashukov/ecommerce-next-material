import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import { CreatePasswordFormProps } from './models';

// tslint:disable-next-line: no-any
type WithComposeProps = CreatePasswordFormProps & any;

export const CreatePasswordrForm: React.FC<WithComposeProps> = (props: WithComposeProps) => {
  const {
    password,
    passwordError,
    onPasswordChange,
    confirmPassword,
    confirmPasswordError,
    onConfirmPasswordChange
  } = props;

  return (
    <div>
      <Grid container direction="column" spacing={3} justify="center">
        <TextField
          variant="outlined"
          placeholder="Пароль"
          value={password.value}
          type="password"
          error={!!passwordError}
          helperText={passwordError}
          onChange={onPasswordChange}
          margin="normal"
        />
        <TextField
          variant="outlined"
          placeholder="Подтверждение пароля"
          value={confirmPassword.value}
          error={!!confirmPasswordError}
          type="password"
          helperText={confirmPasswordError}
          onChange={onConfirmPasswordChange}
          margin="normal"
        />
      </Grid>
    </div>
  );
};
