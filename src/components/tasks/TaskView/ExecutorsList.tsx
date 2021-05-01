import React from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, makeStyles } from '@material-ui/core';
import CleverAvatar from 'components/common/CleverAvatar';
import { DetailedTaskInstance } from 'types';

interface ExecutorsListProps {
  taskInstances: DetailedTaskInstance[];
}

const useStyles = makeStyles(theme => ({
  avatar: {
    textTransform: 'uppercase',
  },
}));

const ExecutorsList: React.FC<ExecutorsListProps> = ({ taskInstances }) => {
  const classes = useStyles();

  return (
    <List dense>
      {taskInstances.map(taskInstance => (
        <ListItem key={taskInstance.id}>
          <ListItemAvatar>
            <CleverAvatar className={classes.avatar}>
              {taskInstance.executor.username[0]}
            </CleverAvatar>
          </ListItemAvatar>
          <ListItemText
            primary={taskInstance.executor.name || taskInstance.executor.username}
            secondary={`На этапе «${taskInstance.status.name}»`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ExecutorsList;
