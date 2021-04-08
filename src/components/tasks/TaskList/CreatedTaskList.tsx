import React from 'react';
import TaskList from './TaskList';
import TaskItem from '../TaskItem';
import {
  TaskAccordion,
  TaskAccordionSummary,
  TaskAccordionDetails,
} from 'components/themed/Accordion';
import { TaskView } from '../TaskView';
import { getCreatedTasks, getCreatedTask } from 'api/v1';

const AppointedTaskList: React.FC = () => (
  <TaskList
    getTasks={getCreatedTasks}
    renderItem={item => (
      <TaskAccordion elevation={0} TransitionProps={{ unmountOnExit: true }} square>
        <TaskAccordionSummary>
          <TaskItem task={item} />
        </TaskAccordionSummary>
        <TaskAccordionDetails>
          <TaskView id={item.id} loadTask={getCreatedTask} />
        </TaskAccordionDetails>
      </TaskAccordion>
    )}
    showToolbar
  />
);

export default AppointedTaskList;
