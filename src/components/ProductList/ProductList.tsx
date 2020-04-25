import { useContext, useState } from 'react';
import { Product, Section } from '../../models';
import { Typography, Grid, Button } from '@material-ui/core';
import { ElementProperty } from '../../models/ElementProperty';
import { PROPERTY_PRICE_ID } from '../../constants';
import SessionContext from '../../store/SessionContext/SessionContext';
import CartContext from '../../store/CartContext/CartContext';
import CartContextManager from '../../store/CartContext/CartContextManager';
import { makeStyles } from '@material-ui/styles';
import theme from '../../theme/theme';
import grey from '@material-ui/core/colors/grey';

interface ProductListProps {
  products: Product[];
  sections: Section[];
  currentSection: string;
}

const useStyles = makeStyles({
  box: {
    position: 'relative',
    'background-color': grey[100],
    padding: '10px',
    margin: '10px',
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'space-between',
    height: '300px',
    overflow: 'hidden',
    '&:hover': {
      backgroundColor: grey[500],
    },
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
    cursor: 'pointer',
  },
  selected: {
    color: theme.palette.primary.light,
  },
  unselected: {
    color: grey[700],
  }
});

const getPriceProperty = (product: Product): ElementProperty => {
  return product.properties.find(property => parseInt(property.propertyId, 0) === PROPERTY_PRICE_ID);
};

export const ProductList = (props: ProductListProps) => {
  return (
    <Grid container direction="column" justify="flex-start">
      <Grid item>
        <Grid container direction="row" justify="flex-start" wrap="wrap">
          {props.products
            .filter(product => product.active === 'Y')
            .map(product => (
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
  const { addItem } = useContext<CartContextManager>(CartContext);
  const { sessionId } = useContext(SessionContext);
  const [ selected, setSelected ] = useState(false);

  return (
    <div
      className={classes.box}
      onMouseEnter={() => { setSelected(true); }}
      onMouseLeave={() => { setSelected(false); }}
      onMouseOver= {() => { setSelected(true); }}
      >
      <div>
        <Typography
          variant="h6"
          color="textSecondary"
          className={selected ? classes.selected : classes.unselected}>
          {getPriceProperty(props).value} ₽
        </Typography>
      </div>
      <div>
        <a
          href={`/catalog/mirra-test/${'currentSection'}/${props.code}`}
          className={selected ? classes.selected : classes.unselected}>
          <Typography variant="subtitle2">{props.name}</Typography>
        </a>
      </div>
      <div className={selected ? classes.addToCartShow : classes.addToCartHide }>
        <Button
          variant="outlined"
          color="primary"
          style={{
            backgroundColor: theme.palette.secondary.dark
          }}
          onClick={() => {
            addItem(sessionId, {
              fuserId: sessionId,
              blockId: props.blockId,
              productId: props.id,
              price: parseInt(getPriceProperty(props).value, 0),
              quantity: 1,
              currency: 'RUB',
            });
          }}
        >
          В КОРЗИНУ
        </Button>
      </div>
    </div>
  );
};
