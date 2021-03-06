import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Paper, Card, CardContent, Fade, makeStyles } from '@material-ui/core';
import { Pagination, Skeleton } from '@material-ui/lab';
import TaskCard from './TaskCard';
import { range } from 'utils';
import { APPOINTED, CREATED } from 'constants/tasks';
import { getReceivedTasks, getCreatedTasks } from 'api/v1';
import { Task } from 'types';
import { Paged } from 'types/api';
import { State } from 'types/redux';

interface TaskGridProps {
  group: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    gap: theme.spacing(3),
    display: 'grid',
    gridAutoRows: 'max-content',
  },
  grid: {
    gap: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  },
  pagination: {
    padding: theme.spacing(1),
  },
}));

const SIZE = 6;

const TaskGrid: React.FC<TaskGridProps & TaskGridState> = ({ group, status }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [tasks, setTasks] = useState<Paged<Task[]>>({
    total: 0,
    list: [],
  });

  useEffect(() => {
    if (status !== null) {
      const pagination = { page, size: SIZE };

      if (group === APPOINTED) {
        setLoading(true);
        getReceivedTasks(status, pagination).then(response => {
          setTasks({
            total: response.data?.total || 0,
            list: response.data?.list || [],
          });
          setLoading(false);
        });
      } else if (group === CREATED) {
        setLoading(true);
        getCreatedTasks(pagination).then(response => {
          setTasks({
            total: response.data?.total || 0,
            list: response.data?.list || [],
          });
          setLoading(false);
        });
      }
    }
  }, [group, status, page]);

  return (
    <div className={classes.root}>
      <div className={classes.grid}>
        {tasks.list.length > 0
          ? tasks.list.map(task => (
              <Fade in={!loading} key={task.detailId || task.taskId}>
                <TaskCard task={task} />
              </Fade>
            ))
          : range(12).map(index => (
              <Card key={index}>
                <CardContent>
                  <Skeleton />
                  <Skeleton variant="rect" height={40} />
                </CardContent>
              </Card>
            ))}
      </div>
      <Paper className={classes.pagination} square>
        <Pagination
          color="primary"
          count={Math.ceil(tasks.total / SIZE) || 1}
          onChange={(event, page) => setPage(page)}
          showFirstButton
          showLastButton
        />
      </Paper>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  status: state.tabs.status,
});

type TaskGridState = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(TaskGrid);
