import React from 'react';
import { Theme } from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';
import './Layout.scss';

interface Props {
  // tslint:disable-next-line: no-any
  children: any;
  classes: {
    root: string;
  };
}

const styles = ({ palette }: Theme) => createStyles({
  root: {
    backgroundColor: palette.background.default,
    color: palette.primary.main
  }
});

export const PageLayout = class extends React.Component<Props> {
  render() {
    return (
      <div className={this.props.classes.root}>
        <div className="root-layout">
          {this.props.children}
        </div>
      </div>
    );
  }
};

export const Layout = withStyles(styles) (PageLayout);
