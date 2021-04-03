import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, withStyles } from '@material-ui/core';
import TaskList from './TaskList';
import TaskItem from '../TaskItem';
import TaskView from '../TaskView/TaskView';
import { getReceivedTasks, getReceivedTask } from 'api/v1';

const ThemedAccordion = withStyles(theme => ({
  root: {
    '&$expanded': {
      margin: 0,
    },
    '&:before': {
      display: 'none',
    },
  },
  expanded: {},
}))(Accordion);

const ThemedAccordionSummary = withStyles(theme => ({
  root: {
    minHeight: 'auto',
    padding: 0,
    '&$expanded': {
      minHeight: 'auto',
    },
  },
  content: {
    margin: 0,
    display: 'block',
    '&$expanded': {
      margin: 0,
    },
  },
  expanded: {},
}))(AccordionSummary);

const ThemedAccordionDetails = withStyles(theme => ({
  root: {
    padding: 0,
    display: 'block',
  },
}))(AccordionDetails);

const ReceivedTaskList: React.FC = () => (
  <TaskList
    getTasks={getReceivedTasks}
    renderItem={item => (
      <ThemedAccordion elevation={0} TransitionProps={{ unmountOnExit: true }} square>
        <ThemedAccordionSummary>
          <TaskItem task={item.task} />
        </ThemedAccordionSummary>
        <ThemedAccordionDetails>
          <TaskView id={item.id} loadTask={getReceivedTask} />
        </ThemedAccordionDetails>
      </ThemedAccordion>
    )}
  />
);

export default ReceivedTaskList;
