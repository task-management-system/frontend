import { Drawer, withStyles } from '@material-ui/core';

const MenuDrawer = withStyles(theme => ({
  root: {
    width: 280,
  },
  paper: {
    width: 280,
  },
}))(Drawer);

export default MenuDrawer;
