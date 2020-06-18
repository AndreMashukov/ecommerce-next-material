import React, { useContext, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import { MakeOrderFormProps } from './models/MakeOrderForm';
import FormattedPhone from './shared/FormattedPhone';
import theme from '../../theme/theme';
import { makeStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import SessionContext from '../../store/SessionContext/SessionContext';
import { DeliveryOptions, PaySystemOptions } from './shared';

const useStyles = makeStyles({
  border: {
    paddingLeft: '10px',
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    marginBottom: '20px'
  }
});

type WithComposeProps = MakeOrderFormProps;

export const MakeOrderForm = (props: WithComposeProps) => {
  const classes = useStyles();
  const {
    email,
    emailError,
    setEmail,
    onEmailChange,
    lastName,
    setLastName,
    firstName,
    setFirstName,
    firstNameError,
    lastNameError,
    onLastNameChange,
    onFirstNameChange,
    phone,
    phoneError,
    onPhoneChange,
    region,
    onRegionChange,
    city,
    cityError,
    onCityChange,
    address,
    onAddressChange,
    addressError,
    comment,
    commentError,
    onCommentChange,
    deliveryId,
    setDeliveryId,
    onDeliveryChange,
    setDeliveryPrice,
    paySystemId,
    setPaySystemId,
    onPaySystemChange
  } = props;
  const { getUser } = useContext(SessionContext);
  const user = getUser();

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setLastName(user.lastName);
      setFirstName(user.firstName);
    }
  }, [getUser()]);

  return (
    <div>
      <Grid container spacing={3} justify="center">
        <Grid item>
          <TextField
            variant="outlined"
            placeholder="Фамилия"
            value={lastName.value}
            disabled={user ? true : false}
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
            disabled={user ? true : false}
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
            disabled={user ? true : false}
            error={!!emailError}
            helperText={emailError}
            onChange={onEmailChange}
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
        <Grid
          container
          direction="column"
          spacing={2}
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <FormControl variant="outlined">
              <InputLabel id="region-select-outlined-label">
                Регион доставки
              </InputLabel>
              <Select
                style={{ width: '200px' }}
                value={region}
                onChange={onRegionChange}
                labelId="region-select-outlined-label"
                id="region-select-outlined"
                label="Регион доставки"
              >
                <MenuItem value={10}>Москва</MenuItem>
                <MenuItem value={20}>Московская область</MenuItem>
                <MenuItem value={30}>По России</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {region > 10 && (
            <Grid item>
              <TextField
                style={{ width: '300px' }}
                variant="outlined"
                value={city.value}
                onChange={onCityChange}
                error={!!cityError}
                helperText={cityError}
                placeholder="Название населенного пункта"
                margin="normal"
              />
            </Grid>
          )}
          <Grid item>
            <TextField
              style={{ width: '300px' }}
              variant="outlined"
              value={address.value}
              onChange={onAddressChange}
              error={!!addressError}
              helperText={addressError}
              multiline
              rows={4}
              placeholder="Адрес доставки"
              margin="normal"
            />
          </Grid>
        </Grid>
        <Grid container className={classes.border}>
          <Typography variant="caption" style={{ fontWeight: 'bold' }}>
            Ваш комментарий к доставке
          </Typography>
        </Grid>
        <Grid container justify="center">
          <Grid item>
            <TextField
              style={{ width: '300px' }}
              variant="outlined"
              value={comment.value}
              onChange={onCommentChange}
              error={!!commentError}
              helperText={commentError}
              multiline
              rows={4}
              placeholder="Комментарий"
              margin="normal"
            />
          </Grid>
        </Grid>
        <Grid container className={classes.border}>
          <Typography variant="caption" style={{ fontWeight: 'bold' }}>
            Служба доставки
          </Typography>
        </Grid>
        <DeliveryOptions
          region={region}
          deliveryId={deliveryId}
          setDeliveryId={setDeliveryId}
          setDeliveryPrice={setDeliveryPrice}
          onDeliveryChange={onDeliveryChange}
        />
        <Grid container className={classes.border}>
          <Typography variant="caption" style={{ fontWeight: 'bold' }}>
            Платежная система
          </Typography>
        </Grid>
        <PaySystemOptions
          region={region}
          paySystemId={paySystemId}
          setPaySystemId={setPaySystemId}
          onPaySystemChange={onPaySystemChange}
        />
      </Grid>
    </div>
  );
};
