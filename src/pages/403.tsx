import Typography from '@material-ui/core/Typography';
import './Layout.scss';

export default function Page403() {
  return (
    <div className="page-root-layout">
      <Typography variant="h4" color="textPrimary">
        ВЫ НЕ АВТОРИЗОВАНЫ (403 UNAUTHORIZED)
      </Typography>
    </div>
  );
}
