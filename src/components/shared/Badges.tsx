import React from 'react';
import { Product } from '../../models';
import { getProductProperty } from '../../utils/Product';
import { makeStyles } from '@material-ui/styles';
import { colors } from '../../theme/constants';
import clsx from 'clsx';
import { PRODUCT_PROPERTIES } from '../../constants';
import { Grid } from '@material-ui/core';

const properties = [
  PRODUCT_PROPERTIES.NEW,
  PRODUCT_PROPERTIES.SPECIAL_OFFER,
  PRODUCT_PROPERTIES.TOP_SELL
];

interface Props {
  product: Product;
}

const useStyles = makeStyles({
  specialOffer: {
    backgroundColor: colors.badge.specialOffer
  },
  new: {
    backgroundColor: colors.badge.new
  },
  topSell: {
    backgroundColor: colors.badge.topSell
  },
  box: {
    padding: '5px 15px 5px 15px',
    marginBottom: '5px'
  },
  text: {
    color: 'white',
    fontWeight: 'bolder'
  }
});

export const Badges: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { product } = props;
  const badges: React.ReactElement[] = [];

  const getStyles = (propertyId: number) => clsx(
      propertyId === PRODUCT_PROPERTIES.SPECIAL_OFFER.id && classes.specialOffer,
      propertyId === PRODUCT_PROPERTIES.NEW.id && classes.new,
      propertyId === PRODUCT_PROPERTIES.TOP_SELL.id && classes.topSell,
      classes.text,
      classes.box
  );

  properties.forEach((property) => {
    getProductProperty(product, property.id) &&
      badges.push(
        <Grid container justify="center"
          key={`sp_badge_${product.code}_${property.id}`}
          className={getStyles(property.id)}
        >
          {property.name}
        </Grid>
      );
  });

  return React.useMemo(
    () => <>{badges.length > 0 && badges.map((badge) => badge)}</>,
    [product.code]
  );
};
