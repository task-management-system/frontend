import { Tab, withStyles } from '@material-ui/core';

const ThemedTab = withStyles(theme => ({
  labelIcon: {
    minHeight: 48,
    paddingTop: theme.spacing(0.75),
    '& $wrapper > *:first-child': {
      marginRight: theme.spacing(0.75),
      marginBottom: 0,
    },
  },
  wrapper: {
    flexDirection: 'row',
  },
}))(Tab);

export default ThemedTab;
