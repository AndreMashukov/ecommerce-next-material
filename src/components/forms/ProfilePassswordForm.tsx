import React, { useState, useContext, useEffect } from 'react';
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
import { Subscription, from } from 'rxjs';
import { changeUserPassword } from '../../services/ProfileApi';
import SessionContext from '../../store/SessionContext/SessionContext';

// tslint:disable-next-line: no-any
type WithComposeProps = CreatePasswordFormProps & any;

const ProfilePasswordForm: React.FC<WithComposeProps> = (props: WithComposeProps) => {
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

  const subscriptions = new Subscription();
  const { getUser } = useContext(SessionContext);

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
      clearPassword();
      clearConfirmPassword();
      subscriptions.add(
        from(changeUserPassword(getUser().id, passw.password.value)).subscribe(
          () => {
            setSnackState({
              open: true,
              success: true,
              text: 'Успешно обновлено'
            });
          }
        )
      );
    } else {
      makeDirtyIfEmpty();
      setSnackState({
        open: true,
        success: false,
        text: 'Обратите внимание на правила запонения полей'
      });
    }
  };

  useEffect(() => {
    return () => {
      subscriptions.unsubscribe();
    };
  }, []);

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
