import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { ProfileFormProps } from './models';
import { compose } from 'recompose';
import {
  withProfileState,
  withPasswordError,
  withConfirmPasswordError,
  withNameError,
  withProfileSubmit
} from './enhancers';
import { CustomSnackBar } from '../shared';
import { Typography } from '@material-ui/core';

// tslint:disable-next-line: no-any
type WithComposeProps = ProfileFormProps & any;

const ProfileForm = (props: WithComposeProps) => {
  const {
    firstName,
    firstNameError,
    firstNameDirty,
    onFirstNameChange,
    lastName,
    lastNameError,
    lastNameDirty,
    onLastNameChange,
    password,
    passwordError,
    onPasswordChange,
    passwordDirty,
    clearPassword,
    confirmPassword,
    confirmPasswordError,
    onConfirmPasswordChange,
    confirmPasswordDirty,
    clearConfirmPassword,
    profileSubmit
  } = props;

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

  const makeDirtyIfEmpty = () => {
    lastName.value === '' && lastNameDirty();
    firstName.value === '' && firstNameDirty();
    password.value === '' && passwordDirty();
    confirmPassword.value === '' && confirmPasswordDirty();
  };

  const handleProfileSubmit = async () => {
    setSubmitted(true);
    const profileFields = profileSubmit();
    if (profileFields) {
      clearPassword();
      clearConfirmPassword();
    } else {
      makeDirtyIfEmpty();
      setSnackState({
        open: true,
        success: false,
        text: 'Обратите внимание на обязательные для заполнения поля'
      });
    }
  };

  return (
    <div>
      <Paper elevation={0} style={{ padding: '15px 35px 15px 35px' }}>
        <Grid
          container
          direction="row"
          alignItems="center"
          spacing={formSpacing}
        >
        </Grid>
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
                  Фамилия
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="Фамилия"
                  value={lastName.value}
                  error={submitted && !!lastNameError}
                  helperText={submitted && lastNameError}
                  onChange={onLastNameChange}
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
                  Имя
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="Имя"
                  value={firstName.value}
                  error={submitted && !!firstNameError}
                  helperText={submitted && firstNameError}
                  onChange={onFirstNameChange}
                  margin="normal"
                  style={{ width: `${fieldWidth}` }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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
                  placeholder="Ваш Пароль"
                  value={password.value}
                  error={submitted && !!passwordError}
                  helperText={submitted && passwordError}
                  type="password"
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
                  helperText={submitted && confirmPasswordError}
                  type="password"
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
            onClick={handleProfileSubmit}
          >
            СОХРАНИТЬ НАСТРОЙКИ
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

export const ProfileFormComposed = compose(
  withProfileState,
  withPasswordError,
  withNameError,
  withConfirmPasswordError,
  withProfileSubmit
)(ProfileForm);
