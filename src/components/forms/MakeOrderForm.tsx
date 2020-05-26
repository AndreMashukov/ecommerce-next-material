import React from 'react';
import { compose } from 'recompose';
import { TextField, Grid } from '@material-ui/core';
import withEmailError from './enhancers/withEmailError';
import withTextFieldState from './enhancers/withTextFieldState';
import { MakeOrderFormProps } from './models/MakeOrderForm';
import withPhoneError from './enhancers/withPhoneError';

// tslint:disable-next-line: no-any
type WithComposeProps = MakeOrderFormProps & any;

const MakeOrderForm = (props: WithComposeProps) => {
  const {
    email,
    emailError,
    onEmailchange,
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
            placeholder="E-Mail"
            value={email.value}
            error={!!emailError}
            helperText={emailError}
            onChange={onEmailchange}
            margin="normal"
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            placeholder="Контактный телефон"
            value={phone.value}
            error={!!phoneError}
            helperText={phoneError}
            onChange={onPhoneChange}
            margin="normal"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default compose(
  withTextFieldState,
  withEmailError,
  withPhoneError
)(MakeOrderForm);
