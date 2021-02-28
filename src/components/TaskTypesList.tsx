import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Paper, Tabs, Tab, makeStyles } from '@material-ui/core';
import { NewReleases, Details, Block, Done } from '@material-ui/icons';
import ThemedTab from './themed/ThemedTab';
import { APPOINTED, CREATED } from 'constants/tasks';
import { TDispatch, TState } from 'types/redux';
import { setGroup, setStatus } from 'redux/actions/tabs';

const icons: { [key: number]: JSX.Element } = {
  1: <NewReleases />,
  2: <Details />,
  3: <Block />,
  4: <Done />,
};

interface ITaskTypesListProps {}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const TaskTypesList: React.FC<
  ITaskTypesListProps & TTaskTypesListState & TTaskTypesListDispatch
> = ({ statuses, group, status, setGroup, setStatus }) => {
  const classes = useStyles();

  useEffect(() => {
    if (status === null && statuses.length > 0) {
      setStatus(statuses[0].id);
    }
  }, []);

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

const mapStateToProps = (state: TState) => ({
  statuses: state.metaData.statuses,
  ...state.tabs,
});

type TTaskTypesListState = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: TDispatch) => ({
  setGroup: (payload: string) => dispatch(setGroup(payload)),
  setStatus: (payload: number) => dispatch(setStatus(payload)),
});

type TTaskTypesListDispatch = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(TaskTypesList);
