import React from 'react';
import TaskList from './TaskList';
import TaskItem from '../TaskItem';
import { getReceivedTasks } from 'api/v1';
import ReceivedTaskView from 'components/dialogs/ReceivedTaskView';

const ReceivedTaskList: React.FC = () => (
  <TaskList
    getTasks={getReceivedTasks}
    renderItem={item => (
      <ReceivedTaskView id={item.id}>
        {({ handleOpen }) => <TaskItem task={item.task} onClick={handleOpen} />}
      </ReceivedTaskView>
    )}
  />
);

export default ReceivedTaskList;
