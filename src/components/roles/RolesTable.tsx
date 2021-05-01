import React, { useState, useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Fade,
  IconButton,
  Typography,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Delete, Edit } from '@material-ui/icons';
import PermissionsList from 'components/PermissionsList';
import RoleEdit from 'components/dialogs/RoleEdit';
import Confirm from 'components/dialogs/Confirm';
import { removeCache } from 'redux/actions/cache';
import { range } from 'utils';
import usePromiseTrack from 'hooks/usePromiseTrack';
import { getRoles, deleteRole } from 'api/v1';
import { Role } from 'types';

const useStyles = makeStyles(theme => ({
  row: {
    verticalAlign: 'top',
  },
  wrapper: {
    minHeight: 30,
    display: 'flex',
    alignItems: 'center',
  },
}));

const ThemedTableRow = withStyles(theme => ({
  root: {
    '&:last-child': {
      '& > *': {
        borderBottom: 'none',
      },
    },
  },
}))(TableRow);

const RolesTable: React.FC<ConnectedRolesTableProps> = ({ removeCache }) => {
  const classes = useStyles();
  const [roles, setRoles] = useState<Role[]>([]);
  const [inProgress, trackedGetRoles] = usePromiseTrack(getRoles);

  useEffect(() => {
    trackedGetRoles().then(response => {
      setRoles(response.data || []);
    });
  }, [trackedGetRoles]);

  const handleReload = (updatedRole: Role) => {
    removeCache('roles');
    setRoles(roles => roles.map(role => (role.id === updatedRole.id ? updatedRole : role)));
  };

  const handleDelete = (id: number) => {
    deleteRole(id).then(response => {
      if (response.details.ok) {
        setRoles(roles => roles.filter(role => role.id !== id));
      }
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={256}>Название</TableCell>
            <TableCell colSpan={2}>Права</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!inProgress
            ? roles.map(role => (
                <Fade in key={role.id}>
                  <ThemedTableRow className={classes.row}>
                    <TableCell>
                      <span className={classes.wrapper}>{role.meaning}</span>
                    </TableCell>
                    <TableCell>
                      {role.power > 0 ? (
                        <PermissionsList className={classes.wrapper} power={role.power} />
                      ) : (
                        <Typography className={classes.wrapper} variant="body2">
                          Нет прав
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell width={92}>
                      <RoleEdit role={role} onChange={handleReload}>
                        {({ handleOpen }) => (
                          <IconButton size="small" color="primary" onClick={handleOpen}>
                            <Edit />
                          </IconButton>
                        )}
                      </RoleEdit>
                      <Confirm
                        title="Подтвердите действие"
                        message="Вы действительно хотите удалить роль?"
                        accept="Да"
                        cancel="Нет"
                        onAccept={() => handleDelete(role.id)}
                      >
                        {({ handleOpen }) => (
                          <IconButton size="small" color="primary" onClick={handleOpen}>
                            <Delete />
                          </IconButton>
                        )}
                      </Confirm>
                    </TableCell>
                  </ThemedTableRow>
                </Fade>
              ))
            : range(10).map(index => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell width={62}>
                    <Skeleton variant="circle" width={30} height={30} />
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ...bindActionCreators({ removeCache }, dispatch),
});

const connector = connect(null, mapDispatchToProps);

type ConnectedRolesTableProps = ConnectedProps<typeof connector>;

export default connector(RolesTable);
