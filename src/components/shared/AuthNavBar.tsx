import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import Link from '@material-ui/core/Link';
import SessionContext from '../../store/SessionContext/SessionContext';

export const AuthNavBar = () => {
  const { getUser } = useContext(SessionContext);
  // tslint:disable-next-line: no-console
  console.log(getUser());
  return (
    <>
      {getUser() ? (
        <Grid container direction="row" justify="flex-start" spacing={2}>
          <Grid item>
            <Typography variant="subtitle2">Заказы</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">{getUser().firstName}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">Выход</Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="row" justify="flex-start" spacing={2}>
          <Grid item>
            <Typography variant="subtitle2">Войти</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">Регистрация</Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};
