import React from 'react';
import clsx from 'clsx';
import { connect, ConnectedProps } from 'react-redux';
import { Fade, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { FormikProps } from 'formik';
import TextParamView from 'components/param-view/TextParamView';
import RoleParamView from 'components/param-view/RoleParamView';
import NormalButton from 'components/themed/NormalButton';
import ChangePassword from 'components/dialogs/ChangePassword';
import { haveAnyPermission } from 'utils/permissions';
import { User } from 'types';
import { State } from 'types/redux';
import { UndefinableUserForm } from 'types/components/user';

interface UserInfoProps {
  user: User | null;
  form: FormikProps<UndefinableUserForm>;
  self?: boolean;
  editing?: boolean;
}

const useStyles = makeStyles(theme => ({
  columns: {
    gap: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    alignItems: 'center',
  },
  rows: {
    gap: theme.spacing(2),
    display: 'grid',
    gridAutoRows: 'max-content',
  },
  layout: {
    gap: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: '128px 1fr',
  },
  info: {
    height: 128,
  },
  wrapper: {
    gap: theme.spacing(0.5),
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
  },
  actions: {
    gap: theme.spacing(2),
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
    justifyContent: 'end',
    alignItems: 'center',
  },
}));

const UserInfo: React.FC<UserInfoProps & ConnectedUserInfoProps> = ({
  user,
  form,
  self = false,
  editing = false,
  permissions,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <Skeleton variant="rect" width={128} height={128} />
      <div className={classes.rows}>
        <div className={clsx(classes.columns, classes.info)}>
          <div className={classes.rows}>
            {user !== null ? (
              <Fade in={true}>
                <TextParamView
                  label="Имя пользователя"
                  name="username"
                  value={editing ? form.values.username : user.username}
                  editing={editing}
                  onChange={form.handleChange}
                  disabled={!permissions.update}
                />
              </Fade>
            ) : (
              <Skeleton variant="rect" height={48} />
            )}
            {user !== null ? (
              <Fade in={true}>
                <TextParamView
                  label="Имя профиля"
                  name="name"
                  value={editing ? form.values.name : user.name || ''}
                  editing={editing}
                  onChange={form.handleChange}
                />
              </Fade>
            ) : (
              <Skeleton variant="rect" height={48} />
            )}
          </div>
          <div className={classes.rows}>
            {user !== null ? (
              <Fade in={true}>
                <TextParamView
                  label="Почта"
                  name="email"
                  value={editing ? form.values.email : user.email || ''}
                  editing={editing}
                  onChange={form.handleChange}
                  render={value => (value ? <a href={`mailto:${value}`}>{value}</a> : value)}
                />
              </Fade>
            ) : (
              <Skeleton variant="rect" height={48} />
            )}
            {user !== null ? (
              <Fade in={true}>
                <RoleParamView
                  label="Роль"
                  name="role"
                  value={editing ? form.values.role || null : user.role}
                  editing={editing}
                  onChange={form.setFieldValue}
                  disabled={!permissions.update}
                />
              </Fade>
            ) : (
              <Skeleton variant="rect" height={48} />
            )}
          </div>
        </div>
        {(permissions.update || self) && (
          <div className={classes.wrapper}>
            {user !== null ? (
              <ChangePassword userId={user.id}>
                {({ handleOpen }) => (
                  <Fade in={true}>
                    <NormalButton color="primary" variant="contained" onClick={handleOpen}>
                      Изменить пароль
                    </NormalButton>
                  </Fade>
                )}
              </ChangePassword>
            ) : (
              <Skeleton variant="rect" width={160} height={32} />
            )}
          </div>
        )}
      </div>
    </div>
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

type ConnectedUserInfoProps = ConnectedProps<typeof connector>;

export default connector(UserInfo);
