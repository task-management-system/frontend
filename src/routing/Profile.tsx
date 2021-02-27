import React from 'react';
import { connect } from 'react-redux';
import UserForm from 'components/user/UserForm';
import NoMatch from './NoMatch';
import { TState } from 'types/redux';

interface IProfileProps {}

const Profile: React.FC<IProfileProps & TProfileState> = ({ hasUser }) => {
  if (!hasUser) {
    return <NoMatch />;
  }

  return <UserForm self={true} />;
};

const mapStateToProps = (state: TState) => ({
  hasUser: state.metaData.user !== null,
});

type TProfileState = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Profile);
