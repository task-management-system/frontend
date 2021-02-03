import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Chip,
  Typography,
  makeStyles,
} from '@material-ui/core';
import ToggleLockButton from './ToggleLockButton';
import { IUser, IPermission } from 'types';
import { TState } from 'types/redux';

interface IUserCardProps {
  user: IUser;
  permissions: IPermission[];
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

const UserCard: React.FC<IUserCardProps> = ({ user, permissions }) => {
  const classes = useStyles();

  const userPermissions = permissions.reduce<IPermission[]>((accumulator, permission) => {
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
      />
      <CardContent className={classes.content}>
        <Typography variant="body2">
          <strong>{userPermissions.length > 0 ? 'Права' : 'У пользователя нет прав'}</strong>
        </Typography>
        {userPermissions.length > 0 && (
          <div className={classes.chipList}>
            {userPermissions.map(permission => (
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
        <ToggleLockButton id={user.id} isActive={user.isActive} />
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state: TState) => ({
  permissions: state.metaData.permissions,
});

export default connect(mapStateToProps)(UserCard);
