import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Section, Product } from '../../models';
import { makeStyles } from '@material-ui/styles';

type Props = {
  product: Product;
  section: Section;
};

const useStyles = makeStyles({
  detailTitle: {
    textAlign: 'center',
    '& > *': {
      marginBottom: '10px'
    }
}});

export const ProductDetail = (props: Props) => {
  const { product, section } = props;
  const classes = useStyles();

  return (
    <div className={classes.detailTitle}>
      <Typography
        variant="h4"
        color="textPrimary"
        style={{ fontWeight: 'bold', textTransform: 'uppercase' }}
      >
        {product.name}
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        style={{ textTransform: 'uppercase' }}
      >
        {section.name}
      </Typography>
    </div>
  );
};
