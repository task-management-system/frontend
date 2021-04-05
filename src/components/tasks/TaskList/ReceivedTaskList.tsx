import React from 'react';
import TaskList from './TaskList';
import TaskItem from '../TaskItem';
import {
  TaskAccordion,
  TaskAccordionSummary,
  TaskAccordionDetails,
} from 'components/themed/Accordion';
import { TaskView } from '../TaskView';
import { getReceivedTasks, getReceivedTask } from 'api/v1';

const ReceivedTaskList: React.FC = () => (
  <TaskList
    getTasks={getReceivedTasks}
    renderItem={item => (
      <TaskAccordion elevation={0} TransitionProps={{ unmountOnExit: true }} square>
        <TaskAccordionSummary>
          <TaskItem task={item.task} />
        </TaskAccordionSummary>
        <TaskAccordionDetails>
          <TaskView id={item.id} loadTask={getReceivedTask} />
        </TaskAccordionDetails>
      </TaskAccordion>
    )}
  />
);

export default ReceivedTaskList;
