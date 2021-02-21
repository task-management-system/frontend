import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Avatar,
  Chip,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import ToggleLockButton from './ToggleLockButton';
import { IUser, IPermission } from 'types';
import { TState } from 'types/redux';
import RouteButton from 'components/common/RouteButton';
import { haveAnyPermission } from 'utils/permissions';
import UserEdit from 'components/dialogs/UserEdit';

interface IUserCardProps {
  user: IUser;
  onChange: () => Promise<void>;
}

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    gap: theme.spacing(1),
    flexGrow: 1,
    display: 'grid',
    gridAutoRows: 'max-content',
  },
  chipList: {
    margin: theme.spacing(-0.25),
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.25),
    },
  },
}));

const UserCard: React.FC<IUserCardProps & TUserCardState> = ({
  user,
  permissionsList,
  permissions,
  onChange,
}) => {
  const classes = useStyles();

  const userPermissionsList = permissionsList.reduce<IPermission[]>((accumulator, permission) => {
    if ((user.role.power & permission.power) > 0) {
      accumulator.push(permission);
    }

    return accumulator;
  }, []);

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar>{user.username[0]}</Avatar>}
        title={user.username}
        subheader={user.name}
        action={
          permissions.update && (
            <UserEdit user={user} onChange={onChange}>
              {({ handleOpen }) => (
                <IconButton color="primary" onClick={handleOpen}>
                  <Edit />
                </IconButton>
              )}
            </UserEdit>
          )
        }
      />
      <CardContent className={classes.content}>
        <Typography variant="body2">
          <strong>Роль</strong>: {user.role.text}
        </Typography>
        <Typography variant="body2">
          <strong>{userPermissionsList.length > 0 ? 'Права' : 'У пользователя нет прав'}</strong>
        </Typography>
        {userPermissionsList.length > 0 && (
          <div className={classes.chipList}>
            {userPermissionsList.map(permission => (
              <Chip
                variant="outlined"
                size="small"
                label={permission.description}
                key={permission.name}
              />
            ))}
          </div>
        )}
        {user.email !== null && (
          <Typography variant="body2">
            <strong>Почта</strong>: <a href={`mailto:${user.email}`}>{user.email}</a>
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {permissions.update && (
          <ToggleLockButton userId={user.id} isActive={user.isActive} onClick={onChange} />
        )}
        <RouteButton to={`/administration/user/${user.id}`} color="primary">
          Профиль
        </RouteButton>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = ({ metaData }: TState) => ({
  permissionsList: metaData.permissions,
  permissions: {
    update: haveAnyPermission(metaData.user?.role.power, ['UpdateUser'], metaData.permissions),
  },
});

type TUserCardState = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(UserCard);
