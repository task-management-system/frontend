import React, { useState, useEffect } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import UsersGrid from 'components/UsersGrid';
import { groupBy } from 'utils';
import { getUsers } from 'api/v1';
import { IUser } from 'types';

const useStyles = makeStyles(theme => ({
  root: {
    gap: theme.spacing(3),
    display: 'grid',
    gridAutoRows: 'max-content',
  },
  group: {
    gap: theme.spacing(2),
    display: 'grid',
    gridTemplateRows: 'max-content max-content',
  },
}));

const Users: React.FC = () => {
  const classes = useStyles();
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    getUsers().then(response => {
      setUsers(response.data?.list || []);
    });
  }, []);

  const groups = groupBy(users, user => user.username[0].toUpperCase());
  const chapters = [...groups.keys()].sort((a, b) => a.localeCompare(b));

  return (
    <div className={classes.root}>
      {chapters.map(chapter => (
        <div className={classes.group} key={chapter}>
          <Typography variant="h4">{chapter}</Typography>
          <UsersGrid users={groups.get(chapter)!} />
        </div>
      ))}
    </div>
  );
};

export default Users;
