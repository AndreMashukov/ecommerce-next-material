import { useContext, useState } from 'react';
import { Product, Section } from '../../models';
import { Typography, Grid, Button, Snackbar } from '@material-ui/core';
import SessionContext from '../../store/SessionContext/SessionContext';
import CartContext from '../../store/CartContext/CartContext';
import { makeStyles } from '@material-ui/styles';
import theme from '../../theme/theme';
import grey from '@material-ui/core/colors/grey';
import Alert from '@material-ui/lab/Alert';
import { getPrice, getPriceProperty } from '../../utils/Product';

interface ProductListProps {
  products: Product[];
  sections: Section[];
  currentSection: string;
}

const useStyles = makeStyles({
  box: {
    position: 'relative',
    backgroundColor: grey[100],
    padding: '10px',
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '300px',
    overflow: 'hidden',
    '&:hover': {
      backgroundColor: grey[500]
    }
  },
  addToCartShow: {
    display: 'block',
    opacity: '1',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    '-ms-transform': 'translate(-50%, -50%)'
  },
  addToCartHide: {
    display: 'none'
  },
  a: {
    cursor: 'pointer'
  },
  selected: {
    color: theme.palette.primary.light
  },
  unselected: {
    color: theme.palette.primary.dark
  },
  fontWeightBold: {
    fontWeight: 'bold'
  }
});

export const ProductList = (props: ProductListProps) => {
  return (
    <Grid container direction="column" justify="flex-start">
      <Grid item>
        <Grid container direction="row" justify="flex-start" wrap="wrap">
          {props.products
            .filter((product) => product.active === 'Y')
            .map((product) => (
              <Grid key={product.code} item xs={3}>
                <ProductListItem {...product} />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

const ProductListItem = (props: Product) => {
  const classes = useStyles();
  const { addItem } = useContext(CartContext);
  const { sessionId } = useContext(SessionContext);
  const _sessionId = sessionId;
  const [selected, setSelected] = useState(false);
  const [snackState, setSnackState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'left',
    success: false
  });
  const { open, success } = snackState;
  const handleClose = () => {
    setSnackState({ ...snackState, open: false });
  };

  return (
    <div
      className={classes.box}
      onMouseEnter={() => {
        setSelected(true);
      }}
      onMouseLeave={() => {
        setSelected(false);
      }}
      onMouseOver={() => {
        setSelected(true);
      }}
    >
      <Typography
        variant="h6"
        color="textSecondary"
        className={selected ? classes.selected : classes.unselected}
      >
        {getPrice(props)} ₽
      </Typography>
      <div>
        <a
          href={`/catalog/mirra-test/${'currentSection'}/${props.code}`}
          className={selected ? classes.selected : classes.unselected}
        >
          <Typography variant="subtitle2" className={classes.fontWeightBold}>
            {props.name}
          </Typography>
        </a>
      </div>
      <div className={selected ? classes.addToCartShow : classes.addToCartHide}>
        <Button
          variant="outlined"
          onClick={() => {
            addItem(
              _sessionId,
              {
                sessionId: _sessionId,
                blockId: props.blockId,
                productId: props.id,
                price: parseInt(getPriceProperty(props).value, 0),
                quantity: 1,
                currency: 'RUB'
              },
              (newState) => {
                setSnackState({
                  ...snackState,
                  open: true,
                  success: newState.httpStatus.ok
                });
              }
            );
          }}
        >
          В КОРЗИНУ
        </Button>
      </div>
      <Snackbar
        key={`cartSnackBar`}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        {success ? (
          <Alert onClose={handleClose} severity="success">
            Товар был успешно добавлен
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error">
            Ошибка добавления товара в корзину
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};
