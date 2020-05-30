import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CreatePasswordFormProps } from '../forms/models';
import { CreatePasswordrForm } from '../forms';

interface Props {
  open: boolean;
  setOpen: (status: boolean) => void;
}

export default function CreatePasswordDialog(
  props: Props & CreatePasswordFormProps
) {
  const {
    open,
    setOpen,
    password,
    passwordError,
    onPasswordChange,
    confirmPassword,
    confirmPasswordError,
    onConfirmPasswordChange,
    createPasswordSubmit
  } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const passwords = createPasswordSubmit(props);
    if (passwords) {
      setOpen(false);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Создайте Пароль</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Для отслеживания Ваших заказов будет создан Ваш персональный раздел.
          </DialogContentText>
          <CreatePasswordrForm
            {...{
              password,
              passwordError,
              onPasswordChange,
              confirmPassword,
              confirmPasswordError,
              onConfirmPasswordChange
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Отменить
          </Button>
          <Button variant="outlined" onClick={handleSubmit}>
            Продолжить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
