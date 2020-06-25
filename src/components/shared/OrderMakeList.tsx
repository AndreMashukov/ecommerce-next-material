import React, { useContext, useState, useEffect } from 'react';
import CartContext from '../../store/CartContext/CartContext';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import theme from '../../theme/theme';
import { CartItem } from '../../models';
import clsx from 'clsx';
import { getCartTotal } from '../../utils/Cart';
import { MakeOrderForm } from '../forms';
import { compose } from 'recompose';
import {
  withEmailError,
  withNameError,
  withMakeOrderdState,
  withPhoneError,
  withCityError,
  withAddressError,
  withCommentError,
  withMakeOrderSubmit,
  withCreatePasswordState,
  withPasswordError,
  withConfirmPasswordError,
  withCreatePasswordSubmit
} from '../forms/enhancers';
import { MakeOrderFormProps, CreatePasswordFormProps } from '../forms/models';
import CreatePasswordDialog from './CreatePasswordDialog';
import { checkUserExists, createNewUser } from '../../services/UserApi';
import { postOrder } from '../../services/OrderApi';
import { User } from '../../models/User';
import SessionContext from '../../store/SessionContext/SessionContext';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import { CustomSnackBar } from './CustomSnackBar';
import { Subscription, from } from 'rxjs';
import { tap } from 'rxjs/operators';

// tslint:disable-next-line: no-any
type WithComposeProps = MakeOrderFormProps & CreatePasswordFormProps & any;

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.primary.main
  },
  grid: {
    padding: '60px 70px 30px 70px',
    backgroundColor: theme.palette.primary.main
  },
  paper: {
    padding: '20px'
  },
  border: {
    borderTop: `1px solid ${theme.palette.primary.main}`
  }
});

const OrderMakeList: React.FC<WithComposeProps> = (props: WithComposeProps) => {
  const { getSessionId, setUser, getUser } = useContext(SessionContext);
  const { getItems } = useContext(CartContext);
  const router = useRouter();
  const subscriptions = new Subscription();
  const [newOrder, setNewOrder] = useState(null);

  useEffect(() => {
    if (newOrder) {
      if (process.browser) {
        destroyCookie(null, 'sessionId', {
          path: '/'
        });
        router.push(`/personal/order/${newOrder.id}`);
      }
      setSnackState({
        open: true,
        success: true,
        text: 'Ваш заказ успешно создан'
      });
    }

    return () => {
      subscriptions.unsubscribe();
    };
  }, [newOrder]);

  const [submitted, setSubmitted] = useState(false);
  const [passwDlgOpen, setPasswDlgOpen] = useState(false);
  const [snackState, setSnackState] = useState({
    open: false,
    success: false,
    text: ''
  });

  // TODO: Implement corresponding types
  const {
    makeOrderSubmit,
    firstName,
    lastName,
    email,
    phone,
    firstNameDirty,
    lastNameDirty,
    emailDirty,
    phoneDirty,
    region,
    city,
    cityDirty,
    address,
    addressDirty,
    comment,
    deliveryId,
    deliveryPrice,
    paySystemId
  } = props;

  const makeDirtyIfEmpty = () => {
    lastName.value === '' && lastNameDirty();
    firstName.value === '' && firstNameDirty();
    email.value === '' && emailDirty();
    phone.value === '' && phoneDirty();
    address.value === '' && addressDirty();
    city.value === '' && cityDirty();
  };

  const classes = useStyles();
  const listVariant = 'h6';

  const createNewOrder = (user: User) => {
    const postOrderObservable = from(
      postOrder({
        userId: user.id,
        sessionId: getSessionId(),
        deliveryId,
        paySystemId,
        price: getCartTotal(getItems()),
        comment: comment.value,
        props: {
          region,
          city: city.value,
          phone: phone.value,
          address: address.value
        }
      })
    );
    subscriptions.add(
      postOrderObservable
        .pipe(
          tap((resp) => {
            setNewOrder(resp);
          })
        )
        .subscribe()
    );
  };

  const handleOrderMake = async () => {
    setSubmitted(true);
    const orderData = makeOrderSubmit();
    if (orderData) {
      if (!getUser()) {
        const resp = await checkUserExists(email.value);
        if (!resp) {
          setPasswDlgOpen(true);
        } else {
          setSnackState({
            open: true,
            success: false,
            text: 'Пользователь с таким E-Mail уже существует'
          });
        }
      } else {
        createNewOrder(getUser());
      }
    } else {
      makeDirtyIfEmpty();
      setSnackState({
        open: true,
        success: false,
        text: 'Обратите внимание на обязательные для заполнения поля'
      });
    }
  };

  const handlePasswordSuccess = async (passw: string) => {
    const user: User = await createNewUser({
      email: email.value,
      phone: phone.value,
      password: passw,
      lastName: lastName.value,
      firstName: firstName.value
    });
    if (user.token) {
      setUser(user);
      createNewOrder(user);
    }
  };

  return (
    <>
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid item className={classes.grid} xs={10}>
            <Paper className={classes.paper}>
              {getItems().map((item, index) => (
                <div
                  key={`OrderMakeList_${item.productId}`}
                  className={clsx(index !== 0 && classes.border)}
                >
                  <OrderMakeItem {...item} />
                </div>
              ))}
              <div>
                <Typography variant="caption">
                  Пожалуйста, внимательно проверяйте Ваши персональные данные
                  при регистрации и оформлении заказа. Неправильно указанный
                  номер телефона, неточный или неполный адрес могут привести к
                  дополнительной задержке.
                </Typography>
              </div>
              <div>
                <MakeOrderForm {...props} submitted={submitted} />
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Grid
          container
          justify="center"
          style={{ padding: '20px' }}
          direction="row"
          alignItems="flex-start"
        >
          <Grid xs={12} sm={6} md={4} item>
            <Grid container justify="space-between">
              <Typography variant={listVariant} color="textPrimary">
                Стоимость товаров
              </Typography>
              <Typography variant={listVariant} color="textPrimary">
                {getCartTotal(getItems())} ₽
              </Typography>
            </Grid>
            <Grid container justify="space-between">
              <Typography variant={listVariant} color="textPrimary">
                Доставка
              </Typography>
              <Typography variant={listVariant} color="textPrimary">
                {parseInt(deliveryPrice, 0)} ₽
              </Typography>
            </Grid>
            <Grid container justify="space-between">
              <Typography
                variant={listVariant}
                style={{ fontWeight: 'bolder' }}
                color="textPrimary"
              >
                К оплате
              </Typography>
              <Typography
                variant={listVariant}
                style={{ fontWeight: 'bolder' }}
                color="textPrimary"
              >
                {getCartTotal(getItems()) + parseInt(deliveryPrice, 0)} ₽
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center" style={{ padding: '10px' }}>
          <Button
            variant="outlined"
            style={{ marginBottom: '15px' }}
            onClick={handleOrderMake}
          >
            ОФОРМИТЬ
          </Button>
        </Grid>
      </div>
      <CreatePasswordDialog
        open={passwDlgOpen}
        setOpen={setPasswDlgOpen}
        {...props}
        handlePasswordSuccess={handlePasswordSuccess}
      />
      <CustomSnackBar
        {...snackState}
        handleClose={() => setSnackState({ ...snackState, open: false })}
      />
    </>
  );
};

const OrderMakeItem = (item: CartItem) => {
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      style={{ padding: '20px 0 20px 0' }}
    >
      <Grid item xs={8}>
        <Typography>{item.name}</Typography>
        <Typography color="textSecondary">{item.skuCode}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>
          {item.quantity} x {parseInt(item.price.toString(), 0)} ₽
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          {item.quantity * parseInt(item.price.toString(), 0)} ₽
        </Typography>
      </Grid>
    </Grid>
  );
};

export const OrderMakeListComposed = compose(
  withMakeOrderdState,
  withEmailError,
  withPhoneError,
  withCityError,
  withNameError,
  withAddressError,
  withCommentError,
  withMakeOrderSubmit,
  withCreatePasswordState,
  withPasswordError,
  withConfirmPasswordError,
  withCreatePasswordSubmit
)(OrderMakeList);
