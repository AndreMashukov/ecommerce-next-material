import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    marginTop: '-200px'
  }
});

export const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.stickToBottom}>
      <BottomNavigation>
        <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
      </BottomNavigation>
    </div>
  );
};
