import React from 'react';
import { getSections } from '../services/CatalogApi';
import { PRODUCT_CATALOG_ID, SECTION_LEVELS, CATALOG_NAME } from '../constants';
import { Section } from '../models';
import { NextPageContext } from 'next';
import { handleSession } from '../utils/handleSession';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useRouter } from 'next/router';
import { CustomTabs } from '../components/shared';

enum TABS {
  PUPOSE_TAB,
  LINE_TAB
}

interface Props {
  _sections: Section[];
  _sessionId: string;
}

interface SectionGridProps {
  _sections: Section[];
}

const CatalogPage = (props: Props) => {
  const [activeTab, setActiveTab] = React.useState(TABS.PUPOSE_TAB);
  const { _sections } = props;

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
      <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '30px' }}>
        <Link color="inherit" href="/">
          Главная
        </Link>
        <Typography color="textPrimary">Каталог</Typography>
      </Breadcrumbs>
      <CustomTabs
        tabs={['НАЗНАЧЕНИЕ','ЛИНИИ']}
        activeTab={activeTab}
        onTabChange={handleChange}/>
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
  const router = useRouter();

  const handleCardClick = (code: string) => {
    if (process.browser) {
      router.push('/' + CATALOG_NAME + '/' + code);
    }
  };

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-end"
      wrap="wrap"
      spacing={3}
    >
      {_sections.map((section) => (
        <Grid key={section.code} item xs={10} sm={6} md={3}>
          <Card
            variant="outlined"
            onClick={() => {
              handleCardClick(section.code);
            }}
          >
            <Grid
              container
              direction="column"
              justify="flex-end"
              alignItems="center"
              style={{height: '100%'}}
            >
              <CardContent></CardContent>
              <CardActions>
                <Typography variant="body1">
                  {section.name}
                </Typography>
              </CardActions>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
