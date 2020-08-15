import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SessionContext from '../../store/SessionContext/SessionContext';
import { User } from '../../models';
import Link from 'next/link';
import MatLink from '@material-ui/core/Link';
const variant = 'body1';

export const AuthNavBar: React.FC<{}> = () => {
  const { getUser } = useContext(SessionContext);
  const user: User = getUser();
  // const variant = 'body1';

  return (
    <>
      {process.browser && (
        <div>{user ? <AuthNavBarLogged /> : <AuthNavBarDefault />}</div>
      )}
    </>
  );
};

const AuthNavBarLogged: React.FC<{}> = () => {
  const { getUser, logoutUser } = useContext(SessionContext);
  const handleLogout = () => {
    logoutUser();
  };
  return (
    <>
      <Grid container direction="row" justify="flex-start" spacing={2}>
        <Grid item key="orders">
          <Typography variant={variant}>
            <Link href="/personal/order" prefetch={true} key="ordersLink">
              <MatLink>Заказы</MatLink>
            </Link>
          </Typography>
        </Grid>
        <Grid item id="firstName">
          <Typography variant={variant}>
            <Link href="/personal/profile" prefetch={true}>
              <MatLink>
                <span style={{ fontWeight: 'bold' }}>
                  {getUser().firstName}
                </span>
              </MatLink>
            </Link>
          </Typography>
        </Grid>
        <Grid item key="logout">
          <Typography variant={variant} onClick={handleLogout}>
            <Link href="/auth" prefetch={false}>
              <MatLink>Выход</MatLink>
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

const AuthNavBarDefault: React.FC<{}> = () => {
  return (
    <>
      <Grid container direction="row" justify="flex-start" spacing={2}>
        <Grid item key="login">
          <Typography variant={variant} style={{ fontWeight: 'bold' }}>
            <Link href="/auth" prefetch={false}>
              <MatLink>Войти</MatLink>
            </Link>
          </Typography>
        </Grid>
        <Grid item key="slash">
          <Typography variant={variant} style={{ fontWeight: 'bold' }}>
            /
          </Typography>
        </Grid>
        <Grid item key="register">
          <Typography variant={variant}>
            <Link href="/register" prefetch={false}>
              <MatLink>Регистрация</MatLink>
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
