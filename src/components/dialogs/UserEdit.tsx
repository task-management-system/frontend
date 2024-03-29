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
  onChange: (payload: User) => void;
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
    onSubmit: (values, helpers) => {
      helpers.setSubmitting(true);

      if (user !== null) {
        updateUser({
          id: user.id,
          username: values.username || user.username,
          name: values.name || null,
          email: values.email || null,
          roleId: values.role?.id || user.role.id,
        })
          .then(response => {
            helpers.setSubmitting(false);

            handleClose();

            if (response.data !== null) {
              onChange(response.data);
            }
          })
          .catch(() => {
            helpers.setSubmitting(false);
          });
      }
    },
  });

  useEffect(() => {
    formik.resetForm({
      values: {
        username: user?.username,
        name: user?.name || undefined,
        email: user?.email || undefined,
        role: user?.role,
      },
    });
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {children({ handleOpen, handleClose })}
      <Dialog maxWidth="md" open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{user?.username}</DialogTitle>
        <form action="#" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <DialogContent className={classes.content}>
            <UserInfo user={user} form={formik} editing={true} />
          </DialogContent>
          <DialogActions>
            <NormalButton color="primary" disabled={formik.isSubmitting} onClick={handleClose}>
              Отмена
            </NormalButton>
            <NormalButton
              type="submit"
              color="primary"
              disabled={formik.isSubmitting}
              onClick={formik.submitForm}
            >
              Сохранить
            </NormalButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default UserEdit;
