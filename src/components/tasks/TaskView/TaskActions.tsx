import React, { useCallback } from 'react';
import { Fade } from '@material-ui/core';
import Confirm from 'components/dialogs/Confirm';
import NormalButton from 'components/themed/NormalButton';
import { TaskAction } from 'enums/TaskAction';
import { cancelTask, closeTask, deleteTask } from 'api/v1';
import { TaskViewEntry, ActionCondition } from 'types/components/task';

interface TaskActionsProps {
  className?: string;
  id: TaskViewEntry['id'];
  actions: Record<TaskAction, ReturnType<ActionCondition>>;
  reload: () => void;
}

const TaskActions: React.FC<TaskActionsProps> = ({ className, id, actions, reload }) => {
  const handleCancel = useCallback(() => {
    cancelTask(id).then(response => {
      if (response.details.ok) {
        reload();
      }
    });
  }, [id, reload]);

  const handleClose = useCallback(() => {
    closeTask(id).then(response => {
      if (response.details.ok) {
        reload();
      }
    });
  }, [id, reload]);

  const handleDelete = useCallback(() => {
    deleteTask(id).then(response => {
      if (response.details.ok) {
        reload();
      }
    });
  }, [id, reload]);

  return (
    <div className={className}>
      {actions[TaskAction.Cancel] && (
        <Fade in>
          <NormalButton color="primary" variant="contained" onClick={handleCancel}>
            Отменить
          </NormalButton>
        </Fade>
      )}
      {actions[TaskAction.Close] && (
        <Fade in>
          <NormalButton color="primary" variant="contained" onClick={handleClose}>
            Завершить
          </NormalButton>
        </Fade>
      )}
      {actions[TaskAction.Delete] && (
        <Fade in>
          <Confirm
            message="Вы действительно хотите удалить задачу?"
            accept="Да"
            cancel="Нет"
            onAccept={handleDelete}
          >
            {({ handleOpen }) => (
              <NormalButton color="primary" variant="contained" onClick={handleOpen}>
                Удалить
              </NormalButton>
            )}
          </Confirm>
        </Fade>
      )}
    </div>
  );
};

export default TaskActions;
