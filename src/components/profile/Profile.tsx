import React from 'react';
import { connect } from 'react-redux';
import { Avatar, makeStyles } from '@material-ui/core';
import ProfileMenu from './ProfileMenu';
import FlatButton from 'components/themed/FlatButton';
import useScreenWidthCompare from 'hooks/useScreenWidthCompare';
import { TState } from 'types/redux';

interface IProfileProps {}

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

const Profile: React.FC<IProfileProps & TProfileState> = ({ username, role }) => {
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

const mapStateToProps = ({ metaData }: TState) => ({
  username: metaData.user?.name || metaData.user?.username || 'Нет имени',
  role: metaData.user?.role.text || 'Нет роли',
});

type TProfileState = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Profile);
