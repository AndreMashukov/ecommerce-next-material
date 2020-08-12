import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import SessionContext from '../../store/SessionContext/SessionContext';
import blue from '@material-ui/core/colors/blue';
import { Roles } from '../../constants';
import { useRouter } from 'next/router';

const useStyles = makeStyles({
  adminPaper: {
    padding: '5px 15px 5px 15px',
    color: 'white',
    fontWeight: 'bolder',
    backgroundColor: blue[400],
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: blue[300]
    }
  }
});

interface AdminSwitchProps {
  switchTo: string;
}

export const AdminSwitch: React.FC<AdminSwitchProps> = (props: AdminSwitchProps) => {
  const classes = useStyles();
  const { getUser } = useContext(SessionContext);
  const router = useRouter();
  const isSwitchToAdmin = props.switchTo === 'admin' ? true : false;

  function handleAdminPaperClick() {
    if (process.browser) {
      if (isSwitchToAdmin) {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
    }
  }
  return (
    <div>
      {getUser() && getUser().groupId === Roles.Admin && (
        <div className="admin-panel">
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <Grid item>
              <Paper
                className={classes.adminPaper}
                onClick={handleAdminPaperClick}
              >
                <Typography variant="caption">
                  {isSwitchToAdmin ? 'Административный раздел' : 'Сайт'}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};
