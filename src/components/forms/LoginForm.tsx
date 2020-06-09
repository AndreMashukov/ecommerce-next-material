import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { LoginFormProps } from './models';
import { compose } from 'recompose';
import {
  withLoginState,
  withEmailError,
  withPasswordError,
  withLoginSubmit
} from './enhancers';

// tslint:disable-next-line: no-any
type WithComposeProps = LoginFormProps & any;

const LoginForm = (props: WithComposeProps) => {
  const {
    email,
    emailError,
    onEmailChange,
    emailDirty,
    clearEmail,
    password,
    passwordError,
    onPasswordChange,
    passwordDirty,
    clearPassword,
    loginSubmit
  } = props;

  const makeDirtyIfEmpty = () => {
    email.value === '' && emailDirty();
    password.value === '' && passwordDirty();
  };

  const clearFields = () => {
    clearEmail();
    clearPassword();
  };

  const handleLoginSubmit = () => {
    const login = loginSubmit();
    if (login) {
      clearFields();
      // tslint:disable-next-line: no-console
      console.log(login);
    } else {
      makeDirtyIfEmpty();
    }
  };

  return (
    <div>
      <Paper elevation={0} style={{ padding: '15px 35px 15px 35px' }}>
        <Grid
          container
          direction="column"
          spacing={3}
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <TextField
              style={{width: '300px'}}
              variant="outlined"
              placeholder="E-Mail"
              value={email.value}
              error={!!emailError}
              helperText={emailError}
              onChange={onEmailChange}
              margin="normal"
            />
          </Grid>
          <Grid item>
            <TextField
              style={{width: '300px'}}
              variant="outlined"
              placeholder="Пароль"
              value={password.value}
              error={!!passwordError}
              helperText={passwordError}
              type="password"
              onChange={onPasswordChange}
              margin="normal"
            />
          </Grid>
          <Grid item>
            <Grid container justify="center">
              <Button variant="contained" disableElevation onClick={handleLoginSubmit}>
                ВОЙТИ
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export const LoginFormComposed = compose(
  withLoginState,
  withEmailError,
  withPasswordError,
  withLoginSubmit
)(LoginForm);
