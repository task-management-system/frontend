import React from 'react';
import TaskCreate from 'components/dialogs/TaskCreate';
import NormalButton from 'components/themed/NormalButton';

const TaskListToolbar: React.FC = () => {
  return (
    <TaskCreate>
      {({ handleOpen }) => (
        <NormalButton color="primary" onClick={handleOpen}>
          Создать задачу
        </NormalButton>
      )}
    </TaskCreate>
  );
};

export default TaskListToolbar;
