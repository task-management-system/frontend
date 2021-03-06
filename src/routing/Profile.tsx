import React from 'react';
import { connect } from 'react-redux';
import UserForm from 'components/user/UserForm';
import NoMatch from './NoMatch';
import { State } from 'types/redux';

const Profile: React.FC<ProfileState> = ({ hasUser }) => {
  if (!hasUser) {
    return <NoMatch />;
  }

  return <UserForm self={true} />;
};

const mapStateToProps = (state: State) => ({
  hasUser: state.metaData.user !== null,
});

type ProfileState = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Profile);
