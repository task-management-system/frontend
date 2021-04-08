import React from 'react';
import clsx from 'clsx';
import {
  Snackbar,
  SnackbarContent,
  Card,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  withStyles,
  darken,
  lighten,
  SnackbarProps,
} from '@material-ui/core';
import { ExpandMore, Close } from '@material-ui/icons';
import ScrollableArea from 'components/common/ScrollableArea';
import { Rejection } from 'types';

type Severity = 'success' | 'info' | 'warning' | 'error';

interface DetailedSnackbarProps {
  severity?: Severity;
  iconMapping?: Record<Severity, JSX.Element>;
  message: string;
  details: Rejection[];
  onClose?: (event: React.SyntheticEvent<any, Event>, reason: string) => void;
}

const useStyles = makeStyles(theme => {
  const getColor = theme.palette.type === 'light' ? darken : lighten;
  const getBackgroundColor = theme.palette.type === 'light' ? lighten : darken;

  return {
    card: {
      width: '100%',
    },
    success: {
      color: getColor(theme.palette.success.main, 0.6),
      backgroundColor: getBackgroundColor(theme.palette.success.main, 0.9),
      '& $icon': {
        color: theme.palette.success.main,
      },
    },
    info: {
      color: getColor(theme.palette.info.main, 0.6),
      backgroundColor: getBackgroundColor(theme.palette.info.main, 0.9),
      '& $icon': {
        color: theme.palette.info.main,
      },
    },
    warning: {
      color: getColor(theme.palette.warning.main, 0.6),
      backgroundColor: getBackgroundColor(theme.palette.warning.main, 0.9),
      '& $icon': {
        color: theme.palette.warning.main,
      },
    },
    error: {
      color: getColor(theme.palette.error.main, 0.6),
      backgroundColor: getBackgroundColor(theme.palette.error.main, 0.9),
      '& $icon': {
        color: theme.palette.error.main,
      },
    },
    wrapper: {
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      marginRight: 12,
      padding: '7px 0',
      display: 'flex',
      fontSize: 22,
      opacity: 0.9,
    },
    typography: {
      fontWeight: 'bold',
    },
    actionRoot: {
      padding: '8px 8px 8px 16px',
      justifyContent: 'space-between',
    },
    icons: {
      marginLeft: 'auto',
      flexShrink: 0,
    },
    expand: {
      padding: '8px 8px',
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    collapse: {
      padding: theme.spacing(1),
    },
    scrollable: {
      maxHeight: 180,
    },
  };
});

const ThemedSnackbarContent = withStyles(() => ({
  root: {
    padding: 0,
    backgroundColor: 'transparent',
  },
  message: {
    width: '100%',
    padding: 0,
  },
}))(SnackbarContent);

const DetailedSnackbar: React.FC<
  DetailedSnackbarProps & Omit<SnackbarProps, 'message' | 'onClose'>
> = ({ severity = 'info', iconMapping, message, details, onClose, ...props }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpand = () => setExpanded(expanded => !expanded);

  return (
    <Snackbar {...props}>
      <ThemedSnackbarContent
        elevation={0}
        message={
          <Card className={clsx(classes.card, classes[severity])}>
            <CardActions classes={{ root: classes.actionRoot }}>
              <div className={classes.wrapper}>
                {iconMapping !== undefined && (
                  <div className={classes.icon}>{iconMapping[severity]}</div>
                )}
                <Typography variant="body2">{message}</Typography>
              </div>
              <div className={classes.icons}>
                <IconButton
                  className={clsx(classes.expand, expanded && [classes.expandOpen])}
                  onClick={handleExpand}
                >
                  <ExpandMore />
                </IconButton>
                {onClose !== undefined && (
                  <IconButton className={classes.expand} onClick={event => onClose(event, 'close')}>
                    <Close />
                  </IconButton>
                )}
              </div>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Paper className={classes.collapse}>
                <ScrollableArea className={classes.scrollable}>
                  <List dense disablePadding>
                    {details.map((detail, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={detail.name} secondary={detail.cause} />
                      </ListItem>
                    ))}
                  </List>
                </ScrollableArea>
              </Paper>
            </Collapse>
          </Card>
        }
      />
    </Snackbar>
  );
};

export default DetailedSnackbar;
