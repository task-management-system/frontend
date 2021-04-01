import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle } from '@material-ui/core';
import { getReceivedTask } from 'api/v1';
import { ReceivedTaskInfo, UUID } from 'types';
import { DialogChildrenHelpers } from 'types/components/dialogs';

interface ReceivedTaskViewProps {
  id: UUID;
  children: (helpers: DialogChildrenHelpers) => React.ReactNode;
}

const ReceivedTaskView: React.FC<ReceivedTaskViewProps> = ({ id, children }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<ReceivedTaskInfo | null>(null);

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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Задачка</DialogTitle>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Dialog>
    </>
  );
};

export default ReceivedTaskView;
