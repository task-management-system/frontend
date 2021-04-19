import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Fade, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import ScrollableArea from 'components/common/ScrollableArea';
import MarkdownView from 'components/MarkdownView';
import FilesList from 'components/common/FilesList';
import DateView from 'components/common/DateView';
import NormalButton from 'components/themed/NormalButton';
import { DetailedReceivedTask, DetailedCreatedTask, UUID } from 'types';
import { PartialProperties } from 'types/common';
import { CollectedResponse } from 'types/api';
import { attachFilesToReceived, deleteFile } from 'api/v1';
import UploadControl from 'components/common/UploadControl';

type TaskViewEntry = PartialProperties<DetailedReceivedTask, 'parent'> &
  PartialProperties<DetailedCreatedTask, 'taskInstances'>;

interface TaskViewProps {
  id: UUID;
  loadTask: (id: UUID) => Promise<CollectedResponse<TaskViewEntry>>;
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
    gridTemplateColumns: '1fr 280px',
    overflow: 'hidden',
  },
  wrapper: {
    height: 256,
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

const TaskView: React.FC<TaskViewProps> = ({ id, loadTask }) => {
  const classes = useStyles();
  const [data, setData] = useState<TaskViewEntry | null>(null);

  useEffect(() => {
    loadTask(id).then(response => {
      if (response.details.ok) {
        setData(response.data);
      }
    });
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
              <UploadControl onChange={handleAddFiles} />
              <div className={classes.container}>
                <Typography className={classes.stickyHeading}>Ваши файлы</Typography>
                <FilesList files={data.files} removeItem={handleRemoveFile} />
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
              {data.taskInstances?.map(taskInstance => (
                <div className={classes.container} key={taskInstance.id}>
                  <Typography className={classes.stickyHeading}>
                    Файлы {taskInstance.executor.name || taskInstance.executor.username}
                  </Typography>
                  <FilesList files={taskInstance.files} />
                </div>
              ))}
            </>
          )}
        </ScrollableArea>
      </div>
      <div className={classes.footer}>
        <Fade in>
          <Typography color="textSecondary" variant="body2">
            Создана: <DateView>{data.createdAt}</DateView>
          </Typography>
        </Fade>
        <div className={classes.actions}>
          <Fade in>
            <NormalButton color="primary" variant="contained">
              Action
            </NormalButton>
          </Fade>
        </div>
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

export default TaskView;
