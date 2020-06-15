import React, { useContext, useEffect, useState } from 'react';
import { TextField, Grid, Typography } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import { MakeOrderFormProps } from './models/MakeOrderForm';
import FormattedPhone from './shared/FormattedPhone';
import theme from '../../theme/theme';
import { makeStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import SessionContext from '../../store/SessionContext/SessionContext';
import { getDeliveryOptions } from '../../services/DeliveryApi';
import { getCartTotal } from '../../utils/Cart';
import CartContext from '../../store/CartContext/CartContext';
import { Delivery } from '../../models';

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
    onCityChange,
    address,
    onAddressChange,
    addressError,
    setDeliveryId
  } = props;
  const { getUser } = useContext(SessionContext);
  const { getItems } = useContext(CartContext);
  const user = getUser();
  const [deliveryOptions, setDeliveryOptions] = useState([]);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setLastName(user.lastName);
      setFirstName(user.firstName);
    }
  }, [getUser()]);

  useEffect(() => {
    const getDelivery = async () => {
      const deliveries: Delivery[] = await getDeliveryOptions(
        region.value,
        getCartTotal(getItems())
      );
      setDeliveryOptions(deliveries);
      setDeliveryOptionsValue(deliveries[0].delivery_id);
      setDeliveryId(deliveries[0].delivery_id);
    };
    getDelivery();
  }, [region.value, getItems()]);

  const [deliveryOptionsValue, setDeliveryOptionsValue] = useState(null);

  const handleChangeDelivery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryOptionsValue((event.target as HTMLInputElement).value);
    // tslint:disable-next-line: no-console
    console.log(deliveryOptionsValue);
    setDeliveryId(deliveryOptionsValue);
  };

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
              <InputLabel id="demo-simple-select-outlined-label">
                Регион доставки
              </InputLabel>
              <Select
                style={{ width: '200px' }}
                value={region.value}
                onChange={onRegionChange}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Регион доставки"
              >
                <MenuItem value={10}>Москва</MenuItem>
                <MenuItem value={20}>Московская область</MenuItem>
                <MenuItem value={30}>По России</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {region.value > 10 && (
            <Grid item>
              <TextField
                style={{ width: '300px' }}
                variant="outlined"
                value={city.value}
                onChange={onCityChange}
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
              placeholder="Адрес доставки"
              margin="normal"
            />
          </Grid>
        </Grid>
        <Grid container className={classes.border}>
          <Typography variant="caption" style={{ fontWeight: 'bold' }}>
            Служба доставки
          </Typography>
        </Grid>
        <Grid container direction="column" justify="space-around" spacing={1}>
          {deliveryOptions.map((delivery) => (
            <Grid item>
              <Paper style={{ padding: '20px' }}>
                <Grid
                  container
                  justify="space-between"
                  alignItems="center"
                  spacing={4}
                  id={`delivery_${delivery.delivery_id}`}
                >
                  <Grid item xs={1}>
                    <Radio
                      checked={deliveryOptionsValue === delivery.delivery_id}
                      onChange={handleChangeDelivery}
                      value={delivery.delivery_id}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <div>{delivery.delivery_name}</div>
                    <div>{delivery.delivery_description}</div>
                  </Grid>
                  <Grid item>
                    <div>Срок доставки</div>
                    <div>
                      {delivery.delivery_period_from} -{' '}
                      {delivery.delivery_period_to}{' '}
                      {delivery.delivery_period_to > 5 ? 'дней' : 'дня'}
                    </div>
                  </Grid>
                  <Grid item>
                    <div>Стоимость доставки</div>
                    <div>{parseInt(delivery.delivery_price.toString(), 0)} ₽</div>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};
