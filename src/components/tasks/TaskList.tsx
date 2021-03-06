import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Paper, Divider, Fade, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import TaskItem, { TaskItemSkeleton } from './TaskItem';
import { range } from 'utils';
import { APPOINTED, CREATED } from 'constants/tasks';
import { getReceivedTasks, getCreatedTasks } from 'api/v1';
import { Task } from 'types';
import { Paged } from 'types/api';
import { State } from 'types/redux';

interface TaskListProps {
  group: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    gap: theme.spacing(2),
    display: 'grid',
    gridAutoRows: 'max-content',
  },
  pagination: {
    padding: theme.spacing(1),
  },
}));

const SIZE = 10;

const TaskList: React.FC<TaskListProps & TaskListState> = ({ group, status }) => {
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

  const count = tasks.list.length;

  return (
    <div className={classes.root}>
      <Paper square>
        {tasks.list.length > 0
          ? tasks.list.map((task, index) => (
              <React.Fragment key={task.detailId || task.taskId}>
                <Fade in={!loading}>
                  <TaskItem task={task} />
                </Fade>
                {count - 1 > index && <Divider />}
              </React.Fragment>
            ))
          : range(SIZE).map(index => (
              <React.Fragment key={index}>
                <TaskItemSkeleton />
                {index + 1 < SIZE && <Divider />}
              </React.Fragment>
            ))}
      </Paper>
      <Paper className={classes.pagination} square>
        <Pagination
          color="primary"
          page={page}
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

type TaskListState = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(TaskList);
