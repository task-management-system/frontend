import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import UserForm from 'components/user/UserForm';
import NoMatch from './NoMatch';
import { State } from 'types/redux';

const Profile: React.FC<ConnectedProfileProps> = ({ hasUser }) => {
  if (!hasUser) {
    return <NoMatch />;
  }

  return <UserForm self={true} />;
};

const mapStateToProps = (state: State) => ({
  hasUser: state.metaData.user !== null,
});

const connector = connect(mapStateToProps);

type ConnectedProfileProps = ConnectedProps<typeof connector>;

export default connector(Profile);
