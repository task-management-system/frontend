import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Paper, Typography, Divider, Fade, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import TaskListToolbar from '../TaskListToolbar';
import { TaskItemSkeleton } from '../TaskItem';
import { range } from 'utils';
import usePromiseTrack from 'hooks/usePromiseTrack';
import { CollectedResponse, Pagination as RequestPagination, Paged } from 'types/api';
import { State } from 'types/redux';

interface TaskListProps<T> {
  getTasks: (
    statusId: number,
    pagination: RequestPagination
  ) => Promise<CollectedResponse<Paged<T[]>>>;
  renderItem: (entry: T) => React.ReactElement<any, any>;
  showToolbar?: boolean;
}

const useStyles = makeStyles(theme => ({
  root: {
    gap: theme.spacing(2),
    display: 'grid',
    gridAutoRows: 'max-content',
  },
  toolbar: {
    display: 'grid',
    gridTemplateColumns: '1fr max-content',
  },
  wrapper: {
    padding: theme.spacing(1),
  },
  message: {
    padding: theme.spacing(4, 2),
  },
}));

const SIZE = 10;

const notFoundMessages: Record<number, string> = {
  1: 'У Вас нет новых задач',
  2: 'У Вас нет задач в работе',
  3: 'У Вас нет отмененных задач',
  4: 'У Вас нет завершенных задач',
};

const TaskList = <T,>({
  getTasks,
  renderItem,
  showToolbar = false,
}: React.PropsWithChildren<TaskListProps<T>>) => {
  const classes = useStyles();
  const status = useSelector((state: State) => state.tabs.status);
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [tasks, setTasks] = useState<Paged<T[]>>({
    total: 0,
    list: [],
  });
  const [inProgress, trackedGetTasks] = usePromiseTrack(getTasks);

  const loadTasks = () => {
    if (status !== null) {
      const pagination = { page, size: SIZE };

      trackedGetTasks(status, pagination).then(response => {
        if (response.details.ok) {
          setTasks({
            total: response.data?.total || 0,
            list: response.data?.list || [],
          });
          setLoaded(true);
        }
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
        <div className={classes.wrapper}>
          {showToolbar && <TaskListToolbar loadTasks={loadTasks} />}
        </div>
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
              {notFoundMessages[status!] || 'Мы не нашли задачи'}
            </Typography>
          </Fade>
        ) : count > 0 ? (
          tasks.list.map((entry, index) => (
            <React.Fragment key={index}>
              <Fade in={!inProgress}>{renderItem(entry)}</Fade>
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

export default TaskList;
