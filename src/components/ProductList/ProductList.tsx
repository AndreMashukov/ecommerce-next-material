import { Product, Section } from '../../models';
import { Typography, Grid } from '@material-ui/core';
import { ElementProperty } from '../../models/ElementProperty';
// import { PROPERTY_PRICE_ID } from '../../constants';
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
  // tslint:disable-next-line: no-console
  console.log(product.properties.find(item => item.propertyId === '22'));
  return product.properties.find(property => property.propertyId === '22');
};

export const ProductList = (props: ProductListProps) => {
  const classes = useStyles();
  // tslint:disable-next-line: no-console
  console.log(getPriceProperty(props.products[1]));

  return (
    <Grid container direction="column" justify="flex-start">
      <Grid item>
        <Grid container direction="row" justify="flex-start" wrap="wrap">
          {props.products.map(product => (
            <Grid key={product.code} item xs={4}>
              <div className={classes.box}>
                <a href={`/catalog/mirra-test/${props.currentSection}/${product.code}`} className={classes.item}>
                  <Typography variant="subtitle2">{product.name}</Typography>
                </a>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
