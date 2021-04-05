import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Route, RouteProps } from 'react-router-dom';
import NoMatch from 'routing/NoMatch';
import { haveAnyPermission, haveEveryPermission } from 'utils/permissions';
import { RequireOnlyOne } from 'types/common';
import { State } from 'types/redux';

interface PermittedRouteBase {
  any?: string[];
  every?: string[];
}

type PermittedRouteProps = RequireOnlyOne<PermittedRouteBase, 'any' | 'every'>;

const PermittedRoute: React.FC<PermittedRouteProps & ConnectedPermittedRouteProps & RouteProps> = ({
  any,
  every,
  power,
  permissions,
  ...props
}) => {
  if (any !== undefined) {
    return haveAnyPermission(power, any, permissions) ? <Route {...props} /> : <NoMatch />;
  }

  if (every !== undefined) {
    return haveEveryPermission(power, every, permissions) ? <Route {...props} /> : <NoMatch />;
  }

  return <NoMatch />;
};

const mapStateToProps = (state: State) => ({
  power: state.metaData.user?.role.power || 0,
  permissions: state.metaData.permissions || [],
});

const connector = connect(mapStateToProps);

type ConnectedPermittedRouteProps = ConnectedProps<typeof connector>;

export default connector(PermittedRoute);
