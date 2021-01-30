import React from 'react';
import { makeStyles } from '@material-ui/core';
import UserCard from './UserCard';
import { IUser } from 'types';

interface IUsersGridProps {
  users: IUser[];
}

const useStyles = makeStyles(theme => ({
  root: {
    gap: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  },
}));

const UsersGrid: React.FC<IUsersGridProps> = ({ users }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {users.map(user => (
        <UserCard user={user} key={user.id} />
      ))}
    </div>
  );
};

export default UsersGrid;
