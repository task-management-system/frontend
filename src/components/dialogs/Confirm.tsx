import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import NormalButton from 'components/themed/NormalButton';
import { noop } from 'utils';
import { ConfirmDialogChildrenHelpers } from 'types/components/dialogs';

interface ConfirmProps {
  title?: string;
  message?: string;
  accept?: string;
  cancel?: string;
  onAccept?: () => void;
  onCancel?: () => void;
  children: (helpers: ConfirmDialogChildrenHelpers) => React.ReactNode;
}

const Confirm: React.FC<ConfirmProps> = ({
  children,
  title = 'Подтвердите действие',
  message = 'Вы действительно уверены?',
  accept = 'Принять',
  cancel = 'Отменить',
  onAccept = noop,
  onCancel = noop,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleAccept = () => {
    handleClose();
    onAccept();
  };

  const handleCancel = () => {
    handleClose();
    onCancel();
  };

  return (
    <>
      {children({
        handleOpen,
        handleClose,
        handleAccept,
        handleCancel,
      })}
      <Dialog open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <NormalButton color="primary" onClick={handleCancel}>
            {cancel}
          </NormalButton>
          <NormalButton color="primary" onClick={handleAccept}>
            {accept}
          </NormalButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Confirm;
