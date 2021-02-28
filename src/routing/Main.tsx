import React from 'react';
import { makeStyles } from '@material-ui/core';
import Container from 'components/common/Container';
import TaskTypesList from 'components/TaskTypesList';
import TaskGrid from 'components/TaskGrid';

const useStyles = makeStyles(theme => ({
  root: {
    gap: theme.spacing(2),
    display: 'grid',
    gridAutoRows: 'max-content',
  },
}));

const Main: React.FC = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <TaskTypesList />
      <TaskGrid />
    </Container>
  );
};

export default Main;
