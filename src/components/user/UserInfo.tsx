import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Fade, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import TextParamView from 'components/param-view/TextParamView';
import RoleParamView from 'components/param-view/RoleParamView';
import NormalButton from 'components/themed/NormalButton';
import { FormikProps } from 'formik';
import { TUndefinableUserForm } from 'types/components/user';
import ChangePassword from 'components/dialogs/ChangePassword';
import { haveAnyPermission } from 'utils/permissions';
import { IUser } from 'types';
import { TState } from 'types/redux';

interface IUserInfoProps {
  user: IUser | null;
  form: FormikProps<TUndefinableUserForm>;
  self?: boolean;
  editing?: boolean;
  permissions: {
    update: boolean;
  };
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

const UserInfo: React.FC<IUserInfoProps> = ({
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
              <ChangePassword>
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

const mapStateToProps = ({ metaData }: TState) => ({
  permissions: {
    update: haveAnyPermission(metaData.user?.role.power, ['UpdateUser'], metaData.permissions),
  },
});

export default connect(mapStateToProps)(UserInfo);
