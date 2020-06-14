import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SessionContext from '../../store/SessionContext/SessionContext';
import { User } from '../../models';
import Link from 'next/link';
import MatLink from '@material-ui/core/Link';

export const AuthNavBar = () => {
  const { getUser, logoutUser } = useContext(SessionContext);
  const user: User = getUser();
  const variant = 'body1';

  const handleLogout = () => {
    logoutUser();
  };

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
            <Typography variant={variant} onClick={handleLogout}>
              <Link href="/auth" prefetch={false}>
                <MatLink>Выход</MatLink>
              </Link>
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="row" justify="flex-start" spacing={2}>
          <Grid item>
            <Typography variant={variant} style={{fontWeight: 'bold'}}>
              <Link href="/auth" prefetch={false}>
                <MatLink>Войти</MatLink>
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant={variant} style={{fontWeight: 'bold'}}>
              /
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant={variant}>Регистрация</Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};
