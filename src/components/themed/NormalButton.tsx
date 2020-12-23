import { Button, withStyles } from '@material-ui/core';

const NormalButton = withStyles(theme => ({
  label: {
    textTransform: 'none',
  },
}))(Button);

export default NormalButton;
