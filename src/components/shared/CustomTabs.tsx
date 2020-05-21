import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import theme from '../../theme/theme';

interface Props {
  tabs: string[];
  activeTab: number;
  onTabChange: (_event: React.ChangeEvent<{}>, newValue: number) => void;
}

const useStyles = makeStyles({
  paper: {
    backgroundColor: theme.palette.primary.light,
    marginBottom: '30px'
  },
  tab: {
    fontWeight: 'bold',
    'z-index': 2,
    fontSize: 'smaller'
  },
  activeTab: {
    color: 'white'
  },
  defaultTab: {
    color: theme.palette.secondary.main
  },
  bigIndicator: {
    height: '100%',
    'z-index': 1
  }
});

export const CustomTabs = (props: Props) => {
  const classes = useStyles();
  const { tabs, activeTab, onTabChange } = props;
  const tabStyle = (tab: number) =>
    clsx(
      classes.tab,
      activeTab === tab ? classes.activeTab : classes.defaultTab
    );

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Paper square elevation={0} className={classes.paper}>
        <Tabs
          value={activeTab}
          classes={{ indicator: classes.bigIndicator }}
          indicatorColor="secondary"
          onChange={onTabChange}
          aria-label="catalog-tabs"
        >
          {tabs.map((tab, index) => (
            <Tab label={tab} className={tabStyle(index)} />
          ))}
        </Tabs>
      </Paper>
    </Grid>
  );
};
