import { Section } from '../../models';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import theme from '../../theme/theme';

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

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      spacing={2}>
      {props.sections.map(category => (
        <Grid item key={category.code} xs={2}>
          <a href={'/catalog/mirra-test/' + category.code} className={classes.item}>
            <Typography variant="body2">{category.name}</Typography>
          </a>
        </Grid>
      ))}
    </Grid>
  );
};
