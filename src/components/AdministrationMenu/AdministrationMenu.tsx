import React from 'react';
import { Toolbar } from '@material-ui/core';
import MenuDrawer from 'components/themed/MenuDrawer';
import NestedMenu from 'components/common/NestedMenu';
import menu from './menu';

const AdministrationMenu: React.FC = () => (
  <MenuDrawer variant="permanent">
    <Toolbar />
    <NestedMenu menu={menu} />
  </MenuDrawer>
);

export default AdministrationMenu;
