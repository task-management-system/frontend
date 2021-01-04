import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { removeNotification } from 'redux/actions/notifications';
import { TState, TDispatch, TPayload, INotification } from 'redux/types';

interface INotificationViewer {
  notifications: INotification[];
  removeNotification: (payload: TPayload) => void;
}

const NotificationViewer: React.FC<INotificationViewer> = props => {
  const [hideable, setHideable] = useState<string[]>([]);

  const handleClose = (id: string) => {
    setHideable(hideable => [id, ...hideable]);
  };

  const handleRemove = (id: string) => {
    props.removeNotification(id);

    setHideable(hideable => hideable.filter(entry => entry !== id));
  };

  return (
    <>
      {props.notifications.map(notification => {
        const open = !hideable.includes(notification.id);

        return (
          <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={() => handleClose(notification.id)}
            onExited={() => handleRemove(notification.id)}
            key={notification.id}
          >
            <Alert severity={notification.type}>{notification.text}</Alert>
          </Snackbar>
        );
      })}
    </>
  );
};

const mapStateToProps = (state: TState) => ({
  notifications: state.notifications,
});

const mapDispatchToProps = (dispatch: TDispatch) => ({
  removeNotification: (payload: TPayload) => dispatch(removeNotification(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationViewer);
