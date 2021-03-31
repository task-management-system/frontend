import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    gap: theme.spacing(2),
    display: 'grid',
    gridAutoRows: 'max-content',
  },
  toolbar: {
    display: 'grid',
    gridTemplateColumns: '1fr max-content',
  },
  wrapper: {
    padding: theme.spacing(1),
  },
  message: {
    padding: theme.spacing(4, 2),
  },
}));

export default useStyles;
