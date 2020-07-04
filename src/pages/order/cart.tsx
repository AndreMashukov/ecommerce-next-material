import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { ListCart, OrderStepNav } from '../../components/shared';
import CartContext from '../../store/CartContext/CartContext';
import Link from 'next/link';
import MatLink from '@material-ui/core/Link';
import '../Layout.scss';
import { makeStyles } from '@material-ui/styles';
import theme from '../../theme/theme';
import { colors } from '../../theme/constants';
import { NextPage } from 'next';
import { CATALOG_NAME } from '../../constants';

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.primary.main
  },
  grid: {
    padding: '60px 70px 60px 70px',
    backgroundColor: theme.palette.primary.main
  },
  paper: {
    padding: '20px'
  },
  border: {
    borderTop: `1px solid ${theme.palette.primary.main}`
  },
  yellowBox: {
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: `${colors.orderNav.selected}`
  }
});

const OrderCartPage: NextPage<{}> = () => {
  const { getItems } = React.useContext(CartContext);
  const classes = useStyles();
  const navColor = 'textSecondary';

  return (
    <div className="page-root-layout">
      <div style={{ margin: '20px' }}>
        <OrderStepNav step={1}/>
      </div>
      <div style={{ margin: '40px 0 20px 0' }}>
        {getItems().length > 0 ? (
          <Grid container justify="center">
            <Typography variant="h3">Корзина</Typography>
          </Grid>
        ) : (
          <Grid
            container
            justify="center"
            direction="column"
            spacing={3}
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h3">Ваша Корзина Пуста</Typography>
            </Grid>
            <Grid item>
              <Typography color={navColor} variant="body1">
                <Link href={`/${CATALOG_NAME}`} prefetch={false}>
                  <MatLink>Перейти в Каталог</MatLink>
                </Link>
              </Typography>
            </Grid>
          </Grid>
        )}
      </div>
      {getItems().length > 0 && (
        <Grid container justify="center">
          <Grid item className={classes.grid} xs={10}>
            <Paper className={classes.paper}>
              <ListCart isPopup={false} />
            </Paper>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default OrderCartPage;
