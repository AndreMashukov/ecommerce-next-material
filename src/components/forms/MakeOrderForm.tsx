import React from 'react';
import { compose } from 'recompose';
import { TextField, Grid } from '@material-ui/core';
import withEmailError from './enhancers/withEmailError';
import withTextFieldState from './enhancers/withTextFieldState';
import { MakeOrderFormProps } from './models/MakeOrderForm';

// tslint:disable-next-line: no-any
type WithComposeProps = MakeOrderFormProps & any;

const MakeOrderForm = (props: WithComposeProps) => {
  const { email, emailError, onEmailchange } = props;
  return (
    <div>
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item xs={6}>
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
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            placeholder="Контактный телефон"
            value={email.value}
            error={!!emailError}
            helperText={emailError}
            onChange={onEmailchange}
            margin="normal"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default compose(withTextFieldState, withEmailError)(MakeOrderForm);
