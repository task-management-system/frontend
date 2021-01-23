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

interface IRouteParams {
  module: string | undefined;
}

const useStyles = makeStyles(theme => ({
  toolbar: {
    gap: theme.spacing(1),
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
  },
}));

const SubNavigationButton: React.FC<{ to: string }> = props => {
  const { params } = useRouteMatch<IRouteParams>();
  const isActive = props.to === params?.module || false;

  return (
    <RouteButton
      to={`/administration/${props.to}`}
      variant={isActive ? 'contained' : 'text'}
      color={isActive ? 'secondary' : 'inherit'}
    >
      {props.children}
    </RouteButton>
  );
};

const Administration: React.FC<IAdministrationProps> = props => {
  const classes = useStyles();

  // TODO Сделать проверку на роль пользователя
  if (false) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolbar} variant="dense">
          <SubNavigationButton to="users">Пользователи</SubNavigationButton>
          <SubNavigationButton to="structure">Структура</SubNavigationButton>
          <SubNavigationButton to="roles">Роли</SubNavigationButton>
        </Toolbar>
      </AppBar>
      <Container>
        <Switch>
          <Route path="/administration/users">
            <React.Suspense fallback={<Loading />}>
              <Users />
            </React.Suspense>
          </Route>
          <Route path="/administration/structure">
            <React.Suspense fallback={<Loading />}>
              <Structure />
            </React.Suspense>
          </Route>
          <Route path="/administration/roles">
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
