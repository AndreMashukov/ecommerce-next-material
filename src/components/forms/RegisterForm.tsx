import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { RegisterFormProps } from './models';
import { compose } from 'recompose';
import {
  withRegisterState,
  withEmailError,
  withPhoneError,
  withPasswordError,
  withConfirmPasswordError,
  withNameError,
  withRegisterSubmit
} from './enhancers';
// import { loginUser } from '../../services/UserApi';
import { CustomSnackBar } from '../shared';
// import SessionContext from '../../store/SessionContext/SessionContext';
// import { User } from '../../models';
import { Typography } from '@material-ui/core';
import FormattedPhone from './shared/FormattedPhone';

// tslint:disable-next-line: no-any
type WithComposeProps = RegisterFormProps & any;

const RegisterForm = (props: WithComposeProps) => {
  const {
    email,
    emailError,
    onEmailChange,
    emailDirty,
    phone,
    phoneError,
    onPhoneChange,
    phoneDirty,
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
    // clearConfirmPassword,
    registerSubmit,
    submitState
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

  // const [ submitted, setSubmitted ] = useState(false);

  const makeDirtyIfEmpty = () => {
    email.value === '' && emailDirty();
    phone.value === '' && phoneDirty();
    lastName.value === '' && lastNameDirty();
    firstName.value === '' && firstNameDirty();
    password.value === '' && passwordDirty();
    confirmPassword.value === '' && confirmPasswordDirty();
  };

  const handleRegisterSubmit = async () => {
    // setSubmitted(true);
    const registerFields = registerSubmit();
    if (registerFields) {
      clearPassword();
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
          <Grid item xs={12} sm={6} style={{ height: `${rowDistance}` }}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item>
                <Typography variant={textVariant} color={labelColor}>
                  E-Mail
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="Ваш E-Mail"
                  value={email.value}
                  error={submitState.submitted && !!emailError}
                  helperText={submitState.submitted && emailError}
                  onChange={onEmailChange}
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
                <FormattedPhone
                  phone={phone}
                  phoneError={submitState.submitted && phoneError}
                  onPhoneChange={onPhoneChange}
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
                  Фамилия
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="Фамилия"
                  value={lastName.value}
                  error={submitState.submitted && !!lastNameError}
                  helperText={submitState.submitted && lastNameError}
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
                  error={submitState.submitted && !!firstNameError}
                  helperText={submitState.submitted && firstNameError}
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
                  error={submitState.submitted && !!passwordError}
                  helperText={submitState.submitted && passwordError}
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
                  error={submitState.submitted && !!confirmPasswordError}
                  helperText={submitState.submitted && confirmPasswordError}
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
            onClick={handleRegisterSubmit}
          >
            ЗАРЕГИСТРИРОВАТЬСЯ
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

export const RegisterFormComposed = compose(
  withRegisterState,
  withEmailError,
  withPasswordError,
  withPhoneError,
  withNameError,
  withConfirmPasswordError,
  withRegisterSubmit
)(RegisterForm);
