import { Dialog, withStyles } from '@material-ui/core';

const WideDialog = withStyles(theme => ({
  paper: {
    minWidth: 800,
  },
}))(Dialog);

export default WideDialog;
