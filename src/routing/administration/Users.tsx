import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { getUsers } from 'api/v1';
import { IUser } from 'types';

const Users: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    getUsers().then(response => {
      setUsers(response.data || []);
    });
  }, []);

  return (
    <>
      <Typography variant="h3">Users</Typography>
      <pre>{JSON.stringify(users, null, 4)}</pre>
    </>
  );
};

export default Users;
