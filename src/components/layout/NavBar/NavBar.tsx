import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import './NavBar.scss';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';
import theme from '../../../theme/theme';
import {
  NavBarCart,
  SectionList,
  BurgerMenuDialog,
  AuthNavBar
} from '../../shared';
import { Section, Category } from '../../../models';
import { filterSections } from '../../../utils/Section';
import SessionContext from '../../../store/SessionContext/SessionContext';
import blue from '@material-ui/core/colors/blue';
import { Roles } from '../../../constants';

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
  },
  adminPaper: {
    padding: '5px 15px 5px 15px',
    color: 'white',
    fontWeight: 'bolder',
    backgroundColor: blue[400]
  }
});

export const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
  const classes = useStyles();
  const { categories, sections } = props;
  const [open, setOpen] = useState(false);
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
  const [selection, setSelection] = useState(0);
  const { getUser } = useContext(SessionContext);

  return (
    <div>
      <div className={classes.upperSection}>
        {getUser() && getUser().groupId === Roles.Admin && (
          <div className="admin-panel">
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <Grid item>
                <Paper className={classes.adminPaper}>
                  <Typography variant="caption">
                    Административный раздел
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </div>
        )}
        <div className="navbar-layout">
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Box
                onClick={() => {
                  setOpenBurgerMenu(true);
                }}
                display={{ xs: 'block', sm: 'none', md: 'none', lg: 'none' }}
              >
                <div className="container">
                  <div className="menu-icon">
                    <span className="line-1"></span>
                    <span className="line-2"></span>
                    <span className="line-3"></span>
                  </div>
                </div>
              </Box>
              <Box display={{ xs: 'none', sm: 'block' }}>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  spacing={2}
                >
                  <Grid item>
                    <Typography variant="body1">Доставка</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">Оплата</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item>
              <AuthNavBar />
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
                    <Box
                      className="img-molecule"
                      display={{ xs: 'none', sm: 'block' }}
                    >
                      <img src="/img/molecule.svg" />
                    </Box>
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
              <Box display={{ xs: 'none', sm: 'block' }}>
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
              </Box>
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
      <BurgerMenuDialog
        isOpen={openBurgerMenu}
        handleClose={() => {
          setOpenBurgerMenu(false);
        }}
        sections={sections}
        categories={categories}
      />
    </div>
  );
};
