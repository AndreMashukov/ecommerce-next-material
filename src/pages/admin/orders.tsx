import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Subscription, from } from 'rxjs';
import { AdminBreadcrumbs } from '../../components';
import { getAdminOrderList } from '../../services/OrderApi';
import { AgGridReact } from 'ag-grid-react';
import { ChangeDetectionStrategyType } from 'ag-grid-react/lib/changeDetectionService';
import moment from 'moment';
import { OrderView } from '../../models';
import { ADMIN_ORDER_COL_DEFS, REGIONS } from '../../constants';
import '../Layout.scss';

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

  const subscriptions = new Subscription();

  useEffect(() => {
    return () => {
      subscriptions.unsubscribe();
    };
  }, []);

  const onGridReady = () => {
    subscriptions.add(
      from(getAdminOrderList()).subscribe((resp) => {
        const orderList: OrderView[] = resp;
        if (orderList) {
          const data = orderList.map((order: OrderView) => {
            const row = {
              id: `№${order.id} от ${moment(order.dateInsert).format(
                'DD.MM.YYYY HH:mm'
              )}`,
              region: Object.entries(REGIONS).find(
                (key) => key[1].id === order.props.region
              )[1].name,
              price: `${parseInt(order.price.toString(), 0)} ₽`,
              address: order.props.address,
              buyer: `${order.user.firstName} ${order.user.lastName}`
            };

            return row;
          });
          setGrid({ ...grid, rowData: data });
        }
        setLoading(false);
      })
    );
  };

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
          {process.browser && (
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
                onGridReady={onGridReady}
                rowDataChangeDetectionStrategy={
                  ChangeDetectionStrategyType.IdentityCheck
                }
              ></AgGridReact>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminOrdersPage;
