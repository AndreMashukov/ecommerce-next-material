import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const PersonalOrderIdPage = () => {
  return (
    <>
      <div style={{ margin: '20px' }}>
        <Grid container direction="column" justify="center" spacing={2}>
          <Grid item>
            <Typography>Ваш заказ успешно принят!</Typography>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default PersonalOrderIdPage;
