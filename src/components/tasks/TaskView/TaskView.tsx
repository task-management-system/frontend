import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import clsx from 'clsx';
import { Typography, Fade, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import ScrollableArea from 'components/common/ScrollableArea';
import MarkdownView from 'components/MarkdownView';
import UploadControl from 'components/common/UploadControl';
import FilesList from 'components/common/FilesList';
import DateView from 'components/common/date/DateView';
import ExecutorsList from './ExecutorsList';
import TaskActions from './TaskActions';
import { TaskStatus } from 'enums/TaskStatus';
import { TaskAction } from 'enums/TaskAction';
import { noop } from 'utils';
import { haveAnyPermission } from 'utils/permissions';
import { attachFilesToReceived, deleteFile } from 'api/v1';
import { UUID } from 'types';
import { RequestWithCancel } from 'types/api';
import { State } from 'types/redux';
import { TaskViewEntry, ActionCondition } from 'types/components/task';

interface TaskViewProps {
  id: UUID;
  loadTask: (id: UUID) => RequestWithCancel<TaskViewEntry>;
  reloadTasks?: () => void;
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 1.5),
    gap: theme.spacing(1),
    display: 'grid',
    gridTemplateRows: 'max-content',
  },
  columns: {
    gap: theme.spacing(1.5),
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: '1fr 280px 280px',
    overflow: 'hidden',
  },
  wrapper: {
    height: 256,
  },
  scrollable: {
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    '&:not(:last-child)': {
      marginBottom: theme.spacing(1),
    },
  },
  stickyHeading: {
    position: 'sticky',
    top: 0,
    background: theme.palette.common.white,
    zIndex: 1,
  },
  footer: {
    minHeight: 32,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actions: {
    gap: theme.spacing(1.5),
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
  },
}));

const actionConditions: Record<TaskAction, ActionCondition[]> = {
  [TaskAction.Upload]: [
    data => (data !== null ? [TaskStatus.New, TaskStatus.InWork].includes(data.status.id) : false),
  ],
  [TaskAction.Cancel]: [
    data => (data !== null ? [TaskStatus.New, TaskStatus.InWork].includes(data.status.id) : false),
    data => (data !== null ? data.parent !== undefined : false),
  ],
  [TaskAction.Close]: [
    data => (data !== null ? [TaskStatus.New, TaskStatus.InWork].includes(data.status.id) : false),
    data => (data !== null ? data.parent !== undefined : false),
  ],
  [TaskAction.Delete]: [
    data => (data !== null ? data.status.id === TaskStatus.New : false),
    data => (data !== null ? data.taskInstances !== undefined : false),
    (data, permissions) => permissions.deleteTask || false,
  ],
};

const TaskView: React.FC<TaskViewProps & ConnectedTaskViewProps> = ({
  id,
  loadTask,
  reloadTasks = noop,
  permissions,
}) => {
  const classes = useStyles();
  const [data, setData] = useState<TaskViewEntry | null>(null);

  useEffect(() => {
    const [request, abort] = loadTask(id);

    request.then(response => {
      if (response.details.ok) {
        setData(response.data);
      }
    });

    return () => {
      abort();
    };
  }, [id, loadTask]);

  const handleAddFiles = useCallback(
    files => {
      attachFilesToReceived(id, files).then(response => {
        if (response.data !== null) {
          setData(data => ({
            ...data!,
            files: [...data!.files, ...response.data!.success],
          }));
        }
      });
    },
    [id]
  );

  const handleRemoveFile = useCallback(id => {
    deleteFile(id).then(response => {
      if (response.details.ok) {
        setData(data => ({
          ...data!,
          files: data!.files.filter(file => file.id !== id),
        }));
      }
    });
  }, []);

  const actions = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(actionConditions).map(([key, conditions]) => [
          key,
          conditions.every(condition => condition(data, permissions)),
        ])
      ) as Record<TaskAction, ReturnType<ActionCondition>>,
    [data, permissions]
  );

  return data !== null ? (
    <div className={classes.root}>
      <div className={classes.columns}>
        {data.markdown !== null ? (
          <MarkdownView className={classes.wrapper}>{data.markdown}</MarkdownView>
        ) : (
          <div className={classes.wrapper}>
            <Typography color="textSecondary">Нет дополнительного текста</Typography>
          </div>
        )}
        <ScrollableArea className={classes.wrapper}>
          {data.parent !== undefined ? (
            <>
              {actions[TaskAction.Upload] && <UploadControl onChange={handleAddFiles} />}
              <div className={classes.container}>
                <Typography className={classes.stickyHeading}>Ваши файлы</Typography>
                <FilesList
                  files={data.files}
                  removeItem={TaskAction.Upload ? handleRemoveFile : undefined}
                />
              </div>
              <div className={classes.container}>
                <Typography className={classes.stickyHeading}>Файлы задачи</Typography>
                <FilesList files={data.parent.files} />
              </div>
            </>
          ) : (
            <>
              <div className={classes.container}>
                <Typography className={classes.stickyHeading}>Файлы задачи</Typography>
                <FilesList files={data.files} />
              </div>
              {data.taskInstances?.map(
                taskInstance =>
                  taskInstance.files.length > 0 && (
                    <div className={classes.container} key={taskInstance.id}>
                      <Typography className={classes.stickyHeading}>
                        Файлы {taskInstance.executor.name || taskInstance.executor.username}
                      </Typography>
                      <FilesList files={taskInstance.files} />
                    </div>
                  )
              )}
            </>
          )}
        </ScrollableArea>
        {data.taskInstances !== undefined && (
          <div className={clsx(classes.wrapper, classes.scrollable)}>
            <Typography>Исполнители</Typography>
            <ScrollableArea className={classes.scrollable}>
              <ExecutorsList taskInstances={data.taskInstances} />
            </ScrollableArea>
          </div>
        )}
      </div>
      <div className={classes.footer}>
        <Fade in>
          <Typography color="textSecondary" variant="body2">
            Создана: <DateView>{data.createdAt}</DateView>
          </Typography>
        </Fade>
        <TaskActions
          className={classes.actions}
          id={data.id}
          actions={actions}
          reload={reloadTasks}
        />
      </div>
    </div>
  ) : (
    <div className={classes.root}>
      <div className={classes.columns}>
        <Skeleton variant="rect" height={256} />
        <Skeleton variant="rect" height={256} />
      </div>
      <div className={classes.footer}>
        <Typography color="textSecondary" variant="body2">
          <Skeleton variant="rect" width={128} />
        </Typography>
        <div className={classes.actions}>
          <Skeleton variant="rect" width={96} height={32} />
          <Skeleton variant="rect" width={96} height={32} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ metaData }: State) => ({
  permissions: {
    deleteTask: haveAnyPermission(metaData.user?.role.power, ['DeleteTask'], metaData.permissions),
  },
});

const connector = connect(mapStateToProps);

type ConnectedTaskViewProps = ConnectedProps<typeof connector>;

export default connector(TaskView);
