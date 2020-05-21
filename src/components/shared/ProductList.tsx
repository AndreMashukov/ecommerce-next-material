import { useContext, useState } from 'react';
import { Product, Section } from '../../models';
import { Typography, Grid, Button, Snackbar } from '@material-ui/core';
import SessionContext from '../../store/SessionContext/SessionContext';
import CartContext from '../../store/CartContext/CartContext';
import { makeStyles } from '@material-ui/styles';
import theme from '../../theme/theme';
import Link from '@material-ui/core/Link';
import Alert from '@material-ui/lab/Alert';
import { getPrice, getPriceProperty } from '../../utils/Product';
import { CATALOG_NAME } from '../../constants';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

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
    // margin: 'auto',
    // backgroundColor: grey[100],
    // padding: '10px',
    // // margin: '10px',
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    height: '300px'
    // overflow: 'hidden',
    // '&:hover': {
    //   backgroundColor: grey[500]
    // }
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
      style={{ position: 'relative' }}
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
      <Button
        variant="outlined"
        className={selected ? classes.addToCartShow : classes.addToCartHide}
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
      <Card variant="outlined" className={classes.box}>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="flex-start"
        >
          <CardContent>
            <Typography variant="h5" className={classes.fontWeightBold}>
              {getPrice(product)} ₽
            </Typography>
          </CardContent>
          <CardActions>
            <Link
              color="inherit"
              style={{textDecoration: 'none'}}
              href={`/${CATALOG_NAME}/${currentSection}/${product.code}`}
            >
              <Typography
                variant="body1"
                className={classes.fontWeightBold}
              >
                {product.name}
              </Typography>
            </Link>
          </CardActions>
        </Grid>
      </Card>
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
