import React from 'react';
import { Product } from '../../models';
import { getProductProperty } from '../../utils/Product';
import { makeStyles } from '@material-ui/styles';
import { colors } from '../../theme/constants';
import clsx from 'clsx';
import { PRODUCT_PROPERTIES } from '../../constants';

const properties = [
  PRODUCT_PROPERTIES.SPECIAL_OFFER,
  PRODUCT_PROPERTIES.NEW
];

interface Props {
  product: Product;
}

const useStyles = makeStyles({
  specialOffer: {
    backgroundColor: colors.badge.specialOffer
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

export const Badges = (props: Props) => {
  const classes = useStyles();
  const { product } = props;
  const badges: React.ReactElement[] = [];

  const getStyles = (property: number) => clsx(
    classes.text,
    classes.box,
    property === 13 && classes.specialOffer
  );

  properties.forEach(property => {
    getProductProperty(product, property.id) &&
      badges.push(
        <div
          key={`sp_badge_${product.code}`}
          className={getStyles(property.id)}
        >
          АКЦИЯ
        </div>
      );
    });

  return React.useMemo(
    () => <>{badges.length > 0 && badges.map((badge) => badge)}</>,
    [product.code]
  );
};
