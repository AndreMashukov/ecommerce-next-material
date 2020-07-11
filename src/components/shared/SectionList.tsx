import { Section } from '../../models';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MatLink from '@material-ui/core/Link';
import {
  CATALOG_NAME,
  SECTION_LEVELS,
  CATEGORY_BEAUTY
} from '../../constants';
import { SectionColumns } from './SectionColumns';

interface SectionListProps {
  sections: Section[];
}

export const SectionList: React.FC<SectionListProps> = (
  props: SectionListProps
) => {
  const { sections } = props;
  const categoryId =
    sections.length > 0
      ? Math.max.apply(
          Math,
          sections.map((item) => item.categoryId)
        )
      : 0;

  const sectionBeautyLines = SectionColumns(
    sections,
    SECTION_LEVELS.TOP_LEVEL
  );
  const sectionBeautyPurpose = SectionColumns(
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
              {sectionBeautyPurpose.map((column, _index) => (
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
              {sectionBeautyLines.map((column, _index) => (
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
              <MatLink
                key={category.code}
                href={'/' + CATALOG_NAME + '/' + category.code}
              >
                <Typography variant="body2">{category.name}</Typography>
              </MatLink>
            ))}
          </Grid>
        </>
      )}
    </Grid>
  );
};
