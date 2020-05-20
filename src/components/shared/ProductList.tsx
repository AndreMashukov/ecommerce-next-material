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
import { CATALOG_NAME } from '../../constants';

interface ProductListProps {
  products: Product[];
  sections: Section[];
  currentSection: string;
}

interface ProductListItemProps {
  product: Product;
  currentSection: string;
}

const useStyles = makeStyles({
  box: {
    position: 'relative',
    margin: 'auto',
    backgroundColor: grey[100],
    padding: '10px',
    // margin: '10px',
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
  const { products, currentSection } = props;
  return (
    <Grid container direction="column" justify="center">
      <Grid item>
        <Grid
          container
          direction="row"
          justify="flex-start"
          wrap="wrap"
          spacing={2}
        >
          {products
            .filter((product) => product.active === 'Y')
            .map((product) => (
              <Grid key={product.code} item xs={10} sm={6} md={3}>
                <ProductListItem
                  product={product}
                  currentSection={currentSection}
                />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

const ProductListItem = (props: ProductListItemProps) => {
  const { product, currentSection } = props;
  const classes = useStyles();
  const { addItem } = useContext(CartContext);
  const { getSessionId } = useContext(SessionContext);
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
        {getPrice(product)} ₽
      </Typography>
      <div>
        <a
          href={`/${CATALOG_NAME}/${currentSection}/${product.code}`}
          className={selected ? classes.selected : classes.unselected}
        >
          <Typography variant="subtitle2" className={classes.fontWeightBold}>
            {product.name}
          </Typography>
        </a>
      </div>
      <div className={selected ? classes.addToCartShow : classes.addToCartHide}>
        <Button
          variant="outlined"
          onClick={() => {
            addItem(
              getSessionId(),
              {
                sessionId: getSessionId(),
                blockId: product.blockId,
                productId: product.id,
                price: parseInt(getPriceProperty(product).value, 0),
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
        key={'cartSnackBar'}
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
