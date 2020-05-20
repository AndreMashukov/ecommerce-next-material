import React from 'react';
import { getSections } from '../services/CatalogApi';
import { PRODUCT_CATALOG_ID } from '../constants';
import { Section } from '../models';
import { NextPageContext } from 'next';
import { handleSession } from '../utils/handleSession';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import theme from '../theme/theme';

interface Props {
  _sections: Section[];
  _sessionId: number;
}

const useStyles = makeStyles({
  paper: {
    backgroundColor: theme.palette.primary.light
  },
  tab: {
    fontWeight: 'bold'
  }
});

const CatalogPage = (props: Props) => {
  const { _sections } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        >
        <Paper square elevation={0} className={classes.paper}>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="secondary"
            onChange={handleChange}
            aria-label="catalog-tabs"
          >
            <Tab label="НАЗНАЧЕНИЕ" className={classes.tab}/>
            <Tab label="ЛИНИИ" className={classes.tab}/>
          </Tabs>
        </Paper>
      </Grid>
      {_sections.map((section) => (
        <div key={`catalog_${section.code}`}>{section.name}</div>
      ))}
    </div>
  );
};

CatalogPage.getInitialProps = async (ctx: NextPageContext) => {
  const sectionList = await getSections(PRODUCT_CATALOG_ID);
  const session = await handleSession(ctx);
  return {
    _sections: sectionList,
    _sessionId: session._sessionId
  };
};

export default CatalogPage;
