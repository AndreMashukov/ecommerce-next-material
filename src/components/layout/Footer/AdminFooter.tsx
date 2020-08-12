import { makeStyles } from '@material-ui/styles';
import theme from '../../../theme/theme';
import './Footer.scss';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SupervisorAccountTwoToneIcon from '@material-ui/icons/SupervisorAccount';

const useStyles = makeStyles({
  footerBlock: {
    width: '100%',
    'background-color': theme.palette.primary.main,
    padding: '40px'
  }
});

export const AdminFooter: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.footerBlock}>
        <div className="footer-layout">
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4" style={{ fontWeight: 'bolder' }}>
                <SupervisorAccountTwoToneIcon style={{ fontSize: '120%' }}/>
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};
