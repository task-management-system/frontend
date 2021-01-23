import { Button, withStyles } from '@material-ui/core';

const NormalButton = withStyles(theme => ({
  text: {
    padding: theme.spacing(0.5, 2),
  },
  contained: {
    padding: theme.spacing(0.5, 2),
  },
  label: {
    textTransform: 'none',
  },
}))(Button);

export default NormalButton;
