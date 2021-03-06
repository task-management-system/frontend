import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { Task } from 'types';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, ...props }) => {
  return (
    <Card {...props}>
      <CardContent>
        <Typography>{task.title}</Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
