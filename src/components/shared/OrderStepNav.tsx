import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Link from 'next/link';
import MatLink from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/styles';
import { colors } from '../../theme/constants';

interface OrderStepNavProps {
  step: number;
}

const useStyles = makeStyles({
  orangeBox: {
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: `${colors.orderNav.selected}`
  }
});

export const OrderStepNav = (props: OrderStepNavProps) => {
  const { step } = props;
  const classes = useStyles();
  const navColor = 'textSecondary';
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Typography color={navColor}>
          <Link href="/catalog" prefetch={false}>
            <MatLink>КАТАЛОГ</MatLink>
          </Link>
        </Typography>
      </Grid>
      <Grid item>
        <Typography color={navColor}>
          <ArrowRightAltIcon />
        </Typography>
      </Grid>
      <Grid item className={step === 1 ? classes.orangeBox : ''}>
        <Typography color={step === 1 ? 'textPrimary' : navColor}>
          {step === 1 ? (
            'ЗАКАЗ'
          ) : (
            <Link href="/order/cart" prefetch={false}>
              <MatLink>ЗАКАЗ</MatLink>
            </Link>
          )}
        </Typography>
      </Grid>
      <Grid item>
        <Typography color={navColor}>
          <ArrowRightAltIcon />
        </Typography>
      </Grid>
      <Grid item className={step === 2 ? classes.orangeBox : ''}>
        <Typography color={step === 2 ? 'textPrimary' : navColor}>ОФОРМЛЕНИЕ</Typography>
      </Grid>
    </Grid>
  );
};
