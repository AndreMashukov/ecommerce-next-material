import React from 'react';
import { getSections } from '../services/CatalogApi';
import {
  PRODUCT_CATALOG_ID,
  SECTION_LEVELS,
  CATALOG_NAME,
  AWS_S3_PREFIX
} from '../constants';
import { Section } from '../models';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useRouter } from 'next/router';
import { CustomTabs } from '../components/shared';
import './Layout.scss';
import { NextPage } from 'next';

enum TABS {
  PURPOSE_TAB,
  LINE_TAB
}

interface Props {
  sections: Section[];
}

interface SectionGridProps {
  sections: Section[];
}

const CatalogPage: NextPage<Props> = (props: Props) => {
  const [activeTab, setActiveTab] = React.useState(TABS.PURPOSE_TAB);
  const { sections } = props;

  const lineSections = sections.filter(
    (item) => item.depthLevel === SECTION_LEVELS.TOP_LEVEL
  );

  const purposeSections = sections.filter(
    (item) => item.depthLevel === SECTION_LEVELS.SUB_LEVEL && item.categoryId
  );

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div className="page-root-layout">
      <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '30px' }}>
        <Link color="inherit" href="/">
          Главная
        </Link>
        <Typography color="textPrimary">Каталог</Typography>
      </Breadcrumbs>
      <CustomTabs
        tabs={['НАЗНАЧЕНИЕ', 'ЛИНИИ']}
        activeTab={activeTab}
        onTabChange={handleChange}
      />
      <div>
        {activeTab === TABS.PURPOSE_TAB && (
          <SectionGrid sections={purposeSections} />
        )}
        {activeTab === TABS.LINE_TAB && <SectionGrid sections={lineSections} />}
      </div>
    </div>
  );
};

CatalogPage.getInitialProps = async () => {
  const sections = await getSections(PRODUCT_CATALOG_ID);
  return {
    sections
  };
};

export default CatalogPage;

const SectionGrid = (props: SectionGridProps) => {
  const { sections } = props;
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
      {sections.map((section) => (
        <Grid key={section.code} item xs={10} sm={6} md={3}>
          <Card
            variant="outlined"
            style={{height: '350px'}}
            onClick={() => {
              handleCardClick(section.code);
            }}
          >
            <Grid
              container
              direction="column"
              justify="flex-end"
              alignItems="center"
              style={{ height: '100%' }}
            >
              <CardContent>
                <Grid
                  container
                  direction="column"
                  justify="space-between"
                  spacing={2}
                >
                  <Grid item>
                    <Grid
                      container
                      justify="center"
                      style={{
                        maxWidth: '120px',
                        padding: '0 30px 0 30px',
                        margin: 'auto'
                      }}
                    >
                      {section.pictureData && (
                        <img
                          height="250"
                          src={`${AWS_S3_PREFIX}${section.pictureData.subdir}/${section.pictureData.fileName}`}
                        />
                      )}
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container justify="center">
                      <Typography variant="h6">{section.name}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions></CardActions>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
