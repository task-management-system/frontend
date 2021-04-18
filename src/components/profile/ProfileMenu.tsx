import React, { useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import ThemedPopover from 'components/themed/ThemedPopover';
import NormalButton from 'components/themed/NormalButton';
import { reset } from 'redux/actions/common';
import { removeToken } from 'api/utils';

interface ProfileMenuProps {
  children: (handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void) => React.ReactNode;
}

const useStyles = makeStyles(theme => ({
  button: {
    justifyContent: 'flex-end',
  },
}));

const ProfileMenu: React.FC<ProfileMenuProps & ConnectedProfileMenuProps> = ({
  children,
  ...props
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const open = anchor !== null;

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchor(event.currentTarget);

  const handleClose = () => setAnchor(null);

  const handleOpenProfile = () => {
    history.push('/profile');
    handleClose();
  };

  const handleLogout = async () => {
    await removeToken();
    props.reset();
  };

  return (
    <>
      {children(handleOpen)}
      <ThemedPopover
        open={open}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <NormalButton className={classes.button} onClick={handleOpenProfile}>
          Профиль
        </NormalButton>
        <NormalButton className={classes.button} onClick={handleLogout}>
          Выйти
        </NormalButton>
      </ThemedPopover>
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ...bindActionCreators({ reset }, dispatch),
});

const connector = connect(null, mapDispatchToProps);

type ConnectedProfileMenuProps = ConnectedProps<typeof connector>;

export default connector(ProfileMenu);
