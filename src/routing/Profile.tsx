import React from 'react';
import { connect } from 'react-redux';
import UserForm from 'components/user/UserForm';
import NoMatch from './NoMatch';
import { TState } from 'types/redux';

interface IProfileProps {}

const Profile: React.FC<IProfileProps & TProfileState> = ({ id }) => {
  if (id === undefined) {
    return <NoMatch />;
  }

  return <UserForm id={id} self={true} />;
};

const mapStateToProps = (state: TState) => ({
  id: state.metaData.user?.id,
});

type TProfileState = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Profile);
