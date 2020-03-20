import React, { useContext } from 'react';
import CartContext from '../../store/CartContext';
import CartContextManager from '../../store/CartContextManager';
import { Product } from '../../models';
import './ListProductsCart';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import theme from '../../theme/theme';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles({
  box: {
    display: 'flex',
    'flex-direction': 'row',
    'justify-content': 'space-between',
    height: '100px',
    padding: '15px 0 15px 0',
    'border-top': `1px solid ${theme.palette.primary.main}`
  }
});


const ListProductsCart = () => {
  const { products } = useContext<CartContextManager>(CartContext);
  const classes = useStyles();

  return (
    <div>
      <div>
        <Grid container direction="row" justify="space-between">
          <Grid item>
            Всего товаров: {products.length} / 2 496
          </Grid>
          <Grid item>
            <img src="/img/arrow-small.svg" />
          </Grid>
        </Grid>
      </div>
      <Grid container direction="column" justify="flex-start">
        {products.map((product: Product) => (
          <Grid item>
            <div key={product.code} className={classes.box}>
              <Typography>{product.name}</Typography>
              <ClearIcon/>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ListProductsCart;