import React from 'react';
import { ButtonProps } from '@material-ui/core';
import NormalButton from 'components/themed/NormalButton';
import usePromiseTrack from 'hooks/usePromiseTrack';
import { lock, unlock } from 'api/v1';

interface IToggleLockButtonProps {
  userId: number;
  isActive: boolean;
  onClick: () => Promise<void>;
}

const ToggleLockButton: React.FC<IToggleLockButtonProps & ButtonProps> = ({
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
    <NormalButton {...props} color="primary" disabled={inProgress} onClick={trackedHandleClick}>
      {isActive ? 'Заблокировать' : 'Разблокировать'}
    </NormalButton>
  );
};

export default ToggleLockButton;
