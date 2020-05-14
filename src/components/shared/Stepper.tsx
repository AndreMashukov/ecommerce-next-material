import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { Paper, Typography } from '@material-ui/core';
import theme from '../../theme/theme';
import { CartItem } from '../../models';

interface Props {
  item: CartItem;
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
  const { item } = props;
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
      <Button size="small" onClick={handleBack} disabled={item.quantity + activeStep === 1}>
        <RemoveIcon />
      </Button>
      <React.Fragment>
        <Typography variant="body1" style={{fontWeight: 'bold'}}>
          {item.quantity + activeStep}
        </Typography>
      </React.Fragment>
      <Button size="small" onClick={handleNext} >
        <AddIcon />
      </Button>
    </Paper>
  );
};
