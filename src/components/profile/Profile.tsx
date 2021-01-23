import React from 'react';
import { connect } from 'react-redux';
import { Avatar, makeStyles } from '@material-ui/core';
import ProfileMenu from './ProfileMenu';
import FlatButton from '../themed/FlatButton';
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
        <FlatButton color="inherit" onClick={handleOpen}>
          <div className={classes.root}>
            <Avatar>{props.username[0]}</Avatar>
            {props.username} ({props.role})
          </div>
        </FlatButton>
      )}
    </ProfileMenu>
  );
};

const mapStateToProps = (state: TState) => ({
  username: state.metaData.user?.name || state.metaData.user?.username || 'Нет имени',
  role: state.metaData.user?.role?.text || 'Нет роли',
});

export default connect(mapStateToProps)(Profile);
