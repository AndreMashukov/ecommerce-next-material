import React from 'react';
import { TextField, Grid, Typography } from '@material-ui/core';
import { MakeOrderFormProps } from './models/MakeOrderForm';
import FormattedPhone from './shared/FormattedPhone';
import theme from '../../theme/theme';
import { makeStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles({
  border: {
    paddingLeft: '10px',
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    marginBottom: '20px'
  }
});

// tslint:disable-next-line: no-any
type WithComposeProps = MakeOrderFormProps & any;

export const MakeOrderForm = (props: WithComposeProps) => {
  const classes = useStyles();
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
        <Grid container className={classes.border}>
          <Typography variant="caption" style={{ fontWeight: 'bold' }}>
            Местоположение доставки
          </Typography>
        </Grid>
        <Grid container direction="column" spacing={2} justify="center" alignItems="center">
          <Grid item>
            <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                Регион доставки
              </InputLabel>
              <Select
                style={{width: '200px'}}
                defaultValue={10}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                // value={age}
                // onChange={handleChange}
                label="Регион доставки"
              >
                <MenuItem value={10}>Москва</MenuItem>
                <MenuItem value={20}>Московская область</MenuItem>
                <MenuItem value={30}>По России</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              style={{width: '300px'}}
              variant="outlined"
              placeholder="Название населенного пункта"
              margin="normal"
            />
        </Grid>
        </Grid>
        <Grid container className={classes.border}>
          <Typography variant="caption" style={{ fontWeight: 'bold' }}>
            Адрес доставки
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
