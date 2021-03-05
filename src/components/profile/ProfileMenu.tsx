import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import ThemedPopover from 'components/themed/ThemedPopover';
import NormalButton from 'components/themed/NormalButton';
import { removeToken } from 'api/utils';
import { reset } from 'redux/actions/common';
import { Dispatch } from 'types/redux';

interface ProfileMenuProps {
  children: (handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void) => React.ReactNode;
  reset: () => void;
}

const useStyles = makeStyles(theme => ({
  button: {
    justifyContent: 'flex-end',
  },
}));

const ProfileMenu: React.FC<ProfileMenuProps> = ({ children, ...props }) => {
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
  reset: () => dispatch(reset()),
});

export default connect(null, mapDispatchToProps)(ProfileMenu);
