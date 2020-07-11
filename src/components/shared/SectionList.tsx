import { Section } from '../../models';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import theme from '../../theme/theme';
import grey from '@material-ui/core/colors/grey';
import {
  CATALOG_NAME,
  SECTION_LEVELS,
  CATEGORY_BEAUTY,
  ROW_ITEMS_NUM
} from '../../constants';

interface SectionListProps {
  sections: Section[];
}

const useStyles = makeStyles({
  item: {
    cursor: 'pointer',
    color: grey[900],
    '&:hover': {
      color: theme.palette.secondary.main
    }
  }
});

const getSectionColumn = (sections: Section[], level: number) => {
  const classes = useStyles();
  const sectionNum = sections.filter((item) => item.depthLevel === level)
    .length;
  const sectionColumn = new Array(Math.ceil(sectionNum / ROW_ITEMS_NUM));
  let index = 1;
  for (let i = 0; i < Math.ceil(sectionNum / ROW_ITEMS_NUM); i++) {
    sectionColumn[i] = (
      <>
        {sections
          .filter((item) => item.depthLevel === level)
          .slice(i * ROW_ITEMS_NUM, index * ROW_ITEMS_NUM)
          .map((category) => (
            <div key={category.code}>
              <a
                key={category.code}
                href={'/' + CATALOG_NAME + '/' + category.code}
                className={classes.item}
              >
                <Typography variant="body2">{category.name}</Typography>
              </a>
            </div>
          ))}
      </>
    );
    index++;
  }

  return sectionColumn;
};

export const SectionList: React.FC<SectionListProps> = (
  props: SectionListProps
) => {
  const classes = useStyles();
  const { sections } = props;
  const categoryId =
    sections.length > 0
      ? Math.max.apply(
          Math,
          sections.map((item) => item.categoryId)
        )
      : 0;

  const sectionColumnLines = getSectionColumn(
    sections,
    SECTION_LEVELS.TOP_LEVEL
  );
  const sectionColumnPurpose = getSectionColumn(
    sections,
    SECTION_LEVELS.SUB_LEVEL
  );

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      spacing={2}
    >
      {categoryId === CATEGORY_BEAUTY && (
        <>
          <Grid item>
            <Typography variant="caption" color={'textSecondary'}>
              НАЗНАЧЕНИЕ
            </Typography>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              spacing={2}
            >
              {sectionColumnPurpose.map((column, _index) => (
                <Grid key={_index} item>
                  {column}
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="caption" color={'textSecondary'}>
              ЛИНИИ
            </Typography>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              spacing={2}
            >
              {sectionColumnLines.map((column, _index) => (
                <Grid key={_index} item>
                  {column}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </>
      )}
      {categoryId !== CATEGORY_BEAUTY && (
        <>
          <Grid item>
            {sections.map((category) => (
              <a
                key={category.code}
                href={'/' + CATALOG_NAME + '/' + category.code}
                className={classes.item}
              >
                <Typography variant="body2">{category.name}</Typography>
              </a>
            ))}
          </Grid>
        </>
      )}
    </Grid>
  );
};
