import React from 'react';
import { compose } from 'recompose';
import { TextField, Grid } from '@material-ui/core';
import {
  withEmailError,
  withNameError,
  withTextFieldState,
  withPhoneError
} from './enhancers';
import { MakeOrderFormProps } from './models/MakeOrderForm';
import FormattedPhone from './shared/FormattedPhone';

// tslint:disable-next-line: no-any
type WithComposeProps = MakeOrderFormProps & any;

const MakeOrderForm = (props: WithComposeProps) => {
  const {
    email,
    emailError,
    onEmailchange,
    lastName,
    firstName,
    firstNameError,
    lastNameError,
    onLastNameChange,
    onFirstNameChange,
    phone,
    phoneError,
    onPhoneChange
  } = props;
  return (
    <div>
      <Grid container spacing={3} justify="center">
        <Grid item>
          <TextField
            variant="outlined"
            placeholder="Фамилия"
            value={lastName.value}
            error={!!lastNameError}
            helperText={lastNameError}
            onChange={onLastNameChange}
            margin="normal"
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            placeholder="Имя"
            value={firstName.value}
            error={!!firstNameError}
            helperText={firstNameError}
            onChange={onFirstNameChange}
            margin="normal"
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} justify="center">
        <Grid item>
          <TextField
            variant="outlined"
            placeholder="E-Mail"
            value={email.value}
            error={!!emailError}
            helperText={emailError}
            onChange={onEmailchange}
            margin="normal"
          />
        </Grid>
        <Grid item>
          <FormattedPhone
            phone={phone}
            phoneError={phoneError}
            onPhoneChange={onPhoneChange}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default compose(
  withTextFieldState,
  withEmailError,
  withPhoneError,
  withNameError
)(MakeOrderForm);
