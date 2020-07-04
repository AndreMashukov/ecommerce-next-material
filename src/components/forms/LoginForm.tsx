import React, { useState, useContext } from 'react';
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
import { loginUser } from '../../services/UserApi';
import { CustomSnackBar } from '../shared';
import SessionContext from '../../store/SessionContext/SessionContext';
import { User } from '../../models';
import { Typography } from '@material-ui/core';
import Link from 'next/link';
import MatLink from '@material-ui/core/Link';

// tslint:disable-next-line: no-any
type WithComposeProps = LoginFormProps & any;

const LoginForm: React.FC<WithComposeProps> = (props: WithComposeProps) => {
  const {
    email,
    onEmailChange,
    password,
    onPasswordChange,
    clearPassword,
    loginSubmit
  } = props;

  const textVariant = 'body2';
  const labelColor = 'textPrimary';

  const { setUser } = useContext(SessionContext);

  const [snackState, setSnackState] = useState({
    open: false,
    success: false,
    text: ''
  });

  const handleLoginSubmit = async () => {
    const login = loginSubmit();
    if (login) {
      clearPassword();
      const response = await loginUser({
        email: email.value,
        password: password.value
      });
      if (response.name) {
        setSnackState({
          open: true,
          success: false,
          text: 'Неверный E-Mail/пароль'
        });
      } else {
        setUser(response as User);
      }
    } else {
      setSnackState({
        open: true,
        success: false,
        text: 'Неверный E-Mail/пароль'
      });
      clearPassword();
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
            <Typography variant={textVariant} color={labelColor}>
              E-Mail
            </Typography>
            <TextField
              style={{ width: '300px' }}
              variant="outlined"
              placeholder="Ваш E-Mail"
              value={email.value}
              onChange={onEmailChange}
              margin="normal"
            />
          </Grid>
          <Grid item>
            <Typography variant={textVariant} color={labelColor}>
              Пароль
            </Typography>
            <TextField
              style={{ width: '300px' }}
              variant="outlined"
              placeholder="Ваш Пароль"
              value={password.value}
              type="password"
              onChange={onPasswordChange}
              margin="normal"
            />
          </Grid>
          <Grid item>
            <Grid container justify="center">
              <Button
                variant="contained"
                disableElevation
                onClick={handleLoginSubmit}
              >
                ВОЙТИ
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <Typography variant={textVariant}>Забыли пароль?</Typography>
              </Grid>
              <Grid item>
                <Typography variant={textVariant}>
                  <Link href="/register" prefetch={false}>
                    <MatLink>Зарегистрироваться</MatLink>
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <CustomSnackBar
        {...snackState}
        handleClose={() => setSnackState({ ...snackState, open: false })}
      />
    </div>
  );
};

export const LoginFormComposed = compose(
  withLoginState,
  withEmailError,
  withPasswordError,
  withLoginSubmit
)(LoginForm);
