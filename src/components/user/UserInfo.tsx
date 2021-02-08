import React from 'react';
import clsx from 'clsx';
import { Typography, Fade, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { IUser } from 'types';

interface IUserInfoProps {
  user: IUser | null;
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

const UserInfo: React.FC<IUserInfoProps> = ({ user }) => {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <Skeleton variant="rect" width={128} height={128} />
      <div className={classes.rows}>
        <div className={clsx(classes.columns, classes.info)}>
          <div className={classes.rows}>
            {user !== null ? (
              <Fade in={true}>
                <div>
                  <Typography variant="subtitle2">Имя пользователя</Typography>
                  <Typography variant="body2">{user.username}</Typography>
                </div>
              </Fade>
            ) : (
              <Skeleton variant="rect" height={48} />
            )}
            {user !== null ? (
              <Fade in={true}>
                <div>
                  <Typography variant="subtitle2">Имя профиля</Typography>
                  <Typography variant="body2">{user.name || '-'}</Typography>
                </div>
              </Fade>
            ) : (
              <Skeleton variant="rect" height={48} />
            )}
          </div>
          <div className={classes.rows}>
            {user !== null ? (
              <Fade in={true}>
                <div>
                  <Typography variant="subtitle2">Почта</Typography>
                  <Typography variant="body2">
                    {user.email ? <a href={`mailto:${user.email}`}>{user.email}</a> : '-'}
                  </Typography>
                </div>
              </Fade>
            ) : (
              <Skeleton variant="rect" height={48} />
            )}
            {user !== null ? (
              <Fade in={true}>
                <div>
                  <Typography variant="subtitle2">Роль</Typography>
                  <Typography variant="body2">{user.role.text}</Typography>
                </div>
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
