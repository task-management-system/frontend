import React from 'react';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import UserInfo from 'components/UserInfo';
import NoMatch from './NoMatch';
import { haveAnyPermission } from 'utils/permissions';
import { TState } from 'types/redux';

interface IUserProps {
  permissions: {
    view: boolean;
  };
}
interface IRouteParams {
  id: string;
}

const User: React.FC<IUserProps> = ({ permissions }) => {
  const { params } = useRouteMatch<IRouteParams>();

  if (!permissions.view) {
    return <NoMatch />;
  }

  return <UserInfo id={Number(params.id)} />;
};

const mapStateToProps = ({ metaData }: TState) => ({
  permissions: {
    view: haveAnyPermission(metaData.user?.role.power, ['ViewUser'], metaData.permissions),
  },
});

export default connect(mapStateToProps)(User);
