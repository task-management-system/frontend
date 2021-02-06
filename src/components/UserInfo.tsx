import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Container from 'components/common/Container';
import { makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import usePromiseTrack from 'hooks/usePromiseTrack';
import { getUser } from 'api/v1';
import { IUser } from 'types';

interface IUserInfoProps {
  id: number;
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

const UserInfo: React.FC<IUserInfoProps> = ({ id }) => {
  const classes = useStyles();
  const [user, setUser] = useState<IUser | null>(null);
  const [inProgress, trackedGetUser] = usePromiseTrack(getUser);

  useEffect(() => {
    trackedGetUser(id).then(response => {
      setUser(response.data);
    });
  }, [id]);

  return (
    <Container className={classes.rows}>
      <div className={classes.layout}>
        <Skeleton variant="rect" width={128} height={128} />
        <div className={classes.rows}>
          <div className={clsx(classes.columns, classes.info)}>
            <div className={classes.rows}>
              <Skeleton variant="rect" height={48} />
              <Skeleton variant="rect" height={48} />
            </div>
            <div className={classes.rows}>
              <Skeleton variant="rect" height={48} />
              <Skeleton variant="rect" height={48} />
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
      <div className={classes.actions}>
        <Skeleton variant="rect" width={256} height={48} />
      </div>
    </Container>
  );
};

export default UserInfo;
