import { Button, withStyles } from '@material-ui/core';

const FileButton = withStyles(theme => ({
  root: {
    minWidth: 'auto',
    padding: theme.spacing(1),
    justifyContent: 'flex-start',
    textAlign: 'left',
    textTransform: 'unset',
    overflow: 'hidden',
  },
  iconSizeMedium: {
    '& > *:first-child': {
      fontSize: 24,
    },
  },
}))(Button);

export default FileButton;
