import React , { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import './NavBar.scss';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import theme from '../../theme/theme';
import { NavBarCart } from '../NavBarCart/NavBarCart';
import { Section } from '../../models/Section';
import { getSections } from '../../services/CatalogApi';
import { PRODUCT_CATALOG_ID } from '../../constants';

interface NavBarProps {
  sections: Section[];
  categories: Category[];
}

interface Category {
  categoryId: number;
  categoryName: string;
}

const useStyles = makeStyles({
  upperSection: {
    padding: '5px 0 5px 0',
    'background-color': theme.palette.primary.main,
  },
  middleSection: {
    padding: '15px 0 15px 0',
    'border-bottom': `1px solid ${theme.palette.secondary.main}`,
  },
  bottomSection: {
    padding: '15px 0 15px 0',
  },
  paper: {
    padding: theme.spacing(1),
    'min-width': '400px',
    'max-width': '500px',
    'overflow-y': 'scroll'
  },
  topCategory: {
    color: theme.palette.primary.dark,
    cursor: 'pointer',
    'font-size': '1.05rem',
    '&:hover': {
      color: theme.palette.secondary.main,
    }
  }
});

const getCategories = (sections: Section[]): Category[] => {
  const categories: Category[] = [];
  !!sections && sections.forEach(item => {
    const category: Category = {
      categoryId: item.categoryId,
      categoryName: item.categoryName
    };

    // tslint:disable-next-line: no-shadowed-variable
    if (item.categoryId > 0 && !categories.find(_item => _item.categoryId === category.categoryId)) {
      categories.push(category);
    }
  });

  return categories;
};

export const NavBar = (props: NavBarProps) => {
  const classes = useStyles();
  const [ sections, setSections ] = useState(props.sections);
  const [ categories, setCategories ] = useState(null);

  useEffect(() => {
    const loadSections = async () => {
      const sectionList: Section[] = await getSections(PRODUCT_CATALOG_ID);
      setSections(sectionList);
      setCategories(getCategories(sectionList));
    };

    loadSections();
  }, [0]);

  // tslint:disable-next-line: no-console
  console.log(sections);

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
          <Grid container direction="row" justify="space-between" alignItems="center" spacing={2}>
            <Grid item>
              <a href="\">
                <Grid container direction="row" justify="flex-start" alignItems="center" spacing={5}>
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
        <div className={classes.bottomSection}>
          <Grid container direction="row" justify="space-between" alignItems="center" spacing={2}>
            <Grid item>
              <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
                {
                  !!categories && categories.map((category: Category) => (
                    <Grid
                      key={`topCategory${category.categoryId}`}
                      className={classes.topCategory}
                      item>
                      {category.categoryName}
                    </Grid>
                  ))
                }
              </Grid>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};
