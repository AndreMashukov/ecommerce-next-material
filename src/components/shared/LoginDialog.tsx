import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { LoginFormComposed } from '../forms/LoginForm';

interface LoginDialogProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const LoginDialog = (props: LoginDialogProps) => {
  const { isOpen, handleClose } = props;
  return (
    <div>
      <Dialog
        open={isOpen}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Время вашей сессии истекло
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Введите ваш Е-Майл/Пароль
          </DialogContentText>
          <LoginFormComposed />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
