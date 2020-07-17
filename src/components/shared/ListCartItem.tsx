import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import theme from '../../theme/theme';
import ClearIcon from '@material-ui/icons/Clear';
import { CartItem } from '../../models';
import { Stepper } from './Stepper';
import CartContext from '../../store/CartContext/CartContext';
import Alert from '@material-ui/lab/Alert';
import { AWS_S3_PREFIX } from '../../constants';

interface Props {
  item: CartItem;
  sessionId: string;
}

const useStyles = makeStyles({
  box: {
    padding: '15px 0 15px 0',
    borderTop: `1px solid ${theme.palette.primary.main}`
  },
  fontWeigthBold: {
    fontWeight: 'bold'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',

    '& > *': {
      marginBottom: '10px'
    }
  },
  stepperPaper: {
    background: theme.palette.background.default,
    padding: '10px'
  }
});

export const ListCartItem: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { removeItem, decrementQty, addItem } = useContext(CartContext);
  const { item, sessionId } = props;

  const [snackState, setSnackState] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
    success: false
  });

  const { open, success } = snackState;
  const handleSnackBarClose = () => {
    setSnackState({ ...snackState, open: false });
  };

  const [updating, setUpdating] = useState(false);

  const onHandleNext = () => {
    setUpdating(true);
    addItem(sessionId, item, (newState) => {
      setUpdating(false);
      setSnackState({
        ...snackState,
        open: true,
        success: newState.httpStatus.ok
      });
    });
  };

  const onHandleBack = () => {
    setUpdating(true);
    decrementQty(sessionId, item, (newState) => {
      setUpdating(false);
      setSnackState({
        ...snackState,
        open: true,
        success: newState.httpStatus.ok
      });
    });
  };

  return (
    <>
      <Grid container spacing={1} className={classes.box}>
        <Grid item xs={1} sm={2}>
          {item.picture && (
            <Box display={{ xs: 'none', sm: 'block' }}>
              <Grid container justify="center">
                <img src={`${AWS_S3_PREFIX}${item.picture}`} height="60" />
              </Grid>
            </Box>
          )}
        </Grid>
        <Grid item className={classes.item} xs={8}>
          <Typography variant="h6">
            {item.name}{' '}
            {item.packageType &&
              item.packageType.trim().length > 2 &&
              '(' + item.packageType.trim() + ')'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {item.skuCode}
          </Typography>
          <Typography variant="h5" className={classes.fontWeigthBold}>
            {parseInt(item.price.toString(), 0)} ₽
          </Typography>
          <Stepper
            isDisabled={updating}
            value={item.quantity}
            onHandleNext={onHandleNext}
            onHandleBack={onHandleBack}
          />
        </Grid>
        <Grid item xs={2}>
          <Grid container justify="center">
            <IconButton
              aria-label="remove"
              color="inherit"
              onClick={() => {
                removeItem(sessionId, item.productId);
              }}
            >
              <ClearIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        key={`cartListSnackBar`}
        open={open}
        autoHideDuration={1000}
        onClose={handleSnackBarClose}
      >
        {success ? (
          <Alert onClose={handleSnackBarClose} severity="success">
            Успешно обновлено
          </Alert>
        ) : (
          <Alert onClose={handleSnackBarClose} severity="error">
            Ошибка обновления
          </Alert>
        )}
      </Snackbar>
    </>
  );
};
