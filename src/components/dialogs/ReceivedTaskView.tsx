import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@material-ui/core';
import { getReceivedTask } from 'api/v1';
import { DetailedTaskInfo, UUID } from 'types';
import { DialogChildrenHelpers } from 'types/components/dialogs';
import NormalButton from 'components/themed/NormalButton';
import MarkdownView from 'components/MarkdownView';
import DateView from 'components/common/DateView';

interface ReceivedTaskViewProps {
  id: UUID;
  children: (helpers: DialogChildrenHelpers) => React.ReactNode;
}

/** @deprecated */
const ReceivedTaskView: React.FC<ReceivedTaskViewProps> = ({ id, children }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<DetailedTaskInfo | null>(null);

  useEffect(() => {
    if (open) {
      getReceivedTask(id).then(response => setData(response.data));
    }
  }, [open]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <>
      {children({ handleOpen, handleClose })}
      {data !== null && (
        <Dialog open={open} onClose={handleClose} fullScreen>
          <DialogTitle>{data.title}</DialogTitle>
          <DialogContent>
            {data.description !== null && (
              <Typography variant="body2">{data.description}</Typography>
            )}
            {data.markdown !== null && <MarkdownView>{data.markdown}</MarkdownView>}
            <Typography>
              Срок сдачи: <DateView>{data.dueDate}</DateView>
            </Typography>
            <Typography>
              Создана: <DateView>{data.createdAt}</DateView>
            </Typography>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </DialogContent>
          <DialogActions>
            <NormalButton color="primary" onClick={handleClose}>
              Закрыть
            </NormalButton>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default ReceivedTaskView;
