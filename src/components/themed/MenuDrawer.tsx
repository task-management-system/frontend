import { Drawer, withStyles } from '@material-ui/core';

const MenuDrawer = withStyles(theme => ({
  root: {
    width: 200,
  },
  paper: {
    width: 200,
  },
}))(Drawer);

export default MenuDrawer;
