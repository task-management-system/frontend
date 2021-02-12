import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Fade, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useFormik } from 'formik';
import Container from 'components/common/Container';
import UserInfo from 'components/user/UserInfo';
import NormalButton from 'components/themed/NormalButton';
import ToggleLockButton from 'components/user/ToggleLockButton';
import usePromiseTrack from 'hooks/usePromiseTrack';
import { getUser, updateUser } from 'api/v1';
import { IUser } from 'types';
import { TUndefinableUserForm } from 'types/components/user';

interface IRouteParams {
  id: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    gap: theme.spacing(2),
    display: 'grid',
    gridAutoRows: 'max-content',
  },
  buttons: {
    gap: theme.spacing(2),
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
    justifyContent: 'end',
  },
}));

const User: React.FC = () => {
  const classes = useStyles();
  const { params } = useRouteMatch<IRouteParams>();
  const [user, setUser] = useState<IUser | null>(null);
  const [editing, setEditing] = useState(false);
  const [inProgress, trackedGetUser] = usePromiseTrack(getUser);

  const handleLoadUser = async () => {
    const response = await trackedGetUser(parseInt(params.id));
    setUser(response.data || null);
  };

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
          password: '12345',
          name: values.name || null,
          email: values.email || null,
          isActive: user.isActive,
          roleId: values.role?.id || user.role.id,
        }).then(response => {
          if (response.details.ok) {
            setUser({
              ...user,
              username: values.username || user.username,
              name: values.name || null,
              email: values.email || null,
              isActive: user.isActive,
              role: values.role || user.role,
            });
          }
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

  const handleEditingClick = () => {
    if (editing) {
      formik.submitForm();
    }

    setEditing(editing => !editing);
  };

  useEffect(() => {
    handleLoadUser();
  }, [params.id]);

  return (
    <Container className={classes.root}>
      <UserInfo user={user} editing={editing} form={formik} />
      <div className={classes.buttons}>
        {user !== null ? (
          <>
            <Fade in={true}>
              <ToggleLockButton
                userId={user.id}
                isActive={user.isActive}
                disabled={editing}
                onClick={handleLoadUser}
              />
            </Fade>
            <Fade in={true}>
              <NormalButton color="primary" disabled={inProgress} onClick={handleEditingClick}>
                {editing ? 'Сохранить' : 'Редактировать'}
              </NormalButton>
            </Fade>
          </>
        ) : (
          <>
            <Skeleton variant="rect" width={128} height={32} />
            <Skeleton variant="rect" width={128} height={32} />
          </>
        )}
      </div>
    </Container>
  );
};

export default User;
