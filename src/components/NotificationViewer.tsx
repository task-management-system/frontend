import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { removeNotification } from 'redux/actions/notifications';
import { TState, TDispatch } from 'types/redux';

interface INotificationViewerProps {}

const NotificationViewer: React.FC<
  INotificationViewerProps & TNotificationViewerState & TNotificationViewerDispatch
> = props => {
  const [hideable, setHideable] = useState<string[]>([]);

  const handleClose = (id: string, reason?: string) => {
    if (reason === 'timeout' || reason === 'close') {
      setHideable(hideable => [id, ...hideable]);
    }
  };

  const handleRemove = (id: string) => {
    props.removeNotification(id);

    setHideable(hideable => hideable.filter(entry => entry !== id));
  };

  const notification = props.notifications[0];

  return (
    <>
      {props.notifications.length > 0 && (
        <Snackbar
          open={!hideable.includes(notification.id)}
          autoHideDuration={3000}
          onClose={(event, reason) => handleClose(notification.id, reason)}
          onExited={() => handleRemove(notification.id)}
          key={notification.id}
        >
          <Alert severity={notification.type} onClose={() => handleClose(notification.id, 'close')}>
            {notification.text}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

const mapStateToProps = (state: TState) => ({
  notifications: state.notifications,
});

type TNotificationViewerState = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: TDispatch) => ({
  removeNotification: (payload: string) => dispatch(removeNotification(payload)),
});

type TNotificationViewerDispatch = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(NotificationViewer);
