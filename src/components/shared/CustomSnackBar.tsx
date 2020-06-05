import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

interface Props {
  open: boolean;
  success: boolean;
  text: string;
  handleClose: () => void;
}

export const CustomSnackBar = (props: Props) => {
  const { open, success, text, handleClose } = props;

  return (
    <Snackbar
      key={`customSnackBar`}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      {success ? (
        <Alert onClose={handleClose} severity="success">
          {text}
        </Alert>
      ) : (
        <Alert onClose={handleClose} severity="error">
          {text}
        </Alert>
      )}
    </Snackbar>
  );
};
