import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const PersonalProfilePage = () => {
  return (
    <>
      <div style={{ margin: '20px' }}>
        <Grid container direction="column" justify="center" spacing={2}>
          <Grid item>
            <Typography variant="h5" color="textPrimary">
              ВАШ ПРОФИЛЬ
            </Typography>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default PersonalProfilePage;
