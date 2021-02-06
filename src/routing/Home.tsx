import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'components/layout';
import Main from './Main';
import NoMatch from './NoMatch';
import Loading from 'components/Loading';

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
      <Route path="/user/:id">
        <React.Suspense fallback={<Loading />}>
          <User />
        </React.Suspense>
      </Route>
      <Route path="/administration/:module?">
        <React.Suspense fallback={<Loading />}>
          <Administration />
        </React.Suspense>
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  </Layout>
);

export default Home;
