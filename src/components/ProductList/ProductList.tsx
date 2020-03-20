import { Product, Section } from '../../models';
import { Typography, Grid, Button } from '@material-ui/core';
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
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'space-between',
    height: '200px',
    overflow: 'hidden',
    '&:hover': {
      'background-color': theme.palette.primary.main
    }
  },
  link: {
    cursor: 'pointer',
    color: grey[700],
    '&:hover': {
      color: theme.palette.primary.dark
    }
  }
});

const getPriceProperty = (product: Product): ElementProperty => {
  return product.properties.find(property => 
    parseInt(property.propertyId, 0) === PROPERTY_PRICE_ID);
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
                  <div>
                    <Typography variant="h6" color="textSecondary">
                      {getPriceProperty(product).value} руб
                    </Typography>
                  </div>
                  <div>
                    <a href={`/catalog/mirra-test/${props.currentSection}/${product.code}`} 
                      className={classes.link}>
                      <Typography variant="subtitle2">{product.name}</Typography>
                    </a>
                    </div>
                  <div>
                    <Button variant="outlined" color="secondary">
                      В КОРЗИНУ
                    </Button>
                  </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
