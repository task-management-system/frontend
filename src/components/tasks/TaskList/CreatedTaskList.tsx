import React from 'react';
import TaskList from './TaskList';
import TaskItem from '../TaskItem';
import { getCreatedTasks } from 'api/v1';

const AppointedTaskList: React.FC = () => (
  <TaskList getTasks={getCreatedTasks} renderItem={item => <TaskItem task={item} />} showToolbar />
);

export default AppointedTaskList;
