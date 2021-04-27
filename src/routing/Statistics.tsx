import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Paper, makeStyles, Typography, IconButton, Fade } from '@material-ui/core';
import { lightBlue, amber, deepOrange, lightGreen } from '@material-ui/core/colors';
import { Skeleton } from '@material-ui/lab';
import { Cached } from '@material-ui/icons';
import DateTimeView from 'components/common/date/DateTimeView';
import PieChart from 'components/chart/PieChart';
import { CountMetric, FilesizeMetric } from 'components/chart/CenteredMetric';
import filesize from 'filesize';
import usePromiseTrack from 'hooks/usePromiseTrack';
import { getStatistics } from 'api/v1';
import { AllStatistics, TaskStatistics, DiskStatistics } from 'types';

const useStyles = makeStyles(theme => ({
  root: {
    gap: theme.spacing(2),
    display: 'grid',
    gridAutoRows: 'max-content',
  },
  grid: {
    gap: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridAutoRows: 'max-content',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  info: {
    gap: theme.spacing(2),
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
    alignItems: 'center',
  },
  container: {
    padding: theme.spacing(2),
    overflow: 'hidden',
  },
  chart: {
    height: 320,
  },
}));

type TaskStatisticsKeys = keyof TaskStatistics;
type DiskStatisticsKeys = keyof DiskStatistics;

const TASK_MAPPING: Record<TaskStatisticsKeys, string> = {
  new: 'Новые',
  inWork: 'В работе',
  canceled: 'Отмененные',
  closed: 'Завершенные',
};

const TASK_COLORS: Record<TaskStatisticsKeys, string> = {
  new: lightBlue['500'],
  inWork: amber['500'],
  canceled: deepOrange['500'],
  closed: lightGreen['500'],
};

const DISK_MAPPING: Record<DiskStatisticsKeys, string> = {
  available: 'Доступно',
  used: 'Использовано',
};

const DISK_COLORS: Record<DiskStatisticsKeys, string> = {
  available: lightGreen['500'],
  used: lightBlue['500'],
};

const mapper = <T, K extends keyof T = keyof T>(
  statistics: T,
  mapping: Record<keyof T, string>,
  colors: Record<keyof T, string>
) =>
  Object.entries(statistics).map(([key, value]) => ({
    id: mapping[key as K],
    label: mapping[key as K],
    value: value as T[K],
    color: colors[key as K],
  }));

const Statistics: React.FC = () => {
  const classes = useStyles();
  const [statistics, setStatistics] = useState<AllStatistics | null>(null);
  const [inProgress, trackedGetStatistics] = usePromiseTrack(getStatistics);

  useEffect(() => {
    getStatistics().then(response => {
      setStatistics(response.data || null);
    });
  }, []);

  const handleReloadClick = useCallback(() => {
    trackedGetStatistics().then(response => {
      if (response.data !== null && response.data.createdAt !== statistics?.createdAt) {
        setStatistics(response.data);
      }
    });
  }, [statistics, trackedGetStatistics]);

  const mapped = useMemo(() => {
    if (statistics !== null) {
      return {
        task: {
          all: mapper(statistics.task.all, TASK_MAPPING, TASK_COLORS).filter(
            entry => entry.value > 0
          ),
          actual: mapper(statistics.task.actual, TASK_MAPPING, TASK_COLORS).filter(
            entry => entry.value > 0
          ),
        },
        disk: mapper(statistics.disk, DISK_MAPPING, DISK_COLORS).filter(entry => entry.value > 0),
      };
    }

    return {
      task: {
        all: [],
        actual: [],
      },
      disk: [],
    };
  }, [statistics]);

  if (statistics === null) {
    return (
      <div className={classes.root}>
        <div className={classes.info}>
          <Skeleton width={256} />
          <Skeleton variant="circle" width={30} height={30} />
        </div>
        <div className={classes.grid}>
          <Paper className={classes.container}>
            <Typography variant="h5">
              <Skeleton width={256} />
            </Typography>
            <div className={classes.chart}>
              <Skeleton variant="rect" height="100%" />
            </div>
          </Paper>
          <Paper className={classes.container}>
            <Typography variant="h5">
              <Skeleton width={256} />
            </Typography>
            <div className={classes.chart}>
              <Skeleton variant="rect" height="100%" />
            </div>
          </Paper>
          <Paper className={classes.container}>
            <Typography variant="h5">
              <Skeleton width={256} />
            </Typography>
            <div className={classes.chart}>
              <Skeleton variant="rect" height="100%" />
            </div>
          </Paper>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Fade in>
        <div className={classes.info}>
          <Typography variant="body2" color="textSecondary">
            Данные от <DateTimeView>{statistics.createdAt}</DateTimeView>
          </Typography>
          <IconButton size="small" disabled={inProgress} onClick={handleReloadClick}>
            <Cached />
          </IconButton>
        </div>
      </Fade>
      <div className={classes.grid}>
        <Fade in>
          <Paper className={classes.container}>
            <Typography variant="h5">Статистика всех задач</Typography>
            <div className={classes.chart}>
              <PieChart
                data={mapped.task.all}
                layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CountMetric]}
              />
            </div>
          </Paper>
        </Fade>
        <Fade in>
          <Paper className={classes.container}>
            <Typography variant="h5">Статистика актуальных задач</Typography>
            <div className={classes.chart}>
              <PieChart
                data={mapped.task.actual}
                layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CountMetric]}
              />
            </div>
          </Paper>
        </Fade>
        <Fade in>
          <Paper className={classes.container}>
            <Typography variant="h5">Статистика жесткого диска</Typography>
            <div className={classes.chart}>
              <PieChart
                data={mapped.disk}
                valueFormat={value => filesize(value)}
                arcLabelsSkipAngle={30}
                layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', FilesizeMetric]}
              />
            </div>
          </Paper>
        </Fade>
      </div>
    </div>
  );
};

export default Statistics;
