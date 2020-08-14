import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Subscription, from } from 'rxjs';
import '../Layout.scss';
import { AdminBreadcrumbs } from '../../components';
import { getAdminOrderList } from '../../services/OrderApi';
import { pickPropsFromDto } from '../../utils/shared';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { OrderViewList } from '../../models';
import { ADMIN_ORDER_COL_DEFS, REGIONS } from '../../constants';

const AdminOrdersPage = () => {
  const [grid, setGrid] = useState({
    columnDefs: ADMIN_ORDER_COL_DEFS,
    rowData: [],
    defaultColDef: {
      // sortable: true,
      resizable: true,
      flex: 1,
      minWidth: 120
    },
    rowSelection: 'multiple'
  });
  const [, setLoading] = useState(true);

  useEffect(() => {
    const subscriptions = new Subscription();
    subscriptions.add(
      from(getAdminOrderList()).subscribe((resp) => {
        if (!resp.status) {
          const orderList = pickPropsFromDto<OrderViewList>(resp, 'orders');
          if (orderList) {
            const data = orderList.orders.map((order) => {
              const row = {
                id: order.id,
                region: Object.entries(REGIONS).find((key) => key[1].id === order.props.region)[1].name,
                price: `${parseInt(order.price.toString(), 0)} ₽`,
                address: order.props.address,
                buyer: `${order.user.firstName} ${order.user.lastName}`
              };

              return row;
            });
            setGrid({ ...grid, rowData: data });
          }
        }
        setLoading(false);
      })
    );

    return () => {
      subscriptions.unsubscribe();
    };
  }, []);

  return (
    <div className="page-root-admin-layout">
      <Grid
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        spacing={2}
        container
        style={{ marginBottom: '20px', padding: '30px' }}
      >
        <Grid item xs={6}>
          <Typography
            variant="h4"
            color="textPrimary"
            style={{ fontWeight: 'bold' }}
          >
            Заказы
          </Typography>
        </Grid>
        <Grid item>
          <AdminBreadcrumbs name="Заказы" />
        </Grid>
        <Grid item>
          <div
            className="ag-theme-alpine"
            style={{
              height: '70vh',
              width: '80vw',
              maxWidth: '1200px',
              padding: '10px'
            }}
          >
            <AgGridReact
              columnDefs={grid.columnDefs}
              rowData={grid.rowData}
              defaultColDef={grid.defaultColDef}
            ></AgGridReact>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminOrdersPage;
