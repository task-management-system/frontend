import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Fade, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Container from 'components/common/Container';
import UserInfo from 'components/user/UserInfo';
import NormalButton from 'components/themed/NormalButton';
import ToggleLockButton from 'components/user/ToggleLockButton';
import usePromiseTrack from 'hooks/usePromiseTrack';
import { getUser } from 'api/v1';
import { IUser } from 'types';

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
  const [inProgress, trackedGetUser] = usePromiseTrack(getUser);

  const handleUpdateUser = async () => {
    const response = await trackedGetUser(parseInt(params.id));
    setUser(response.data || null);
  };

  useEffect(() => {
    handleUpdateUser();
  }, [params.id]);

  return (
    <Container className={classes.root}>
      <UserInfo user={user} />
      <div className={classes.buttons}>
        {user !== null ? (
          <>
            <Fade in={true}>
              <ToggleLockButton
                userId={user.id}
                isActive={user.isActive}
                onClick={handleUpdateUser}
              />
            </Fade>
            <Fade in={true}>
              <NormalButton color="primary" disabled={inProgress}>
                Редактировать
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
