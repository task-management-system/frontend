import { Button, withStyles } from '@material-ui/core';

const FlatButton = withStyles(theme => ({
  root: {
    borderRadius: 0,
  },
  label: {
    textTransform: 'none',
  },
}))(Button);

export default FlatButton;
