import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import ToggleLockButton from './ToggleLockButton';
import CleverAvatar from 'components/common/CleverAvatar';
import RouteButton from 'components/common/RouteButton';
import UserEdit from 'components/dialogs/UserEdit';
import { haveAnyPermission } from 'utils/permissions';
import { User } from 'types';
import { State } from 'types/redux';
import PermissionsList from 'components/PermissionsList';

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
}));

const UserCard: React.FC<UserCardProps & ConnectedUserCardProps> = ({
  user,
  permissions,
  onChange,
}) => {
  const classes = useStyles();

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
          <strong>{user.role.power > 0 ? 'Права' : 'У пользователя нет прав'}</strong>
        </Typography>
        <PermissionsList power={user.role.power} />
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
