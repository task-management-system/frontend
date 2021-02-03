import React from 'react';
import { connect } from 'react-redux';
import { Avatar, makeStyles } from '@material-ui/core';
import ProfileMenu from './ProfileMenu';
import FlatButton from 'components/themed/FlatButton';
import useScreenWidthCompare from 'hooks/useScreenWidthCompare';
import { TState } from 'types/redux';

interface IProfileProps {
  username: string;
  role: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    gap: theme.spacing(1),
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content 1fr',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'stretch',
  },
}));

const Profile: React.FC<IProfileProps> = props => {
  const classes = useStyles();
  const isSmall = useScreenWidthCompare(width => width <= 640);

  return (
    <ProfileMenu>
      {handleOpen => (
        <FlatButton className={classes.button} color="inherit" onClick={handleOpen}>
          <div className={classes.root}>
            <Avatar>{props.username[0]}</Avatar>
            {!isSmall && (
              <>
                {props.username} ({props.role})
              </>
            )}
          </div>
        </FlatButton>
      )}
    </ProfileMenu>
  );
};

const mapStateToProps = (state: TState) => ({
  username: state.metaData.user?.name || state.metaData.user?.username || 'Нет имени',
  role: state.metaData.user?.role.text || 'Нет роли',
});

export default connect(mapStateToProps)(Profile);
