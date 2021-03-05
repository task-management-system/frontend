import React from 'react';
import { ButtonProps } from '@material-ui/core';
import NormalButton from 'components/themed/NormalButton';
import usePromiseTrack from 'hooks/usePromiseTrack';
import { lock, unlock } from 'api/v1';

interface ToggleLockButtonProps {
  userId: number;
  isActive: boolean;
  onClick: () => Promise<void>;
}

const ToggleLockButton: React.FC<ToggleLockButtonProps & ButtonProps> = ({
  userId,
  isActive,
  onClick,
  ...props
}) => {
  const handleClick = async () => {
    await (isActive ? lock : unlock)(userId);
    await onClick();
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
