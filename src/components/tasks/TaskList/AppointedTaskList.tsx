import React from 'react';
import TaskList from './TaskList';
import TaskItem from '../TaskItem';
import { getReceivedTasks } from 'api/v1';

const AppointedTaskList: React.FC = () => (
  <TaskList getTasks={getReceivedTasks} renderItem={item => <TaskItem task={item.task} />} />
);

export default AppointedTaskList;
