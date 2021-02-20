import React from 'react';
import { connect } from 'react-redux';
import UserForm from 'components/user/UserForm';
import NoMatch from './NoMatch';
import { TState } from 'types/redux';

interface IProfileProps {
  id: number | undefined;
}

const Profile: React.FC<IProfileProps> = ({ id }) => {
  if (id === undefined) {
    return <NoMatch />;
  }

  return <UserForm id={id} self={true} />;
};

const mapStateToProps = (state: TState) => ({
  id: state.metaData.user?.id,
});

export default connect(mapStateToProps)(Profile);
