import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import Container from 'components/common/Container';
import RouteButton from 'components/common/RouteButton';
import Loading from 'components/Loading';

const Users = React.lazy(() => import('./administration/Users'));
const Structure = React.lazy(() => import('./administration/Structure'));
const Roles = React.lazy(() => import('./administration/Roles'));

interface IAdministrationProps {}

const useStyles = makeStyles(theme => ({}));

const Administration: React.FC<IAdministrationProps> = props => {
  const classes = useStyles();
  const { path, url } = useRouteMatch();

  // TODO Сделать проверку на роль пользователя
  if (false) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <RouteButton to={`${url}/users`} color="inherit">
            Пользователи
          </RouteButton>
          <RouteButton to={`${url}/structure`} color="inherit">
            Структура
          </RouteButton>
          <RouteButton to={`${url}/roles`} color="inherit">
            Роли
          </RouteButton>
        </Toolbar>
      </AppBar>
      <Container>
        <Switch>
          <Route path={`${path}/users`}>
            <React.Suspense fallback={<Loading />}>
              <Users />
            </React.Suspense>
          </Route>
          <Route path={`${path}/structure`}>
            <React.Suspense fallback={<Loading />}>
              <Structure />
            </React.Suspense>
          </Route>
          <Route path={`${path}/roles`}>
            <React.Suspense fallback={<Loading />}>
              <Roles />
            </React.Suspense>
          </Route>
          <Route path="*">
            <Typography variant="h3">Administration</Typography>
          </Route>
        </Switch>
      </Container>
    </>
  );
};

export default Administration;
