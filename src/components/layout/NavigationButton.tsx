import React from 'react';
import { ButtonProps } from '@material-ui/core';
import RouteButton from 'components/common/RouteButton';
import FlatButton from 'components/themed/FlatButton';

interface INavigationButtonProps {
  to?: string;
  children: string;
}

const NavigationButton: React.FC<INavigationButtonProps> = props => (
  <RouteButton
    to={props.to}
    component={FlatButton as React.ComponentType<ButtonProps>}
    color="inherit"
  >
    {props.children}
  </RouteButton>
);

export default NavigationButton;
