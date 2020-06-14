import Typography from '@material-ui/core/Typography';
import './Layout.scss';

export default function Page404() {
  return (
    <div className="page-root-layout">
      <Typography variant="h4" color="textPrimary">
        СТРАНИЦА НЕ НАЙДЕНА (404 NOT FOUND)
      </Typography>
    </div>
  );
}
