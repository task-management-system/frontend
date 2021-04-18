import React, { useState, useEffect } from 'react';
import { Typography, Fade, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import ScrollableArea from 'components/common/ScrollableArea';
import MarkdownView from 'components/MarkdownView';
import FilesUpload from 'components/common/FilesUpload';
import FilesList from 'components/common/FilesList';
import DateView from 'components/common/DateView';
import NormalButton from 'components/themed/NormalButton';
import { DetailedTask, UUID } from 'types';
import { CollectedResponse } from 'types/api';

interface TaskViewProps {
  id: UUID;
  loadTask: (id: UUID) => Promise<CollectedResponse<DetailedTask>>;
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
  const [data, setData] = useState<DetailedTask | null>(null);

  useEffect(() => {
    loadTask(id).then(response => {
      if (response.details.ok) {
        setData(response.data);
      }
    });
  }, [loadTask, id]);

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
          <div className={classes.container}>
            <Typography className={classes.stickyHeading}>Ваши файлы</Typography>
            <FilesUpload />
          </div>
          <div className={classes.container}>
            <Typography className={classes.stickyHeading}>Файлы задачи</Typography>
            <FilesList files={data.files} />
          </div>
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
