import React, { useState, useEffect } from 'react';
import { Fade, makeStyles, Typography } from '@material-ui/core';
import { ReceivedTaskInfo, UUID } from 'types';
import { CollectedResponse } from 'types/api';
import DateView from 'components/common/DateView';
import { Skeleton } from '@material-ui/lab';
import NormalButton from 'components/themed/NormalButton';
import MarkdownView from 'components/MarkdownView';

interface TaskViewProps<T> {
  id: UUID;
  loadTask: (id: UUID) => Promise<CollectedResponse<T>>;
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
    height: 160,
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

const TaskView = <T,>({
  id,
  loadTask,
}: React.PropsWithChildren<TaskViewProps<ReceivedTaskInfo>>) => {
  const classes = useStyles();
  const [data, setData] = useState<ReceivedTaskInfo | null>(null);

  useEffect(() => {
    loadTask(id).then(response => {
      if (response.details.ok) {
        setData(response.data);
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
        <Skeleton variant="rect" height={160} />
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
        <Skeleton variant="rect" height={160} />
        <Skeleton variant="rect" height={160} />
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
