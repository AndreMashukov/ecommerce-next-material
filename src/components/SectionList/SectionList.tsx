import { Section } from '../../models';
// import Link from 'next/link';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import theme from '../../theme/theme';
import grey from '@material-ui/core/colors/grey';

interface SectionListProps {
  sections: Section[];
}

const useStyles = makeStyles({
  item: {
    cursor: 'pointer',
    color: grey[700],
    '&:hover': {
      color: theme.palette.primary.dark,
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
