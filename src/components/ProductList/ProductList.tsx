import { Product, Section } from '../../models';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import theme from '../../theme/theme';
import grey from '@material-ui/core/colors/grey';

interface ProductListProps {
  products: Product[];
  sections: Section[];
  currentSection: string;
}

const useStyles = makeStyles({
  item: {
    cursor: 'pointer',
    color: grey[700],
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
});

export const ProductList = (props: ProductListProps) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" justify="flex-start">
      {props.products.map(product => (
        <Grid item>
          <div className={classes.item}>
            <div key={product.code}>
              <a href={`/catalog/mirra-test/${props.currentSection}/${product.code}`} className={classes.item}>
                <Typography variant="body1">{product.name}</Typography>
              </a>
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};
