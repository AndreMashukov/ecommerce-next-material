import React from 'react';
import { getSections } from '../services/CatalogApi';
import { PRODUCT_CATALOG_ID, SECTION_LEVELS } from '../constants';
import { Section } from '../models';
import { NextPageContext } from 'next';
import { handleSession } from '../utils/handleSession';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import theme from '../theme/theme';
import clsx from 'clsx';
import Link from '@material-ui/core/Link';

enum TABS {
  PUPOSE_TAB,
  LINE_TAB
}

interface Props {
  _sections: Section[];
  _sessionId: number;
}

interface SectionGridProps {
  _sections: Section[];
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

const CatalogPage = (props: Props) => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = React.useState(TABS.PUPOSE_TAB);
  const { _sections } = props;
  const tabStyle = (tab: number) =>
    clsx(
      classes.tab,
      activeTab === tab ? classes.activeTab : classes.defaultTab
    );

  const lineSections = _sections.filter(
    (item) => item.depthLevel === SECTION_LEVELS.TOP_LEVEL
  );

  const purposeSections = _sections.filter(
    (item) => item.depthLevel === SECTION_LEVELS.SUB_LEVEL && item.categoryId
  );

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" style={{marginBottom: '30px'}}>
        <Link color="inherit" href="/">
          Главная
        </Link>
        <Typography color="textPrimary">Каталог</Typography>
      </Breadcrumbs>
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
            onChange={handleChange}
            aria-label="catalog-tabs"
          >
            <Tab label="НАЗНАЧЕНИЕ" className={tabStyle(TABS.PUPOSE_TAB)} />
            <Tab label="ЛИНИИ" className={tabStyle(TABS.LINE_TAB)} />
          </Tabs>
        </Paper>
      </Grid>
      <div>
        {activeTab === TABS.PUPOSE_TAB && (
          <SectionGrid _sections={purposeSections} />
        )}
        {activeTab === TABS.LINE_TAB && (
          <SectionGrid _sections={lineSections} />
        )}
      </div>
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

const SectionGrid = (props: SectionGridProps) => {
  const { _sections } = props;
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      wrap="wrap"
      spacing={3}
    >
      {_sections.map((section) => (
        <Grid key={section.code} item xs={3}>
          <Card variant="outlined" style={{ minHeight: '100px' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {section.name}
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
