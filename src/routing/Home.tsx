import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'components/layout';
import Main from './Main';
import NoMatch from './NoMatch';
import Loading from 'components/Loading';
import PermittedRoute from 'components/common/PermittedRoute';
import { ADMINISTRATION_PERMISSIONS } from 'constants/permissions';

const Profile = React.lazy(() => import('./Profile'));
const User = React.lazy(() => import('./User'));
const Administration = React.lazy(() => import('./Administration'));

const Home: React.FC = () => (
  <Layout>
    <Switch>
      <Route path="/" exact>
        <Main />
      </Route>
      <Route path="/profile">
        <React.Suspense fallback={<Loading />}>
          <Profile />
        </React.Suspense>
      </Route>
      <PermittedRoute path="/user/:id" every={['ViewUser']}>
        <React.Suspense fallback={<Loading />}>
          <User />
        </React.Suspense>
      </PermittedRoute>
      <PermittedRoute path="/administration/:module?" any={ADMINISTRATION_PERMISSIONS}>
        <React.Suspense fallback={<Loading />}>
          <Administration />
        </React.Suspense>
      </PermittedRoute>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  </Layout>
);

export default Home;
