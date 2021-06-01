import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Paper, Typography, Divider, Fade, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import TaskListToolbar from '../TaskListToolbar';
import { TaskItemSkeleton } from '../TaskItem';
import { noop, range } from 'utils';
import { TaskStatus } from 'enums/TaskStatus';
import { RequestWithCancel, Pagination as RequestPagination, Paged } from 'types/api';
import { State } from 'types/redux';

interface TaskListProps<T> {
  getTasks: (statusId: number, pagination: RequestPagination) => RequestWithCancel<Paged<T[]>>;
  renderItem: (entry: T, refresh: () => void) => React.ReactElement<any, any>;
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

const notFoundMessages: Record<TaskStatus, string> = {
  [TaskStatus.New]: 'У Вас нет новых задач',
  [TaskStatus.InWork]: 'У Вас нет задач в работе',
  [TaskStatus.Canceled]: 'У Вас нет отмененных задач',
  [TaskStatus.Done]: 'У Вас нет завершенных задач',
  [TaskStatus.Prepared]: 'У Вас нет подготовленных задач',
};

const TaskList = <T,>({
  getTasks,
  renderItem,
  showToolbar = false,
}: React.PropsWithChildren<TaskListProps<T>>) => {
  const classes = useStyles();
  const status = useSelector((state: State) => state.tabs.status);
  const [loaded, setLoaded] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [page, setPage] = useState(1);
  const [tasks, setTasks] = useState<Paged<T[]>>({
    total: 0,
    list: [],
  });
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  const loadTasks = useCallback(() => {
    if (status !== null) {
      setInProgress(true);

      const pagination = { page, size: SIZE };
      const [request, abort] = getTasks(status, pagination);

      request
        .then(response => {
          if (response.details.ok) {
            if (response.data !== null) {
              setTasks({
                total: response.data.total || 0,
                list: response.data.list || [],
              });
            }
            setLoaded(true);
          }
          if (mounted.current) {
            setInProgress(false);
          }
        })
        .catch(error => {
          if (error !== undefined && mounted.current) {
            setInProgress(false);
          }
        });

      return abort;
    } else {
      return noop;
    }
  }, [getTasks, status, page]);

  useEffect(() => {
    const abort = loadTasks();

    return () => {
      abort();
    };
  }, [loadTasks]);

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
              <Fade in={!inProgress}>{renderItem(entry, loadTasks)}</Fade>
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
