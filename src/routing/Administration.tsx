import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Typography, makeStyles } from '@material-ui/core';
import AdministrationMenu from 'components/layout/AdministrationMenu';
import Container from 'components/common/Container';
import Loading from 'components/Loading';
import NoMatch from './NoMatch';
import { haveAnyPermission } from 'utils/permissions';
import { ADMINISTRATION_PERMISSIONS } from 'constants/permissions';
import { TState } from 'types/redux';

const Users = React.lazy(() => import('./administration/Users'));
const Structure = React.lazy(() => import('./administration/Structure'));
const Roles = React.lazy(() => import('./administration/Roles'));

interface IAdministrationProps {
  permissions: {
    administration: boolean;
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'grid',
    gridTemplateColumns: 'max-content 1fr',
  },
}));

const Administration: React.FC<IAdministrationProps> = ({ permissions }) => {
  const classes = useStyles();

  if (!permissions.administration) {
    return <NoMatch />;
  }

  return (
    <div className={classes.root}>
      <AdministrationMenu />
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
          <Container>
            <Typography variant="h3">Administration</Typography>
          </Container>
        </Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = ({ metaData }: TState) => ({
  permissions: {
    administration: haveAnyPermission(
      metaData.user?.role.power,
      ADMINISTRATION_PERMISSIONS,
      metaData.permissions
    ),
  },
});

export default connect(mapStateToProps)(Administration);
