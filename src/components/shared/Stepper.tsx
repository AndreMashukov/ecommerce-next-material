import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { Paper, Typography } from '@material-ui/core';
import theme from '../../theme/theme';

interface Props {
  value: number;
  onHandleBack: (nextValue: number) => void;
  onHandleNext: (nextValue: number) => void;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: theme.palette.background.default,
    padding: 8,
    width: '200px',
    border: `1px solid ${theme.palette.primary.dark}`
  }
});

export const Stepper = (props: Props) => {
  const { value, onHandleNext, onHandleBack } = props;
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(value);

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>  {
      onHandleNext(activeStep + 1);

      return prevActiveStep + 1;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      onHandleBack(activeStep-1);

      return prevActiveStep - 1;
    });
  };

  return (
    <Paper square elevation={0} className={classes.root}>
      <Button size="small" onClick={handleBack} disabled={activeStep === 1}>
        <RemoveIcon />
      </Button>
      <React.Fragment>
        <Typography variant="body1" style={{fontWeight: 'bold'}}>
          {activeStep}
        </Typography>
      </React.Fragment>
      <Button size="small" onClick={handleNext} >
        <AddIcon />
      </Button>
    </Paper>
  );
};
