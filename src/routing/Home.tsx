import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'components/layout';
import Main from './Main';
import NoMatch from './NoMatch';
import Loading from 'components/Loading';

const Administration = React.lazy(() => import('./Administration'));

const Home: React.FC = () => (
  <Layout>
    <Switch>
      <Route path="/" exact>
        <Main />
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
