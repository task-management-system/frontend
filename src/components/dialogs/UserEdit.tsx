import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, makeStyles } from '@material-ui/core';
import { useFormik } from 'formik';
import NormalButton from 'components/themed/NormalButton';
import UserInfo from 'components/user/UserInfo';
import { updateUser } from 'api/v1';
import { User } from 'types';
import { DialogChildrenHelpers } from 'types/components/dialogs';
import { UndefinableUserForm } from 'types/components/user';

interface UserEditProps {
  user: User;
  onChange: () => Promise<void>;
  children: (helpers: DialogChildrenHelpers) => React.ReactNode;
}

const useStyles = makeStyles(theme => ({
  content: {
    overflowY: 'unset',
  },
}));

const UserEdit: React.FC<UserEditProps> = ({ children, user, onChange }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const formik = useFormik<UndefinableUserForm>({
    initialValues: {
      username: undefined,
      name: undefined,
      email: undefined,
      role: undefined,
    },
    onSubmit: values => {
      if (user !== null) {
        updateUser(user.id, {
          username: values.username || user.username,
          name: values.name || null,
          email: values.email || null,
          roleId: values.role?.id || user.role.id,
        }).then(() => {
          onChange();
          handleClose();
        });
      }
    },
  });

  const resetForm = () => {
    formik.resetForm({
      values: {
        username: user?.username,
        name: user?.name || undefined,
        email: user?.email || undefined,
        role: user?.role,
      },
    });
  };

  useEffect(() => {
    resetForm();
  }, [user]);

  return (
    <>
      {children({ handleOpen, handleClose })}
      <Dialog maxWidth="md" open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{user?.username}</DialogTitle>
        <DialogContent className={classes.content}>
          <UserInfo user={user} form={formik} editing={true} />
        </DialogContent>
        <DialogActions>
          <NormalButton color="primary" onClick={handleClose}>
            Отмена
          </NormalButton>
          <NormalButton color="primary" onClick={formik.submitForm}>
            Сохранить
          </NormalButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserEdit;
