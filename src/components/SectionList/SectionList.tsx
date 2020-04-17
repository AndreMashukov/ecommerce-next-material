import { Section } from '../../models';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import theme from '../../theme/theme';

const CATEGORY_BEAUTY = 1;

interface SectionListProps {
  sections: Section[];
}

const useStyles = makeStyles({
  item: {
    cursor: 'pointer',
    color: theme.palette.primary.dark,
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
});

export const SectionList = (props: SectionListProps) => {
  const classes = useStyles();
  const { sections } = props;
  const categoryId =
    sections.length > 0
      ? Math.max.apply(
          Math,
          sections.map(item => item.categoryId),
        )
      : 0;

  return (
    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
      {categoryId === CATEGORY_BEAUTY && (
        <>
          <Grid item>
            <Typography variant="caption" color={'textSecondary'}>
              НАЗНАЧЕНИЕ
            </Typography>
            {sections
              .filter(category => category.depthLevel === 2)
              .map(category => (
                <a href={'/catalog/mirra-test/' + category.code} className={classes.item}>
                  <Typography variant="body2">{category.name}</Typography>
                </a>
              ))}
          </Grid>
          <Grid item></Grid>
        </>
      )}
      {categoryId !== CATEGORY_BEAUTY && (
        <>
          <Grid item>
            {sections.map(category => (
              <a href={'/catalog/mirra-test/' + category.code} className={classes.item}>
                <Typography variant="body2">{category.name}</Typography>
              </a>
            ))}
          </Grid>
        </>
      )}
    </Grid>
  );
};
