import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import clsx from 'clsx';
import { Chip, makeStyles } from '@material-ui/core';
import { State } from 'types/redux';
import { Permission } from 'types';

interface PermissionsListProps {
  className?: string;
  power?: number;
}

const useStyles = makeStyles(theme => ({
  list: {
    margin: theme.spacing(-0.25),
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.25),
    },
  },
}));

const PermissionsList: React.FC<PermissionsListProps & ConnectedPermissionsListProps> = ({
  className,
  power = 0,
  permissions,
}) => {
  const classes = useStyles();

  const availablePermissions = permissions.reduce<Permission[]>((accumulator, permission) => {
    if (power > 0 && (power & permission.power) === permission.power) {
      accumulator.push(permission);
    }

    return accumulator;
  }, []);

  if (availablePermissions.length > 0) {
    return (
      <div className={clsx(classes.list, className)}>
        {availablePermissions.map(permission => (
          <Chip
            variant="outlined"
            size="small"
            label={permission.description}
            key={permission.name}
          />
        ))}
      </div>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state: State) => ({
  permissions: state.metaData.permissions || [],
});

const connector = connect(mapStateToProps);

type ConnectedPermissionsListProps = ConnectedProps<typeof connector>;

export default connector(PermissionsList);
