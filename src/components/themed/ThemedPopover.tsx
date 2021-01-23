import { Popover, withStyles } from '@material-ui/core';

const ThemedPopover = withStyles(theme => ({
  paper: {
    minWidth: 240,
    padding: theme.spacing(1),
    gap: theme.spacing(1),
    display: 'grid',
    gridAutoRows: 'max-content',
  },
}))(Popover);

export default ThemedPopover;
