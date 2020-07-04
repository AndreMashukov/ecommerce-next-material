import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import theme from '../../theme/theme';

interface Props {
  isDisabled: boolean;
  value: number;
  onHandleBack: () => void;
  onHandleNext: () => void;
}

const useStyles = makeStyles({
  stepperPaper: {
    background: theme.palette.background.default,
    padding: '10px'
  }
});

export const Stepper: React.FC<Props> = (props: Props) => {
  const { value, onHandleNext, onHandleBack, isDisabled } = props;
  const classes = useStyles();

  return (
    <div
      style={{
        width: '200px',
        border: `1px solid ${theme.palette.primary.dark}`
      }}
    >
      <Paper className={classes.stepperPaper} elevation={0}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={4}>
            <Button
              disabled={isDisabled || value === 1}
              size="small"
              onClick={onHandleBack}
            >
              <RemoveIcon />
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>
              {value}
            </Typography>
          </Grid>
          <Grid item>
            <Button disabled={isDisabled} size="small" onClick={onHandleNext}>
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
