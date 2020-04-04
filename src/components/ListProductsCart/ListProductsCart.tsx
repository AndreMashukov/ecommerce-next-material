import React, { useContext } from 'react';
import CartContext from '../../store/CartContext';
import CartContextManager from '../../store/CartContextManager';
import { CartItem } from '../../models';
import './ListProductsCart';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import theme from '../../theme/theme';
import { IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

interface Props {
  onClose: () => void;
}

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


const ListProductsCart = (props: Props) => {
  const { items, removeItem } = useContext<CartContextManager>(CartContext);
  const classes = useStyles();

  return (
    <div>
      <div>
        <Grid container direction="row" justify="space-between" alignItems="baseline">
          <Grid item>
            <Typography variant="body1">
              Всего товаров: {items ? items.length : 0} / 2 496
            </Typography>
          </Grid>
          <Grid item>
          <IconButton aria-label="close" color="inherit"
            onClick={props.onClose}>
              <ArrowRightAltIcon/>
          </IconButton>
          </Grid>
        </Grid>
      </div>
      <Grid container direction="column" justify="flex-start">
        {items && items.map((item: CartItem) => (
          <Grid item key={item.productId}>
            <div className={classes.box}>
              <div>
                <Typography>{item.name}</Typography>
              </div>
              <div>
                <IconButton aria-label="remove" color="inherit"
                  onClick={() => {removeItem(`${item.productId}`);}}>
                  <ClearIcon />
                </IconButton>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ListProductsCart;