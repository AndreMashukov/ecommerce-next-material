import { useContext, useState } from 'react';
import { Product, Section } from '../../models';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SessionContext from '../../store/SessionContext/SessionContext';
import CartContext from '../../store/CartContext/CartContext';
import { makeStyles } from '@material-ui/styles';
import Alert from '@material-ui/lab/Alert';
import { getPrice } from '../../utils/Product';
import { CATALOG_NAME } from '../../constants';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { useRouter } from 'next/router';
import { Badges } from './Badges';

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
  card: {
    position: 'relative',
    height: '300px',
    '&:hover': {
      '& div': {
        opacity: '85%'
      }
    }
  },
  cardGrid: {
    height: '100%'
  },
  addToCartShow: {
    display: 'block',
    opacity: '1',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  badges: {
    display: 'block',
    opacity: '1',
    position: 'absolute',
    top: '10%',
    right: '0'
  },
  addToCartHide: {
    display: 'none'
  },
  fontWeightBold: {
    fontWeight: 'bold'
  }
});

export const ProductList: React.FC<ProductListProps> = (
  props: ProductListProps
) => {
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
              <Grid key={product.code} item xs={10} sm={6} md={4} lg={3}>
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

const ProductListItem: React.FC<ProductListItemProps> = (
  props: ProductListItemProps
) => {
  const { product, currentSection } = props;
  const classes = useStyles();
  const router = useRouter();
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

  const handleCardClick = (code: string, section: string) => {
    if (process.browser) {
      router.push(`/${CATALOG_NAME}/${section}/${code}`);
    }
  };

  return (
    <div
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
      <Card variant="outlined" className={classes.card}>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="flex-start"
          onClick={() => {
            handleCardClick(product.code, currentSection);
          }}
          className={classes.cardGrid}
        >
          <CardContent>
            <div className={classes.badges}>
              <Badges product={product} />
            </div>
            <Typography variant="h5" className={classes.fontWeightBold}>
              {getPrice(product)} ₽
            </Typography>
          </CardContent>
          <CardActions>
            <Typography variant="body1" className={classes.fontWeightBold}>
              {product.name}
            </Typography>
          </CardActions>
        </Grid>
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
                price: getPrice(product),
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
