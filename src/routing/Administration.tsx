import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import AdministrationNavbar from 'components/layout/AdministrationNavbar';
import Container from 'components/common/Container';
import Loading from 'components/Loading';
import { TState } from 'types/redux';

const Users = React.lazy(() => import('./administration/Users'));
const Structure = React.lazy(() => import('./administration/Structure'));
const Roles = React.lazy(() => import('./administration/Roles'));

interface IAdministrationProps {}

const Administration: React.FC<IAdministrationProps> = props => {
  // TODO Сделать проверку на роль пользователя
  if (false) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <AdministrationNavbar />
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

const mapStateToProps = (state: TState) => ({});

export default connect(mapStateToProps)(Administration);
