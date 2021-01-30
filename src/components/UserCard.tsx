import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { IUser, IPermission } from 'types';
import { TState } from 'types/redux';
import NormalButton from './themed/NormalButton';

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
    flexGrow: 1,
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
          <strong>Права</strong>
        </Typography>
        <List dense={true}>
          {userPermissions.length > 0 ? (
            userPermissions.map(permission => (
              <ListItem key={permission.power}>
                <ListItemText primary={permission.description} />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="У пользователя нет прав" />
            </ListItem>
          )}
        </List>
        {user.email !== null && (
          <Typography variant="body2">
            <strong>Почта</strong>: <a href={`mailto:${user.email}`}>{user.email}</a>
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <NormalButton variant="contained" color="primary">
          {user.isActive ? 'Заблокировать' : 'Разблокировать'}
        </NormalButton>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state: TState) => ({
  permissions: state.metaData.permissions,
});

export default connect(mapStateToProps)(UserCard);
