import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import '../Layout.scss';
import TocIcon from '@material-ui/icons/Toc';
import { DASHBOARD_ITEMS } from '../../constants';
import { useRouter } from 'next/router';

const AdminDashboardPage = () => {
  const router = useRouter();
  const handleCardClick = (path: string) => {
    if (process.browser) {
      router.push(`/admin/${path}`);
    }
  };

  useEffect(() => {
    DASHBOARD_ITEMS.forEach(item => {
      router.prefetch(`/admin/${item.path}`);
    });
  }, []);

  return (
    <div className="page-root-layout">
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
            Администрирование
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item xs={12}>
          <Grid container direction="column" justify="center">
            <Grid item>
              <Grid
                container
                direction="row"
                justify="flex-start"
                wrap="wrap"
                spacing={2}
              >
                {DASHBOARD_ITEMS.map(item => (
                  <Grid key={item.id} item xs={10} sm={6} md={4} lg={3}>
                    <Card
                      variant="outlined"
                      style={{ height: '150px' }}
                      onClick={() => {
                        handleCardClick(item.path);
                      }}
                    >
                      <Grid
                        container
                        direction="column"
                        justify="flex-end"
                        alignItems="center"
                        style={{ height: '100%' }}
                      >
                        <CardContent>
                          <Grid
                            container
                            direction="column"
                            justify="space-between"
                            spacing={2}
                          >
                            <Grid item>
                              <Grid
                                container
                                justify="center"
                                style={{
                                  maxWidth: '120px',
                                  padding: '0 30px 0 30px',
                                  margin: 'auto'
                                }}
                              >
                                <TocIcon />
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Grid container justify="center">
                                <Typography variant="h6">{item.title}</Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                        <CardActions></CardActions>
                      </Grid>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboardPage;
