import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative'
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1
    }
  })
);

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

export const BurgerMenuDialog: React.FC<Props> = (props: Props) => {
  const { isOpen, handleClose } = props;
  const classes = useStyles();

  return (
    <div>
      <Dialog fullScreen open={isOpen} onClose={handleClose}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Grid
              container
              justify="flex-start"
              alignItems="flex-end"
              spacing={3}
            >
              <Grid item>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
              <Grid item style={{ padding: '5px 0 15px 0'}}>
                <div style={{ height: '30px'}}>
                  <img src="/img/logo.svg" alt="Logo" />
                </div>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
};
