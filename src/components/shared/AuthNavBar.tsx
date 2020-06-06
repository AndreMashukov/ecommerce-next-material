import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import Link from '@material-ui/core/Link';
import SessionContext from '../../store/SessionContext/SessionContext';
import { User } from '../../models';

export const AuthNavBar = () => {
  const { getUser } = useContext(SessionContext);
  const user: User = getUser();
  const variant = 'body1';
  return (
    <>
      {user ? (
        <Grid container direction="row" justify="flex-start" spacing={2}>
          <Grid item>
            <Typography variant={variant}>Заказы</Typography>
          </Grid>
          <Grid item>
            <Typography variant={variant}>
              <span style={{ fontWeight: 'bold' }}>{getUser().firstName}</span>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant={variant}>Выход</Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="row" justify="flex-start" spacing={2}>
          <Grid item>
            <Typography variant={variant}>Войти</Typography>
          </Grid>
          <Grid item>
            <Typography variant={variant}>Регистрация</Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};
