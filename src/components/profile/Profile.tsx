import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import ProfileMenu from './ProfileMenu';
import CleverAvatar from 'components/common/CleverAvatar';
import FlatButton from 'components/themed/FlatButton';
import useScreenWidthCompare from 'hooks/useScreenWidthCompare';
import { State } from 'types/redux';

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
  avatar: {
    textTransform: 'uppercase',
  },
}));

const Profile: React.FC<ConnectedProfileStateProps> = ({ username, role }) => {
  const classes = useStyles();
  const isSmall = useScreenWidthCompare(width => width <= 640);

  return (
    <ProfileMenu>
      {handleOpen => (
        <FlatButton className={classes.button} color="inherit" onClick={handleOpen}>
          <div className={classes.root}>
            <CleverAvatar className={classes.avatar}>{username[0]}</CleverAvatar>
            {!isSmall && (
              <>
                {username} ({role})
              </>
            )}
          </div>
        </FlatButton>
      )}
    </ProfileMenu>
  );
};

const mapStateToProps = ({ metaData }: State) => ({
  username: metaData.user?.name || metaData.user?.username || 'Нет имени',
  role: metaData.user?.role.meaning || 'Нет роли',
});

const connector = connect(mapStateToProps);

type ConnectedProfileStateProps = ConnectedProps<typeof connector>;

export default connector(Profile);
