import React from 'react';
import NormalButton from 'components/themed/NormalButton';
import usePromiseTrack from 'hooks/usePromiseTrack';
import { lock, unlock } from 'api/v1';

interface IToggleLockButtonProps {
  id: number;
  isActive: boolean;
}

const ToggleLockButton: React.FC<IToggleLockButtonProps> = ({ id, isActive }) => {
  const [inProgress, toggleLock] = usePromiseTrack(isActive ? lock : unlock);

  const handleClick = () => {
    toggleLock(id).then(data => {
      console.log(data);
    });
  };

  return (
    <NormalButton color="primary" disabled={inProgress} onClick={handleClick}>
      {isActive ? 'Заблокировать' : 'Разблокировать'}
    </NormalButton>
  );
};

export default ToggleLockButton;
