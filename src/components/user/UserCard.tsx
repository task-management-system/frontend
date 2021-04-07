import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import ToggleLockButton from './ToggleLockButton';
import CleverAvatar from 'components/common/CleverAvatar';
import RouteButton from 'components/common/RouteButton';
import UserEdit from 'components/dialogs/UserEdit';
import { haveAnyPermission } from 'utils/permissions';
import { User, Permission } from 'types';
import { State } from 'types/redux';

interface UserCardProps {
  user: User;
  onChange: (payload: User) => void;
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
  avatar: {
    textTransform: 'uppercase',
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

const UserCard: React.FC<UserCardProps & ConnectedUserCardProps> = ({
  user,
  permissionsList,
  permissions,
  onChange,
}) => {
  const classes = useStyles();

  const userPermissionsList = permissionsList.reduce<Permission[]>((accumulator, permission) => {
    if ((user.role.power & permission.power) > 0) {
      accumulator.push(permission);
    }

    return accumulator;
  }, []);

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<CleverAvatar className={classes.avatar}>{user.username[0]}</CleverAvatar>}
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
          <strong>Роль</strong>: {user.role.meaning}
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

const mapStateToProps = ({ metaData }: State) => ({
  permissionsList: metaData.permissions,
  permissions: {
    update: haveAnyPermission(
      metaData.user?.role.power,
      ['Administrator', 'UpdateUser'],
      metaData.permissions
    ),
  },
});

const connector = connect(mapStateToProps);

type ConnectedUserCardProps = ConnectedProps<typeof connector>;

export default connector(UserCard);
