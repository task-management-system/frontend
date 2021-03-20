import React from 'react';
import TaskCreate from 'components/dialogs/TaskCreate';
import NormalButton from 'components/themed/NormalButton';

interface TaskListToolbarProps {
  loadTasks: () => void;
}

const TaskListToolbar: React.FC<TaskListToolbarProps> = ({ loadTasks }) => {
  return (
    <TaskCreate onCreate={loadTasks}>
      {({ handleOpen }) => (
        <NormalButton color="primary" onClick={handleOpen}>
          Создать задачу
        </NormalButton>
      )}
    </TaskCreate>
  );
};

export default TaskListToolbar;
