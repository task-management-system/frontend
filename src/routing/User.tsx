import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import UserForm from 'components/user/UserForm';

interface RouteParams {
  id: string;
}

const User: React.FC = () => {
  const { params } = useRouteMatch<RouteParams>();

  return <UserForm id={params.id} />;
};

export default User;
