import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { Paper } from '@material-ui/core';
import theme from '../../theme/theme';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: theme.palette.background.default,
    padding: 8,
    width: '200px'
  }
});

export const Stepper = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Paper square elevation={0} className={classes.root}>
      <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
        <RemoveIcon />
      </Button>
      <React.Fragment>{activeStep + 1}</React.Fragment>
      <Button size="small" onClick={handleNext} >
        <AddIcon />
      </Button>
    </Paper>
  );
};
