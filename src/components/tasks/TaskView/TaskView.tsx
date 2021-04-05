import React, { useState, useEffect } from 'react';
import { Typography, Fade, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import ScrollableArea from 'components/common/ScrollableArea';
import MarkdownView from 'components/MarkdownView';
import FilesUpload from 'components/common/FilesUpload';
import FilesList from 'components/common/FilesList';
import DateView from 'components/common/DateView';
import NormalButton from 'components/themed/NormalButton';
import { ReceivedTaskInfo, UUID } from 'types';
import { CollectedResponse } from 'types/api';

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
    zIndex: theme.zIndex.tooltip + 1,
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
        <ScrollableArea className={classes.wrapper}>
          <div className={classes.container}>
            <Typography className={classes.stickyHeading}>Ваши файлы</Typography>
            <FilesUpload />
          </div>
          <div className={classes.container}>
            <Typography className={classes.stickyHeading}>Файлы задачи</Typography>
            <FilesList files={FAKE_FILES} />
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

const FAKE_FILES = [
  {
    id: '11c095d6-c13c-4cec-9102-73e2737fe654',
    name: 'File 1',
    size: 25809935,
  },
  {
    id: '46ffe408-6a8e-4daf-a260-f9412743a647',
    name: 'File 2',
    size: 14718850,
  },
  {
    id: '2589b90c-688e-4f11-ac0f-597f74fc219f',
    name: 'File 3',
    size: 1464664,
  },
  {
    id: '102345b3-c25d-4893-b3f4-68dd26d1f240',
    name: 'File 4',
    size: 1660177,
  },
  {
    id: '88979bf4-37ab-4b2a-9ef0-04c8490a8722',
    name: 'File 5',
    size: 2746497,
  },
  {
    id: '767fb237-6c07-4f15-94b3-abe06f352a3d',
    name: 'File 6',
    size: 21020318,
  },
  {
    id: 'd5d2b7b0-1bac-467f-bbc5-b02a693c77aa',
    name: 'File 7',
    size: 4612178,
  },
  {
    id: 'a0542b69-8409-4863-896b-463f69dac35d',
    name: 'File 8',
    size: 1920900,
  },
  {
    id: 'f4dd9b9b-103b-4b41-8dfa-cb8fa18df1d1',
    name: 'File 9',
    size: 5218575,
  },
  {
    id: '7dd4e643-bf4d-4e9e-bab2-cb053fee094b',
    name: 'File 10',
    size: 20410100,
  },
];
