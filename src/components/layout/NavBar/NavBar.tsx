import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import './NavBar.scss';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import theme from '../../../theme/theme';
import { NavBarCart } from '../../NavBarCart/NavBarCart';
import { SectionList } from '../../shared';
import { Section, Category } from '../../../models/Section';

interface NavBarProps {
  sections: Section[];
  categories: Category[];
}

const useStyles = makeStyles({
  upperSection: {
    padding: '5px 0 5px 0',
    'background-color': theme.palette.primary.main
  },
  middleSection: {
    padding: '15px 0 15px 0',
    'border-bottom': `1px solid ${theme.palette.secondary.main}`
  },
  bottomSection: {
    padding: '15px 0 15px 0'
  },
  paper: {
    padding: theme.spacing(1),
    'min-width': '400px',
    'max-width': '500px',
    'overflow-y': 'scroll'
  },
  topCategory: {
    color: theme.palette.primary.dark,
    cursor: 'default',
    'font-size': '1.05rem',
    '&:hover': {
      color: theme.palette.secondary.main
    }
  },
  sectionsPopup: {
    position: 'absolute',
    height: '300px',
    width: '100%',
    'z-index': '10',
    overflow: 'hidden',
    backgroundColor: theme.palette.primary.light,
    padding: '10px 0 0 5px',
    borderBottom: `1px solid ${theme.palette.primary.main}`
  }
});

const filterSections = (sections: Section[], categoryId: number): Section[] => {
  return sections.filter((item) => item.categoryId === categoryId);
};

export const NavBar = (props: NavBarProps) => {
  const classes = useStyles();
  const { categories, sections } = props;
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState(0);

  return (
    <div>
      <div className={classes.upperSection}>
        <div className="navbar-layout">
          <Grid container direction="row" justify="flex-start" spacing={2}>
            <Grid item>
              <Typography variant="subtitle2">Доставка</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">Оплата</Typography>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="navbar-layout">
        <div className={classes.middleSection}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <a href="\">
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                  spacing={5}
                >
                  <Grid item>
                    <div className="img-molecule">
                      <img src="/img/molecule.svg" />
                    </div>
                  </Grid>
                  <Grid>
                    <div className="img-logo">
                      <img src="/img/logo.svg" alt="Logo" />
                    </div>
                  </Grid>
                </Grid>
              </a>
            </Grid>
            <Grid item>
              <NavBarCart />
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="navbar-layout">
        <div
          className={classes.bottomSection}
          onMouseLeave={() => {
            setOpen(false);
          }}
        >
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={2}
              >
                {categories.map((category: Category) => (
                  <Grid
                    onMouseEnter={() => {
                      setOpen(true);
                      setSelection(category.categoryId);
                    }}
                    key={`topCategory${category.categoryId}`}
                    className={classes.topCategory}
                    item
                  >
                    {category.categoryName}
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </div>
      </div>
      <div
        style={{ display: open ? 'block' : 'none' }}
        className={classes.sectionsPopup}
        onMouseEnter={() => {
          setOpen(true);
        }}
        onMouseLeave={() => {
          setOpen(false);
        }}
      >
        <div className="navbar-layout">
          <SectionList sections={filterSections(sections, selection)} />
        </div>
      </div>
    </div>
  );
};
