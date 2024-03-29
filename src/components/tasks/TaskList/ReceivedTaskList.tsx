import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  TaskAccordion,
  TaskAccordionSummary,
  TaskAccordionDetails,
} from 'components/themed/Accordion';
import TaskList from './TaskList';
import TaskItem from '../TaskItem';
import { TaskView } from '../TaskView';
import { getReceivedTasks, getReceivedTask } from 'api/v1';
import { State } from 'types/redux';

const ReceivedTaskList: React.FC<ConnectedReceivedTaskListProps> = ({ group, status }) => {
  const [expanded, setExpanded] = useState<string[]>([]);

  useEffect(() => {
    setExpanded([]);
  }, [group, status]);

  const handleChange = (id: string) => () =>
    setExpanded(expanded =>
      expanded.includes(id) ? expanded.filter(entry => entry !== id) : [...expanded, id]
    );

  return (
    <TaskList
      getTasks={getReceivedTasks}
      renderItem={(item, refresh) => (
        <TaskAccordion
          expanded={expanded.includes(item.id)}
          elevation={0}
          onChange={handleChange(item.id)}
          TransitionProps={{ unmountOnExit: true }}
          square
        >
          <TaskAccordionSummary>
            <TaskItem task={item.task} />
          </TaskAccordionSummary>
          <TaskAccordionDetails>
            <TaskView id={item.id} loadTask={getReceivedTask} reloadTasks={refresh} />
          </TaskAccordionDetails>
        </TaskAccordion>
      )}
    />
  );
};

const mapStateToProps = (state: State) => ({
  ...state.tabs,
});

const connector = connect(mapStateToProps);

type ConnectedReceivedTaskListProps = ConnectedProps<typeof connector>;

export default connector(ReceivedTaskList);
