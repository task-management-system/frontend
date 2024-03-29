import React, { useMemo } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import CleverAvatar from 'components/common/CleverAvatar';
import Link from 'components/common/Link';
import TaskDeadline from './TaskDeadline';
import { TaskInfo } from 'types';

interface TaskItemProps {
  task: TaskInfo;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '160px 1fr 160px',
  },
  columns: {
    padding: theme.spacing(1, 1.5),
    gap: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: 'max-content 1fr',
    alignItems: 'center',
  },
  column: {
    padding: theme.spacing(1, 1.5),
    display: 'grid',
    alignItems: 'center',
    textAlign: 'end',
  },
  avatar: {
    width: 32,
    height: 32,
    margin: theme.spacing(0, 0.5),
    textTransform: 'uppercase',
  },
  link: {
    width: '100%',
    justifySelf: 'start',
    overflow: 'hidden',
  },
  text: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

const TaskItem: React.FC<TaskItemProps> = ({ task, ...props }) => {
  const classes = useStyles();
  const creatorName = task.creator.name || task.creator.username;
  const dueDate = useMemo(() => new Date(task.dueDate), [task.dueDate]);

  return (
    <div className={classes.root} {...props}>
      <div className={classes.columns}>
        <Link to={`/user/${task.creator.id}`}>
          <CleverAvatar className={classes.avatar}>{creatorName[0]}</CleverAvatar>
        </Link>
        <Link className={classes.link} to={`/user/${task.creator.id}`}>
          <Typography className={classes.text} color="textPrimary">
            {creatorName}
          </Typography>
        </Link>
      </div>
      <div className={classes.columns}>
        <Typography>{task.title}</Typography>
        {task.description !== null && (
          <Typography className={classes.text} variant="body2" color="textSecondary">
            {task.description}
          </Typography>
        )}
      </div>
      <div className={classes.column}>
        <TaskDeadline date={dueDate} />
      </div>
    </div>
  );
};

export const TaskItemSkeleton: React.FC = props => {
  const classes = useStyles();

  return (
    <div className={classes.root} {...props}>
      <div className={classes.columns}>
        <Skeleton className={classes.avatar} variant="circle" />
        <Skeleton variant="rect" height={16} />
      </div>
      <div className={classes.columns}>
        <Skeleton variant="rect" width={128} height={24} />
        <Skeleton variant="rect" height={16} />
      </div>
      <div className={classes.column}>
        <Skeleton variant="rect" height={24} />
      </div>
    </div>
  );
};

export default TaskItem;
