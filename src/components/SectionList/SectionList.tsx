import { Section } from '../../models';
import { Typography } from '@material-ui/core';
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
    <div className={classes.item}>
      {props.sections.map(category => (
        <div key={category.code}>
          <a href={'/catalog/mirra-test/' + category.code} className={classes.item}>
            <Typography variant="body1">{category.name}</Typography>
          </a>
        </div>
      ))}
    </div>
  );
};
