import React from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonProps } from '@material-ui/core';
import NormalButton from 'components/themed/NormalButton';
import { noop } from 'utils';

interface RouteButtonProps {
  to?: string;
  back?: boolean;
  component?: React.ComponentType<ButtonProps>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RouteButton: React.FC<RouteButtonProps & ButtonProps> = ({
  children,
  to = '/',
  back = false,
  component: Component = NormalButton,
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
    <Component {...props} onClick={handleClick}>
      {children}
    </Component>
  );
};

export default RouteButton;
