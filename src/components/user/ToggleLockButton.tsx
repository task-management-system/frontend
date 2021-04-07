import React from 'react';
import { ButtonProps } from '@material-ui/core';
import NormalButton from 'components/themed/NormalButton';
import usePromiseTrack from 'hooks/usePromiseTrack';
import { lock, unlock } from 'api/v1';
import { User, UUID } from 'types';

interface ToggleLockButtonProps {
  userId: UUID;
  isActive: boolean;
  onClick: (payload: User) => void;
}

const ToggleLockButton: React.FC<ToggleLockButtonProps & Omit<ButtonProps, 'onClick'>> = ({
  userId,
  isActive,
  onClick,
  ...props
}) => {
  const handleClick = async () => {
    const response = await (isActive ? lock : unlock)(userId);

    if (response.data !== null) {
      onClick(response.data);
    }
  };

  const [inProgress, trackedHandleClick] = usePromiseTrack(handleClick);

  return (
    <NormalButton
      {...props}
      color="primary"
      disabled={props.disabled || inProgress}
      onClick={trackedHandleClick}
    >
      {isActive ? 'Заблокировать' : 'Разблокировать'}
    </NormalButton>
  );
};

export default ToggleLockButton;
