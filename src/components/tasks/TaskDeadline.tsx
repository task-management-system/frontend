import React, { useMemo } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { red, orange } from '@material-ui/core/colors';
import DateView from 'components/common/DateView';
import { currentDate } from 'utils/date';
import { differenceInDays } from 'date-fns';

interface TaskDeadlineProps {
  date: Date;
}

const useStyles = makeStyles(theme => ({
  red: {
    color: red['500'],
  },
  orange: {
    color: orange['500'],
  },
}));

const today = currentDate();

const getClassName = (difference: number) => {
  if (difference <= 0) {
    return 'red';
  }

  if (difference <= 3) {
    return 'orange';
  }

  return undefined;
};

const TaskDeadline: React.FC<TaskDeadlineProps> = ({ date }) => {
  const classes = useStyles();
  const difference = useMemo(() => differenceInDays(date, today), [date, today]);
  const className = getClassName(difference);

  return (
    <Typography className={className && classes[className]} variant="body2">
      Срок: <DateView>{date.getTime()}</DateView>
    </Typography>
  );
};

export default TaskDeadline;
