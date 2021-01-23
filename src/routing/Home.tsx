import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'components/layout';
import Main from './Main';
import NoMatch from './NoMatch';
import Loading from 'components/Loading';
import { getUsers } from 'api/v1';

const Administration = React.lazy(() => import('./Administration'));

const Home: React.FC = props => {
  React.useEffect(() => {
    getUsers().then(console.log);
  }, []);

  return (
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
};

export default Home;
