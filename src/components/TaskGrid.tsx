import React from 'react';
import { Card, CardContent, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { range } from 'utils';

interface TaskGridProps {
  tasks?: any[];
}

const useStyles = makeStyles(theme => ({
  root: {
    gap: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  },
}));

const TaskGrid: React.FC<TaskGridProps> = ({ tasks = [] }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {tasks.length > 0 ? (
        <></>
      ) : (
        <>
          {range(12).map(index => (
            <Card key={index}>
              <CardContent>
                <Skeleton />
                <Skeleton variant="rect" height={40} />
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

export default TaskGrid;
