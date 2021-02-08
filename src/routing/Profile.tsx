import React from 'react';
import { connect } from 'react-redux';
import UserInfo from 'components/user/UserInfo';
import NoMatch from './NoMatch';
import { TState } from 'types/redux';

interface IProfileProps {
  id: number | undefined;
}

const Profile: React.FC<IProfileProps> = ({ id }) => {
  if (id === undefined) {
    return <NoMatch />;
  }

  // return <UserInfo id={id} />;
  return <>{id}</>;
};

const mapStateToProps = (state: TState) => ({
  id: state.metaData.user?.id,
});

export default connect(mapStateToProps)(Profile);
