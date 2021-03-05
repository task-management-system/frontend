import React from 'react';
import { makeStyles } from '@material-ui/core';
import UserCard from './user/UserCard';
import { User } from 'types';

interface UsersGridProps {
  users: User[];
  updateUsers: () => Promise<void>;
}

const useStyles = makeStyles(theme => ({
  root: {
    gap: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  },
}));

const UsersGrid: React.FC<UsersGridProps> = ({ users, updateUsers }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {users.map(user => (
        <UserCard user={user} onChange={updateUsers} key={user.id} />
      ))}
    </div>
  );
};

export default UsersGrid;
