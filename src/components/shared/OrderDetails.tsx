import React from 'react';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import theme from '../../theme/theme';
import { Order, CartItem } from '../../models';
import { REGIONS } from '../../constants';
import { Variant } from '@material-ui/core/styles/createTypography';

interface Props {
  order: Order;
}

interface OrderDetailsTableProps {
  title?: string;
  columns: string[][];
  variant: Variant;
  isTotal?: boolean;
}

interface OrderContentTableProps {
  cart: CartItem[];
}

const useStyles = makeStyles({
  fontWeigthBold: {
    fontWeight: 'bold'
  },
  paper: {
    padding: '20px'
  },
  border: {
    paddingLeft: '10px',
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    marginBottom: '20px'
  },
  table: {
    minWidth: 500
  }
});

export const OrderDetails = (props: Props) => {
  const { order } = props;
  const classes = useStyles();
  const primaryTextColor = 'textPrimary';
  const amountToPay =
    parseInt(order.price.toString(), 0) +
    parseInt(order.delivery.price.toString(), 0);

  return (
    <div style={{ margin: '20px' }}>
      <Grid container direction="column" justify="center" spacing={1}>
        <Grid item>
          <Typography
            variant="h5"
            color={primaryTextColor}
            className={classes.fontWeigthBold}
          >
            Мой заказ №{order.id}
          </Typography>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <Grid container className={classes.border}>
              <Typography variant="h6">Параметры заказа</Typography>
            </Grid>
            <OrderDetailsTable
              title={'Персональные данные'}
              variant="caption"
              columns={[
                ['Имя', 'E-Mail', 'Телефон'],
                [
                  `${order.user.firstName} ${order.user.lastName}`,
                  order.user.email,
                  order.props.phone
                ]
              ]}
            />
            <OrderDetailsTable
              title={'Данные для доставки'}
              variant="caption"
              columns={[
                ['Город', 'Адрес доставки'],
                [
                  order.props.region === REGIONS.MOSCOW.id
                    ? REGIONS.MOSCOW.name
                    : order.props.city,
                  order.props.address
                ]
              ]}
            />
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <Grid container className={classes.border}>
              <Typography variant="h6">Состав заказа</Typography>
            </Grid>
            <OrderContentTable cart={order.cart} />
            <Grid container>
              <Grid item xs={3}></Grid>
              <Grid item xs={9}>
                <OrderDetailsTable
                  variant="body1"
                  columns={[
                    ['Цена', 'Стоимость доставки'],
                    [
                      `${parseInt(order.price.toString(), 0)} ₽`,
                      `${parseInt(order.delivery.price.toString(), 0)} ₽`
                    ]
                  ]}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={3}></Grid>
              <Grid item xs={9}>
                <OrderDetailsTable
                  variant="body1"
                  isTotal={true}
                  columns={[
                    ['Итого'],
                    [`${parseInt(amountToPay.toString(), 0)} ₽`]
                  ]}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const OrderDetailsTable = (_props: OrderDetailsTableProps) => {
  const { title, columns, variant, isTotal } = _props;
  const classes = useStyles();
  const gridItemJustify = 'flex-start';
  return (
    <div style={{ marginBottom: '10px' }}>
      {title && (
        <Grid container justify="center" style={{ marginBottom: '5px' }}>
          <Typography variant="body1" className={classes.fontWeigthBold}>
            {title}
          </Typography>
        </Grid>
      )}
      {columns[0].map((item, index) => (
        <Grid
          key={`Grid_${item}_1`}
          container
          justify="center"
          direction="row"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item xs={6}>
            <Grid
              key={`${item}_1`}
              container
              justify={gridItemJustify}
              direction="column"
              alignItems="flex-end"
            >
              <Grid item>
                <Grid
                  container
                  direction="column"
                  justify={gridItemJustify}
                  alignItems={gridItemJustify}
                  spacing={2}
                >
                  <Grid item>
                    <Typography
                      variant={variant}
                      color={title ? 'textSecondary' : 'textPrimary'}
                      style={isTotal && { fontWeight: 'bold' }}
                    >
                      {columns[0][index]}:
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid
              key={`${item}_2`}
              container
              justify={gridItemJustify}
              direction="column"
              alignItems="flex-start"
            >
              <Grid item xs={10}>
                <Grid
                  container
                  direction="column"
                  justify={gridItemJustify}
                  alignItems={gridItemJustify}
                  spacing={2}
                >
                  <Grid item>
                    <Typography
                      variant={variant}
                      style={isTotal && { fontWeight: 'bold' }}
                    >
                      {columns[1][index]}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

const OrderContentTable = (_props: OrderContentTableProps) => {
  const { cart } = _props;
  const classes = useStyles();

  return (
    <Grid container justify="center" style={{ marginBottom: '20px' }}>
      <TableContainer
        component={Paper}
        style={{
          width: '550px',
          padding: '15px',
          backgroundColor: `${theme.palette.primary.light}`
        }}
      >
        <Table
          className={classes.table}
          size="small"
          aria-label="order content table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary">Наименование</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary">Цена</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary">Количество</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((row) => (
              <TableRow key={`TableRow_${row.productId}`}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};
