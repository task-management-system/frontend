import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import UserForm from 'components/user/UserForm';

interface IRouteParams {
  id: string;
}

const User: React.FC = () => {
  const { params } = useRouteMatch<IRouteParams>();

  return <UserForm id={parseInt(params.id)} />;
};

export default User;
