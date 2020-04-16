import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Layout.scss';
import theme from '../../theme/theme';

interface Props {
  // tslint:disable-next-line: no-any
  children: any;
}

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main,
  }
});

export const Layout = (props: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className="root-layout">
        {props.children}
      </div>
    </div>
  );
};
