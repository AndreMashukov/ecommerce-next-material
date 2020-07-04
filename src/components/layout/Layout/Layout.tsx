import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Layout.scss';
import theme from '../../../theme/theme';

interface Props {
  children: React.ReactNode;
}

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main
  }
});

export const Layout: React.FC<Props>  = (props: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className="root-layout">
        {props.children}
      </div>
    </div>
  );
};
