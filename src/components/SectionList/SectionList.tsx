import { Section } from '../../models';
import Link from 'next/link';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import theme from '../../theme/theme';

interface SectionListProps {
  sections: Section[];
}

const useStyles = makeStyles({
  item: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.dark
    }
  }
});

export const SectionList = (props: SectionListProps) => {
  const classes = useStyles();

  return (
    <div>
      {props.sections.map(category => (
        <div key={category.code}>
          <Link href={'/catalog/mirra-test/' + category.code} prefetch={false}>
            <Typography color="textSecondary">
              <div className={classes.item}>{category.name}</div>
            </Typography>
          </Link>
        </div>
      ))}
    </div>
  );
};
