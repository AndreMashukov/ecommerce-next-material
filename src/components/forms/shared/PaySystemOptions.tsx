import React, {useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import { getPaySystemOptions } from '../../../services/PaySystemApi';
import { PaySystem } from '../../../models';
import { ChangeEventType } from '../models';

interface PaySystemOptionsProps {
  region: number;
  paySystemId: number;
  setPaySystemId: (_paySystemId: number) => number;
  onPaySystemChange: (event: ChangeEventType) => number;
}

export const PaySystemOptions = (props: PaySystemOptionsProps) => {
  const {
    region,
    paySystemId,
    setPaySystemId,
    onPaySystemChange
  } = props;
  const [paySystemOptions, setPaySystemOptions] = useState([]);

  useEffect(() => {
    const getPaySystem = async (): Promise<void> => {
      const systems: PaySystem[] = await getPaySystemOptions(
        region
      );
      setPaySystemOptions(systems);
      // TODO: Should choose delivertId from selected option
      setPaySystemId(systems[0].pay_system_id);
    };

    getPaySystem();
  }, [region]);

  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      spacing={1}
      style={{ marginBottom: '10px' }}
    >
      {paySystemOptions.map((paySystem) => (
        <Grid item key={`PaymentSystemOptions_${paySystem.pay_system_id}`}>
          <Paper style={{ padding: '20px' }}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              spacing={4}
              id={`PaySystem_${paySystem.pay_system_id}`}
            >
              <Grid item xs={1}>
                <div>
                  <Radio
                    checked={paySystemId === paySystem.pay_system_id}
                    onChange={onPaySystemChange}
                    value={paySystem.pay_system_id}
                  />
                </div>
              </Grid>
              <Grid item xs={5}>
                <Typography style={{ fontWeight: 'bold' }}>
                  {paySystem.pay_system_name}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-end"
                >
                  <Typography>{paySystem.pay_system_description}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
