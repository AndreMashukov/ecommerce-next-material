import { Product, Section } from '../../models';
import { Typography, Grid } from '@material-ui/core';
import { ElementProperty } from '../../models/ElementProperty';
import { PROPERTY_PRICE_ID } from '../../constants';
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
    'background-color': grey[100],
    padding: '10px',
    margin: '10px',
    height: '200px',
    overflow: 'hidden',
    '&:hover': {
      'background-color': theme.palette.primary.main,
    },
  },
  item: {
    cursor: 'pointer',
    color: grey[700],
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
});

const getPriceProperty = (product: Product): ElementProperty => {
  return product.properties.find(property => parseInt(property.propertyId, 0) === PROPERTY_PRICE_ID);
};

export const ProductList = (props: ProductListProps) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" justify="flex-start">
      <Grid item>
        <Grid container direction="row" justify="flex-start" wrap="wrap">
          {props.products.map(product => (
            <Grid key={product.code} item xs={4}>
              <div className={classes.box}>
                <Grid container direction="column" justify="space-between" spacing={3}>
                  <Grid item>
                    <Typography variant="h6" color="textSecondary">
                      {getPriceProperty(product).value} руб
                    </Typography>
                  </Grid>
                  <Grid item>
                    <a href={`/catalog/mirra-test/${props.currentSection}/${product.code}`} className={classes.item}>
                      <Typography variant="subtitle2">{product.name}</Typography>
                    </a>
                  </Grid>
                  <Grid item>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
