import { makeStyles } from '@material-ui/styles';
import theme from '../../../theme/theme';
import './Footer.scss';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  footer: {
    width: '100%',
    height: '100px',
    'background-color': theme.palette.primary.main
  }
});

export const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <div className="footer-layout">
        <Grid container direction="row" justify="flex-start" alignItems="center">
          <Grid item>
            <div className="footer-block">
              <Typography variant="body1">
                © Интернет-Магазин MIRRA, 2020
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
