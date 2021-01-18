import React from 'react';
import { connect } from 'react-redux';
import { Avatar, makeStyles } from '@material-ui/core';
import ProfileMenu from './ProfileMenu';
import NormalButton from '../themed/NormalButton';
import { TState } from 'redux/types';

interface IProfileProps {
  username: string;
  role: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    gap: theme.spacing(1),
    display: 'grid',
    gridTemplateColumns: 'max-content 1fr',
    alignItems: 'center',
  },
}));

const Profile: React.FC<IProfileProps> = props => {
  const classes = useStyles();

  return (
    <ProfileMenu>
      {handleOpen => (
        <NormalButton color="inherit" onClick={handleOpen}>
          <div className={classes.root}>
            <Avatar>{props.username[0]}</Avatar>
            {props.username} ({props.role})
          </div>
        </NormalButton>
      )}
    </ProfileMenu>
  );
};

const mapStateToProps = (state: TState) => ({
  username: state.metaData.user?.name || state.metaData.user?.username || '',
  role: state.metaData.user?.role?.text || '',
});

export default connect(mapStateToProps)(Profile);
