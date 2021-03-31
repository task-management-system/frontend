import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Paper, Typography, Divider, Fade } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import TaskItem, { TaskItemSkeleton } from '../TaskItem';
import useStyles from './styles';
import { SIZE } from './constants';
import { range } from 'utils';
import usePromiseTrack from 'hooks/usePromiseTrack';
import { getReceivedTasks } from 'api/v1';
import { TaskInstance } from 'types';
import { Paged } from 'types/api';
import { State } from 'types/redux';

const TaskList: React.FC<TaskListState> = ({ status }) => {
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [tasks, setTasks] = useState<Paged<TaskInstance[]>>({
    total: 0,
    list: [],
  });
  const [inProgress, trackedGetReceivedTasks] = usePromiseTrack(getReceivedTasks);

  const loadTasks = () => {
    if (status !== null) {
      const pagination = { page, size: SIZE };

      trackedGetReceivedTasks(status, pagination).then(response => {
        setTasks({
          total: response.data?.total || 0,
          list: response.data?.list || [],
        });
        setLoaded(true);
      });
    }
  };

  useEffect(() => {
    loadTasks();
  }, [status, page]);

  const count = tasks.list.length;

  return (
    <div className={classes.root}>
      <Paper className={classes.toolbar} square>
        <div className={classes.wrapper}></div>
        <Pagination
          className={classes.wrapper}
          color="primary"
          page={page}
          count={Math.ceil(tasks.total / SIZE) || 1}
          onChange={(event, page) => setPage(page)}
          showFirstButton
          showLastButton
        />
      </Paper>
      <Paper square>
        {loaded && count === 0 ? (
          <Fade in>
            <Typography className={classes.message} variant="h4" align="center">
              Мы не нашли задачи
            </Typography>
          </Fade>
        ) : count > 0 ? (
          tasks.list.map((instance, index) => (
            <React.Fragment key={instance.id}>
              <Fade in={!inProgress}>
                <TaskItem task={instance.task} />
              </Fade>
              {count - 1 > index && <Divider />}
            </React.Fragment>
          ))
        ) : (
          range(SIZE).map(index => (
            <React.Fragment key={index}>
              <TaskItemSkeleton />
              {index + 1 < SIZE && <Divider />}
            </React.Fragment>
          ))
        )}
      </Paper>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  status: state.tabs.status,
});

type TaskListState = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(TaskList);
