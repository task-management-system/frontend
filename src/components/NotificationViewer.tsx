import React, { useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import {
  CheckCircleOutlined,
  ReportProblemOutlined,
  ErrorOutline,
  InfoOutlined,
} from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import DetailedSnackbar from 'components/DetailedSnackbar';
import { removeNotification } from 'redux/actions/notifications';
import { State } from 'types/redux';

const iconMapping = {
  success: <CheckCircleOutlined fontSize="inherit" />,
  warning: <ReportProblemOutlined fontSize="inherit" />,
  error: <ErrorOutline fontSize="inherit" />,
  info: <InfoOutlined fontSize="inherit" />,
};

const NotificationViewer: React.FC<ConnectedNotificationViewerProps> = ({
  notifications,
  removeNotification,
}) => {
  const [hideable, setHideable] = useState<string[]>([]);

  const handleClose = (id: string, reason?: string) => {
    if (reason === 'timeout' || reason === 'close') {
      setHideable(hideable => [id, ...hideable]);
    }
  };

  const handleRemove = (id: string) => {
    removeNotification(id);

    setHideable(hideable => hideable.filter(entry => entry !== id));
  };

  const notification = notifications[0];

  if (notifications.length > 0) {
    if (notification.details !== null && notification.details.length > 0) {
      return (
        <DetailedSnackbar
          open={!hideable.includes(notification.id)}
          severity={notification.type}
          iconMapping={iconMapping}
          message={notification.text}
          details={notification.details}
          onClose={(event, reason) => handleClose(notification.id, reason)}
          onExited={() => handleRemove(notification.id)}
          key={notification.id}
        />
      );
    } else {
      return (
        <Snackbar
          open={!hideable.includes(notification.id)}
          autoHideDuration={3000}
          onClose={(event, reason) => handleClose(notification.id, reason)}
          onExited={() => handleRemove(notification.id)}
          key={notification.id}
        >
          <Alert
            severity={notification.type}
            iconMapping={iconMapping}
            onClose={() => handleClose(notification.id, 'close')}
          >
            {notification.text}
          </Alert>
        </Snackbar>
      );
    }
  }

  return null;
};

const mapStateToProps = (state: State) => ({
  notifications: state.notifications,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ...bindActionCreators({ removeNotification }, dispatch),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectedNotificationViewerProps = ConnectedProps<typeof connector>;

export default connector(NotificationViewer);
