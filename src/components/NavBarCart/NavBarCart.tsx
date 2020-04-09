import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import ListProductsCart from '../ListProductsCart/ListProductsCart';
import { makeStyles } from '@material-ui/styles';
import theme from '../../theme/theme';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CartContextManager from '../../store/CartContext/CartContextManager';
import CartContext from '../../store/CartContext/CartContext';

const cartIsEmpty = 'корзина пуста';
const cartIsNotEmpty = 'всего товаров';

const useStyles = makeStyles({
  cartInfo: {
    cursor: 'pointer'
  },
  paper: {
    padding: theme.spacing(1),
    'min-width': '400px',
    'max-width': '500px',
    'overflow-y': 'scroll'
  },
});

export const NavBarCart = () => {
  const classes = useStyles();
  const divRef = React.useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { items } = useContext<CartContextManager>(CartContext);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handlePopoverOpen = () => {
    setAnchorEl(divRef.current);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <div ref={divRef}>
      <Grid container direction="row" justify="space-between" alignItems="center" spacing={2}>
        <Grid item>
          <div onClick={handlePopoverOpen} className={classes.cartInfo} >
            {items.length === 0 ? cartIsEmpty : `${cartIsNotEmpty}: ${items.length}`}
          </div>
        </Grid>
        <Grid item>
          <IconButton onClick={handlePopoverOpen} aria-label="cart" color="inherit">
            <ShoppingCartIcon aria-haspopup="true" />
          </IconButton>
        </Grid>
      </Grid>
      <div>
        <Popover
          id={id}
          open={open}
          classes={{
            paper: classes.paper,
          }}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <ListProductsCart onClose={handlePopoverClose} />
        </Popover>
      </div>
    </div>
  );
};
