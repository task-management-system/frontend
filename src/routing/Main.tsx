import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import Container from 'components/common/Container';
import TaskTypesList from 'components/tasks/TaskTypesList';
import TaskList from 'components/tasks/TaskList';
import { APPOINTED, CREATED } from 'constants/tasks';
import { State } from 'types/redux';

const useStyles = makeStyles(theme => ({
  root: {
    gap: theme.spacing(2),
    display: 'grid',
    gridAutoRows: 'max-content',
  },
  tab: {
    padding: 0,
  },
}));

const Main: React.FC<MainState> = ({ group }) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <TaskTypesList />
      <TabContext value={group}>
        <TabPanel className={classes.tab} value={APPOINTED}>
          <TaskList group={APPOINTED} />
        </TabPanel>
        <TabPanel className={classes.tab} value={CREATED}>
          <TaskList group={CREATED} />
        </TabPanel>
      </TabContext>
    </Container>
  );
};

const mapStateToProps = (state: State) => ({
  group: state.tabs.group,
});

type MainState = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Main);
