import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useFormik } from 'formik';
import { Fade, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Container from 'components/common/Container';
import UserInfo from 'components/user/UserInfo';
import NormalButton from 'components/themed/NormalButton';
import ToggleLockButton from 'components/user/ToggleLockButton';
import { haveAnyPermission } from 'utils/permissions';
import { getUser, getCurrentUser, updateUser } from 'api/v1';
import { User, UUID } from 'types';
import { State } from 'types/redux';
import { RequireOnlyOne } from 'types/common';
import { UndefinableUserForm } from 'types/components/user';

interface UserFormBase {
  id: UUID;
  self: boolean;
}

type UserFormProps = RequireOnlyOne<UserFormBase, 'id' | 'self'>;

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

const UserForm: React.FC<UserFormProps & ConnectedUserFormProps> = ({ id, self, permissions }) => {
  const classes = useStyles();
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const inProgress = user === null;

  const handleLoadUser = async () => {
    const response = await (id === undefined ? getCurrentUser() : getUser(id));
    setUser(response.data || null);
  };

  const formik = useFormik<UndefinableUserForm>({
    initialValues: {
      username: undefined,
      name: undefined,
      email: undefined,
      role: undefined,
    },
    onSubmit: values => {
      if (user !== null) {
        updateUser({
          id: user.id,
          username: values.username || user.username,
          name: values.name || null,
          email: values.email || null,
          roleId: values.role?.id || user.role.id,
        }).then(response => {
          if (response.details.ok) {
            setUser({
              ...user,
              username: values.username || user.username,
              name: values.name || null,
              email: values.email || null,
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

  const handleCancelClick = () => {
    setEditing(false);
    resetForm();
  };

  useEffect(() => {
    handleLoadUser();
  }, [id]);

  return (
    <Container className={classes.root}>
      <UserInfo user={user} editing={editing} form={formik} self={self} />
      {(permissions.update || self) && (
        <div className={classes.buttons}>
          {user !== null ? (
            <>
              {permissions.update && (
                <Fade in={true}>
                  <ToggleLockButton
                    userId={user.id}
                    isActive={user.isActive}
                    disabled={editing}
                    onClick={handleLoadUser}
                  />
                </Fade>
              )}
              {editing && (
                <NormalButton color="primary" disabled={inProgress} onClick={handleCancelClick}>
                  Отменить
                </NormalButton>
              )}
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

const mapStateToProps = ({ metaData }: State) => ({
  permissions: {
    update: haveAnyPermission(
      metaData.user?.role.power,
      ['Administrator', 'UpdateUser'],
      metaData.permissions
    ),
  },
});

const connector = connect(mapStateToProps);

type ConnectedUserFormProps = ConnectedProps<typeof connector>;

export default connector(UserForm);
