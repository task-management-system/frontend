import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { removeNotification } from 'redux/actions/notifications';
import { TState, TDispatch, TPayload } from 'types/redux';
import { INotification } from 'types';

interface INotificationViewer {
  notifications: INotification[];
  removeNotification: (payload: TPayload) => void;
}

const NotificationViewer: React.FC<INotificationViewer> = props => {
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

const mapDispatchToProps = (dispatch: TDispatch) => ({
  removeNotification: (payload: any) => dispatch(removeNotification(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationViewer);
