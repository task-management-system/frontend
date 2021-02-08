import React from 'react';
import clsx from 'clsx';
import { Fade, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { FormikProps } from 'formik';
import { IUser } from 'types';
import { TUndefinableUserForm } from 'types/components/user';
import ParamView from 'components/common/ParamView';

interface IUserInfoProps {
  user: IUser | null;
  form: FormikProps<TUndefinableUserForm>;
  editing: boolean;
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
  control: {
    gap: theme.spacing(0.5),
    display: 'grid',
    gridAutoRows: 'max-content',
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

const UserInfo: React.FC<IUserInfoProps> = ({ user, form, editing }) => {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <Skeleton variant="rect" width={128} height={128} />
      <div className={classes.rows}>
        <div className={clsx(classes.columns, classes.info)}>
          <div className={classes.rows}>
            {user !== null ? (
              <Fade in={true}>
                <ParamView
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
                <ParamView
                  label="Имя профиля"
                  name="name"
                  value={editing ? form.values.name : user.name}
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
                <ParamView
                  label="Почта"
                  name="email"
                  value={editing ? form.values.email : user.email}
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
                <ParamView
                  label="Роль"
                  name="role"
                  value={editing ? form.values.role?.text : user.role.text}
                  editing={editing}
                  onChange={form.handleChange}
                />
              </Fade>
            ) : (
              <Skeleton variant="rect" height={48} />
            )}
          </div>
        </div>
        <div className={classes.columns}>
          <div className={classes.control}>
            <Skeleton width={128} />
            <Skeleton variant="rect" height={48} />
          </div>
          <div className={classes.control}>
            <Skeleton width={128} />
            <Skeleton variant="rect" height={48} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
