import { Button, withStyles } from '@material-ui/core';

const TinyButton = withStyles(theme => ({
  root: {
    minWidth: 32,
    padding: theme.spacing(0.5, 1),
  },
}))(Button);

export default TinyButton;
