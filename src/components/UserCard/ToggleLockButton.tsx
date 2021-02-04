import React from 'react';
import NormalButton from 'components/themed/NormalButton';
import usePromiseTrack from 'hooks/usePromiseTrack';
import { lock, unlock } from 'api/v1';

interface IToggleLockButtonProps {
  id: number;
  isActive: boolean;
  onClick: () => Promise<void>;
}

const ToggleLockButton: React.FC<IToggleLockButtonProps> = ({ id, isActive, onClick }) => {
  const handleClick = async () => {
    await (isActive ? lock : unlock)(id);
    await onClick();
  };

  const [inProgress, trackedHandleClick] = usePromiseTrack(handleClick);

  return (
    <NormalButton color="primary" disabled={inProgress} onClick={trackedHandleClick}>
      {isActive ? 'Заблокировать' : 'Разблокировать'}
    </NormalButton>
  );
};

export default ToggleLockButton;
