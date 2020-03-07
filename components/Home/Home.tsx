import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './Home.scss';

export const Home = () => {
  return (
    <div className="card-root">
      <Card className="card">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Categories
          </Typography>
          <Typography variant="h5" component="h2">
            Consumer Electronics
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">See More</Button>
        </CardActions>
      </Card>
    </div>
  );
};
