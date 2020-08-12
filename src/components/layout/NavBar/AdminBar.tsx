import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './NavBar.scss';
import { makeStyles } from '@material-ui/styles';
import theme from '../../../theme/theme';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { AdminSwitch } from '../../shared';

const useStyles = makeStyles({
  adminBar: {
    padding: '5px 0 5px 0',
    'background-color': theme.palette.primary.main
  }
});

export const AdminBar: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.adminBar}>
        <AdminSwitch switchTo="site" />
        <div className="navbar-layout">
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="baseline"
                spacing={2}
              >
                <Grid item>
                  <Box>
                    <Typography variant="h4" style={{ fontWeight: 'bolder' }}>
                      <SupervisorAccountIcon style={{ fontSize: '120%' }} />
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};
