import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { Fade, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Container from 'components/common/Container';
import UserInfo from 'components/user/UserInfo';
import NormalButton from 'components/themed/NormalButton';
import ToggleLockButton from 'components/user/ToggleLockButton';
import usePromiseTrack from 'hooks/usePromiseTrack';
import { haveAnyPermission } from 'utils/permissions';
import { getUser, updateUser } from 'api/v1';
import { IUser } from 'types';
import { TState } from 'types/redux';
import { TUndefinableUserForm } from 'types/components/user';

interface IUserForm {
  id: number;
  permissions: {
    update: boolean;
  };
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

const UserForm: React.FC<IUserForm> = ({ id, permissions }) => {
  const classes = useStyles();
  const [user, setUser] = useState<IUser | null>(null);
  const [editing, setEditing] = useState(false);
  const [inProgress, trackedGetUser] = usePromiseTrack(getUser);

  const handleLoadUser = async () => {
    const response = await trackedGetUser(id);
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
  }, [id]);

  return (
    <Container className={classes.root}>
      <UserInfo user={user} editing={editing} form={formik} />
      {permissions.update && (
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
      )}
    </Container>
  );
};

const mapStateToProps = ({ metaData }: TState) => ({
  permissions: {
    update: haveAnyPermission(metaData.user?.role.power, ['UpdateUser'], metaData.permissions),
  },
});

export default connect(mapStateToProps)(UserForm);