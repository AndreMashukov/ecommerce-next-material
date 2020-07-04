import React, { useState, useEffect, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { ProfileFormProps } from './models';
import { compose } from 'recompose';
import {
  withProfileNamesState,
  withNameError,
  withProfileNamesSubmit
} from './enhancers';
import { CustomSnackBar } from '../shared';
import { Typography } from '@material-ui/core';
import SessionContext from '../../store/SessionContext/SessionContext';
import { changeUserName } from '../../services/ProfileApi';
import { Subscription, from } from 'rxjs';

// tslint:disable-next-line: no-any
type WithComposeProps = ProfileFormProps & any;

const ProfileNamesForm: React.FC<WithComposeProps> = (props: WithComposeProps) => {
  const {
    firstName,
    firstNameError,
    setFirstName,
    onFirstNameChange,
    lastName,
    lastNameError,
    onLastNameChange,
    setLastName,
    profileNamesSubmit
  } = props;

  const textVariant = 'body2';
  const fieldWidth = '220px';
  const formSpacing = 5;
  const rowDistance = '180px';
  const labelColor = 'textPrimary';

  const { getUser, updateUser } = useContext(SessionContext);
  const subscriptions = new Subscription();
  const [snackState, setSnackState] = useState({
    open: false,
    success: false,
    text: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (getUser()) {
      setLastName(getUser().lastName);
      setFirstName(getUser().firstName);
    }
  }, [getUser()]);

  const handleProfileNamesSubmit = async () => {
    setSubmitted(true);
    const fields = profileNamesSubmit();
    if (fields) {
      subscriptions.add(
        from(
          changeUserName(
            getUser().id,
            fields.firstName.value,
            fields.lastName.value
          )
        ).subscribe((user) => {
          updateUser(user);
          setSnackState({
            open: true,
            success: true,
            text: 'Успешно обновлено'
          });
        })
      );
    } else {
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

export const ProfileNamesFormComposed = compose(
  withProfileNamesState,
  withNameError,
  withProfileNamesSubmit
)(ProfileNamesForm);
