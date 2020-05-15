import React, {useContext} from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import theme from '../../theme/theme';
import { IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { CartItem } from '../../models';
import { Stepper } from './Stepper';
import CartContext from '../../store/CartContext/CartContext';

interface Props {
  item: CartItem;
  sessionId: string;
}

const useStyles = makeStyles({
  box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  }
});

export const ListCartItem = (props: Props) => {
  const classes = useStyles();
  const { removeItem, decrementQty, addItem } = useContext(CartContext);
  const { item, sessionId } = props;

  const onHandleNext = () => {
    addItem(sessionId, item, (newState) => {
      // tslint:disable-next-line: no-console
      console.log(`${newState}`);
    });
  };

  const onHandleBack = () => {
    decrementQty(sessionId, item, (newState) => {
      // tslint:disable-next-line: no-console
      console.log(`${newState}`);
    });
  };

  return (
    <div className={classes.box}>
      <div className={classes.item}>
        <Typography variant="h6">
          {item.name}{' '}
          {item.packageType.trim().length > 2 &&
            '(' + item.packageType.trim() + ')'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {item.skuCode}
        </Typography>
        <Typography variant="h5" className={classes.fontWeigthBold}>
          {parseInt(item.price.toString(), 0)} ₽
        </Typography>
        <Stepper
          value={item.quantity}
          onHandleNext={onHandleNext}
          onHandleBack={onHandleBack}
        />
      </div>
      <div>
        <IconButton
          aria-label="remove"
          color="inherit"
          onClick={() => {
            removeItem(sessionId, item.productId);
          }}
        >
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
};
