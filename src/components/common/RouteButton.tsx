import React from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonProps } from '@material-ui/core';
import NormalButton from 'components/themed/NormalButton';
import { noop } from 'utils';

interface IRouteButtonProps {
  to?: string;
  back?: boolean;
}

const RouteButton: React.FC<IRouteButtonProps & ButtonProps> = ({
  children,
  to = '/',
  back = false,
  onClick = noop,
  ...props
}) => {
  const history = useHistory();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (back) {
      history.goBack();
    } else {
      history.push(to);
    }

    onClick(event);
  };

  return (
    <NormalButton {...props} onClick={handleClick}>
      {children}
    </NormalButton>
  );
};

export default RouteButton;
