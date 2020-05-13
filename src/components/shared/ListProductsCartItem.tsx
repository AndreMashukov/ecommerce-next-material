import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import theme from '../../theme/theme';
import { IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { CartItem } from '../../models';

interface Props {
  item: CartItem;
  sessionId: string;
  removeItem: (sessionId: string, productId: number) => void;
}

const useStyles = makeStyles({
  box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100px',
    padding: '15px 0 15px 0',
    borderTop: `1px solid ${theme.palette.primary.main}`
  }
});

export const ListProductsCartItem = (props: Props) => {
  const classes = useStyles();
  const { item, sessionId, removeItem } = props;

  return (
    <div className={classes.box}>
      <div>
        <Typography>{item.name}</Typography>
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
