import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Popover } from '@material-ui/core';
import NormalButton from 'components/themed/NormalButton';
import { removeToken } from 'api/utils';
import { reset } from 'redux/actions/common';
import { TDispatch } from 'redux/types';

interface IProfileMenuProps {
  children: (handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void) => React.ReactNode;
  reset: () => void;
}

const ProfileMenu: React.FC<IProfileMenuProps> = ({ children, ...props }) => {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const open = anchor !== null;

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchor(event.currentTarget);

  const handleClose = () => setAnchor(null);

  const handleLogout = async () => {
    await removeToken();
    props.reset();
  };

  return (
    <>
      {children(handleOpen)}
      <Popover
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
        <NormalButton onClick={handleLogout}>Выйти</NormalButton>
      </Popover>
    </>
  );
};

const mapDispatchToProps = (dispatch: TDispatch) => ({
  reset: () => dispatch(reset()),
});

export default connect(null, mapDispatchToProps)(ProfileMenu);
