import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import TaskCreate from 'components/dialogs/TaskCreate';
import NormalButton from 'components/themed/NormalButton';
import { haveAnyPermission } from 'utils/permissions';
import { State } from 'types/redux';

interface TaskListToolbarProps {
  loadTasks: () => void;
}

const TaskListToolbar: React.FC<TaskListToolbarProps & ConnectedTaskListToolbarProps> = ({
  loadTasks,
  permissions,
}) => {
  return (
    <>
      {permissions.createTask && (
        <TaskCreate onCreate={loadTasks}>
          {({ handleOpen }) => (
            <NormalButton color="primary" onClick={handleOpen}>
              Создать задачу
            </NormalButton>
          )}
        </TaskCreate>
      )}
    </>
  );
};

const mapStateToProps = ({ metaData }: State) => ({
  permissions: {
    createTask: haveAnyPermission(
      metaData.user?.role.power,
      ['Administrator', 'CreateTask'],
      metaData.permissions
    ),
  },
});

const connector = connect(mapStateToProps);

type ConnectedTaskListToolbarProps = ConnectedProps<typeof connector>;

export default connector(TaskListToolbar);
