import React from 'react';
import { connect } from 'react-redux';
import { Avatar, makeStyles } from '@material-ui/core';
import ProfileMenu from './ProfileMenu';
import FlatButton from 'components/themed/FlatButton';
import useScreenWidthCompare from 'hooks/useScreenWidthCompare';
import { State } from 'types/redux';

interface ProfileProps {}

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

const Profile: React.FC<ProfileProps & ProfileState> = ({ username, role }) => {
  const classes = useStyles();
  const isSmall = useScreenWidthCompare(width => width <= 640);

  return (
    <ProfileMenu>
      {handleOpen => (
        <FlatButton className={classes.button} color="inherit" onClick={handleOpen}>
          <div className={classes.root}>
            <Avatar>{username[0]}</Avatar>
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
  role: metaData.user?.role.text || 'Нет роли',
});

type ProfileState = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Profile);
