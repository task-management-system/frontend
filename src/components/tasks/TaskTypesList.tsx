import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Paper, Tabs, Tab, makeStyles } from '@material-ui/core';
import { NewReleases, Details, Block, Done, DataUsage } from '@material-ui/icons';
import ThemedTab from 'components/themed/ThemedTab';
import { setGroup, setStatus, resetStatus } from 'redux/actions/tabs';
import { RECEIVED, CREATED } from 'constants/tasks';
import { State, Dispatch } from 'types/redux';

const icons: { [key: number]: JSX.Element } = {
  1: <NewReleases />,
  2: <Details />,
  3: <Block />,
  4: <Done />,
  5: <DataUsage />,
};

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
}));

// ? Сделать лучше
type Groups = typeof RECEIVED | typeof CREATED;

type AvailableStatuses = Record<Groups, number[]>;

const availableStatuses: AvailableStatuses = {
  [RECEIVED]: [1, 2, 3, 4],
  [CREATED]: [1, 2, 3, 4, 5],
};

const TaskTypesList: React.FC<ConnectedTaskTypesListProps> = ({
  statuses,
  group,
  status,
  setGroup,
  setStatus,
  resetStatus,
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (status === null) {
      setStatus(statuses[0].id);
    }
  }, [statuses, status, setStatus]);

  const handleGroupChange = (event: React.ChangeEvent<{}>, value: Groups) => {
    if (status !== null && !availableStatuses[value].includes(status)) {
      resetStatus();
    }

    setGroup(value);
  };

  const handleStatusChange = (event: React.ChangeEvent<{}>, value: number) => {
    setStatus(value);
  };

  return (
    <Paper className={classes.root} square>
      <Tabs value={group} textColor="primary" indicatorColor="primary" onChange={handleGroupChange}>
        <Tab label="Назначенные" value={RECEIVED} />
        <Tab label="Созданные" value={CREATED} />
      </Tabs>
      {status !== null && (
        <Tabs
          value={status}
          textColor="secondary"
          indicatorColor="secondary"
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

const mapStateToProps = (state: State) => {
  const { statuses } = state.metaData;
  const length = statuses.length;
  const count = state.tabs.group === CREATED ? length : length - 1;

  return {
    statuses: statuses.slice(0, count),
    ...state.tabs,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setGroup: (payload: string) => dispatch(setGroup(payload)),
  setStatus: (payload: number) => dispatch(setStatus(payload)),
  resetStatus: () => dispatch(resetStatus()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectedTaskTypesListProps = ConnectedProps<typeof connector>;

export default connector(TaskTypesList);
