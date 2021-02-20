import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import WideDialog from 'components/themed/WideDialog';
import NormalButton from 'components/themed/NormalButton';
import UserInfo from 'components/user/UserInfo';
import { updateUser } from 'api/v1';
import { IUser } from 'types';
import { TUndefinableUserForm } from 'types/components/user';

interface IChildrenHelpers {
  handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface IUserEditProps {
  user: IUser;
  onChange: () => Promise<void>;
  children: (helpers: IChildrenHelpers) => React.ReactNode;
}

const UserEdit: React.FC<IUserEditProps> = ({ children, user, onChange }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const formik = useFormik<TUndefinableUserForm>({
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
          isActive: user.isActive,
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
      <WideDialog open={open} onClose={handleClose}>
        <DialogTitle>{user?.username}</DialogTitle>
        <DialogContent>
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
      </WideDialog>
    </>
  );
};

export default UserEdit;
