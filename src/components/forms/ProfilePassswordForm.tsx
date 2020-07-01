import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { CreatePasswordFormProps } from './models';
import { compose } from 'recompose';
import {
  withCreatePasswordState,
  withPasswordError,
  withConfirmPasswordError,
  withCreatePasswordSubmit
} from './enhancers';
import { CustomSnackBar } from '../shared';
import { Typography } from '@material-ui/core';

// tslint:disable-next-line: no-any
type WithComposeProps = CreatePasswordFormProps & any;

const ProfilePasswordForm = (props: WithComposeProps) => {
  const {
    password,
    passwordError,
    onPasswordChange,
    confirmPassword,
    confirmPasswordError,
    onConfirmPasswordChange,
    passwordDirty,
    confirmPasswordDirty,
    clearPassword,
    clearConfirmPassword,
    createPasswordSubmit
  } = props;

  const makeDirtyIfEmpty = () => {
    password.value === '' && passwordDirty();
    confirmPassword.value === '' && confirmPasswordDirty();
  };

  const textVariant = 'body2';
  const fieldWidth = '220px';
  const formSpacing = 5;
  const rowDistance = '180px';
  const labelColor = 'textPrimary';

  const [snackState, setSnackState] = useState({
    open: false,
    success: false,
    text: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleProfileNamesSubmit = async () => {
    setSubmitted(true);
    const passw = createPasswordSubmit();
    if (passw) {
      // tslint:disable-next-line: no-console
      console.log(passw);
      clearPassword();
      clearConfirmPassword();
    } else {
      makeDirtyIfEmpty();
      setSnackState({
        open: true,
        success: false,
        text: 'Обратите внимание на правила запонения полей'
      });
    }
  };

  return (
    <div>
      <Paper elevation={0} style={{ padding: '35px 35px 15px 35px' }}>
        <Grid
          container
          direction="row"
          alignItems="center"
          spacing={formSpacing}
        ></Grid>
        <Grid
          container
          direction="row"
          alignItems="center"
          spacing={formSpacing}
        >
          <Grid item xs={12} sm={6} style={{ height: `${rowDistance}` }}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item>
                <Typography variant={textVariant} color={labelColor}>
                  Пароль
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="Пароль"
                  value={password.value}
                  type="password"
                  error={submitted && !!passwordError}
                  helperText={submitted && passwordError}
                  onChange={onPasswordChange}
                  margin="normal"
                  style={{ width: `${fieldWidth}` }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} style={{ height: `${rowDistance}` }}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item>
                <Typography variant={textVariant} color={labelColor}>
                  Подтверждение пароля
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="Подтверждение пароля"
                  value={confirmPassword.value}
                  error={submitted && !!confirmPasswordError}
                  type="password"
                  helperText={submitted && confirmPasswordError}
                  onChange={onConfirmPasswordChange}
                  margin="normal"
                  style={{ width: `${fieldWidth}` }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center" style={{ margin: '40px 0 10px 0' }}>
          <Button
            variant="contained"
            disableElevation
            onClick={handleProfileNamesSubmit}
          >
            СОХРАНИТЬ
          </Button>
        </Grid>
      </Paper>
      <CustomSnackBar
        {...snackState}
        handleClose={() => setSnackState({ ...snackState, open: false })}
      />
    </div>
  );
};

export const ProfilePasswordFormComposed = compose(
  withCreatePasswordState,
  withPasswordError,
  withConfirmPasswordError,
  withCreatePasswordSubmit
)(ProfilePasswordForm);
