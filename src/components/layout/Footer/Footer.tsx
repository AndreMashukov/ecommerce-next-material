import { makeStyles } from '@material-ui/styles';
import theme from '../../../theme/theme';
import './Footer.scss';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PhoneInTalkTwoToneIcon from '@material-ui/icons/PhoneInTalkTwoTone';

const useStyles = makeStyles({
  footerPhone: {
    width: '100%',
    'background-color': theme.palette.primary.main,
    padding: '40px'
  },
  footerCopyright: {
    padding: '40px 0 40px 0'
  }
});

export const Footer: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.footerPhone}>
        <div className="footer-layout">
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4" style={{ fontWeight: 'bolder' }}>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="baseline"
                  spacing={2}
                >
                  <Grid item>
                    <Box display={{ xs: 'none', sm: 'block' }}>
                      <PhoneInTalkTwoToneIcon style={{ fontSize: '120%' }} />
                    </Box>
                  </Grid>
                  <Grid item>
                    <span>8 (925) 063-39-27</span>
                  </Grid>
                </Grid>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">Мы работаем всю неделю</Typography>
              <Typography variant="body2">Ежедневно. Без выходных.</Typography>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="footer-layout">
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          className={classes.footerCopyright}
        >
          <Grid item xs={12} sm={12} md={4}>
            <div className="footer-block">
              <Typography variant="body1">
                © Интернет-Магазин MIRRA, 2020
              </Typography>
              <Box display={{ xs: 'none', sm: 'none', md: 'block' }}>
                <Typography variant="body2" color="textSecondary">
                  Воспроизведение материалов данного сайта возможно при условии
                  обязательного размещения активной ссылки
                </Typography>
              </Box>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
