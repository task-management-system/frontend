import React from 'react';
import { connect } from 'react-redux';
import { Paper, Tabs, Tab, makeStyles } from '@material-ui/core';
import { NewReleases, Details, Block, Done } from '@material-ui/icons';
import ThemedTab from 'components/themed/ThemedTab';
import { setGroup, setStatus } from 'redux/actions/tabs';
import { APPOINTED, CREATED } from 'constants/tasks';
import { Dispatch, State } from 'types/redux';

const icons: { [key: number]: JSX.Element } = {
  1: <NewReleases />,
  2: <Details />,
  3: <Block />,
  4: <Done />,
};

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
}));

const TaskTypesList: React.FC<TaskTypesLisState & TaskTypesLisDispatch> = ({
  statuses,
  group,
  status,
  setGroup,
  setStatus,
}) => {
  const classes = useStyles();

  const handleGroupChange = (event: React.ChangeEvent<{}>, value: string) => setGroup(value);

  const handleStatusChange = (event: React.ChangeEvent<{}>, value: number) => setStatus(value);

  return (
    <Paper className={classes.root} square>
      <Tabs value={group} textColor="primary" indicatorColor="primary" onChange={handleGroupChange}>
        <Tab label="Назначенные" value={APPOINTED} />
        <Tab label="Созданные" value={CREATED} />
      </Tabs>
      {status !== null && (
        <Tabs
          value={status}
          textColor="secondary"
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          onChange={handleStatusChange}
        >
          {statuses.map(status => (
            <ThemedTab
              label={status.name}
              icon={icons[status.id]}
              value={status.id}
              key={status.id}
            />
          ))}
        </Tabs>
      )}
    </Paper>
  );
};

const mapStateToProps = (state: State) => ({
  statuses: state.metaData.statuses,
  ...state.tabs,
});

type TaskTypesLisState = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setGroup: (payload: string) => dispatch(setGroup(payload)),
  setStatus: (payload: number) => dispatch(setStatus(payload)),
});

type TaskTypesLisDispatch = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(TaskTypesList);
