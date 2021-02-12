import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  grid: {
    gap: theme.spacing(2),
    display: 'grid',
    gridAutoRows: 'max-content',
  },
  card: {
    display: 'grid',
    gridTemplateColumns: '1fr max-content',
  },
  content: {
    padding: theme.spacing(5, 2, 2, 2),
    gap: theme.spacing(2),
    display: 'grid',
    gridAutoRows: 64,
  },
  container: {
    gap: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
  },
  actions: {
    padding: 0,
    display: 'flex',
    alignItems: 'stretch',
  },
  wrapper: {
    gap: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  buttons: {
    gap: theme.spacing(2),
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
    justifyContent: 'center',
  },
}));

export default useStyles;
